import { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import {
  EDIT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
  VIDEO_PACK_OPTIONS,
  calcEstimatedTotal,
  emptyQuoteForm,
  formatInr,
} from "../lib/mediaQuote";

const inputClass =
  "block w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-black placeholder-gray-500 transition focus:border-violet-500 focus:outline-none focus:ring-violet-500";

const PACK_PRICES = {
  social: { 1: 3999, 5: 17999, 10: 32999 },
  recorded: { 1: 4999, 5: 22499, 10: 41999 },
  motion: { 1: 5999, 5: 26999, 10: 49999 },
  voice: { 1: 7999, 5: 35999, 10: 66999 },
  custom: { 1: 5999, 5: 26999, 10: 49999 },
};

const QuoteForm = ({
  prefill = null,
  source = "other",
  onSuccess,
  variant = "page",
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => ({
    ...emptyQuoteForm(),
    source,
    ...(prefill || {}),
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [stepError, setStepError] = useState("");

  useEffect(() => {
    setFormData({
      ...emptyQuoteForm(),
      source,
      ...(prefill || {}),
    });
    setStep(1);
    setSubmitStatus(null);
    setStepError("");
  }, [prefill, source]);

  const estimatedTotal = useMemo(
    () =>
      calcEstimatedTotal({
        packPrice: formData.packPrice,
        videoCount: formData.videoCount,
        languageAddon: formData.languageAddon,
        languageCount: formData.languageCount,
        languageAddonUnit: formData.languageAddonUnit,
      }),
    [formData]
  );

  const syncTotals = (next) => {
    const total = calcEstimatedTotal({
      packPrice: next.packPrice,
      videoCount: next.videoCount,
      languageAddon: next.languageAddon,
      languageCount: next.languageCount,
      languageAddonUnit: next.languageAddonUnit,
    });
    return {
      ...next,
      estimatedTotal: total ? String(total) : "",
      budget: formatInr(total),
    };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      let next = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "editType") {
        const option = EDIT_TYPE_OPTIONS.find((o) => o.id === value);
        next.editTypeLabel = option?.label || "";
        next.languageAddonUnit = option
          ? String(option.languageAddon)
          : prev.languageAddonUnit;
        const videos = Number(next.videoCount);
        if (videos && PACK_PRICES[value]?.[videos]) {
          next.packPrice = String(PACK_PRICES[value][videos]);
        }
      }

      if (name === "videoCount") {
        const videos = Number(value);
        const typeId = next.editType || "motion";
        if (PACK_PRICES[typeId]?.[videos]) {
          next.packPrice = String(PACK_PRICES[typeId][videos]);
        }
      }

      return syncTotals(next);
    });
    setStepError("");
  };

  const validateStep1 = () => {
    if (!formData.editType) return "Please select an edit style.";
    if (!formData.videoCount) return "Please choose a video pack.";
    if (!formData.timeline) return "Please select a timeline.";
    if (!formData.description.trim()) return "Please add a short project note.";
    if (formData.languageAddon && !formData.languages.trim()) {
      return "Please list the language(s) you need.";
    }
    return "";
  };

  const validateStep2 = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!formData.phone.trim()) return "Phone is required.";
    return "";
  };

  const goNext = () => {
    const error = validateStep1();
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateStep2();
    if (error) {
      setStepError(error);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setStepError("");

    const payload = {
      ...formData,
      videoCount: Number(formData.videoCount) || 0,
      packPrice: Number(formData.packPrice) || 0,
      languageCount: formData.languageAddon
        ? Math.max(Number(formData.languageCount) || 1, 1)
        : 0,
      languageAddonUnit: Number(formData.languageAddonUnit) || 0,
      estimatedTotal,
      budget: formatInr(estimatedTotal) || formData.budget,
      source: formData.source || source,
    };

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://127.0.0.1:3000/api/media";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ ...emptyQuoteForm(), source });
        setStep(1);
        onSuccess?.();
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Error submitting quote:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={variant === "modal" ? "mt-4 w-full" : "mt-6 space-y-5"}
      onSubmit={handleSubmit}
    >
      <div className="mb-5 flex items-center gap-2">
        {[1, 2].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                step === n
                  ? "bg-yellow-300 text-black"
                  : step > n
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {n}
            </div>
            <span className="hidden text-xs font-medium uppercase tracking-wide text-gray-600 sm:inline">
              {n === 1 ? "Package" : "Details"}
            </span>
            {n === 1 && <div className="h-px flex-1 bg-gray-200" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Edit style
              </label>
              <select
                name="editType"
                value={formData.editType}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select style</option>
                {EDIT_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Video pack
              </label>
              <select
                name="videoCount"
                value={formData.videoCount}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select pack</option>
                {VIDEO_PACK_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n} video{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <input
                type="checkbox"
                name="languageAddon"
                checked={Boolean(formData.languageAddon)}
                onChange={handleChange}
                className="size-4 rounded border-gray-300"
              />
              Add language version
              {formData.languageAddonUnit
                ? ` (+${formatInr(formData.languageAddonUnit)} / language / video)`
                : ""}
            </label>

            {formData.languageAddon && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-900">
                    Extra languages
                  </label>
                  <input
                    type="number"
                    name="languageCount"
                    min="1"
                    max="10"
                    value={formData.languageCount}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-900">
                    Which languages?
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    placeholder="e.g. Hindi, Tamil"
                    className={inputClass}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Timeline
            </label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select timeline</option>
              {TIMELINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Project notes
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="What are you making? Links, references, goals…"
              className={`${inputClass} resize-none`}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Extra requirements
              <span className="font-normal text-gray-400"> (optional)</span>
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows="2"
              placeholder="Brand kit, music, captions style, deadlines…"
              className={`${inputClass} resize-none`}
            />
          </div>

          {estimatedTotal > 0 && (
            <div className="rounded-md bg-black px-4 py-3 text-sm text-white">
              Estimated total:{" "}
              <span className="font-semibold text-yellow-300">
                {formatInr(estimatedTotal)}
              </span>
            </div>
          )}

          {stepError && (
            <p className="text-sm text-red-600">{stepError}</p>
          )}

          <button
            type="button"
            onClick={goNext}
            className="w-full rounded-full bg-yellow-300 px-5 py-3 font-general text-xs uppercase text-black transition hover:bg-yellow-200"
          >
            Continue to your details
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          {estimatedTotal > 0 && (
            <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              <p className="font-medium text-gray-900">
                {formData.editTypeLabel || "Selected package"}
              </p>
              <p className="mt-1">
                {formData.videoCount} video
                {Number(formData.videoCount) > 1 ? "s" : ""}
                {formData.languageAddon
                  ? ` · +${formData.languageCount} language(s)`
                  : ""}
                {" · "}
                <span className="font-semibold">{formatInr(estimatedTotal)}</span>
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Your name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Company
                <span className="font-normal text-gray-400"> (optional)</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
                className={inputClass}
              />
            </div>
          </div>

          {stepError && (
            <p className="text-sm text-red-600">{stepError}</p>
          )}

          {submitStatus === "success" && (
            <div className="rounded border border-green-500 bg-green-50 p-2 text-center text-sm text-green-700">
              Thanks! We&apos;ve received your request and will be in touch soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="rounded border border-red-500 bg-red-50 p-2 text-center text-sm text-red-700">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setStepError("");
              }}
              className="rounded-full border border-gray-300 px-5 py-3 font-general text-xs uppercase text-gray-700 transition hover:bg-gray-50 sm:w-1/3"
            >
              Back
            </button>
            <div className="sm:flex-1">
              <Button
                type="submit"
                title={isSubmitting ? "Sending..." : "Submit quote request"}
                containerClass="bg-yellow-300 flex-center w-full text-black"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default QuoteForm;
