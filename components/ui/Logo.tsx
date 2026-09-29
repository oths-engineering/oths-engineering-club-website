import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return <Image src="/logo.svg" alt="" width={72} height={72} className={className} />;
}
