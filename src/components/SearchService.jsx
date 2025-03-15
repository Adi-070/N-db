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
    // Only perform search if query is at least 2 characters and field is "Protein name" or "Uniprot ID"
    if (searchQuery.length >= 2 && (searchField === "Protein name" || searchField === "Uniprot ID")) {
      performLiveSearch()
    } else {
      setSearchResults([])
    }
  }, [searchQuery, searchField])

  const performLiveSearch = async () => {
    setIsLoading(true)
    
    try {
      let query = supabase
        .from('proteins')
        .select('HSNID, "PROTEIN NAME", "UNIPROT ID"')
      
      // Search based on selected field
      if (searchField === "Protein name") {
        query = query.ilike('"PROTEIN NAME"', `%${searchQuery}%`)
        query = query.order('"PROTEIN NAME"', { ascending: true })
      } else if (searchField === "Uniprot ID") {
        query = query.ilike('"UNIPROT ID"', `%${searchQuery}%`)
        query = query.order('"UNIPROT ID"', { ascending: true })
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
    }
  }

  return (
    <div className="bg-pink-50 p-6 w-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-rose-400 text-2xl">※</span>
        <h1 className="text-rose-400 text-3xl font-light">Search Service</h1>
      </div>

      <div className="border-b border-gray-300 mb-8 w-full"></div>

      <div className="mb-12 w-full">
        <div className="flex items-center gap-2 mb-4">
          <ChevronRight className="text-rose-400" />
          <h2 className="text-rose-400 text-2xl font-light">Keyword based Search</h2>
          <HelpCircle className="text-amber-400 w-5 h-5" />
        </div>

        <p className="text-gray-600 mb-4">
          Please search the <span className="text-rose-600 font-medium">dbPSP</span> database with one or multiple
          keywords to find the related information:
        </p>

        <div className="border border-dashed border-blue-300 p-6 w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-4 w-full">
              <select 
                className="border border-gray-300 p-2 w-48"
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
                className="border border-gray-300 p-2 flex-1" 
                placeholder="Enter search keywords" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <button 
                type="button" 
                className="bg-teal-600 text-white px-4 py-2 hover:bg-teal-700"
                onClick={handleExampleClick}
              >
                Example
              </button>
              <button 
                type="button" 
                className="bg-teal-600 text-white px-4 py-2 hover:bg-teal-700"
                onClick={handleClearForm}
              >
                Clear Form
              </button>
              <button 
                type="submit" 
                className="bg-teal-600 text-white px-4 py-2 hover:bg-teal-700"
              >
                Submit
              </button>
            </div>
          </form>

          {(searchField === "Protein name" || searchField === "Uniprot ID") && searchResults.length > 0 && (
            <div className="mt-4 border border-gray-200 bg-white rounded shadow-sm">
              <div className="p-2 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
                Search Results {isLoading && "(Loading...)"}
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {searchResults.map((result) => (
                  <li 
                    key={result.HSNID} 
                    className="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="font-medium">
                      {searchField === "Protein name" ? (
                        result["PROTEIN NAME"]
                      ) : (
                        result["UNIPROT ID"]
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {searchField === "Protein name" ? (
                        `UniProt: ${result["UNIPROT ID"]}`
                      ) : (
                        `Protein: ${result["PROTEIN NAME"]}`
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-2 mb-4">
          <ChevronRight className="text-rose-400" />
          <h2 className="text-rose-400 text-2xl font-light">Sequence based Search</h2>
          <HelpCircle className="text-amber-400 w-5 h-5" />
        </div>

        <p className="text-gray-600 mb-4">
          Please input a <span className="text-rose-600 font-medium">Phospho-peptide</span> ( with a character{" "}
          <span className="text-rose-600 font-medium">'p'</span> in front of{" "}
          <span className="text-rose-600 font-medium">p-site</span>) sequence:
        </p>

        <div className="border border-dashed border-blue-300 p-6 w-full">
          <div className="flex items-center gap-4 mb-4 w-full">
            <label className="text-gray-600 font-medium w-40">Phospho-peptide:</label>
            <input
              type="text"
              className="border border-gray-300 p-2 flex-1"
              placeholder="Enter phospho-peptide sequence"
              value={phosphoPeptide}
              onChange={(e) => setPhosphoPeptide(e.target.value)}
            />
          </div>

          <div className="flex gap-4 ml-40">
            <button 
              className="bg-teal-600 text-white px-4 py-2 hover:bg-teal-700"
              onClick={() => setPhosphoPeptide("RRLpSISTESK")}
            >
              Example
            </button>
            <button 
              className="bg-teal-600 text-white px-4 py-2 hover:bg-teal-700"
              onClick={() => setPhosphoPeptide("")}
            >
              Clear Form
            </button>
            <button className="bg-teal-600 text-white px-4 py-2 hover:bg-teal-700">Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}