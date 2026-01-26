import axios from 'axios';

// M-Pesa API URLs
const SANDBOX_URL = 'https://sandbox.safaricom.co.ke';
const PRODUCTION_URL = 'https://api.safaricom.co.ke';

const getBaseUrl = () => {
  return process.env.MPESA_ENV === 'production' ? PRODUCTION_URL : SANDBOX_URL;
};

/**
 * Get M-Pesa OAuth access token
 */
export const getAccessToken = async () => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      throw new Error('M-Pesa credentials not configured. Please set MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET in .env');
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    const response = await axios.get(
      `${getBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with M-Pesa API');
  }
};

/**
 * Generate M-Pesa password for STK Push
 */
const generatePassword = () => {
  const shortCode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const timestamp = getTimestamp();
  
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');
  return { password, timestamp };
};

/**
 * Get current timestamp in M-Pesa format (YYYYMMDDHHmmss)
 */
const getTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

/**
 * Initiate STK Push payment request
 */
export const initiateStkPush = async (accessToken, phone, amount, orderData) => {
  try {
    const shortCode = process.env.MPESA_SHORTCODE;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;
    
    if (!shortCode || !callbackUrl) {
      throw new Error('M-Pesa configuration incomplete. Please set MPESA_SHORTCODE and MPESA_CALLBACK_URL');
    }

    const { password, timestamp } = generatePassword();
    
    // Create account reference (order ID or customer name)
    const accountReference = `ORDER-${Date.now()}`;
    const transactionDesc = `Payment for ${orderData.items.length} item(s)`;

    const requestBody = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };

    console.log('Initiating STK Push:', {
      phone,
      amount,
      accountReference,
    });

    const response = await axios.post(
      `${getBaseUrl()}/mpesa/stkpush/v1/processrequest`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.ResponseCode === '0') {
      console.log('✅ STK Push sent successfully');
      return response.data;
    } else {
      throw new Error(response.data.ResponseDescription || 'STK Push failed');
    }
  } catch (error) {
    console.error('STK Push error:', error.response?.data || error.message);
    
    // Provide user-friendly error messages
    const errorMessage = error.response?.data?.errorMessage || error.message;
    
    if (errorMessage.includes('insufficient funds')) {
      throw new Error('Insufficient M-Pesa balance. Please top up and try again.');
    } else if (errorMessage.includes('invalid phone')) {
      throw new Error('Invalid phone number. Please check and try again.');
    } else if (errorMessage.includes('timeout')) {
      throw new Error('Request timeout. Please check your phone and try again.');
    }
    
    throw new Error(errorMessage || 'Failed to send payment request to your phone');
  }
};

/**
 * Query STK Push transaction status
 */
export const queryPaymentStatus = async (accessToken, checkoutRequestId) => {
  try {
    const shortCode = process.env.MPESA_SHORTCODE;
    const { password, timestamp } = generatePassword();

    const requestBody = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    };

    const response = await axios.post(
      `${getBaseUrl()}/mpesa/stkpushquery/v1/query`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Status query error:', error.response?.data || error.message);
    throw new Error('Failed to check payment status');
  }
};

/**
 * Verify M-Pesa callback authenticity (optional but recommended)
 */
export const verifyCallback = (callbackData) => {
  // In production, you should verify the callback is from Safaricom
  // by checking the source IP or implementing additional security measures
  return true;
};
