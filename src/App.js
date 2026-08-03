import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * Re-applies the incoming URL hash after the first render.
 *
 * The browser tries to jump to #work (or #nextplay, etc.) while the page is
 * still an empty <div id="root">, finds nothing, and gives up — so a shared
 * deep link would land the visitor at the top instead.
 */
function useHashOnLoad() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;

    const jump = () => document.getElementById(id)?.scrollIntoView({ block: "start" });
    // Two frames: one for React to commit, one for layout to settle.
    window.requestAnimationFrame(() => window.requestAnimationFrame(jump));
  }, []);
}

function App() {
  useHashOnLoad();

  return (
    <>
      <Navbar />

      <main id="main">
        <Home />
        <About />
        <Skills />
        <Work />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
