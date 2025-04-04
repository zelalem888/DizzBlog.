"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/AsideBar";
import { useParams } from "next/navigation";
import { CldImage } from "next-cloudinary";

interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  publicId: string;
  authorName: string;
}

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const SinglePost = () => {
  const params = useParams();
  const [blogPost, setBlogPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Decode the slug to handle special characters
  const decodedSlug = decodeURIComponent(params.slug as string);
  const [id] = decodedSlug.split("-");

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");

        const data = await response.json();
        setBlogPost(data);
      } catch (error) {
        setError("Failed to load the post");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#ecf2fa]">
        
<div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#ecf2fa]">
        <div className="text-2xl font-bold text-red-600">{error}</div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#ecf2fa]">
        <div className="text-2xl font-bold text-[#02234d]">Post not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ecf2fa] font-['Basis_Grotesque_Pro'] flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1 gap-8 px-4 lg:px-0">
        <div className="w-full lg:w-[60%] bg-white mt-8 lg:mt-8 ml-0 lg:ml-[10%] p-8">
          <div className="flex flex-col">
            {/* Article Title */}
            <h1 className="text-[#02234d] text-3xl font-bold leading-[39px]">
              {blogPost.title}
            </h1>
            {/* Article Metadata */}

            <small className="text-[#4f729f]">
              {formatDate(blogPost.createdAt)}
            </small>
            <div className="text-[#02234d] text-base font-medium">
              author -{" "}
              <span className="text-base text-sx font-bold text-blue-600 dark:text-blue-400 italic font-['Ubuntu']">
                {blogPost.authorName}
              </span>
            </div>

          <div>
            <CldImage className="w-full max-w-lg h-auto md:max-w-md lg:max-w-xl xl:max-w-2xl"
                      src={blogPost.publicId[0]}
                      alt="Blog Image"
                      width={140}
                      height={120}/>
          </div>

            {/* Article Content */}
            <div
              className="not-prose leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blogPost.description }}
            />
          </div>
        </div>
        <div className="w-full lg:w-[25%] bg-white lg:mt-8 p-8 pt-8">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
