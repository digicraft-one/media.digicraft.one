import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";
import { Link } from "react-router-dom";

const navItems = ["About", "Services", "Story", "Contact"];
const productDropdownItems = [
  { name: "Digicraft Tech", href: "https://digicraft.one", logo: "https://www.digicraft.one/logo.svg" },
  { name: "Dbdash", href: "https://dbdash.live", logo: "https://www.dbdash.live/logo_noBg.png" },
];

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Refs for navigation container
  const navContainerRef = useRef(null);
  const productButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Handle click outside for dropdown
  useEffect(() => {
    if (!isDropdownOpen) return;
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        productButtonRef.current &&
        !productButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7 relative">
            <Link to="/">
              <img
                src="/img/logo.png"
                alt="Digicraft Media logo"
                className="w-14 rounded-full"
              />
            </Link>
            <div className="relative">
              <div onClick={() => setIsDropdownOpen((prev) => !prev)} ref={productButtonRef}>
                <Button
                  id="product-button"
                  title="Others"
                  rightIcon={isDropdownOpen ? <TiLocationArrow className="rotate-180 transition-transform duration-300" /> : <TiLocationArrow className="transition-transform duration-300" />}
                  containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                />
              </div>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                >
                  <ul className="py-1">
                    {productDropdownItems.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-blue-100 hover:text-blue-900 transition-colors rounded"
                          style={{ minHeight: '36px' }}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <img src={item.logo} alt={item.name + ' logo'} className="w-5 h-5 object-contain" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
