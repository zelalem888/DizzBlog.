"use client";
// import Link from "next/link";
import BlogCard from "../components/BlogCard";
// import AsideBar from "../components/AsideBar";
// import CreateBlogButton from "../components/CreateBlogButton";
// import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";

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

const BlogsPage = () => {
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
    <>
      <div className="grid h-fit gap-5">
        {blogPosts.map((post) => (
          <BlogCard post={post} users={users} key={post.id} />
        ))}
      </div>
    </>
  );
};

export default BlogsPage;