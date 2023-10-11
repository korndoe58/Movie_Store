import Link from "next/link";

export default  function Footer() {
   
    return (
    <main className="flex justify-between items-center h-16 px-10  bg-black/90 w-full text-white">
        <Link href={'/'} className=" uppercase font-extrabold text-2xl">M</Link>
        <span>created by supakorn rattanapet</span>
    </main>
    )
  }