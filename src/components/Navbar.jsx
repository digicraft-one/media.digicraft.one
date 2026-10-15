import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

import Button from "./Button";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", to: "/" },
  { name: "About", to: "/#about", hash: true },
  { name: "Services", to: "/#services", hash: true },
  { name: "Story", to: "/#story", hash: true },
  { name: "Pricing", to: "/pricing" },
];

const samplesDropdownItems = [
  { name: "All Samples", to: "/samples" },
  { name: "Proper Motion Graphics", to: "/samples#samples-motion" },
  { name: "Motion Graphics with Voice", to: "/samples#samples-voice" },
  { name: "Recorded Video Editing", to: "/samples#samples-recorded" },
  { name: "Social & Short-form", to: "/samples#samples-social" },
];

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileSamplesOpen, setIsMobileSamplesOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navContainerRef = useRef(null);
  const samplesButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const resolveTo = (item) =>
    item.hash && isHome ? `#${item.name.toLowerCase()}` : item.to;

  const closeMobile = () => {
    setIsMobileOpen(false);
    setIsMobileSamplesOpen(false);
  };

  useEffect(() => {
    closeMobile();
    setIsDropdownOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY && !isMobileOpen) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY, isMobileOpen]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible || isMobileOpen ? 0 : -100,
      opacity: isNavVisible || isMobileOpen ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible, isMobileOpen]);

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

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7 relative">
            <Link to="/" onClick={closeMobile}>
              <img
                src="/logo.svg"
                alt="Digicraft Media logo"
                className="w-14 rounded-full"
              />
            </Link>
            <div className="relative hidden md:block">
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
                  containerClass="bg-blue-50 flex items-center justify-center gap-1"
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={resolveTo(item)}
                  className="nav-hover-btn"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link to="/contact" className="hidden md:inline-flex ms-4 md:ms-8">
              <Button
                id="contact-nav-button"
                title="Contact"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex items-center justify-center gap-1"
              />
            </Link>

            <button
              type="button"
              className="md:hidden flex size-11 items-center justify-center rounded-full bg-yellow-300 text-black"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              {isMobileOpen ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenuAlt3 className="text-2xl" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {isMobileOpen && (
        <div className="absolute left-0 right-0 top-[4.5rem] z-50 mx-4 overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-md md:hidden">
          <div className="flex max-h-[75vh] flex-col gap-1 overflow-y-auto p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={resolveTo(item)}
                onClick={closeMobile}
                className="rounded-lg px-4 py-3 font-general text-sm uppercase tracking-wide text-blue-50 transition hover:bg-white/10"
              >
                {item.name}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setIsMobileSamplesOpen((prev) => !prev)}
              className="flex items-center justify-between rounded-lg px-4 py-3 font-general text-sm uppercase tracking-wide text-blue-50 transition hover:bg-white/10"
            >
              Samples
              <TiLocationArrow
                className={`text-lg transition-transform ${
                  isMobileSamplesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMobileSamplesOpen && (
              <div className="mb-1 ml-2 border-l border-white/15 pl-3">
                {samplesDropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={closeMobile}
                    className="block rounded-lg px-3 py-2.5 text-sm text-blue-50/80 transition hover:bg-white/10 hover:text-blue-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/contact" onClick={closeMobile} className="mt-2">
              <Button
                id="contact-nav-button-mobile"
                title="Contact"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex w-full items-center justify-center gap-1"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
