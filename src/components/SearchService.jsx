import { useState, useEffect } from "react"
import { ChevronRight, HelpCircle } from "lucide-react"
import { supabase } from "@/supabaseClient"

export default function SearchService() {
  const [searchField, setSearchField] = useState("Any Field")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [phosphoPeptide, setPhosphoPeptide] = useState("")

  // Live search effect
  useEffect(() => {
    // Only perform search if query is at least 2 characters and field is in the list of supported live search fields
    if (searchQuery.length >= 2 && ["Protein name", "Uniprot ID", "Gene Name", "Cancer type"].includes(searchField)) {
      performLiveSearch()
    } else {
      setSearchResults([])
    }
  }, [searchQuery, searchField])

  const performLiveSearch = async () => {
    setIsLoading(true)
    
    try {
      // Special handling for Cancer type search
      if (searchField === "Cancer type") {
        await performCancerTypeSearch()
        return
      }
      
      let query = supabase
        .from('proteins_final')
        .select('HSNID, "PROTEIN NAME", "UNIPROT ID", "GENE NAME", "TOTAL SITES"')
      
      // Search based on selected field
      if (searchField === "Protein name") {
        query = query.ilike('"PROTEIN NAME"', `%${searchQuery}%`)
        query = query.order('"PROTEIN NAME"', { ascending: true })
      } else if (searchField === "Uniprot ID") {
        query = query.ilike('"UNIPROT ID"', `%${searchQuery}%`)
        query = query.order('"UNIPROT ID"', { ascending: true })
      } else if (searchField === "Gene Name") {
        query = query.ilike('"GENE NAME"', `%${searchQuery}%`)
        query = query.order('"GENE NAME"', { ascending: true })
      } else if (searchField === "No of N sites") {
        query = query.eq('"TOTAL SITES"', searchQuery)
        query = query.order('"PROTEIN NAME"', { ascending: true })
      }
      
      // Limit results for better performance
      query = query.limit(10)
      
      const { data, error } = await query
      
      if (error) {
        console.error('Error performing search:', error)
        setSearchResults([])
      } else {
        setSearchResults(data || [])
      }
    } catch (err) {
      console.error('Unexpected error during search:', err)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Special function to handle Cancer type search across tables
  const performCancerTypeSearch = async () => {
    try {
      // Step 1: Find UniProt IDs and cancer types from cancer_positions for the given cancer search
      const { data: cancerData, error: cancerError } = await supabase
        .from('cancer_positions')
        .select('"UNIPROT ID", "CANCER TYPE"')
        .ilike('"CANCER TYPE"', `%${searchQuery}%`)
        .order('"CANCER TYPE"', { ascending: true })
        .limit(30) // Increased limit to get more cancer types
      
      if (cancerError) {
        console.error('Error querying cancer_positions:', cancerError)
        setSearchResults([])
        return
      }

      if (!cancerData || cancerData.length === 0) {
        setSearchResults([])
        return
      }
      
      // Create a map of UniProt IDs to their associated cancer types
      const uniprotToCancerTypes = {}
      
      cancerData.forEach(item => {
        const uniprotId = item['UNIPROT ID']
        const cancerType = item['CANCER TYPE']
        
        if (!uniprotToCancerTypes[uniprotId]) {
          uniprotToCancerTypes[uniprotId] = new Set()
        }
        
        uniprotToCancerTypes[uniprotId].add(cancerType)
      })
      
      const uniqueUniprotIds = Object.keys(uniprotToCancerTypes)
      
      if (uniqueUniprotIds.length === 0) {
        setSearchResults([])
        return
      }
      
      // Step 2: Get protein information for these UniProt IDs
      const { data: proteinData, error: proteinError } = await supabase
        .from('proteins_final')
        .select('HSNID, "PROTEIN NAME", "UNIPROT ID", "GENE NAME", "TOTAL SITES"')
        .in('"UNIPROT ID"', uniqueUniprotIds)
        .order('"PROTEIN NAME"', { ascending: true })
        .limit(10)
      
      if (proteinError) {
        console.error('Error querying proteins_final:', proteinError)
        setSearchResults([])
        return
      }
      
      // Step 3: Enhance results with cancer type information
      const enhancedResults = proteinData.map(protein => {
        const uniprotId = protein['UNIPROT ID']
        const cancerTypes = Array.from(uniprotToCancerTypes[uniprotId] || [])
        
        return {
          ...protein,
          CANCER_TYPES: cancerTypes
        }
      })
      
      setSearchResults(enhancedResults || [])
      
    } catch (err) {
      console.error('Unexpected error during cancer type search:', err)
      setSearchResults([])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performLiveSearch()
    }
  }

  const handleExampleClick = () => {
    if (searchField === "Protein name") {
      setSearchQuery("Kinase")
    } else if (searchField === "Gene Name") {
      setSearchQuery("BRCA")
    } else if (searchField === "Uniprot ID") {
      setSearchQuery("P04637")
    } else if (searchField === "No of N sites") {
      setSearchQuery("5")
    } else if (searchField === "Cancer type") {
      setSearchQuery("Breast")
    } else {
      setSearchQuery("example")
    }
  }

  const handleClearForm = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  // Handle clicking on a search result
  const handleResultClick = (result) => {
    if (searchField === "Protein name") {
      setSearchQuery(result["PROTEIN NAME"])
    } else if (searchField === "Uniprot ID") {
      setSearchQuery(result["UNIPROT ID"])
    } else if (searchField === "Gene Name") {
      setSearchQuery(result["GENE NAME"])
    } else if (searchField === "Cancer type") {
      // Keep the current search query as is
    }
  }

  // Function to display appropriate secondary info in search results
  const getSecondaryInfo = (result) => {
    switch(searchField) {
      case "Protein name":
        return `UniProt: ${result["UNIPROT ID"]} | Gene: ${result["GENE NAME"] || "N/A"}`
      case "Uniprot ID":
        return `Protein: ${result["PROTEIN NAME"]} | Gene: ${result["GENE NAME"] || "N/A"}`
      case "Gene Name":
        return `Protein: ${result["PROTEIN NAME"]} | UniProt: ${result["UNIPROT ID"]}`
      case "No of N sites":
        return `Protein: ${result["PROTEIN NAME"]} | Sites: ${result["TOTAL SITES"] || "0"}`
      case "Cancer type":
        return `Protein: ${result["PROTEIN NAME"]} | UniProt: ${result["UNIPROT ID"]}`
      default:
        return `Protein: ${result["PROTEIN NAME"]}`
    }
  }

  // Function to get primary display text for search results
  const getPrimaryDisplayText = (result) => {
    switch(searchField) {
      case "Protein name":
        return result["PROTEIN NAME"]
      case "Uniprot ID":
        return result["UNIPROT ID"]
      case "Gene Name":
        return result["GENE NAME"]
      case "No of N sites":
        return `${result["TOTAL SITES"] || "0"} sites - ${result["PROTEIN NAME"]}`
      case "Cancer type": {
        // Show the first cancer type or "Unknown" if none
        const cancerTypes = result.CANCER_TYPES || []
        return cancerTypes.length > 0 
          ? `${cancerTypes[0]} - ${result["PROTEIN NAME"]}`
          : `Unknown cancer - ${result["PROTEIN NAME"]}`
      }
      default:
        return result["PROTEIN NAME"]
    }
  }

  return (
    <div className="bg-[#F9F9ED] p-3 sm:p-4 md:p-6 w-full text-black">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="text-[#097C7C] text-xl sm:text-2xl">※</span>
        <h1 className="text-[#097C7C] text-2xl sm:text-3xl font-light">Search Service</h1>
      </div>

      <div className="border-b border-gray-300 mb-4 sm:mb-6 md:mb-8 w-full"></div>

      <div className="mb-6 sm:mb-8 md:mb-12 w-full">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <ChevronRight className="text-[#097C7C] w-4 h-4 sm:w-5 sm:h-5" />
          <h2 className="text-[#097C7C] text-xl sm:text-2xl font-light">Keyword based Search</h2>
          <HelpCircle className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
          Please search the <span className="text-[#097C7C] font-medium">HSNDB</span> database with one or multiple
          keywords to find the related information:
        </p>

        <div className="border border-dashed border-blue-300 p-3 sm:p-4 md:p-6 w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 w-full">
              <select 
                className="border border-gray-300 p-2 w-full sm:w-48 text-black bg-white"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              >
                <option>Any Field</option>
                <option>Protein name</option>
                <option>Gene Name</option>
                <option>Uniprot ID</option>
                <option>No of N sites</option>
                <option>Cancer type</option>
              </select>

              <input 
                type="text" 
                className="border border-gray-300 p-2 text-black bg-white flex-1" 
                placeholder="Enter search keywords" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button 
                type="button" 
                className="bg-teal-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-teal-700"
                onClick={handleExampleClick}
              >
                Example
              </button>
              <button 
                type="button" 
                className="bg-teal-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-teal-700"
                onClick={handleClearForm}
              >
                Clear Form
              </button>
              <button 
                type="submit" 
                className="bg-teal-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-teal-700"
              >
                Submit
              </button>
            </div>
          </form>

          {["Protein name", "Uniprot ID", "Gene Name", "No of N sites", "Cancer type"].includes(searchField) && searchResults.length > 0 && (
            <div className="mt-4 border border-gray-200 bg-white rounded shadow-sm">
              <div className="p-2 bg-gray-50 border-b border-gray-200 text-xs sm:text-sm font-medium text-gray-700">
                Search Results {isLoading && "(Loading...)"}
              </div>
              <ul className="max-h-48 sm:max-h-64 overflow-y-auto">
                {searchResults.map((result) => (
                  <li 
                    key={result.HSNID} 
                    className="p-2 sm:p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer text-xs sm:text-sm text-black"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="font-medium">
                      {getPrimaryDisplayText(result)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {getSecondaryInfo(result)}
                    </div>
                    {/* Display all cancer types if in cancer type search */}
                    {searchField === "Cancer type" && result.CANCER_TYPES && result.CANCER_TYPES.length > 0 && (
                      <div className="mt-1 text-xs text-blue-600">
                        {result.CANCER_TYPES.length > 1 
                          ? `Cancer types: ${result.CANCER_TYPES.join(', ')}` 
                          : null}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <ChevronRight className="text-[#097C7C] w-4 h-4 sm:w-5 sm:h-5" />
          <h2 className="text-[#097C7C] text-xl sm:text-2xl font-light">Sequence based Search</h2>
          <HelpCircle className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
          Please input a <span className="text-[#097C7C] font-medium">Phospho-peptide</span> ( with a character{" "}
          <span className="text-[#097C7C] font-medium">'p'</span> in front of{" "}
          <span className="text-[#097C7C] font-medium">p-site</span>) sequence:
        </p>

        <div className="border border-dashed border-blue-300 p-3 sm:p-4 md:p-6 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 w-full">
            <label className="text-gray-600 font-medium w-full sm:w-40 text-sm sm:text-base">Phospho-peptide:</label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full flex-1 text-black bg-white"
              placeholder="Enter phospho-peptide sequence"
              value={phosphoPeptide}
              onChange={(e) => setPhosphoPeptide(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4 sm:ml-40">
            <button 
              className="bg-teal-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-teal-700"
              onClick={() => setPhosphoPeptide("RRLpSISTESK")}
            >
              Example
            </button>
            <button 
              className="bg-teal-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-teal-700"
              onClick={() => setPhosphoPeptide("")}
            >
              Clear Form
            </button>
            <button className="bg-teal-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-teal-700">Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}