import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import StartTest from "@/components/StartTest";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
    <div className="overflow-hidden">
      <section>
      <Hero/>
    </section>
    <section>
      <Testimonial/>
    </section>
    <section>
      <HowItWorks/>
    </section>
    <section>
      <StartTest/>
    </section>
    </div>
    </>
  );
}
