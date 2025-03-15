// components/Header.jsx
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative">
      <div className="bg-pink-300 h-24 flex items-center px-4">
        <div className="flex items-center gap-4">
          <Image
            src="/placeholder.svg?height=150&width=150"
            alt="GPS Logo"
            width={150}
            height={150}
            className="relative -top-2"
          />
          <div className="flex flex-col">
            <div className="text-white text-7xl font-bold tracking-wider">HSNDB</div>
            <div className="text-rose-700 text-xl">
              <span className="underline decoration-rose-700">H</span>uman
              <span className="underline decoration-rose-700"> S</span>-Nitrosylation
              <span className="underline decoration-rose-700"> D</span>atabase
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <Image src="/placeholder.svg?height=100&width=100" alt="Phosphorylation diagram" width={100} height={100} />
        </div>
        <div className="absolute top-2 right-4 text-sm italic">Version 2.0</div>
        <div className="absolute bottom-0 right-0">
          <div className="bg-rose-700 w-10 h-4"></div>
          <div className="bg-rose-700 w-6 h-4 ml-2"></div>
        </div>
      </div>
      <div className="bg-rose-700 h-2"></div>
    </header>
  );
}