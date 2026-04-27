import { SeoHead } from "@/components/site/SeoHead";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const Index = () => (
  <>
    <SeoHead />
    <Navbar />
    <main id="main">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
