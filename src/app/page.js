import Benefits from "@/components/Benefits";
import Comparison from "@/components/Comparison";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Slider from "@/components/Slider";
import Testimonial from "@/components/Testimonial";

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
      <HowItWorks/>
    </section>
    <section>
      <Slider/>
    </section>
    <section>
      <Comparison/>
    </section>
    </div>
    </>
  );
}
