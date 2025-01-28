'use client'

const AddBlogButton = () => {
	return (
		<div>
			<button className="float-right bg-yellow-700 px-9 py-5 rounded text-white" onClick={() => alert("clicked")}>
				Create New Blog
			</button>
		</div>
	)
}

export default AddBlogButton