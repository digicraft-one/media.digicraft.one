import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Button from "./Button";
import ContactFormModal from "./ContactFormModal";
import { buildQuotePrefill } from "../lib/mediaQuote";

/**
 * Pack pricing by edit complexity (INR), aligned to India 2025–26 market bands:
 * Social/reels premium ~₹2k–5k · footage edits mid · proper motion higher · voice-led top.
 * Motion Graphics uses your stated baseline (₹5,999 / ₹26,999 / ₹49,999).
 */
const editTypes = [
  {
    id: "social",
    label: "Social & Shorts",
    short: "Social",
    description:
      "Reels, Shorts, and TikToks with punchy text and scroll-stopping motion.",
    includes: [
      "Up to ~60s short-form cut",
      "Captions & kinetic text",
      "Transitions & effects",
      "1–2 revision rounds",
    ],
    languageAddon: 1499,
    packs: [
      { videos: 1, price: 3999, badge: null, featured: false },
      { videos: 5, price: 17999, badge: "Most popular", featured: true },
      { videos: 10, price: 32999, badge: "Best value", featured: false },
    ],
  },
  {
    id: "recorded",
    label: "Recorded Edit",
    short: "Recorded",
    description:
      "Your already-shot footage—cleaned, paced, and elevated with graphics.",
    includes: [
      "Cut, pace & polish",
      "Color & audio cleanup",
      "Titles & lower thirds",
      "2 revision rounds",
    ],
    languageAddon: 2499,
    packs: [
      { videos: 1, price: 4999, badge: null, featured: false },
      { videos: 5, price: 22499, badge: "Most popular", featured: true },
      { videos: 10, price: 41999, badge: "Best value", featured: false },
    ],
  },
  {
    id: "motion",
    label: "Motion Graphics",
    short: "Motion",
    description:
      "Proper motion design—kinetic titles, animated layouts, and graphic-driven sequences.",
    includes: [
      "Custom motion graphics",
      "Branded kinetic titles",
      "Animated overlays & scenes",
      "2–3 revision rounds",
    ],
    languageAddon: 3999,
    packs: [
      { videos: 1, price: 5999, badge: null, featured: false },
      { videos: 5, price: 26999, badge: "Most popular", featured: true },
      { videos: 10, price: 49999, badge: "Best value", featured: false },
    ],
  },
  {
    id: "voice",
    label: "Motion + Voice",
    short: "Voice",
    description:
      "Voice-led edits timed to narration with captions and full motion polish.",
    includes: [
      "Everything in Motion Graphics",
      "Voice sync & timed captions",
      "Narration-led pacing",
      "Priority revision rounds",
    ],
    languageAddon: 4999,
    packs: [
      { videos: 1, price: 7999, badge: null, featured: false },
      { videos: 5, price: 35999, badge: "Most popular", featured: true },
      { videos: 10, price: 66999, badge: "Best value", featured: false },
    ],
  },
];

const formatInr = (amount) => `₹${amount.toLocaleString("en-IN")}`;

const Pricing = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState(null);
  const [activeType, setActiveType] = useState("motion");

  const selectedType = useMemo(
    () => editTypes.find((type) => type.id === activeType) ?? editTypes[2],
    [activeType]
  );

  const openQuote = (options = {}) => {
    setQuotePrefill(
      buildQuotePrefill({
        editType: selectedType.id,
        editTypeLabel: selectedType.label,
        languageAddonUnit: selectedType.languageAddon,
        source: "pricing",
        ...options,
      })
    );
    setModalOpen(true);
  };

  const packs = useMemo(
    () =>
      selectedType.packs.map((pack) => ({
        ...pack,
        id: `${selectedType.id}-pack-${pack.videos}`,
        label: pack.videos === 1 ? "1 Video" : `${pack.videos} Videos`,
        perVideo: Math.round(pack.price / pack.videos),
        saveVsSingles:
          pack.videos > 1
            ? pack.videos * selectedType.packs[0].price - pack.price
            : 0,
      })),
    [selectedType]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      <section className="bg-black px-5 pb-24 pt-28 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 max-w-xl md:mb-12">
            <h1 className="special-font font-zentry text-4xl uppercase text-blue-50 md:text-6xl">
              Pick a style. <b>Choose</b> a pack.
            </h1>
          </div>

          <div
            className="mb-10 flex w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1"
            role="tablist"
            aria-label="Edit type"
          >
            {editTypes.map((type) => {
              const isActive = type.id === activeType;
              return (
                <button
                  key={type.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveType(type.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 font-general text-[10px] uppercase tracking-wide transition md:flex-1 md:text-xs ${
                    isActive
                      ? "bg-yellow-300 text-black"
                      : "text-blue-50/70 hover:bg-white/10 hover:text-blue-50"
                  }`}
                >
                  <span className="md:hidden">{type.short}</span>
                  <span className="hidden md:inline">{type.label}</span>
                </button>
              );
            })}
          </div>

          <div
            key={selectedType.id}
            className="mb-8 animate-[fadeIn_0.35s_ease] rounded-md border border-white/10 bg-white/5 p-5 md:p-6"
          >
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="font-general text-xs uppercase tracking-wider text-yellow-300">
                {selectedType.label}
              </p>
              <p className="font-circular-web text-sm text-blue-50/50">
                From {formatInr(selectedType.packs[0].price)} / video
              </p>
            </div>
            <p className="mt-2 max-w-2xl font-circular-web text-blue-50/70">
              {selectedType.description}
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-blue-50/80 sm:grid-cols-2">
              {selectedType.includes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-yellow-300" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            key={`${selectedType.id}-packs`}
            className="grid animate-[fadeIn_0.35s_ease] gap-5 md:grid-cols-3"
          >
            {packs.map((pack) => (
              <div
                key={pack.id}
                className={`relative flex flex-col rounded-md border p-6 transition-colors ${
                  pack.featured
                    ? "border-yellow-300 bg-yellow-300 text-black"
                    : "border-white/10 bg-white/5 text-blue-50"
                }`}
              >
                {pack.badge && (
                  <span
                    className={`absolute -top-3 left-5 rounded-full px-3 py-1 font-general text-[10px] uppercase tracking-wide ${
                      pack.featured
                        ? "bg-black text-yellow-300"
                        : "bg-yellow-300 text-black"
                    }`}
                  >
                    {pack.badge}
                  </span>
                )}

                <p
                  className={`font-general text-xs uppercase tracking-wider ${
                    pack.featured ? "text-black/60" : "text-blue-50/50"
                  }`}
                >
                  {pack.label}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="special-font font-zentry text-4xl md:text-5xl">
                    {formatInr(pack.price)}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    pack.featured ? "text-black/65" : "text-blue-50/55"
                  }`}
                >
                  {formatInr(pack.perVideo)} / video · {selectedType.label}
                </p>

                <ul
                  className={`mt-6 flex flex-1 flex-col gap-2 text-sm ${
                    pack.featured ? "text-black/80" : "text-blue-50/80"
                  }`}
                >
                  <li>
                    {pack.videos} finished video{pack.videos > 1 ? "s" : ""}
                  </li>
                  <li>Styled as {selectedType.label}</li>
                  <li>Source files on delivery</li>
                  {pack.saveVsSingles > 0 && (
                    <li>Save {formatInr(pack.saveVsSingles)} vs singles</li>
                  )}
                </ul>

                <button
                  type="button"
                  onClick={() =>
                    openQuote({
                      videoCount: pack.videos,
                      packPrice: pack.price,
                      languageAddon: false,
                    })
                  }
                  className={`mt-8 w-full rounded-full px-5 py-3 font-general text-xs uppercase transition ${
                    pack.featured
                      ? "bg-black text-white hover:bg-black/80"
                      : "bg-blue-50 text-black hover:bg-white"
                  }`}
                >
                  Choose {pack.label.toLowerCase()}
                </button>
              </div>
            ))}
          </div>

          <div
            key={`${selectedType.id}-lang`}
            className="mt-8 flex animate-[fadeIn_0.35s_ease] flex-col gap-4 rounded-md border border-dashed border-white/20 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between md:p-6"
          >
            <div>
              <p className="font-general text-xs uppercase tracking-wider text-blue-50/50">
                Add-on · {selectedType.label}
              </p>
              <h2 className="mt-1 special-font font-zentry text-2xl uppercase text-blue-50 md:text-3xl">
                Per language <b>+{formatInr(selectedType.languageAddon)}</b>
              </h2>
              <p className="mt-2 max-w-lg text-sm text-blue-50/60">
                Extra language version of the same edit—captions, text layers, and
                voice sync where needed. Per video, per language.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                openQuote({
                  videoCount: 1,
                  packPrice: selectedType.packs[0].price,
                  languageAddon: true,
                  languageCount: 1,
                })
              }
              className="shrink-0 rounded-full bg-blue-50 px-6 py-3 font-general text-xs uppercase text-black transition hover:bg-white"
            >
              Add a language
            </button>
          </div>

          <div className="mt-16 flex flex-col items-start gap-4 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md font-circular-web text-blue-50/60">
              Need a retainer, mixed styles, or something custom? We&apos;ll quote
              it fast.
            </p>
            <div className="flex flex-wrap gap-3">
              <div
                onClick={() =>
                  openQuote({
                    videoCount: 5,
                    packPrice: selectedType.packs[1].price,
                    languageAddon: false,
                  })
                }
              >
                <Button
                  id="pricing-contact"
                  title="Request a quote"
                  leftIcon={<TiLocationArrow />}
                  containerClass="bg-yellow-300 flex-center gap-1"
                />
              </div>
              <Link to="/samples">
                <Button
                  id="pricing-samples"
                  title="See samples"
                  containerClass="bg-blue-50 flex-center gap-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactFormModal
        open={modalOpen}
        prefill={quotePrefill}
        source="pricing"
        onClose={() => {
          setModalOpen(false);
          setQuotePrefill(null);
        }}
      />
      <Footer />
    </main>
  );
};

export default Pricing;
