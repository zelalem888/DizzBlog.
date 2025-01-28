import React from 'react'
import Image from "next/image";

const RecentPost = () => {
	return (
		<div className="col-span-3 bg-indigo-50 p-5 border border-gray-100">
			<h4 className="bg-red-400 w-fit py-2 px-5 text-white font-bold rounded-3xl mb-5">Latest Post</h4>
      <div className="py-2">
        <h1 className="text-5xl font-bold py-3">
          Will AI change the course of history?
        </h1>
        <p className="text-gray-700 italic text-sm">
          Monday | January 28/2025
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8 p-5">
        <div className="">
          <Image width={480} height={100} 
            // src="https://loremflickr.com/480/480?random=1" 
            src="https://imgs.search.brave.com/uMVGkCUB55mPrmTXe9sCOaWzIdvGCKf7LpJHzhcnRhU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmQuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzA4L0dl/dHR5SW1hZ2VzLTEy/OTc3MzYyMzktZTE2/NjE4NzEzNzkzNzMu/anBnP2ZpdD02ODAs/NDU0" 
            unoptimized className="w-100 h-300 rounded bg-gray-200" alt="Logo"
          />
      </div>
        <div className="col-span-2 grid gap-2 h-fit text-gray-700">
          <p>
            quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto
            When loading images from an external URL, ensure that the image URL is correct and accessible. Also, verify that your configuration in next.config.js is correctly set up and included in your deployment environment, especially if you are using Docker or another containerization tool.

          If you encounter issues with loading images in production, double-check that the next.config.js file is being properly copied and included in your build process.
          </p>
          <p>
            quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto
            When loading images from an external URL, ensure that the image URL is correct and accessible. Also, verify that your configuration in next.config.js is correctly set up and included in your deployment environment, especially if you are using Docker or another containerization tool. If you encounter issues with loading images in production, double-check that the next.config.js file is being properly copied and included in your build process.
          </p>
        </div>
        <div className="col-span-3 py-5 text-center">
          <button className="bg-indigo-300 px-16 py-5 rounded hover:bg-indigo-700 hover:text-white transition-colors ">Browse More Posts</button>
        </div>
      </div>
    </div>
	)
}

export default RecentPost