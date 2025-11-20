import { AuthVisual } from "@/components/auth/auth-visual";

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
    <div className="min-h-screen flex bg-background">
      <AuthVisual />
      {children}
    </div>
  );
}
