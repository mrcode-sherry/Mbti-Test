import Benefits from "@/components/Benefits";
import Comparison from "@/components/Comparison";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Slider from "@/components/Slider";
import Testimonial from "@/components/Testimonial";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
    <div className="overflow-hidden">
      <section>
      <Hero/>
    </section>
    <section>
      <Benefits/>
    </section>
    <section>
      <Testimonial/>
    </section>
    <section>
      <Comparison/>
    </section>
    <section>
      <Slider/>
    </section>
    <section>
      <HowItWorks/>
    </section>
    <section>
      <WhatsAppButton/>
    </section>
    </div>
    </>
  );
}
