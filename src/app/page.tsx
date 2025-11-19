import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FormGenerator from "../components/FormGenerator";
import Footer from "../components/Footer";
import FAQ from "../components/Faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QRzee | Generate & Publish Dynamic QR Codes",
  description: "Create, customize, and share dynamic QR Codes easily. Update your links or content anytime without reprinting",
  keywords: ["QR code", "QR generator", "online QR codes"],
  robots: {
    index: true, 
    follow: true,
  }
}

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <FormGenerator />
      <FAQ />
      <Footer />
    </div>
  );
}
