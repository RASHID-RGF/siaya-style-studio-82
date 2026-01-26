# M-Pesa Integration Setup Guide

Complete guide to set up M-Pesa payments for Siaya Style Studio.

## Overview

This integration allows customers to pay for their orders using M-Pesa STK Push (Lipa Na M-Pesa Online). Customers will receive a payment prompt on their phone and can complete the payment by entering their M-Pesa PIN.

## Prerequisites

1. Safaricom Daraja API account
2. Node.js installed (v18 or higher)
3. ngrok or similar tunneling tool (for development)

## Step 1: Get M-Pesa API Credentials

### Create Daraja Account

1. Visit [Safaricom Daraja Portal](https://developer.safaricom.co.ke)
2. Click "Sign Up" and create an account
3. Verify your email address
4. Log in to the portal

### Create an App

1. Go to "My Apps" section
2. Click "Add a New App"
3. Fill in the details:
   - **App Name**: Siaya Style Studio
   - **Description**: E-commerce payment integration
4. Select APIs to enable:
   - [x] Lipa Na M-Pesa Online
5. Click "Create App"

### Get Your Credentials

After creating the app, you'll see:
- **Consumer Key** - Copy this
- **Consumer Secret** - Copy this

### Get Paybill/Till Number

For **Sandbox Testing**:
- Shortcode: `174379` (default test shortcode)
- Passkey: Get from "Test Credentials" section in Daraja portal

For **Production**:
- Apply for Lipa Na M-Pesa Online on the Daraja portal
- Safaricom will provide your Business Shortcode and Passkey
- This requires business verification and may take a few days

## Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

This will install:
- `express` - Web server
- `axios` - HTTP client for M-Pesa API
- `cors` - Enable cross-origin requests
- `dotenv` - Environment variable management

## Step 3: Configure Environment Variables

### Backend Configuration

1. Copy the example file:
   ```bash
   cd server
   cp .env.example .env
   ```

2. Edit `server/.env` with your credentials:
   ```env
   # Use 'sandbox' for testing, 'production' for live
   MPESA_ENV=sandbox

   # Your Daraja app credentials
   MPESA_CONSUMER_KEY=YOUR_CONSUMER_KEY_HERE
   MPESA_CONSUMER_SECRET=YOUR_CONSUMER_SECRET_HERE

   # Business shortcode
   MPESA_SHORTCODE=174379

   # Passkey from Daraja portal
   MPESA_PASSKEY=YOUR_PASSKEY_HERE

   # Callback URL (see Step 4)
   MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/api/mpesa/callback

   # Server configuration
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

### Frontend Configuration

1. Create/edit `.env` in the project root:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

## Step 4: Set Up Public Callback URL (Development)

M-Pesa needs to send callbacks to your server. In development, your localhost isn't accessible from the internet. Use ngrok to create a public URL.

### Install ngrok

```bash
# Option 1: npm
npm install -g ngrok

# Option 2: Download from https://ngrok.com/download
```

### Create Account (Free)

1. Visit [ngrok.com](https://ngrok.com)
2. Sign up for a free account
3. Get your auth token from the dashboard
4. Add auth token:
   ```bash
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```

### Start ngrok Tunnel

```bash
ngrok http 3001
```

You'll see output like:
```
Forwarding   https://abc123def456.ngrok.io -> http://localhost:3001
```

### Update Callback URL

Copy the HTTPS URL and update `server/.env`:
```env
MPESA_CALLBACK_URL=https://abc123def456.ngrok.io/api/mpesa/callback
```

**Important**: 
- Keep ngrok running while testing
- The URL changes each time you restart ngrok (unless you have a paid plan)
- Update the URL in `.env` if it changes

## Step 5: Start the Servers

### Terminal 1 - Backend API

```bash
cd server
npm run dev
```

You should see:
```
🚀 M-Pesa API server running on port 3001
📱 Ready to process M-Pesa payments
```

### Terminal 2 - Frontend

```bash
# From project root
npm run dev
```

### Terminal 3 - ngrok (if testing)

```bash
ngrok http 3001
```

## Step 6: Test the Integration

### Test in Sandbox Mode

1. Go to your application: `http://localhost:5173`
2. Add items to cart
3. Proceed to checkout
4. Fill in the form with test data:
   - **Phone**: `254708374149` (Safaricom test number)
   - **Name**: Your name
   - **Email**: Your email
   - **Address**: Any address

5. Click "Pay with M-Pesa"

### Expected Flow

1. ✅ You'll see: "Payment request sent to your phone!"
2. ✅ In sandbox, payment is automatically approved
3. ✅ After a few seconds: "Payment successful!"
4. ✅ Order confirmation page appears

### Check Logs

**Backend logs** (Terminal 1):
```
Initiating STK Push: {
  phone: '254708374149',
  amount: 1500,
  accountReference: 'ORDER-1234567890'
}
✅ STK Push sent successfully
M-Pesa Callback received: { ... }
✅ Payment successful: ws_CO_12345678
```

**ngrok logs**:
- View requests at: `http://127.0.0.1:4040`
- See all callback requests from M-Pesa

## Step 7: Production Setup

### Get Production Credentials

1. Apply for Lipa Na M-Pesa Online in Daraja portal
2. Submit business documents for verification
3. Safaricom will provide:
   - Production Consumer Key
   - Production Consumer Secret
   - Production Shortcode
   - Production Passkey

### Deploy Backend

Choose a hosting platform:

#### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables in Railway dashboard
# Deploy
railway up
```

#### Option 2: Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create siaya-style-studio-api

# Set environment variables
heroku config:set MPESA_ENV=production
heroku config:set MPESA_CONSUMER_KEY=your_key
# ... set all other variables

# Deploy
git push heroku main
```

#### Option 3: DigitalOcean/AWS/Google Cloud
- Deploy as a Node.js application
- Set environment variables in platform settings
- Ensure port 3001 (or your chosen port) is accessible

### Update Production Environment

```env
# server/.env (production)
MPESA_ENV=production
MPESA_CONSUMER_KEY=your_production_key
MPESA_CONSUMER_SECRET=your_production_secret
MPESA_SHORTCODE=your_production_shortcode
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_URL=https://api.yourdomain.com/api/mpesa/callback
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Update Frontend

```env
# .env.production
VITE_API_URL=https://api.yourdomain.com/api
```

Build and deploy frontend:
```bash
npm run build
# Deploy dist/ folder to Vercel/Netlify/etc.
```

## Troubleshooting

### "Failed to authenticate with M-Pesa API"

**Cause**: Invalid credentials

**Solution**:
- Verify Consumer Key and Secret are correct
- Check you're using credentials for the right environment (sandbox/production)
- Ensure no extra spaces in `.env` file

### "Callback URL not accessible"

**Cause**: ngrok not running or URL not updated

**Solution**:
- Ensure ngrok is running
- Verify callback URL in `.env` matches ngrok URL
- Check ngrok dashboard at `http://127.0.0.1:4040`

### "Payment request not received on phone"

**Cause**: Invalid phone number or M-Pesa service issue

**Solution**:
- Verify phone number format: `254XXXXXXXXX`
- Ensure it's a Safaricom number
- Check M-Pesa service status
- In sandbox, use test phone numbers

### "Request timeout"

**Cause**: Network issues or M-Pesa service delay

**Solution**:
- Check internet connection
- Verify M-Pesa API is operational
- Increase timeout in frontend code
- Try again after a few seconds

### CORS Errors

**Cause**: Frontend can't access backend API

**Solution**:
- Verify `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `server/index.js`
- Ensure frontend is using correct `VITE_API_URL`

## Testing Checklist

Before going live, test:

- [ ] STK Push initiates successfully
- [ ] Customer receives payment prompt on phone
- [ ] Payment completion is detected
- [ ] Order confirmation is displayed
- [ ] Payment failure is handled gracefully
- [ ] User cancellation is handled
- [ ] Timeout scenarios work correctly
- [ ] Callbacks are received and processed
- [ ] Transaction IDs are stored correctly
- [ ] Email confirmations are sent
- [ ] Multiple simultaneous payments work
- [ ] Error messages are user-friendly

## Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Use environment variables in production

2. **Use HTTPS in production**
   - Required for M-Pesa callbacks
   - Use SSL certificates (Let's Encrypt)

3. **Validate callback authenticity**
   - Check source IPs
   - Implement additional security measures

4. **Implement rate limiting**
   - Prevent payment spam
   - Use packages like `express-rate-limit`

5. **Store sensitive data securely**
   - Use encrypted database
   - Never log sensitive information

6. **Monitor transactions**
   - Log all payment activities
   - Set up alerts for failures
   - Regular audit of transactions

## Support

### M-Pesa Support
- Email: apisupport@safaricom.co.ke
- Phone: +254 711 062 000
- Portal: https://developer.safaricom.co.ke

### Daraja Documentation
- Getting Started: https://developer.safaricom.co.ke/docs
- STK Push: https://developer.safaricom.co.ke/APIs/MpesaExpressSimulate
- API Reference: https://developer.safaricom.co.ke/Documentation

### Application Support
- Contact: +254 723 865 139
- Email: support@siayastylestudio.com

## Next Steps

After successful integration:

1. **Add Email Notifications**
   - Send confirmation emails to customers
   - Send order notifications to admin

2. **Database Integration**
   - Store orders in database
   - Track payment history
   - Generate reports

3. **Admin Dashboard**
   - View all transactions
   - Manage orders
   - Export data

4. **Enhanced Features**
   - Order tracking
   - Refund processing
   - Analytics and reporting

## Resources

- [Safaricom Daraja Portal](https://developer.safaricom.co.ke)
- [M-Pesa API Documentation](https://developer.safaricom.co.ke/Documentation)
- [ngrok Documentation](https://ngrok.com/docs)
- [Express.js Documentation](https://expressjs.com)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
