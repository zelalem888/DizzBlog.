export default function Footer() {
  return (
    <div className="w-full bg-[#000d1e] mt-auto py-8 px-4 lg:px-[10%]">
      <div className="flex flex-col lg:flex-row justify-around items-center lg:items-start gap-8 lg:gap-0">
        {/* Footer Left */}
        <div className="text-white text-sm text-center lg:text-left">
          Logo Financial Group LLC<br />2022 Logo. All rights reserved
        </div>
        {/* Footer Middle */}
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <div className="text-[#f2994a] text-sm font-medium">Privacy Policy</div>
          <div className="text-white text-sm font-medium">Terms of Services</div>
          <div className="text-white text-sm font-medium">Disclaimer</div>
        </div>
        {/* Footer Right */}
        <div className="text-white text-sm text-center lg:text-left">
          2972 Westheimer Rd. Santa Ana, Illinois 85486<br />
          Phone: (406) 555-0120<br />
          Email: logo@gmail.com
        </div>
      </div>
    </div>
  );
}