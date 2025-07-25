import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  { href: "https://wa.me/+918299797516?text=Hi%21+I%27m+interested+in+your+social+media+services+and+would+love+to+know+more+about+how+you+can+help+me+grow+my+brand+online.+Could+you+please+share+the+details%2C+packages%2C+and+next+steps%3F", icon: <FaWhatsapp /> },
  { href: "https://www.instagram.com/digicraft_technologies", icon: <FaInstagram /> },
  { href: "https://www.linkedin.com/company/digicraft-one", icon: <FaLinkedin /> },
  { href: "mailto:hello@digicraft.one", icon: <FaEnvelope /> },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#0e0e10] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-purple-400">Digicraft Media</h2>
          <p className="text-sm text-gray-400 mt-2 text-center md:text-left">
            Empowering Creativity. Elevating Brands.
          </p>
          <p className="text-sm text-gray-500 mt-1 text-center md:text-left">
            © 2024 Digicraft Technologies. All rights reserved.
          </p>
        </div>

        {/* Center: Other Links (single section) */}
        <div className="flex flex-col items-center justify-center md:items-center">
          
          <ul className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-5">
            <li>
              <a
                href="#about"
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-purple-400/20 hover:text-purple-100 text-gray-300 font-medium transition-all duration-200 shadow-sm"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-purple-400/20 hover:text-purple-100 text-gray-300 font-medium transition-all duration-200 shadow-sm"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-purple-400/20 hover:text-purple-100 text-gray-300 font-medium transition-all duration-200 shadow-sm"
              >
                Contact
              </a>
            </li>
            {/* <li>
              <a
                href="#projects"
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-purple-400/20 hover:text-purple-100 text-gray-300 font-medium transition-all duration-200 shadow-sm"
              >
                Projects
              </a>
            </li> */}
            <li>
              <a
                href="https://www.digicraft.one/privacy-policy"
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-purple-400/20 hover:text-purple-100 text-gray-300 font-medium transition-all duration-200 shadow-sm"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Social Media */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Contact Us</h3>
          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-300 transition-transform duration-300 hover:scale-110 text-xl"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1 text-center md:text-left">
            <a href="tel:+918299797516">+91-8299797516</a> , <a href="tel:+916203785043">+91-6203785043</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
