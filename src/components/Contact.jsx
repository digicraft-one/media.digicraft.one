import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import ContactFormModal from "./ContactFormModal";
import { useState } from "react";

const ImageClipBox = ({ src, clipclass }) => (
  <div className={clipclass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <img
            src="/img/contact-1.png"
            className="lg:translate-y-80 translate-y-100"
          />
          {/* <ImageClipBox
            src="/img/contact-2.png"
            clipclass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          /> */}
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          {/* <ImageClipBox
            src="/img/swordman-partial.webp"
            clipclass="absolute md:scale-125"
          /> */}
          <img
            src="/img/swordman.png"
            clipclass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Work With Us
          </p>

          <AnimatedTitle
            title="let&#39;s c<b>r</b>eate your <br /> next video <br /> t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />
          <div onClick={() => setModalOpen(true)}>
            <Button title="Get in touch" containerClass="mt-10 cursor-pointer" onClick={() => setModalOpen(true)} />
          </div>
        </div>
        <ContactFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  );
};

export default Contact;
