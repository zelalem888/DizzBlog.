"use client";
import React, { useState, useEffect } from "react";
import AsideBar from "./AsideBar";
import BlogCard from "../components/BlogCard";

interface Post {
  id: number;
  authorId: string;
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
  vlogs: Post[];
  user: User[];
}

const RecentPost = () => {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch blog posts");

        const data: ApiResponse = await response.json();
        console.log("API Response:", data); // Log the response

        // Check if vlogs and user are defined
        if (!data.vlogs || !data.user) {
          throw new Error("Invalid data structure in API response");
        }

        // Set the vlogs and users
        setBlogPosts(data.vlogs);
        setUsers(data.user);
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
    <div className="w-full bg-white p-8">
      {/* Main Content and Sidebar */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Title, Description, and Image (70% width) */}
        <div className="w-full lg:w-[70%]">
          {blogPosts.map((post) => (
            <BlogCard post={post} users={users} key={post.id} />
          ))}
        </div>

        {/* Right Side: Sidebar (30% width) */}
        <div className="w-full lg:w-[30%]">
          <AsideBar />
        </div>
      </div>
    </div>
  );
};

export default RecentPost;