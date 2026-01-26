# 🚀 Quick Start Guide - M-Pesa Integration

## 📋 What We've Built

Your Siaya Style Studio now has a complete M-Pesa payment integration! Here's what's included:

### ✅ Backend API Server (`/server`)
- Express.js server for M-Pesa integration
- STK Push payment initiation
- Payment status checking
- Webhook callback handling
- Phone number validation
- Comprehensive error handling

### ✅ Frontend Integration (`/src`)
- Updated checkout page with M-Pesa payment
- Real-time payment status polling
- User-friendly payment flow
- Toast notifications for payment updates

### ✅ Documentation
- Complete setup guide ([MPESA_SETUP_GUIDE.md](./MPESA_SETUP_GUIDE.md))
- Backend README ([server/README.md](./server/README.md))
- Updated main README

## 🎯 Next Steps to Get Started

### 1. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 2. Get M-Pesa Credentials

Visit [Safaricom Daraja Portal](https://developer.safaricom.co.ke):
1. Sign up / Log in
2. Create a new app
3. Get your credentials:
   - Consumer Key
   - Consumer Secret
   - Passkey
   - Shortcode (use `174379` for sandbox testing)

### 3. Configure Environment Variables

**Backend (.env in `/server`):**
```bash
cd server
cp .env.example .env
# Edit server/.env with your M-Pesa credentials
```

**Required fields:**
```env
MPESA_CONSUMER_KEY=your_consumer_key_here
MPESA_CONSUMER_SECRET=your_consumer_secret_here
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey_here
```

### 4. Set Up ngrok (for testing)

M-Pesa needs a public URL to send callbacks. In development, use ngrok:

```bash
# Install ngrok
npm install -g ngrok

# Start ngrok
ngrok http 3001
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`) and update `server/.env`:
```env
MPESA_CALLBACK_URL=https://abc123.ngrok.io/api/mpesa/callback
```

### 5. Start Everything

**Option A: Separate Terminals (Recommended for first time)**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
cd server
npm run dev
```

Terminal 3 - ngrok:
```bash
ngrok http 3001
```

**Option B: Using concurrently (after installing)**

```bash
# Install concurrently
npm install -g concurrently

# Run both servers
npm run dev:all
```

### 6. Test Payment

1. Open http://localhost:5173
2. Add items to cart
3. Go to checkout
4. Fill in the form:
   - Phone: `254708374149` (sandbox test number)
   - Fill other details
5. Click "Pay with M-Pesa"
6. Check for payment prompt (auto-accepts in sandbox)
7. Wait for confirmation

## 📝 Environment Variables Checklist

### Backend (`server/.env`)
- [x] MPESA_ENV=sandbox
- [ ] MPESA_CONSUMER_KEY=*your_key*
- [ ] MPESA_CONSUMER_SECRET=*your_secret*
- [ ] MPESA_SHORTCODE=174379
- [ ] MPESA_PASSKEY=*your_passkey*
- [ ] MPESA_CALLBACK_URL=*your_ngrok_url*/api/mpesa/callback
- [x] PORT=3001
- [x] FRONTEND_URL=http://localhost:5173

### Frontend (`.env` in root)
- [x] VITE_API_URL=http://localhost:3001/api

## 🧪 Testing Checklist

Test these scenarios:

- [ ] STK Push is sent to phone
- [ ] Payment success flow works
- [ ] Payment cancellation is handled
- [ ] Payment timeout is handled
- [ ] Invalid phone number shows error
- [ ] Form validation works
- [ ] Order confirmation displays correctly
- [ ] Backend logs show payment details
- [ ] ngrok receives callbacks from M-Pesa

## 📚 Detailed Documentation

For complete setup instructions, troubleshooting, and production deployment:

👉 **See [MPESA_SETUP_GUIDE.md](./MPESA_SETUP_GUIDE.md)**

## 🆘 Quick Troubleshooting

### "Failed to authenticate with M-Pesa API"
- Check your Consumer Key and Secret in `server/.env`
- Verify you're using sandbox credentials for testing

### "Callback URL not accessible"
- Ensure ngrok is running
- Update callback URL in `server/.env` with current ngrok URL
- Check ngrok dashboard at http://127.0.0.1:4040

### "Cannot connect to backend"
- Verify backend server is running on port 3001
- Check `VITE_API_URL` in frontend `.env`
- Look for CORS errors in browser console

### "Payment not completing"
- Check backend logs for errors
- Verify callback URL is correct
- Ensure ngrok is still running
- Check M-Pesa service status

## 📞 Support

- **M-Pesa API**: apisupport@safaricom.co.ke
- **Application**: +254 723 865 139

## 🎉 What's Next?

After successful testing:

1. **Add Email Notifications**
   - Send order confirmations to customers
   - Notify admin of new orders

2. **Database Integration**
   - Store orders persistently
   - Track payment history

3. **Production Deployment**
   - Get production M-Pesa credentials
   - Deploy backend to Railway/Heroku
   - Deploy frontend to Vercel/Netlify
   - Update environment variables

4. **Enhanced Features**
   - Order tracking
   - Admin dashboard
   - Analytics and reporting

---

**Ready to test?** Follow the steps above and you'll have M-Pesa payments working in minutes! 🚀
