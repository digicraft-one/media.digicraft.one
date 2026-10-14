import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";

const categories = [
  {
    id: "samples-motion",
    title: "Proper Motion Graphics",
    description:
      "Full motion design—kinetic titles, animated layouts, and graphic-driven sequences built from scratch.",
    items: [
      "/gallery/1.webp",
      "/gallery/4.webp",
      "/gallery/12.webp",
      "/gallery/23.webp",
    ],
  },
  {
    id: "samples-voice",
    title: "Motion Graphics with Voice",
    description:
      "Voice-led edits with timed captions, animated text, and motion that follows the narration.",
    items: [
      "/gallery/2.webp",
      "/gallery/7.webp",
      "/gallery/15.webp",
      "/gallery/28.webp",
    ],
  },
  {
    id: "samples-recorded",
    title: "Recorded Video Editing",
    description:
      "Your already-shot footage—cleaned up, paced, and elevated with graphics, titles, and polish.",
    items: [
      "/gallery/3.webp",
      "/gallery/10.webp",
      "/gallery/18.webp",
      "/gallery/25.webp",
    ],
  },
  {
    id: "samples-social",
    title: "Social & Short-form",
    description:
      "Reels, Shorts, and TikToks with punchy text, transitions, and scroll-stopping motion.",
    items: [
      "/gallery/5.webp",
      "/gallery/14.webp",
      "/gallery/21.webp",
      "/gallery/29.webp",
    ],
  },
];

const Samples = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = location.hash.slice(1);
    const scrollToSection = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    // Wait a tick so the page has painted before scrolling
    const timer = window.setTimeout(scrollToSection, 80);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      <section id="samples" className="bg-black pb-24 pt-28 scroll-mt-24">
        <div className="container mx-auto px-3 md:px-10">

          <div className="flex flex-col gap-20 md:gap-28">
            {categories.map((category) => (
              <div
                key={category.id}
                id={category.id}
                className="scroll-mt-28 px-5 md:px-0"
              >
                <div className="mb-8 max-w-xl">
                  <h2 className="special-font font-zentry text-3xl uppercase text-blue-50 md:text-5xl">
                    {category.title.split(" ").map((word, i, arr) =>
                      i === arr.length - 1 ? (
                        <span key={`${category.id}-${word}`}>
                          {" "}
                          <b>{word}</b>
                        </span>
                      ) : (
                        <span key={`${category.id}-${word}`}>
                          {i === 0 ? word : ` ${word}`}
                        </span>
                      )
                    )}
                  </h2>
                  <p className="mt-3 font-circular-web text-sm text-blue-50/60 md:text-base">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                  {category.items.map((src) => (
                    <div
                      key={src}
                      className="aspect-[3/4] overflow-hidden rounded-md border border-white/10 bg-black"
                    >
                      <img
                        src={src}
                        alt={`${category.title} sample`}
                        className="size-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Samples;
