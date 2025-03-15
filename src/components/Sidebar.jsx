// components/Sidebar.jsx
import Image from "next/image";
import { Plus } from "lucide-react";

export default function Sidebar() {
  const sidebarItems = ["PTMs Predictor", "Tools", "Databases"];
  
  return (
    <div className="w-64 bg-blue-50 p-2">
      <div className="bg-blue-100 p-2 mb-2">PRODUCTS OF CUCKOO</div>

      {sidebarItems.map((item, index) => (
        <div key={index} className="bg-rose-700 text-white p-2 mb-2 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          {item}
        </div>
      ))}

      <div className="mt-40 text-center">
        <div className="bg-black inline-block px-1">
          <span className="text-white">0 0 1 0 1 3 7</span>
        </div>
        <div className="text-sm mt-2">Last update: Jun 1, 2019</div>

        <div className="mt-4">
          <Image src="/placeholder.svg?height=200&width=200" alt="Protein structure" width={200} height={200} />
        </div>
      </div>
    </div>
  );
}
