import Link from 'next/link';

export default function Navbar() {
  const navItems = ["HOME", "BROWSE", "SEARCH", "DOWNLOAD", "USER GUIDE", "LINKS", "STATISTICS", "CONTACT"];
  
  return (
    <div className="flex h-8 border-b border-gray-300">
      {navItems.map((item, index) => {
        const path = item === "HOME" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
        return (
          <Link href={path} key={index}>
            <div
              className={`px-6 flex items-center justify-center cursor-pointer hover:bg-rose-100 ${
                index === 0 ? "bg-rose-400 text-white" : ""
              }`}
            >
              {item}
            </div>
          </Link>
        );
      })}
    </div>
  );
}