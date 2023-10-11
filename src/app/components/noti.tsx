import Link from "next/link";

export default  function Noti() {
   
    return (
    <main className="flex justify-center items-center h-8 px-10  bg-black w-full text-white">
        <Link className="animate-pulse text-green-400" href={'/'}>All movies only 100$</Link>
    </main>
    )
  }