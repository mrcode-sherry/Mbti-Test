import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterBar from "@/components/FooterBar";

export const metadata = {
  title: "MBTI Test App",
  description: "Take your personality test based on MBTI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FooterBar />
      </body>
    </html>
  );
}
