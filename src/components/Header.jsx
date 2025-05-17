"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Plus, ChevronDown } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const sidebarItems = ["PTMs Predictor", "Tools", "Databases"]

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  return (
    <header className="relative">
      <div className="bg-[#F9F9ED] min-h-[6rem] py-4 px-4 sm:px-6 md:py-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
          
          {/* Logo + Title */}
          <div className="flex items-center w-full gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="GPS Logo"
                width={150}
                height={150}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 relative -top-2"
                priority
              />
            </div>

            {/* Title */}
            <div className="flex flex-col items-center justify-center text-center w-full">
              <div className="text-[#097C7C] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
                HSNDB
              </div>
              <div className="text-[#097C7C] text-sm sm:text-base md:text-lg lg:text-xl">
                <span className="underline decoration-[#097C7C]">H</span>uman
                <span className="underline decoration-[#097C7C]"> S</span>-Nitrosylation
                <span className="underline decoration-[#097C7C]"> D</span>atabase
              </div>
            </div>
          </div>

          {/* Teal "More" Button */}
          <div className="relative flex-shrink-0" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-[#097C7C] text-[#F9F9ED] px-4 py-2 rounded flex items-center gap-1 hover:bg-[#076A6A] transition-colors"
              aria-label="Menu"
            >
              <div className="cursor-pointer text-base uppercase font-medium">More</div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#097C7C] z-50 animate-fadeIn">
                <div className="py-1">
                  {sidebarItems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-3 text-[#F9F9ED] hover:bg-[#076A6A] transition-colors"
                    >
                      <div className="flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        {item}
                      </div>
                    </a>
                  ))}
                  <div className="border-t border-[#076A6A] mt-1 pt-1">
                    <div className="px-4 py-2 text-xs text-[#F9F9ED]/80">
                      <div>Last update: Jun 1, 2019</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Decorative corner blocks */}
        <div className="absolute bottom-0 right-0 hidden sm:block">
          <div className="flex">
            <div className="bg-[#097C7C] w-6 h-3 sm:w-8 sm:h-3 md:w-10 md:h-4"></div>
            <div className="bg-[#097C7C] w-4 h-3 sm:w-5 sm:h-3 md:w-6 md:h-4 ml-1 sm:ml-2"></div>
          </div>
        </div>
      </div>

      <div className="bg-[#097C7C] h-1 sm:h-2"></div>
    </header>
  )
}
