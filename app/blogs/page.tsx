import Link from 'next/link'
import BlogCard from '../components/BlogCard'
import AsideBar from '../components/AsideBar'
import CreateBlogButton from '../components/CreateBlogButton'

interface Posts {
	id: number,
	userId: number,
	title: string,
	body: string,
}
const BlogsPage = async () => {

	const response = await fetch("https://jsonplaceholder.typicode.com/posts")
	const posts: Posts[] = await response.json()

	return (
			 <>
	      <div className="col-span-2">
	        <div className="px-5 rounded">
						<h1 className="text-4xl font-bold pb-10 text-yellow-900">Recent Posts</h1>
						<div className="grid h-fit gap-5">
							{posts.map(post => (
								<BlogCard post={post} key={post.id}/>
							))}
						</div>
					</div>
	      </div>
	      <div className="grid h-fit gap-5 px-5">
	        <CreateBlogButton />
	        <AsideBar />
	      </div>
    </>
	)
}

export default BlogsPage