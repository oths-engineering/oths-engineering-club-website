import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return <Image src="/icons/outline.svg" alt="" width={100} height={100} className={className} />;
}
