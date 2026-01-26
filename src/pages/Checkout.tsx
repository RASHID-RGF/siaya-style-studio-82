import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { CreditCard, Loader2, CheckCircle2, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { initiateMpesaPayment, checkPaymentStatus } from '@/services/mpesa';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: 'Siaya',
  });

  const shipping = subtotal > 5000 ? 0 : 350;
  const total = subtotal + shipping;

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  // Redirect if cart is empty
  if (items.length === 0 && !paymentSuccess) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error('Please enter a valid phone number (e.g., 0723865139 or 254723865139)');
      return false;
    }
    if (!formData.address.trim()) {
      toast.error('Please enter your delivery address');
      return false;
    }
    if (!formData.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    return true;
  };

  const pollPaymentStatus = async (requestId: string) => {
    let attempts = 0;
    const maxAttempts = 40; // Poll for up to 2 minutes (40 * 3 seconds)

    pollIntervalRef.current = setInterval(async () => {
      attempts++;

      try {
        const statusResponse = await checkPaymentStatus(requestId);

        if (statusResponse.status === 'completed') {
          // Payment successful
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
          setIsProcessing(false);
          setPaymentSuccess(true);
          clearCart();
          toast.success('Payment successful!', {
            description: `Transaction ID: ${statusResponse.transactionId}. Your order has been placed successfully.`,
          });
        } else if (statusResponse.status === 'failed') {
          // Payment failed
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
          setIsProcessing(false);
          toast.error('Payment failed', {
            description: statusResponse.message || 'Please try again or contact support.',
          });
        } else if (statusResponse.status === 'cancelled') {
          // User cancelled
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
          setIsProcessing(false);
          toast.error('Payment cancelled', {
            description: 'You cancelled the payment request.',
          });
        } else if (attempts >= maxAttempts) {
          // Timeout
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
          setIsProcessing(false);
          toast.error('Payment timeout', {
            description: 'Payment verification timed out. Please check your M-Pesa messages or contact support.',
          });
        }
      } catch (error) {
        console.error('Status check error:', error);
        if (attempts >= maxAttempts) {
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
          setIsProcessing(false);
          toast.error('Unable to verify payment', {
            description: 'Please check your M-Pesa messages or contact support.',
          });
        }
      }
    }, 3000); // Check every 3 seconds
  };

  const handleMpesaPayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          county: formData.county,
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor,
        })),
        subtotal,
        shipping,
        total,
      };

      // Initiate M-Pesa payment
      const response = await initiateMpesaPayment({
        phone: formData.phone,
        amount: total,
        orderData,
      });

      if (response.success && response.checkoutRequestId) {
        setCheckoutRequestId(response.checkoutRequestId);
        
        // Show STK push notification
        toast.success('Payment request sent to your phone!', {
          description: `Please enter your M-Pesa PIN on your phone (${formData.phone}) to complete the payment of KES ${total.toLocaleString()}`,
          duration: 10000,
        });

        // Start polling for payment status
        pollPaymentStatus(response.checkoutRequestId);
      } else {
        throw new Error(response.message || 'Payment initiation failed');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      toast.error('Payment failed', {
        description: error.message || 'Unable to process payment. Please try again or contact support at +254 723 865 139',
      });
    }
  };

  // Success screen
  if (paymentSuccess) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. We'll send you a confirmation email shortly at {formData.email}.
              You can track your order status in your account.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={() => navigate('/shop')}>
                Continue Shopping
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/account')}>
                View Orders
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 lg:py-12">
        <h1 className="font-display text-2xl lg:text-3xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
                <CardDescription>
                  Enter your delivery details below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (M-Pesa) *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="0723865139 or 254723865139"
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the phone number you'll use for M-Pesa payment
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="House number, street name"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City/Town *</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Siaya"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="county">County</Label>
                    <Input
                      id="county"
                      name="county"
                      value={formData.county}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  We accept M-Pesa payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 border-2 border-green-500 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-900 dark:text-green-100">M-Pesa</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Pay securely with M-Pesa
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  After clicking "Pay with M-Pesa", you'll receive a payment prompt on your phone. 
                  Enter your M-Pesa PIN to complete the transaction.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedColor} • {item.selectedSize} • Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-primary mt-1">
                          KES {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `KES ${shipping}`}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary text-lg">
                      KES {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handleMpesaPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Waiting for payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pay with M-Pesa
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing your purchase you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
