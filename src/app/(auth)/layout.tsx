import React from "react";
import LoginSidebar from "@/components/login/login-sidebar";

export const metadata = {
  title: "Flowprint: Authentication",
  description: "Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      <LoginSidebar />
      {children}
    </div>
  );
}
