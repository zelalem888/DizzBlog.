// import CreateBlogButton from './components/CreateBlogButton'
// import BlogCard from './components/BlogCard'
// import AsideBar from './components/AsideBar'
import RecentPost from './components/RecentPost'
import Head from 'next/head';
// import Footer from './components/footer';
// import Navigation from './components/Navbar';
// import { auth } from './auth';
 

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ecf2fa] font-['Basis_Grotesque_Pro'] flex flex-col">
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page with featured blog content" />
      </Head>

      {/* Home Page Content */}
      <RecentPost />

    
    </div>
  );
}
