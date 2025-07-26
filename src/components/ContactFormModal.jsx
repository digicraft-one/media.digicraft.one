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
        className="relative w-full h-full md:w-[90%] rounded-xl bg-gray-900 md:p-8 shadow-lg text-white flex justify-center items-center overflow-hidden md:h-[90%]"
      >
        <section className="bg-gray-900 ">
          <div className="max-w-6xl mx-auto ">
            <div className="grid grid-cols-1 md:items-stretch md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
              <div className="hidden md:flex flex-col justify-between lg:py-5">
                <div>
                  <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:leading-tight lg:text-5xl">Let's Create Your Vision</h2>
                  <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-white">From concept to final cut, our team of expert videographers and editors will bring your story to life with stunning visuals and compelling narratives.</p>

                  <img className="relative z-10 max-w-xs mx-auto -mb-16 md:hidden" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line-mobile.svg" alt="" />

                  <img className="hidden w-full translate-x-24 translate-y-8 md:block" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line.svg" alt="" />
                </div>

                <div className="hidden md:mt-auto md:block">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>

                  <blockquote className="mt-6">
                    <p className="text-lg leading-relaxed text-white">DigiCraft transformed our brand story into a cinematic masterpiece. Their attention to detail and creative vision exceeded our expectations.</p>
                  </blockquote>
                </div>
              </div>

              <div className="lg:pl-12 md:py-10">
                <div className="overflow-hidden bg-white rounded-md relative">
                  <button
                    className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-600 focus:outline-none transition-colors z-10"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <div className="p-6 sm:p-10 h-screen md:h-fit flex flex-col justify-center items-center">
                    <h3 className="text-3xl font-semibold text-black">Start Your Project</h3>
                    <p className="mt-4 text-base text-gray-600">Share your vision and we'll help bring it to life with our professional video production services.</p>

                    <form className="mt-4">
                      <div className="space-y-6">
                        {/* Row 1: Name and Email */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">Your name</label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              className="block w-full px-3 py-2 text-sm text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              className="block w-full px-3 py-2 text-sm text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                              required
                            />
                          </div>
                        </div>

                        {/* Row 2: Phone and Company */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone number</label>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Phone number"
                              className="block w-full px-3 py-2 text-sm text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-900">Company</label>
                            <input
                              type="text"
                              name="company"
                              id="company"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="Company name"
                              className="block w-full px-3 py-2 text-sm text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                            />
                          </div>
                        </div>

                        {/* Row 3: Budget */}
                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium text-gray-900">Project budget</label>
                          <input
                            type="text"
                            name="budget"
                            id="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            placeholder="e.g. $2,500 - $10,000"
                            className="block w-full px-3 py-2 text-sm text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                          />
                        </div>

                        {/* Row 4: Description */}
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-900">Tell us about your project</label>
                          <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Share your vision, timeline, and any specific requirements"
                            className="block w-full px-3 py-2 text-sm text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                            rows="3"
                            required
                          ></textarea>
                        </div>

                        {submitStatus === 'success' && (
                          <div className="p-2 bg-green-50 border border-green-500 rounded text-green-700 text-center text-sm">
                            Thanks! We've received your request and will be in touch soon.
                          </div>
                        )}

                        {submitStatus === 'error' && (
                          <div className="p-2 bg-red-50 border border-red-500 rounded text-red-700 text-center text-sm">
                            Something went wrong. Please try again or contact us directly.
                          </div>
                        )}

                        <div>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white transition-all duration-200 bg-violet-600 border border-transparent rounded-md focus:outline-none hover:bg-violet-700 focus:bg-violet-700 disabled:opacity-70"
                          >
                            {isSubmitting ? "Sending..." : "Get Started"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactFormModal;





