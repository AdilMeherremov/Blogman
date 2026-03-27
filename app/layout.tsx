import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Blogman",
  description: "Best place to share your thoughts!",
};

const PoppinsFont = Poppins({
  weight: "500"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${PoppinsFont.className} antialiased`}>
        <div className="flex flex-col w-full min-h-screen items-center justify-center ">
          <Suspense fallback={<Spinner className="size-10" />}>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
