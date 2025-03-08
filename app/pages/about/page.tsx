"use client";

// import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="flex flex-col lg:flex-col items-center justify-center gap-8 p-8">
      {/* About Text - Always on Top */}
      <div className="text-center max-w-lg order-1">
        <h1 className="text-5xl font-normal text-black">About Us</h1>
        <p className="text-lg text-gray-700 mt-6">
          Welcome to DizzNews, a space where your voice matters! We believe
          everyone has a unique perspective, and our platform is designed to let
          you share your thoughts, ideas, and insights with the world.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Whether you're passionate about news, culture, technology, lifestyle,
          or any other topic, we are thrilled to provide a platform where your
          ideas can shine. Our mission is to create a community-driven space
          where diverse voices come together to inspire, inform, and connect
          people globally.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Here at DizzNews, your stories are powerful. We encourage you to
          express yourself freely, spark meaningful conversations, and make an
          impact. Whether you're an aspiring writer, a seasoned journalist, or
          simply someone with a story to tell, this is your place to be heard.
        </p>
      </div>

      {/* Highlight Box - Always on Bottom */}
      <div className="bg-black text-white p-8 rounded-lg w-96 text-center order-2">
        <h2 className="text-3xl font-semibold text-yellow-400">Our Mission</h2>
        <p className="mt-4 text-sm">
          Empowering voices, inspiring conversations, and connecting the world
          through shared ideas.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
