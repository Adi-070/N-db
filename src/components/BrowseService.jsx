import { HelpCircle } from "lucide-react"

export default function BrowseService() {
  return (
    <div className="bg-pink-50 p-6">
      {/* Browse Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-rose-400 text-2xl">※</span>
        <h1 className="text-rose-400 text-3xl font-light">Browse</h1>
        <HelpCircle className="text-amber-400 w-5 h-5" />
      </div>

      <div className="border-b border-gray-300 mb-8"></div>

      {/* Description */}
      <p className="text-gray-600 mb-12 leading-relaxed">
        <span className="text-rose-600 font-medium">HSNDB</span> contains{" "}
        <span className="text-rose-600 font-medium">19,296</span> experimentally identified p-sites in{" "}
        <span className="text-rose-600 font-medium">8,586</span> proteins from{" "}
        <span className="text-rose-600 font-medium">200</span> prokaryotic organisms. Users can browse the database by
        phyla or by residue types.
      </p>

      {/* Browse Options */}
      <div className="flex justify-center gap-24">
        {/* Browse by phyla */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-gray-600">
            {/* Tree-like icon */}
            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 3v18M12 7h6m-6 4h6m-6 4h6M6 7h6m-6 4h6m-6 4h6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <h2 className="text-gray-600 text-xl font-medium group-hover:text-rose-600 transition-colors">
            Browse by cancer causing
          </h2>
        </div>

        {/* Browse by residue types */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-gray-600">
            {/* Chemical structure icon */}
            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6v12M8 12h8" stroke="currentColor" strokeWidth="2" fill="none" />
              <text x="16" y="10" className="text-xs" fill="currentColor">
                2-
              </text>
              <text x="16" y="8" className="text-xs" fill="currentColor">
                3
              </text>
              <text x="7" y="12" className="text-xs font-medium" fill="currentColor">
                R
              </text>
              <text x="14" y="12" className="text-xs" fill="currentColor">
                PO
              </text>
            </svg>
          </div>
          <h2 className="text-gray-600 text-xl font-medium group-hover:text-rose-600 transition-colors">
            Browse by non-cancer causing
          </h2>
        </div>
      </div>

      <div className="border-b border-gray-300 mt-8"></div>
    </div>
  )
}

