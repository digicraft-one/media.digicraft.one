import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
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
        <div className="flex flex-col items-center">
          {/* <h3 className="text-lg font-semibold text-purple-300 mb-3">
            Quick Links
          </h3> */}
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#about" className="hover:text-purple-200 transition duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-purple-200 transition duration-300">
                Services
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-purple-200 transition duration-300">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-purple-200 transition duration-300">
                Contact
              </a>
            </li>
            <li>
              <a href="#privacy-policy" className="hover:text-purple-200 transition duration-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          {/* <h3 className="text-lg font-semibold text-purple-300 mb-3">
            Quick Links
          </h3> */}
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#about" className="hover:text-purple-200 transition duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-purple-200 transition duration-300">
                Services
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-purple-200 transition duration-300">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-purple-200 transition duration-300">
                Contact
              </a>
            </li>
            <li>
              <a href="#privacy-policy" className="hover:text-purple-200 transition duration-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Social Media */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Follow Us</h3>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
