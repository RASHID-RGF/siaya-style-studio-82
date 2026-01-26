import express from 'express';
import {
  getAccessToken,
  initiateStkPush,
  queryPaymentStatus,
} from '../services/mpesaService.js';
import { validatePhone, formatPhone } from '../utils/phoneValidator.js';

const router = express.Router();

// Store payment requests temporarily (use database in production)
const paymentRequests = new Map();

/**
 * POST /api/mpesa/stk-push
 * Initiates STK Push to customer's phone
 */
router.post('/stk-push', async (req, res) => {
  try {
    const { phone, amount, orderData } = req.body;

    // Validate input
    if (!phone || !amount || !orderData) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: phone, amount, or orderData',
      });
    }

    // Validate phone number
    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format. Use 254XXXXXXXXX or 07XXXXXXXX',
      });
    }

    // Format phone number
    const formattedPhone = formatPhone(phone);

    // Validate amount
    if (amount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be at least KES 1',
      });
    }

    // Get M-Pesa access token
    const accessToken = await getAccessToken();

    // Initiate STK Push
    const stkResponse = await initiateStkPush(
      accessToken,
      formattedPhone,
      Math.round(amount), // M-Pesa requires whole numbers
      orderData
    );

    // Store payment request for status checking
    if (stkResponse.CheckoutRequestID) {
      paymentRequests.set(stkResponse.CheckoutRequestID, {
        phone: formattedPhone,
        amount,
        orderData,
        status: 'pending',
        createdAt: new Date(),
        merchantRequestId: stkResponse.MerchantRequestID,
      });

      // Clean up old requests (older than 10 minutes)
      setTimeout(() => {
        paymentRequests.delete(stkResponse.CheckoutRequestID);
      }, 10 * 60 * 1000);
    }

    res.json({
      success: true,
      message: 'STK Push initiated successfully',
      checkoutRequestId: stkResponse.CheckoutRequestID,
      merchantRequestId: stkResponse.MerchantRequestID,
      customerMessage: stkResponse.CustomerMessage,
    });
  } catch (error) {
    console.error('STK Push error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to initiate payment',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

/**
 * GET /api/mpesa/status/:checkoutRequestId
 * Queries the status of a payment
 */
router.get('/status/:checkoutRequestId', async (req, res) => {
  try {
    const { checkoutRequestId } = req.params;

    if (!checkoutRequestId) {
      return res.status(400).json({
        success: false,
        message: 'Checkout request ID is required',
      });
    }

    // Check if we have this payment request
    const paymentRequest = paymentRequests.get(checkoutRequestId);
    if (!paymentRequest) {
      return res.status(404).json({
        success: false,
        message: 'Payment request not found',
        status: 'unknown',
      });
    }

    // Get M-Pesa access token
    const accessToken = await getAccessToken();

    // Query payment status from M-Pesa
    const statusResponse = await queryPaymentStatus(
      accessToken,
      checkoutRequestId
    );

    // Update stored status
    let status = 'pending';
    if (statusResponse.ResultCode === '0') {
      status = 'completed';
      paymentRequest.status = 'completed';
      paymentRequest.transactionId = statusResponse.CallbackMetadata?.Item?.find(
        item => item.Name === 'MpesaReceiptNumber'
      )?.Value;
    } else if (statusResponse.ResultCode === '1032') {
      status = 'cancelled';
      paymentRequest.status = 'cancelled';
    } else if (statusResponse.ResultCode) {
      status = 'failed';
      paymentRequest.status = 'failed';
    }

    res.json({
      success: true,
      status,
      message: statusResponse.ResultDesc,
      transactionId: paymentRequest.transactionId,
      resultCode: statusResponse.ResultCode,
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to check payment status',
      status: 'error',
    });
  }
});

/**
 * POST /api/mpesa/callback
 * Receives callbacks from M-Pesa after payment completion
 */
router.post('/callback', async (req, res) => {
  try {
    console.log('M-Pesa Callback received:', JSON.stringify(req.body, null, 2));

    const { Body } = req.body;
    
    if (Body?.stkCallback) {
      const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = Body.stkCallback;

      // Update payment request status
      const paymentRequest = paymentRequests.get(CheckoutRequestID);
      if (paymentRequest) {
        if (ResultCode === 0) {
          // Payment successful
          paymentRequest.status = 'completed';
          
          // Extract transaction details
          if (CallbackMetadata?.Item) {
            const items = CallbackMetadata.Item;
            paymentRequest.transactionId = items.find(i => i.Name === 'MpesaReceiptNumber')?.Value;
            paymentRequest.transactionDate = items.find(i => i.Name === 'TransactionDate')?.Value;
            paymentRequest.phoneNumber = items.find(i => i.Name === 'PhoneNumber')?.Value;
          }

          console.log(`✅ Payment successful: ${CheckoutRequestID}`);
          
          // TODO: Send confirmation email to customer
          // TODO: Update order status in database
          // TODO: Trigger any post-payment workflows
        } else {
          // Payment failed or cancelled
          paymentRequest.status = ResultCode === 1032 ? 'cancelled' : 'failed';
          paymentRequest.errorMessage = ResultDesc;
          console.log(`❌ Payment failed: ${CheckoutRequestID} - ${ResultDesc}`);
        }
      }
    }

    // Always respond with success to M-Pesa
    res.json({ ResultCode: 0, ResultDesc: 'Success' });
  } catch (error) {
    console.error('Callback processing error:', error);
    // Still respond with success to avoid M-Pesa retries
    res.json({ ResultCode: 0, ResultDesc: 'Success' });
  }
});

/**
 * GET /api/mpesa/test
 * Test endpoint to verify API is working
 */
router.get('/test', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    res.json({
      success: true,
      message: 'M-Pesa connection successful',
      hasToken: !!accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'M-Pesa connection failed',
      error: error.message,
    });
  }
});

export default router;
