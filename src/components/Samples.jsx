import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";

const featuredVideos = [
  { id: "qPlGLVxVLII", title: "Sample 1" },
  { id: "7J-oFgSxlwA", title: "Sample 2" },
  { id: "r3oGMEJvaek", title: "Sample 3" },
];

const categories = [
  {
    id: "samples-motion",
    title: "Proper Motion Graphics",
    description:
      "Full motion design—kinetic titles, animated layouts, and graphic-driven sequences built from scratch.",
    videos: [{ id: "qPlGLVxVLII", title: "Motion Graphics sample" }],
  },
  {
    id: "samples-voice",
    title: "Motion Graphics with Voice",
    description:
      "Voice-led edits with timed captions, animated text, and motion that follows the narration.",
    videos: [{ id: "7J-oFgSxlwA", title: "Motion + Voice sample" }],
  },
  {
    id: "samples-recorded",
    title: "Recorded Video Editing",
    description:
      "Your already-shot footage—cleaned up, paced, and elevated with graphics, titles, and polish.",
    videos: [{ id: "r3oGMEJvaek", title: "Recorded edit sample" }],
  },
  {
    id: "samples-social",
    title: "Social & Short-form",
    description:
      "Reels, Shorts, and TikToks with punchy text, transitions, and scroll-stopping motion.",
    videos: [],
  },
];

const YoutubeEmbed = ({ videoId, title }) => (
  <div className="aspect-video overflow-hidden rounded-md border border-white/10 bg-black">
    <iframe
      className="size-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      loading="lazy"
    />
  </div>
);

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

    const timer = window.setTimeout(scrollToSection, 80);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      <section id="samples" className="bg-black pb-24 pt-28 scroll-mt-24">
        <div className="container mx-auto px-3 md:px-10">
          <div className="mb-16 px-5 md:mb-24 md:px-0">
            <h1 className="special-font font-zentry text-4xl uppercase text-blue-50 md:text-6xl">
              Sample <b>Work</b>
            </h1>
            <p className="mt-3 max-w-md font-circular-web text-sm text-blue-50/60 md:text-base">
              Digicraft Media edits—streamed in adaptive quality via YouTube.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {featuredVideos.map((video) => (
                <YoutubeEmbed
                  key={video.id}
                  videoId={video.id}
                  title={video.title}
                />
              ))}
            </div>
          </div>

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

                {category.videos.length > 0 ? (
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {category.videos.map((video) => (
                      <YoutubeEmbed
                        key={`${category.id}-${video.id}`}
                        videoId={video.id}
                        title={video.title}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-md border border-dashed border-white/15 px-4 py-8 text-sm text-blue-50/40">
                    More samples coming soon in this category.
                  </p>
                )}
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
