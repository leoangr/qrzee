import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FormGenerator from "../components/FormGenerator";
import Footer from "../components/Footer";
import FAQ from "../components/Faq";

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
