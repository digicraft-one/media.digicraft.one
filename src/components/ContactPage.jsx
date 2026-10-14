import { useEffect } from "react";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import NavBar from "./Navbar";
import Footer from "./Footer";
import QuoteForm from "./QuoteForm";

const quickLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/+918299797516?text=Hi%21%20I%27m%20interested%20in%20DigiCraft%20Media%20editing%20services.",
    icon: <FaWhatsapp />,
  },
  {
    label: "Email",
    href: "mailto:hello@digicraft.one",
    icon: <FaEnvelope />,
  },
  {
    label: "Call",
    href: "tel:+918299797516",
    icon: <FaPhone />,
  },
];

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <NavBar />

      <section className="bg-black px-5 pb-24 pt-28 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="special-font font-zentry text-4xl uppercase text-blue-50 md:text-6xl">
              Let&apos;s craft your <b>next</b> edit.
            </h1>
            <p className="mt-4 max-w-md font-circular-web text-base text-blue-50/60 md:text-lg">
              Pick your package in step 1, then leave your details in step 2.
              We&apos;ll get back with a clear next step.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-blue-50 transition hover:bg-yellow-300 hover:text-black"
                >
                  {link.icon}
                  <span className="font-general text-xs uppercase">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-8 text-sm text-blue-50/45">
              +91-8299797516 · +91-6203785043 · hello@digicraft.one
            </p>
          </div>

          <div className="rounded-md bg-white p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-black sm:text-3xl">
              Start Your Project
            </h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Two quick steps—package first, then your contact info.
            </p>

            <QuoteForm source="contact" variant="page" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
