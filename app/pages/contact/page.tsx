'use client';

import { useState } from 'react';
// import Link from 'next/link';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 p-8">
      {/* Left Section */}
      <div className="relative text-center">
        <h1 className="text-5xl font-normal text-black">Contact Us</h1>
        <p className="text-6xl font-normal mt-6">
          <span className="text-yellow-400">Your Idea</span>
          <span className="text-black"> is Our Solution</span>
        </p>
      </div>

      {/* Right Section (Form) */}
      <form onSubmit={handleSubmit} className="bg-black text-white p-8 rounded-lg w-96">
        <div className="mb-4">
          <label className="block text-xs mb-1">Full Name</label>
          <input 
            type="text" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange} 
            className="w-full p-2 bg-black border-b border-white focus:outline-none" 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-xs mb-1">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-2 bg-black border-b border-white focus:outline-none" 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-xs mb-1">Phone</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="w-full p-2 bg-black border-b border-white focus:outline-none" 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-xs mb-1">Message</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            className="w-full p-2 bg-black border-b border-white focus:outline-none h-20"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
