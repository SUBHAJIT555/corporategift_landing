import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Vision from "../components/Vision";
import Service from "../components/Service";
import Why from "../components/Why";
import Product from "../components/Product";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
// import ProductWithSWR from "../components/ProductWithSWR";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <Product />
      <Vision />
      <Service />
      <Why />
      <FAQ />
      <Testimonial />
      <Contact />
    </div>
  );
}

export default Home
