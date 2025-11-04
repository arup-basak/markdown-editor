"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SettingsPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Profile update state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Username update state
  const [newUsername, setNewUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  // Subscription state
  const [subscription, setSubscription] = useState<any>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    async function loadSession() {
      try {
        const { data } = await authClient.getSession();
        if (data?.user) {
          setSession(data);
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setUsername(data.user.username || "");
          setNewUsername(data.user.username || "");
        }
      } catch (error) {
        console.error("Failed to load session:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  useEffect(() => {
    async function loadSubscription() {
      try {
        const response = await fetch("/api/polar/subscription");
        if (response.ok) {
          const data = await response.json();
          setSubscription(data.subscription);
        }
      } catch (error) {
        console.error("Failed to load subscription:", error);
      } finally {
        setSubscriptionLoading(false);
      }
    }
    loadSubscription();
  }, []);

  const handleOpenCustomerPortal = async () => {
    setPortalLoading(true);
    try {
      const response = await fetch("/api/polar/customer-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer session");
      }

      const { customerSession } = await response.json();
      if (customerSession?.customerPortalUrl) {
        window.location.href = customerSession.customerPortalUrl;
      }
    } catch (error: any) {
      console.error("Failed to open customer portal:", error);
      alert(error.message || "Failed to open customer portal");
    } finally {
      setPortalLoading(false);
    }
  };

  // Debounced username availability check
  const checkUsernameAvailability = useCallback(
    async (username: string) => {
      // Clear previous states
      setUsernameError("");
      setUsernameAvailable(null);

      // Don't check if empty or same as current
      if (!username || username.trim() === "") {
        return;
      }

      if (username === session?.user?.username) {
        setUsernameAvailable(true);
        return;
      }

      // Validate username length
      if (username.length < 3) {
        setUsernameError("Username must be at least 3 characters");
        return;
      }

      if (username.length > 30) {
        setUsernameError("Username must be at most 30 characters");
        return;
      }

      setCheckingUsername(true);

      try {
        const { data: response, error } = await authClient.isUsernameAvailable({
          username: username,
        });

        if (error) {
          setUsernameError("Failed to check username availability");
          setUsernameAvailable(null);
        } else if (response?.available) {
          setUsernameAvailable(true);
        } else {
          setUsernameAvailable(false);
          setUsernameError("Username is already taken");
        }
      } catch (error) {
        setUsernameError("Failed to check username availability");
        setUsernameAvailable(null);
      } finally {
        setCheckingUsername(false);
      }
    },
    [session?.user?.username]
  );

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (newUsername && newUsername !== username) {
        checkUsernameAvailability(newUsername);
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [newUsername, username, checkUsernameAvailability]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);

    try {
      await authClient.updateUser({
        name,
      });
      setProfileSuccess("Profile updated successfully!");
      const { data } = await authClient.getSession();
      if (data?.user) {
        setSession(data);
      }
    } catch (err: any) {
      setProfileError(err.message || "Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setPasswordLoading(true);

    try {
      await authClient.changePassword({
        currentPassword,
        newPassword,
      });
      setPasswordSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordError(err.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setUsernameSuccess("");

    if (!newUsername || newUsername.trim() === "") {
      setUsernameError("Username cannot be empty");
      return;
    }

    if (newUsername === session?.user?.username) {
      setUsernameError("New username must be different from current username");
      return;
    }

    if (!usernameAvailable) {
      setUsernameError("Please choose an available username");
      return;
    }

    setUsernameLoading(true);

    try {
      await authClient.updateUser({
        username: newUsername,
      });
      setUsernameSuccess("Username updated successfully!");
      const { data } = await authClient.getSession();
      if (data?.user) {
        setSession(data);
        setUsername(data.user.username || "");
        setUsernameAvailable(null);
      }
    } catch (err: any) {
      setUsernameError(err.message || "Failed to update username");
    } finally {
      setUsernameLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">← Back to Dashboard</Link>
          </Button>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              {profileError && (
                <Alert variant="destructive">
                  <AlertDescription>{profileError}</AlertDescription>
                </Alert>
              )}

              {profileSuccess && (
                <Alert>
                  <AlertDescription>{profileSuccess}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={profileLoading}>
                {profileLoading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Username Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Username</CardTitle>
            <CardDescription>Change your username</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUsernameUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-username">Current Username</Label>
                <Input
                  id="current-username"
                  type="text"
                  value={username || "Not set"}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-username">New Username</Label>
                <div className="relative">
                  <Input
                    id="new-username"
                    type="text"
                    value={newUsername}
                    onChange={(e) => {
                      setNewUsername(e.target.value);
                      setUsernameError("");
                      setUsernameSuccess("");
                      setUsernameAvailable(null);
                    }}
                    required
                    placeholder="Enter new username"
                    minLength={3}
                    maxLength={30}
                    className="pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {checkingUsername && (
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    )}
                    {!checkingUsername && usernameAvailable === true && newUsername !== username && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                    {!checkingUsername && usernameAvailable === false && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
                {checkingUsername && (
                  <p className="text-xs text-muted-foreground">
                    Checking availability...
                  </p>
                )}
                {!checkingUsername && usernameAvailable === true && newUsername !== username && (
                  <p className="text-xs text-green-600">
                    Username is available!
                  </p>
                )}
              </div>

              {usernameError && (
                <Alert variant="destructive">
                  <AlertDescription>{usernameError}</AlertDescription>
                </Alert>
              )}

              {usernameSuccess && (
                <Alert>
                  <AlertDescription>{usernameSuccess}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                disabled={usernameLoading || checkingUsername || !usernameAvailable || newUsername === username}
              >
                {usernameLoading ? "Updating..." : "Update Username"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={8}
                  placeholder="At least 8 characters"
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={8}
                  placeholder="Confirm new password"
                />
              </div>

              {passwordError && (
                <Alert variant="destructive">
                  <AlertDescription>{passwordError}</AlertDescription>
                </Alert>
              )}

              {passwordSuccess && (
                <Alert>
                  <AlertDescription>{passwordSuccess}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={passwordLoading}>
                {passwordLoading ? "Changing Password..." : "Change Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Subscription Management */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your subscription and billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscriptionLoading ? (
              <div className="text-muted-foreground">Loading subscription...</div>
            ) : subscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Status</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {subscription.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Next Billing Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {subscription.cancelAtPeriodEnd && (
                  <Alert>
                    <AlertDescription>
                      Your subscription will cancel at the end of the current billing period ({new Date(subscription.currentPeriodEnd).toLocaleDateString()}).
                    </AlertDescription>
                  </Alert>
                )}
                <Button
                  onClick={handleOpenCustomerPortal}
                  disabled={portalLoading}
                  className="w-full"
                >
                  {portalLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Opening...
                    </>
                  ) : (
                    "Manage Subscription"
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  You don't have an active subscription.
                </p>
                <Button
                  onClick={() => router.push("/pricing")}
                  className="w-full"
                >
                  View Plans
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sign Out</p>
                <p className="text-sm text-muted-foreground">
                  Sign out of your account
                </p>
              </div>
              <Button
                variant="outline"
                onClick={async () => {
                  await authClient.signOut();
                  router.push("/");
                  router.refresh();
                }}
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
