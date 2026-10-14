import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";
import { Link, useLocation } from "react-router-dom";

const navItems = ["About", "Services", "Story"];

const samplesDropdownItems = [
  { name: "All Samples", to: "/samples" },
  { name: "Proper Motion Graphics", to: "/samples#samples-motion" },
  { name: "Motion Graphics with Voice", to: "/samples#samples-voice" },
  { name: "Recorded Video Editing", to: "/samples#samples-recorded" },
  { name: "Social & Short-form", to: "/samples#samples-social" },
];

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navContainerRef = useRef(null);
  const samplesButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
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

  useEffect(() => {
    if (!isDropdownOpen) return;
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        samplesButtonRef.current &&
        !samplesButtonRef.current.contains(event.target)
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
          <div className="flex items-center gap-7 relative">
            <Link to="/">
              <img
                src="/logo.svg"
                alt="Digicraft Media logo"
                className="w-14 rounded-full"
              />
            </Link>
            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                ref={samplesButtonRef}
              >
                <Button
                  id="samples-button"
                  title="Samples"
                  rightIcon={
                    isDropdownOpen ? (
                      <TiLocationArrow className="rotate-180 transition-transform duration-300" />
                    ) : (
                      <TiLocationArrow className="transition-transform duration-300" />
                    )
                  }
                  containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                />
              </div>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                >
                  <ul className="py-1">
                    {samplesDropdownItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.to}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-900 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex h-full items-center gap-2">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </Link>
              ))}
            </div>
            <Link to="/contact" className="ms-4 md:ms-8">
              <Button
                id="contact-nav-button"
                title="Contact"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex items-center justify-center gap-1"
              />
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
