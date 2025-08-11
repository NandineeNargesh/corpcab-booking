import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {

   const pathname = usePathname();
  const isDashboard = pathname.startsWith('/company-dashboard');
  return (
    <div className=" flex gap-10 justify-between p-5 px-10 bg-blue-950" >
      <div className="flex gap-10 items-center justify-around ">  
        <div>        <span
          className=" text-white bg-blue-900 rounded-md px-2 py-1 text-xl font-bold font-roboto"

        >
          
          CorpCab
        </span>
       
        </div>

<div className="hidden md:flex gap-10 pl-5 ">
  <ul className="flex space-x-20">
    <li>
      <Link
        href="/"
        className="text-gray-500 font-semibold inline-block transition-transform duration-300  hover:text-white hover:scale-110"
      >
        Home
      </Link>
    </li>
    <li>
      <Link
         href="/history"
        className="text-gray-500 font-semibold inline-block transition-transform duration-300  hover:text-white hover:scale-110"
      >
        History
      </Link>
    </li>
    <li>
      <Link
        href="/help"
        className="text-gray-500 font-semibold  inline-block transition-transform duration-300  hover:text-white hover:scale-110"
      >
        Help
      </Link>
    </li>
  </ul>
</div>
  </div>
   {isDashboard ? (
        <UserButton afterSignOutUrl="/sign-in" />
      ) : (
         <Link
  href="/company-dashboard"
  className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
>
  Company Dashboard
</Link>
      )}

   


      </div>



    
  );
}

export default NavBar;
