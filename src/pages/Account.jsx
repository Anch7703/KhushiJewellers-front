import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon, LogOut } from "lucide-react";
import styles from "./account.module.css";

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const resUser = await fetch("/api/me", { credentials: "include" });
      if (!resUser.ok) throw new Error("Not authenticated");

      const currentUser = await resUser.json();
      setUser(currentUser);
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingPulse}>
          <div className={styles.loadingAvatar}></div>
          <div className={styles.loadingLine}></div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className={styles.loadingContainer}>
        <Card className={styles.authCard}>
          <CardHeader className={styles.authHeader}>
            <div className={styles.userIconWrapper}>
              <UserIcon className={styles.userIcon} />
            </div>
            <CardTitle>Welcome to Khushi Jewellers</CardTitle>
            <p className={styles.authText}>
              Sign in to access your account and wishlist
            </p>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className={styles.loginButton}>
              Sign In with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome back, {user?.full_name}</h1>
          <p className={styles.subtitle}>Manage your profile and wishlist</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div>
              <label className={styles.label}>Full Name</label>
              <p className={styles.value}>{user?.full_name}</p>
            </div>
            <div>
              <label className={styles.label}>Email</label>
              <p className={styles.value}>{user?.email}</p>
            </div>
            <div>
              <label className={styles.label}>Role</label>
              <Badge variant="outline" className={styles.badge}>
                {user?.role}
              </Badge>
            </div>
            <Button onClick={handleLogout} variant="outline" className={styles.logoutButton}>
              <LogOut className={styles.logoutIcon} /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
