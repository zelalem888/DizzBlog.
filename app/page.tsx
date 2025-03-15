import RecentPost from './components/RecentPost'
import Head from 'next/head';

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
