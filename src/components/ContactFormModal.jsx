import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import QuoteForm from "./QuoteForm";

const ContactFormModal = ({ open, onClose, prefill = null, source = "modal" }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" }
      );
    }, modalRef);

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm md:p-6">
      <div
        ref={modalRef}
        className="relative flex max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-xl bg-gray-900 text-white shadow-lg"
      >
        <section className="grid w-full grid-cols-1 md:grid-cols-2">
          <div className="hidden flex-col justify-between p-8 md:flex lg:p-10">
            <div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                Let&apos;s Craft Your Edit
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
                Confirm your package, then leave your details. We&apos;ll reply
                with next steps and a clear quote.
              </p>
            </div>
            <blockquote className="mt-8 border-l-2 border-yellow-300 pl-4 text-white/90">
              DigiCraft Media turned our plain clips into motion-rich brand
              videos. The graphics, pacing, and polish exceeded expectations.
            </blockquote>
          </div>

          <div className="relative overflow-y-auto bg-white p-5 text-black sm:p-8 md:max-h-[95vh]">
            <button
              type="button"
              className="absolute right-4 top-3 z-10 text-2xl leading-none text-gray-400 transition hover:text-gray-700"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="pr-8 text-2xl font-semibold sm:text-3xl">
              Request a quote
            </h3>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Step through your package, then your contact details.
            </p>

            <QuoteForm
              prefill={prefill}
              source={source}
              variant="modal"
              onSuccess={() => {
                setTimeout(() => onClose?.(), 1600);
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactFormModal;
