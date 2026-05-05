import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import TracklistSection from "./components/TracklistSection";
import StorySection from "./components/StorySection";

export default function App() {
  return (
    <main className="relative bg-black text-white">
      <Nav />
      <HeroSection />
      <TracklistSection />
      <StorySection />
      <footer className="border-t border-white/10 py-10 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/35">
          © MMXXVI — Zkrutrekkerzidd
        </p>
      </footer>
    </main>
  );
}
