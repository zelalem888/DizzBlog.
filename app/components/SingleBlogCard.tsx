"use client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

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

interface BlogCardProps {
  post: Post;
  users: User[]; // Add users as a prop
}

const SingleBlogCard = ({ post, users }: BlogCardProps) => {
  const truncatedDescription =
    post.description.length > 400
      ? post.description.slice(0, 400) + "..."
      : post.description;

  // Find the author's name based on authorId
  const author = users.find((user) => user.id === post.authorId);
  const authorName = author ? author.name : "Unknown Author";

  return (
    <div className="w-full bg-white px-8 pt-6 ">
      <Link href={`/pages/blog/${post.id}-${post.title.replace(/\s+/g, "-")}`}>
        {/* Title */}
        <h1 className="text-[#02234d] text-3xl font-bold leading-[39px] mb-2">
          {post.title}
          {}
        </h1>
        <div className="text-base font-medium">
          Author -{" "}
          <span className="text-base font-bold text-blue-600 dark:text-black-400 italic font-[Ubuntu]">
            {authorName}
          </span>
        </div>
      </Link>

      {/* Description and Image */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Description */}
        <div className="flex-1">
          <p
            className="text-[#02234d] text-base leading-relaxed rich-text-content"
            dangerouslySetInnerHTML={{ __html: truncatedDescription }}
          ></p>
          {/* Show "Read More" link if description exceeds 200 characters */}
          {post.description.length > 400 && (
            <Link
              href={`/pages/blog/${post.id}-${post.title.replace(/\s+/g, "-")}`}
              className="text-[#f2994a] text-sm font-medium mt-2 inline-block hover:underline"
            >
              Read More
            </Link>
          )}
          
          </div>
        {/* Image */}
        {post.publicId && post.publicId.length > 0 ? (
          <div className="w-full lg:w-[200px] h-[150px]">
            <CldImage
              className="w-full h-full object-cover rounded"
              src={post.publicId[0]}
              alt="Blog Image"
              width={200}
              height={150}
            />
          </div>
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default SingleBlogCard;
