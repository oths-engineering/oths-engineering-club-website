import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <>
      <Image src="/icons/hack-club.svg" alt="" width={100} height={100} className={className} />
      <Image src="/icons/outline.svg" alt="" width={100} height={100} className={className} />
    </>
  )
}


