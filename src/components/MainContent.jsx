export default function MainContent() {
  return (
    <div className="flex-1 p-2 sm:p-4">
      <div className="border border-dashed border-gray-300 p-3 sm:p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center text-gray-600 mb-2">
          Welcome to <span className="text-rose-700">HSNDB</span>
        </h1>
        <div className="border-b border-gray-400 mb-4 sm:mb-6"></div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
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
              mainly occurs on serine (<span className="text-rose-700">S</span>), threonine (
              <span className="text-rose-700">T</span>), and tyrosine (<span className="text-rose-700">Y</span>),
              prokaryotic phosphorylation also occurs on several other types of amino acids, including arginine (
              <span className="text-rose-700">R</span>), histidine (<span className="text-rose-700">H</span>),
              cysteine (<span className="text-rose-700">C</span>) and aspartic acid (
              <span className="text-rose-700">D</span>) residues.
            </p>

            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              <span className="text-rose-700">HSNDB</span> 2.0 (human S-nitrosylation database) is an updated resource for annotating protein
              phosphorylation sites (p-sites) in prokaryotes (bacteria and archaea). It contains{" "}
              <span className="text-rose-700">19,296</span> experimentally identified p-sites in{" "}
              <span className="text-rose-700">8,586</span> proteins from <span className="text-rose-700">200</span>{" "}
              prokaryotic organisms. In particular, detailed annotations for all the
            </p>
          </div>

          <div className="w-full lg:w-72">
            <div className="bg-rose-700 text-white p-2 flex items-center mb-3 sm:mb-4">
              <span className="ml-2 text-sm sm:text-base">HSNDB version 2.0 - 06/25/2019</span>
            </div>

            <div className="border-t border-b border-gray-300 py-2 mb-3 sm:mb-4">
              <h3 className="text-gray-600 mb-2 text-sm sm:text-base">▣ Features</h3>
              <ul className="list-none pl-2 sm:pl-4 space-y-1 text-xs sm:text-sm">
                <li className="flex items-start">
                  <span className="text-rose-700 mr-2">■</span>
                  Literature curation
                </li>
                <li className="flex items-start">
                  <span className="text-rose-700 mr-2">■</span>
                  Public phosphorylation resources
                </li>
                <li className="flex items-start">
                  <span className="text-rose-700 mr-2">■</span>
                  User-friendly website interface
                </li>
                <li className="flex items-start">
                  <span className="text-rose-700 mr-2">■</span>
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