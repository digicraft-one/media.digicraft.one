export const EDIT_TYPE_OPTIONS = [
  { id: "social", label: "Social & Shorts", languageAddon: 1499 },
  { id: "recorded", label: "Recorded Edit", languageAddon: 2499 },
  { id: "motion", label: "Motion Graphics", languageAddon: 3999 },
  { id: "voice", label: "Motion + Voice", languageAddon: 4999 },
  { id: "custom", label: "Custom / Not sure", languageAddon: 3999 },
];

export const VIDEO_PACK_OPTIONS = [1, 5, 10];

export const TIMELINE_OPTIONS = [
  "ASAP (within 3–5 days)",
  "1–2 weeks",
  "2–4 weeks",
  "Flexible",
];

export const emptyQuoteForm = () => ({
  name: "",
  email: "",
  phone: "",
  company: "",
  editType: "",
  editTypeLabel: "",
  videoCount: "",
  packPrice: "",
  languageAddon: false,
  languageCount: "1",
  languageAddonUnit: "",
  languages: "",
  estimatedTotal: "",
  budget: "",
  timeline: "",
  description: "",
  requirements: "",
  source: "other",
});

export const formatInr = (amount) => {
  const n = Number(amount);
  if (!Number.isFinite(n) || n <= 0) return "";
  return `₹${n.toLocaleString("en-IN")}`;
};

export const calcEstimatedTotal = ({
  packPrice = 0,
  videoCount = 0,
  languageAddon = false,
  languageCount = 0,
  languageAddonUnit = 0,
}) => {
  const pack = Number(packPrice) || 0;
  const videos = Math.max(Number(videoCount) || 0, 1);
  const langs = languageAddon ? Math.max(Number(languageCount) || 1, 1) : 0;
  const unit = Number(languageAddonUnit) || 0;
  return pack + langs * unit * videos;
};

export const buildQuotePrefill = ({
  editType,
  editTypeLabel,
  languageAddonUnit,
  videoCount,
  packPrice,
  languageAddon = false,
  languageCount = 1,
  source = "pricing",
}) => {
  const unit = Number(languageAddonUnit) || 0;
  const videos = Number(videoCount) || 0;
  const pack = Number(packPrice) || 0;
  const langs = languageAddon ? Math.max(Number(languageCount) || 1, 1) : 0;
  const estimatedTotal = calcEstimatedTotal({
    packPrice: pack,
    videoCount: videos || 1,
    languageAddon,
    languageCount: langs,
    languageAddonUnit: unit,
  });

  const packLabel =
    videos > 0 ? `${videos} video${videos > 1 ? "s" : ""} pack` : "custom pack";
  const langLine = languageAddon
    ? `Language add-on: ${langs} language(s) × ${formatInr(unit)} × ${Math.max(videos, 1)} video(s).`
    : "No language add-on selected.";

  return {
    ...emptyQuoteForm(),
    editType: editType || "",
    editTypeLabel: editTypeLabel || "",
    videoCount: videos ? String(videos) : "",
    packPrice: pack ? String(pack) : "",
    languageAddon: Boolean(languageAddon),
    languageCount: String(Math.max(langs || 1, 1)),
    languageAddonUnit: unit ? String(unit) : "",
    estimatedTotal: estimatedTotal ? String(estimatedTotal) : "",
    budget: formatInr(estimatedTotal),
    description: [
      `Interested in ${editTypeLabel || "DigiCraft Media"} — ${packLabel}.`,
      langLine,
      estimatedTotal ? `Estimated total: ${formatInr(estimatedTotal)}.` : "",
    ]
      .filter(Boolean)
      .join(" "),
    source,
  };
};
