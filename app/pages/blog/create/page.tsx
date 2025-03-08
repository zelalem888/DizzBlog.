"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import Link from "next/link";

interface ImageResult {
  public_id: string;
}

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [publicId, setPublicId] = useState<string[]>([]);
// { redirect to other page after post button pressed }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, images: publicId }),
    });

    if (response.ok) {
      alert("Form submitted successfully!");
    } else {
      alert("Something went wrong.");
    }
  };

  const redirect = useRouter()
  const handleRedirect = (()=>{
    redirect.push("/pages")
  })

  return (
    <div className="col-span-3 min-h-screen py-8 -my-28 mt-1 mb-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-500">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title here"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              placeholder="Meta description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {publicId.map((image, index) => (
                <CldImage key={index} src={image} alt="Uploaded image" width={270} height={154} />
              ))}
            </div>
            <CldUploadWidget
              uploadPreset="sa3nmns4"
              options={{ sources: ["local", "url"], multiple: true, maxFiles: 3 }}
              onSuccess={(result) => {
                const info = result.info as ImageResult;
                setPublicId((prev) => [...prev, info.public_id]);
              }}
            >
              {({ open }) => (
                <button
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                >
                  Upload an Image
                </button>
              )}
            </CldUploadWidget>
          </div>
         
          <button
            type="submit"
            onClick={handleRedirect}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post
          </button>
        
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;