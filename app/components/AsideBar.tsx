import { CldImage } from "next-cloudinary";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Vlog {
  id: number;
  authorId: string;
  autor: string;
  title: string;
  description: string;
  createdAt: string;
  publicId: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface ApiResponse {
  vlogs: Vlog[];
  user: User[]; // Match the API response key ("user")
}

const AsideBar = () => {
  const [blogPosts, setBlogPosts] = useState<Vlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch blog posts");

        const data: ApiResponse = await response.json();

        // Check if vlogs and user are defined
        if (!data.vlogs || !data.user) {
          throw new Error("Invalid data structure in API response");
        }

        // Combine vlogs and user data
        const vlogsWithAuthors = data.vlogs.map((vlog) => {
          const author = data.user.find((user) => user.id === vlog.authorId);
          return {
            ...vlog,
            autor: author ? author.name : "Unknown Author", // Fallback for missing author
          };
        });

        setBlogPosts(vlogsWithAuthors);
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="text-[#02234d] text-3xl font-bold">More News</div>
        <div className="flex flex-col gap-6">
          {blogPosts
            .slice(-3)
            .reverse()
            .map((post) => (
              <>
                <div key={post.id} className="flex gap-3 py-6">
                  <div className="w-[100px] h-[80px]">
                    {post.publicId && post.publicId.length > 0 ? (
                      <div className="lg:w-[100px] h-[80px]">
                        <CldImage
                          className=" max-w-lg h-auto md:max-w-md lg:max-w-xl xl:max-w-2xl"
                          src={post.publicId[0]}
                          alt="Blog Image"
                          width={100}
                          height={80}
                        />
                      </div>
                    ) : (
                      <p>No images available</p>
                    )}
                  </div>
                  <Link
                    href={`/pages/blog/${post.id}-${post.title.replace(
                      /\s+/g,
                      "-"
                    )}`}
                  >
                    <div className="flex flex-col">
                      <div className="text-[#191919] text-[16px] font-medium">
                        {post.title.slice(0, 55)}...
                      </div>

                      <div className="text-[#09081f]/70 text-[13px]">
                        {post.autor} -{" "}
                        <span className="text-[#b4b7c1]">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <hr />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AsideBar;
