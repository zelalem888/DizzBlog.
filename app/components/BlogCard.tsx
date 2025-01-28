interface Post {
	id: number,
	userId: number,
	title: string,
	body: string,
}

const BlogCard = async ({ post }) => {
	return (
		<>
		<div className="border border-gray-200 rounded">
    	<div className="bg-yellow-200 p-5 font-bold text-white">
    		<h4 className="text-md text-gray-900 capitalize">
    			{ post.title }
    		</h4>
    	</div>
    	<div className="flex justify-between items-center gap-10 p-5">
    		<p className="text-gray-800 ">
    			{ post.body }
    		</p>
    		<img src={`https://loremflickr.com/200/200?random=${post.id}`}className="w-32 h-32 rounded" alt="Logo"
    		/>
    	</div>
    </div>
    </>
	)
}

export default BlogCard