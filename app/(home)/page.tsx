import Hero from "@/components/sections/Hero/Hero";
import Stats from "@/components/sections/Stats/Stats";
import Services from "@/components/sections/Services/Services";
import Work from "@/components/sections/Work/Work";
import Brands from "@/components/sections/Brands/Brands";
import CTA from "@/components/sections/CTA/CTA";
import Contact from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <div className="px-10">
      <Hero />
      <Stats />
      <Services />
      <Work />
      <Brands />
      <CTA />
      <Contact />
    </div>
  );
}

