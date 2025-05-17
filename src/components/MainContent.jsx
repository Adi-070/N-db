import { useState, useEffect } from "react"
import { supabase } from "@/supabaseClient"
import { Search } from "lucide-react"

export default function MainContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Live search effect
  useEffect(() => {
    if (searchQuery.length >= 2) {
      performSearch()
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchQuery])

  const performSearch = async () => {
    setIsLoading(true)
    
    try {
      // Search for both protein name and uniprot ID
      const { data, error } = await supabase
        .from('proteins_final')
        .select('HSNID, "PROTEIN NAME", "UNIPROT ID", "GENE NAME", "TOTAL SITES"')
        .or(`"PROTEIN NAME".ilike.%${searchQuery}%,"UNIPROT ID".ilike.%${searchQuery}%`)
        .order('"PROTEIN NAME"', { ascending: true })
        .limit(10)
      
      if (error) {
        console.error('Error performing search:', error)
        setSearchResults([])
      } else {
        setSearchResults(data || [])
        setShowResults(true)
      }
    } catch (err) {
      console.error('Unexpected error during search:', err)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch()
    }
  }

  const handleResultClick = (result) => {
    setSearchQuery(result["PROTEIN NAME"])
    setShowResults(false)
    // Here you would typically navigate to the protein detail page
    // For example: router.push(`/protein/${result.HSNID}`)
  }

  return (
    <div className="flex-1 p-2 sm:p-4">
      <div className="border border-dashed border-gray-300 p-3 sm:p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center text-gray-600 mb-2 md:mr-80">
          Welcome to <span className="text-[#097C7C]">HSNDB</span>
        </h1>
        <div className="border-b border-gray-400 mb-4 sm:mb-6"></div>
        <div className="w-full bg-[#097C7C] flex flex-col items-center py-8 px-4">
      <h1 className="text-white text-2xl md:text-3xl font-medium mb-6 text-center">
        Perform a quick search to query the database
      </h1>

      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="relative flex gap-2">
          <input
            type="text"
            className="flex-1 border-0 rounded-md px-4 py-3 text-gray-800 bg-white placeholder-gray-400 shadow-sm focus:outline-none"
            placeholder="Search by protein name or UniProt ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white text-[#5a7d5a] px-5 py-3 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Search
          </button>
        </form>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-10 mt-2 w-full max-w-3xl border border-gray-200 bg-white rounded-md shadow-lg overflow-hidden">
            <div className="p-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700 flex justify-between items-center">
              <span>Search Results</span>
              {isLoading && (
                <span className="text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded-full">Loading...</span>
              )}
            </div>
            <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
              {searchResults.map((result) => (
                <li
                  key={result.HSNID}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="p-4">
                    <div className="font-medium text-gray-900">{result["PROTEIN NAME"]}</div>
                    <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-x-4">
                      <span className="inline-flex items-center">
                        <span className="font-medium text-[#5a7d5a] mr-1">UniProt:</span>
                        {result["UNIPROT ID"]}
                      </span>
                      <span className="inline-flex items-center">
                        <span className="font-medium text-[#5a7d5a] mr-1">Gene:</span>
                        {result["GENE NAME"] || "N/A"}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
        <div className="flex flex-col lg:flex-row gap-4 mt-2 sm:gap-6">
          <div className="flex-1">
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              As one of the most ubiquitous and important protein post-translational modifications (PTMs) with
              tremendous studies, phosphorylation regulates a wide variety of biological processes, such as cell
              cycle and signal transduction (<span className="text-teal-600">Cohen, 1982</span>;
              <span className="text-teal-600">Ptacek and Snyder, 2006</span>;
              <span className="text-teal-600">Jin, et al., 2012</span>).
            </p>

            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Although eukaryotic protein phosphorylation has been extensively studied, only limited information is
              available for protein phosphorylation in prokaryotes. In contrast with eukaryotic phosphorylation that
              mainly occurs on serine (<span className="text-[#097C7C]">S</span>), threonine (
              <span className="text-[#097C7C]">T</span>), and tyrosine (<span className="text-[#097C7C]">Y</span>),
              prokaryotic phosphorylation also occurs on several other types of amino acids, including arginine (
              <span className="text-[#097C7C]">R</span>), histidine (<span className="text-[#097C7C]">H</span>),
              cysteine (<span className="text-[#097C7C]">C</span>) and aspartic acid (
              <span className="text-[#097C7C]">D</span>) residues.
            </p>

            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              <span className="text-[#097C7C]">HSNDB</span> 2.0 (human S-nitrosylation database) is an updated resource for annotating protein
              phosphorylation sites (p-sites) in prokaryotes (bacteria and archaea). It contains{" "}
              <span className="text-[#097C7C]">19,296</span> experimentally identified p-sites in{" "}
              <span className="text-[#097C7C]">8,586</span> proteins from <span className="text-[#097C7C]">200</span>{" "}
              prokaryotic organisms. In particular, detailed annotations for all the
            </p>
          </div>

          <div className="w-full lg:w-72">
            <div className="bg-[#097C7C] text-white text-center p-2 flex items-center mb-3 sm:mb-4">
              <span className="ml-2 text-sm sm:text-base">HSNDB</span>
            </div>

            <div className="border-t border-b border-gray-300 py-2 mb-3 sm:mb-4">
              <h3 className="text-gray-600 mb-2 text-sm sm:text-base">▣ Features</h3>
              <ul className="list-none pl-2 sm:pl-4 space-y-1 text-xs sm:text-sm">
                <li className="flex items-start">
                  <span className="text-[#097C7C] mr-2">■</span>
                  Literature curation
                </li>
                <li className="flex items-start">
                  <span className="text-[#097C7C] mr-2">■</span>
                  Public phosphorylation resources
                </li>
                <li className="flex items-start">
                  <span className="text-[#097C7C] mr-2">■</span>
                  User-friendly website interface
                </li>
                <li className="flex items-start">
                  <span className="text-[#097C7C] mr-2">■</span>
                  Additional annotation resources
                </li>

                <ul className="list-none pl-4 sm:pl-6 space-y-1 mt-1 text-xs sm:text-sm">
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">○</span>
                    Total (88)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">○</span>
                    Taxonomy annotation (7)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">○</span>
                    Genome annotation (10)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">○</span>
                    Function annotation (17)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">○</span>
                    Transcriptional regulation (8)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">○</span>
                    Sequence and structure information (5)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">○</span>
                    Family and domain annotation (13)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">○</span>
                    Interaction (14)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">○</span>
                    Orthologous information (10)
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <h3 className="text-gray-600 mb-2 text-sm sm:text-base">Example:</h3>
        </div>
      </div>
    </div>
  );
}