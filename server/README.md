# Siaya Style Studio - M-Pesa Payment API

Backend API server for handling M-Pesa STK Push payments.

## Setup Instructions

### 1. Get M-Pesa API Credentials

1. Visit [Safaricom Daraja Portal](https://developer.safaricom.co.ke)
2. Create an account or log in
3. Create a new app to get:
   - Consumer Key
   - Consumer Secret
   - Passkey
   - Business Short Code

### 2. Install Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your M-Pesa credentials:
   ```env
   MPESA_ENV=sandbox
   MPESA_CONSUMER_KEY=your_actual_consumer_key
   MPESA_CONSUMER_SECRET=your_actual_consumer_secret
   MPESA_SHORTCODE=174379
   MPESA_PASSKEY=your_actual_passkey
   MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/api/mpesa/callback
   ```

### 4. Set Up Callback URL (Development)

For development, you need a publicly accessible URL for M-Pesa callbacks:

1. Install [ngrok](https://ngrok.com/):
   ```bash
   npm install -g ngrok
   ```

2. Start ngrok on your API port:
   ```bash
   ngrok http 3001
   ```

3. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

4. Update `MPESA_CALLBACK_URL` in `.env`:
   ```env
   MPESA_CALLBACK_URL=https://abc123.ngrok.io/api/mpesa/callback
   ```

### 5. Start the Server

```bash
npm run dev
```

The API will run on `http://localhost:3001`

### 6. Update Frontend

In your main `.env` file (project root), add:
```env
VITE_API_URL=http://localhost:3001/api
```

## API Endpoints

### POST `/api/mpesa/stk-push`
Initiates an STK Push payment request.

**Request:**
```json
{
  "phone": "254712345678",
  "amount": 1500,
  "orderData": {
    "customer": { ... },
    "items": [ ... ],
    "total": 1500
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "STK Push initiated successfully",
  "checkoutRequestId": "ws_CO_12345678",
  "merchantRequestId": "12345-67890-1"
}
```

### GET `/api/mpesa/status/:checkoutRequestId`
Checks the status of a payment.

**Response:**
```json
{
  "success": true,
  "status": "completed",
  "transactionId": "ABC123XYZ",
  "message": "Payment successful"
}
```

### POST `/api/mpesa/callback`
Receives callbacks from M-Pesa (called automatically by Safaricom).

### GET `/api/mpesa/test`
Tests M-Pesa API connection.

## Testing

### Using Sandbox

1. Set `MPESA_ENV=sandbox` in `.env`
2. Use Safaricom's test credentials
3. Test phone numbers for sandbox:
   - `254708374149` - Success
   - `254708374149` - Insufficient funds
   - `254708374149` - User cancellation

### Test Payment Flow

1. Start both servers:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

2. Go to checkout page
3. Enter test phone number: `254708374149`
4. Complete payment on the M-Pesa prompt (sandbox will auto-accept)

## Production Deployment

### Environment Variables for Production

```env
MPESA_ENV=production
MPESA_CONSUMER_KEY=your_production_consumer_key
MPESA_CONSUMER_SECRET=your_production_consumer_secret
MPESA_SHORTCODE=your_production_shortcode
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Deployment Options

1. **Same Server (Recommended for small apps)**
   - Build frontend: `npm run build`
   - Serve static files from Express
   - Deploy together

2. **Separate Servers**
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Heroku/Railway/DigitalOcean
   - Update CORS settings

3. **Serverless Functions**
   - Deploy backend as Vercel/Netlify functions
   - Update API URLs accordingly

## Security Considerations

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use HTTPS in production** - Required for M-Pesa callbacks
3. **Validate callback authenticity** - Check source IPs
4. **Implement rate limiting** - Prevent abuse
5. **Store sensitive data securely** - Use proper database encryption
6. **Monitor transactions** - Log all payment activities

## Troubleshooting

### "Failed to authenticate with M-Pesa API"
- Check consumer key and secret are correct
- Verify you're using the right environment (sandbox/production)

### "Callback URL not accessible"
- Ensure ngrok is running (development)
- Verify HTTPS is enabled (production)
- Check firewall settings

### "Invalid phone number"
- Phone must be format: 254XXXXXXXXX
- Must start with 254 (Kenya code)
- Must be a Safaricom number

### "Request timeout"
- Check network connectivity
- Verify M-Pesa service is operational
- Try again after a few seconds

## Support

For M-Pesa API issues:
- [Daraja Portal](https://developer.safaricom.co.ke)
- [API Documentation](https://developer.safaricom.co.ke/Documentation)
- Email: apisupport@safaricom.co.ke

For application issues:
- Contact: +254 723 865 139
