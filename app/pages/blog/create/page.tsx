"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "@/app/components/Editor";
import { CldImage,CldUploadWidget } from "next-cloudinary";

interface ImageResult {
  public_id: string;
}

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: "", description: "" }); // Renamed content to description
  const [publicId, setPublicId] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Renamed handleEditorContentChange to handleEditorDescriptionChange for clarity
  const handleEditorDescriptionChange = (description: string) => {
    setFormData((prev) => ({ ...prev, description })); // Sets description from Editor
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(publicId.length === 0 ){
      alert('Uploading One Photo Is required!')
      return
    }

    setIsLoading(true)

    const response = await fetch("/api/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, images :publicId }), 
    });

    if (response.ok) {
      alert("Form submitted successfully!");
      router.push("/pages");
    } else {
      alert("Title and description are required");
      setIsLoading(false)
    }
  };

  return (
    <div className="col-span-3 min-h-screen py-8 -my-28 mt-1 mb-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-500">
        <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
            <input
              type="text"
              name="title"
              placeholder="Title here"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <hr />
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {publicId.map((image, index) => (
                <CldImage key={index} src={image} alt="Uploaded image" width={270} height={154} />
              ))}
            </div>
            <CldUploadWidget
  uploadPreset="sa3nmns4"
  options={{ sources: ["local", "url"], multiple: true, maxFiles: 1 }}
  onSuccess={(result) => {
    const info = result.info as ImageResult;
    setPublicId((prev) => [...prev, info.public_id]);
  }}
>
  {({ open }) => (
    <div className="space-y-2">
      <button
        className="px-4 py-2 text-sm text-white bg-blue-400 hover:bg-blue-500 rounded-md"
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
      >
        Upload Photo
      </button>
      <p className="text-xs text-gray-600">
        (you should insert the one image at least*)
      </p>
    </div>
  )}
</CldUploadWidget>

          </div>
          
          <hr />
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>

          <Editor onContentChange={handleEditorDescriptionChange} /> 
          
          <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center items-center py-2 px-4 rounded-md text-sm font-medium 
                    text-white transition duration-200
                    ${isLoading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {isLoading ? "Loading..." : "Post"}
      </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;