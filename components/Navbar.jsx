import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className="flex justify-between p-5 px-14 w-full bg-indigo-900 items-center rounded-md">

      <div className="flex gap-3 items-center ">
        <Image src={"/logo.svg"} width={35} height={35} alt='logo' className='text-white'/>
        <Link href={'/'} className='text-white font-bold text-lg'>Note Nest</Link>
      </div>
        <Link href={'/addtopic'} className='text-white font-bold text-lg bg-orange-600 rounded-md px-4 py-2'>Add Note</Link>
    </nav>
      
   
  )
}

