"use client"

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {

  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white shadow-md flex justify-between items-center px-6 md:px-10">
      <Link href="/" className="flex items-center">
        <Image 
          src="/logo.svg" 
          alt="AstraPic Logo" 
          width={120} 
          height={120} 
          className="h-12 w-auto object-contain"
          priority 
        />
      </Link>

      <nav>
        <ul className="flex gap-6">
          <li>
            <Link 
              href="/" 
               className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
            >
              Inicio
            </Link>
          </li>
          { session && 
         <li>
  
         <Link href="/favorites" className="text-gray-700 hover:text-gray-900">
              Favorites
          </Link>
          </li> 
}
        </ul>
      </nav>
    </header>
  );
}
