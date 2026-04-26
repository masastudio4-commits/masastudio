import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";

import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

import { useContent } from "@/lib/content-store";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />

      <Services />
      <TechStack />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
