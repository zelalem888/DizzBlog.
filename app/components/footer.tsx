import Link from "next/link";
export default function Footer() {

  const year = new Date().getFullYear()

  return (
    <div className="w-full bg-[#000d1e] mt-auto py-8 px-4 lg:px-[10%]">
      <div className="flex flex-col lg:flex-row justify-around items-center lg:items-start gap-8 lg:gap-0">
        {/* Footer Left */}
        <div className="text-white text-sm text-center lg:text-left">
          Dizz Blog. Group<br /> Logo. {year} All rights reserved
        </div>
        {/* Footer Middle */}
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <div className="text-white text-sm font-medium"><Link href="/pages/about/">About Us</Link></div>
          <div className="text-white text-sm font-medium"> <Link href="/pages/contact/">Contact Us</Link></div>
        </div>
        {/* Footer Right */}
        <div className="text-white text-sm text-center lg:text-left">
          Phone: (+251) 9696969<br />
          Email: dizzblog69@gmail.com
        </div>
      </div>
    </div>
  );
}