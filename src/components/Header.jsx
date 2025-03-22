import Image from "next/image";

export default function Header() {
  return (
    <header className="relative">
      <div className="bg-[#F9F9ED] min-h-[6rem] py-4 flex items-center px-4 sm:px-6 md:h-24 md:py-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg?height=150&width=150"
              alt="GPS Logo"
              width={150}
              height={150}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 relative -top-2"
              priority
            />
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <div className="text-[#097C7C] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">HSNDB</div>
            <div className="text-[#097C7C] text-sm sm:text-base md:text-lg lg:text-xl">
              <span className="underline decoration-[#097C7C]">H</span>uman
              <span className="underline decoration-[#097C7C]"> S</span>-Nitrosylation
              <span className="underline decoration-[#097C7C]"> D</span>atabase
            </div>
          </div>
        </div>
        {/* <div className="ml-auto hidden sm:block">
          <Image 
            src="/placeholder.svg?height=100&width=100" 
            alt="Phosphorylation diagram" 
            width={100} 
            height={100} 
            className="w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24"
          />
        </div>
        <div className="absolute top-1 right-2 text-xs sm:text-sm md:top-2 md:right-4 italic">Version 2.0</div> */}
        <div className="absolute bottom-0 right-0 hidden sm:block">
          <div className="flex">
            <div className="bg-[#097C7C] w-6 h-3 sm:w-8 sm:h-3 md:w-10 md:h-4"></div>
            <div className="bg-[#097C7C] w-4 h-3 sm:w-5 sm:h-3 md:w-6 md:h-4 ml-1 sm:ml-2"></div>
          </div>
        </div>
      </div>
      <div className="bg-[#097C7C] h-1 sm:h-2"></div>
    </header>
  );
}