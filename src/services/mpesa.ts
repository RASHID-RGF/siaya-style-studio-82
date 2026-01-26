/**
 * M-Pesa Payment Integration Service
 * 
 * This service handles M-Pesa STK Push payments.
 * You'll need to set up a backend API to handle the actual M-Pesa integration.
 * 
 * Required Backend Endpoints:
 * - POST /api/mpesa/stk-push - Initiate STK push
 * - GET /api/mpesa/status/:checkoutRequestId - Check payment status
 * 
 * M-Pesa Requirements:
 * - Consumer Key
 * - Consumer Secret
 * - Business Short Code
 * - Passkey
 * - Callback URL
 */

export interface MpesaPaymentRequest {
  phone: string;
  amount: number;
  orderData: {
    customer: {
      name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      county: string;
    };
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      size: string;
      color: string;
    }>;
    subtotal: number;
    shipping: number;
    total: number;
  };
}

export interface MpesaPaymentResponse {
  success: boolean;
  message: string;
  checkoutRequestId?: string;
  merchantRequestId?: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  message?: string;
}

/**
 * Initiates M-Pesa STK Push payment
 */
export const initiateMpesaPayment = async (
  paymentRequest: MpesaPaymentRequest
): Promise<MpesaPaymentResponse> => {
  try {
    // Get API URL from environment variables
    const apiUrl = import.meta.env.VITE_API_URL || '/api';
    
    const response = await fetch(`${apiUrl}/mpesa/stk-push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentRequest),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Payment initiation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('M-Pesa payment error:', error);
    throw error;
  }
};

/**
 * Checks the status of an M-Pesa payment
 */
export const checkPaymentStatus = async (
  checkoutRequestId: string
): Promise<PaymentStatusResponse> => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || '/api';
    
    const response = await fetch(
      `${apiUrl}/mpesa/status/${checkoutRequestId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to check payment status');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment status check error:', error);
    throw error;
  }
};

/**
 * Formats phone number to M-Pesa format (254XXXXXXXXX)
 */
export const formatPhoneForMpesa = (phone: string): string => {
  // Remove any non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If starts with 0, replace with 254
  if (cleaned.startsWith('0')) {
    cleaned = '254' + cleaned.substring(1);
  }
  
  // If doesn't start with 254, add it
  if (!cleaned.startsWith('254')) {
    cleaned = '254' + cleaned;
  }
  
  return cleaned;
};

/**
 * Validates Kenyan phone number
 */
export const isValidKenyanPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Should be 10 digits (07XXXXXXXX) or 12 digits (254XXXXXXXXX)
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return /^0[17]\d{8}$/.test(cleaned);
  }
  
  if (cleaned.length === 12 && cleaned.startsWith('254')) {
    return /^254[17]\d{8}$/.test(cleaned);
  }
  
  return false;
};
