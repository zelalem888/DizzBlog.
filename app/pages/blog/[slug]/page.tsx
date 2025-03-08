"use client";
import * as React from "react";
// import AsideBar from "../../../components/AsideBar";
import { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
// import MainContent from "../../../components/mainContent";
import Sidebar from "../../../components/AsideBar";
import { useParams } from "next/navigation";


interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  publicId: string;
  authorName: string;
}
export const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};

const  SinglePost = () => {
  const params = useParams()
  const [blogPost, setBlogPost] = useState<Post | null>(null); // Single post, not an array
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  // Decode the slug to handle special characters
  const decodedSlug = (decodeURIComponent(params.slug as string));

  // Separate ID and title (assuming they are joined with a "-")
  const [id, ...titleParts] = decodedSlug.split("-");
  // const title = titleParts.join("-"); // Reconstruct title (not being used yet)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");

        const data = await response.json();
        setBlogPost(data); // Set the fetched post data
      } catch (error) {
        setError("Failed to load the post");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]); // Fetch when ID changes

  // Loading and error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!blogPost) {
    return <div>Post not found.</div>;
  }
  

  return (
    <>
      <div className="min-h-screen bg-[#ecf2fa] font-['Basis_Grotesque_Pro'] flex flex-col">
        {/* Main Content and Sidebar */}
        <div className="flex flex-col lg:flex-row flex-1 gap-8 px-4 lg:px-0">
          {" "}
          {/* Responsive flex direction */}
          <div className="w-full lg:w-[60%] bg-white mt-8 lg:mt-8 ml-0 lg:ml-[10%] p-8">
            {" "}
            {/* Responsive width and margin */}
            <div className="flex flex-col gap-6">
              {/* Article Title */}
              <div className="text-[#02234d] text-3xl font-bold leading-[39px]">
                {blogPost.title}
              </div>
              {/* Article Metadata */}
              <div className="text-[#4f729f] text-sm">
               {formatDate(blogPost.createdAt)}
              </div>
              <div className="text-[#02234d] text-base font-medium">
               author- <span className="text-base font-bold text-blue-600 dark:text-blue-400 italic font-[Ubuntu]">{blogPost.authorName}</span> 
              </div>
              {/* Article Image */}

              {blogPost.publicId &&
              Array.isArray(blogPost.publicId) &&
              blogPost.publicId.length > 0 ? (
                <div className="w-full h-[446px]">
                  <CldImage
                    className="w-full h-full object-cover"
                    src={blogPost.publicId[0]}
                    alt="Blog Image"
                    width={670}
                    height={446}
                    crop="fill"
                    gravity="auto"
                  />
                </div>
              ) : (
                <p>No images available</p>
              )}
              {/* Article Content */}
              <div className="text-[#02234d] text-base leading-tight"></div>
              {blogPost.description}
            </div>
          </div>
          <div className="w-full lg:w-[25%] bg-white lg:mt-8 p-8 pt-8 "><Sidebar /></div>
          
        </div>
      </div>
    </>
  );
};

export default SinglePost;
