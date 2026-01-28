import { signInWithGoogle } from "@/config/auth";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { User, Package, Heart, MapPin, Settings, LogOut } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
];

const Account = () => {
<<<<<<< Updated upstream
  const [activeTab, setActiveTab] = useState('profile');
  // Google auth removed — no user state here
  const user = null;
=======
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
>>>>>>> Stashed changes

  return (
    <Layout>
      <div className="container py-8 lg:py-12">
        <h1 className="font-display text-2xl lg:text-3xl font-bold mb-8">
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-4 shadow-boutique">
              <div className="flex items-center gap-4 p-4 mb-4 bg-secondary/50 rounded-xl">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
<<<<<<< Updated upstream
                  <p className="font-medium">Welcome, Guest!</p>
                  <p className="text-sm text-muted-foreground">Guest User</p>
=======
                  <p className="font-medium">Welcome!</p>
                  <p className="text-sm text-muted-foreground">
                    {user ? user.email : "Guest User"}
                  </p>
>>>>>>> Stashed changes
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
<<<<<<< Updated upstream
                {/* No sign-out available — auth removed */}
=======
                {user && (
                  <button
                    onClick={async () => {
                      await signOut(auth);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                )}
>>>>>>> Stashed changes
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-boutique min-h-[400px]">
              {activeTab === "profile" && (
                <div className="animate-fade-in">
                  <h2 className="font-display text-xl font-semibold mb-6">
                    Profile Information
                  </h2>
                  <div className="max-w-md space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-lg">Guest</p>
                        <p className="text-sm text-muted-foreground">guest@local</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Sign in to manage your profile, track orders, and save
                      your favorites.
                    </p>
<<<<<<< Updated upstream
=======
                    {!user && (
                      <div className="flex gap-4">
                        <Button
                          variant="hero"
                          size="lg"
                          onClick={async () => {
                            try {
                              await signInWithGoogle();
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                        >
                          Sign In with Google
                        </Button>

                        <Button variant="outline" size="lg">
                          Create Account
                        </Button>
                      </div>
                    )}
>>>>>>> Stashed changes
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="animate-fade-in">
                  <h2 className="font-display text-xl font-semibold mb-6">
                    Order History
                  </h2>
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Start shopping to see your orders here.
                    </p>
                    <Button>Shop Now</Button>
                  </div>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="animate-fade-in">
                  <h2 className="font-display text-xl font-semibold mb-6">
                    My Wishlist
                  </h2>
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">
                      Your wishlist is empty
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Save items you love for later.
                    </p>
                    <Button>Explore Products</Button>
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="animate-fade-in">
                  <h2 className="font-display text-xl font-semibold mb-6">
                    Saved Addresses
                  </h2>
                  <div className="text-center py-12">
                    <MapPin className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">No addresses saved</p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Add an address for faster checkout.
                    </p>
                    <Button>Add Address</Button>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="animate-fade-in">
                  <h2 className="font-display text-xl font-semibold mb-6">
                    Account Settings
                  </h2>
                  <div className="space-y-6 max-w-md">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about orders and offers
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Get order updates via SMS
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
