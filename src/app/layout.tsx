import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QRzee | Generate & Publish Dynamic QR Codes",
  description: "Create, customize, and share dynamic QR Codes easily. Update your links or content anytime without reprinting",
  keywords: ["QR code", "QR generator", "online QR codes"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
