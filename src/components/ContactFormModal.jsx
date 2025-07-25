import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { gsap } from "gsap";
import clsx from "clsx";

const ContactFormModal = ({ open, onClose }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (open) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      }, modalRef);

      return () => ctx.revert();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use a direct URL to avoid redirects that can cause CORS issues
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api/media';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        mode: 'cors', // Explicitly request CORS
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          budget: "",
          description: ""
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 2000);
      } else {
        console.error('Server responded with error:', response.status);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl rounded-xl bg-gray-900 p-8 shadow-lg text-white flex overflow-hidden"
      >
        {/* Form Section */}
        <div className="flex-1">
          <button
            className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-white focus:outline-none transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="mb-6 text-2xl font-bold text-center font-general">Contact Us</h2>
          <div className="flex flex-col gap-4 pr-4">
            <div>
              <label className="block mb-1 font-medium font-general text-xs text-gray-300" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 focus:border-violet-500 focus:outline-none transition-colors text-white"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium font-general text-xs text-gray-300" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 focus:border-violet-500 focus:outline-none transition-colors text-white"
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium font-general text-xs text-gray-300" htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 focus:border-violet-500 focus:outline-none transition-colors text-white"
                placeholder="Your Phone Number"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium font-general text-xs text-gray-300" htmlFor="company">Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 focus:border-violet-500 focus:outline-none transition-colors text-white"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium font-general text-xs text-gray-300" htmlFor="budget">Budget Range</label>
              <input
                id="budget"
                name="budget"
                type="text"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 focus:border-violet-500 focus:outline-none transition-colors text-white"
                placeholder="e.g. $1,000 - $5,000"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium font-general text-xs text-gray-300" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 focus:border-violet-500 focus:outline-none transition-colors text-white"
                placeholder="Describe your project or inquiry"
                required
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-2 bg-green-900/50 border border-green-500 rounded text-green-300 text-center">
                Message sent successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-2 bg-red-900/50 border border-red-500 rounded text-red-300 text-center">
                Failed to send message. Please try again.
              </div>
            )}

            <div onClick={handleSubmit}>
              <Button
                title={isSubmitting ? "Sending..." : "Submit"}
                containerClass="mt-4 w-full"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Logo and Tagline Section */}
        <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:w-1/3 border-l border-gray-700 pl-8">
          <div className="flex flex-col items-center">
            <img src="/img/logo.png" alt="DigiCraft Logo" className="w-32 mb-4" />
            <p className="text-center font-general text-sm text-gray-300 mt-4">Creating digital experiences that inspire</p>
            <div className="mt-8 border-t border-gray-700 pt-6 w-full">
              <p className="text-xs text-gray-400 text-center">
                Premium video production services for brands that want to stand out
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;