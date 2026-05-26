import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "CHANCE – Chest Automated Nodule Detection for Early Screening",
  description:
    "AI-powered chest X-ray nodule mass detection using YOLOv8. CHANCE supports DICOM and standard image formats for CXR scan analysis and early lung cancer screening.",
  keywords: ["lung nodule", "chest x-ray", "CXR", "DICOM", "YOLOv8", "ONNX", "nodule mass", "AI radiology", "early screening", "CHANCE"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="app-layout">
        <ThemeProvider defaultTheme="light" storageKey="chance-theme">
          <Navbar />
          <div className="page-body">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
