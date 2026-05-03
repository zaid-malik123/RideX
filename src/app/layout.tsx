import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/Provider";
import ReduxProvider from "@/redux/ReduxProvider";
import InitUser from "@/InitUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RideX | Smart Vehicle Booking Platform",
  description:
    "Experience seamless vehicle booking with RideX. Real-time tracking, secure payments, and fast rides — all in one smart mobility platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <ReduxProvider>
            <InitUser/>
            {children}
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
