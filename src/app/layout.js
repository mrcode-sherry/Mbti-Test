import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterBar from "@/components/FooterBar";
import { Inter } from "next/font/google"; // ✅ import Inter properly

// ✅ configure Inter font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans", // ties into your CSS vars
});

export const metadata = {
  title: "MBTI Test App",
  description: "Take your personality test based on MBTI.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FooterBar />
      </body>
    </html>
  );
}
