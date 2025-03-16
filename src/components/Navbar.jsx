import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["HOME", "BROWSE", "SEARCH", "DOWNLOAD", "USER GUIDE", "LINKS", "STATISTICS", "CONTACT"];

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex h-12 border-b border-gray-300">
        {navItems.map((item, index) => {
          const path = `/${item.toLowerCase().replace(/ /g, "-")}`;
          return (
            <Link 
              href={path} 
              key={index} 
              className="w-full h-full"
            >
              <div
                className={`w-full h-full px-2 lg:px-4 xl:px-6 text-xs lg:text-sm flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-rose-100 ${
                  index === 0 ? "bg-rose-400 text-white hover:bg-rose-500" : ""
                }`}
              >
                {item}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden border-b border-gray-300">
        <div className="flex justify-between items-center h-12">
          <Link href="/" className="h-full w-24">
            <div className="px-4 bg-rose-400 text-white h-full flex items-center justify-center transition-colors duration-200 hover:bg-rose-500">
              HOME
            </div>
          </Link>
          <button 
            className="px-4 h-full flex items-center transition-colors duration-200 hover:bg-gray-100" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="bg-white shadow-md absolute w-full z-10">
            {navItems.slice(1).map((item, index) => {
              const path = `/${item.toLowerCase().replace(/ /g, "-")}`;
              return (
                <Link 
                  href={path} 
                  key={index} 
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div 
                    className="w-full px-4 py-3 border-b border-gray-100 transition-colors duration-200 hover:bg-rose-100 text-sm flex items-center"
                  >
                    {item}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}