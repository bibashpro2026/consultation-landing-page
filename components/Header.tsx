import Image from "next/image";

export default function Header() {
  return (
    <header className="page-shell flex items-center justify-center py-5 sm:py-7">
      <Image
        src="/logo.png"
        alt="Digital Bibash"
        width={720}
        height={136}
        priority
        className="h-auto w-[180px] object-contain sm:w-[210px] lg:w-[240px]"
      />
    </header>
  );
}
