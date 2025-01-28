import Link from 'next/link'

const Navbar = () => {
	return (
		<nav className="p-7 flex justify-between bg-indigo-700 bg-indigo-800 text-white drop-shadow-xl fixed w-full">
        <h1 className="text-2xl font-bold text-white">
          Knock Knock
        </h1>
        <div className="flex gap-5">
		      <Link href="/"> Goto Homes </Link>
		      <Link href="/blogs"> Goto Blogs </Link>
        </div>
      </nav>
	)
}

export default Navbar