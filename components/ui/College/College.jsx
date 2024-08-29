import React, { useState, useEffect, useRef } from "react";
import LayoutEffect from "@/components/LayoutEffect";

export default function Table() {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    nyu: false,
    columbia: false,
    mit: false,
    bu: false,
    ucla: false,
  });
  const [showSaved, setShowSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [isTableOverflow, setIsTableOverflow] = useState(false); // New state to track table overflow
  const tableRef = useRef(null);

  useEffect(() => {
    const checkTableOverflow = () => {
      if (tableRef.current) {
        setIsTableOverflow(tableRef.current.scrollWidth > tableRef.current.clientWidth);
      }
    };

    checkTableOverflow();
    window.addEventListener("resize", checkTableOverflow);

    return () => {
      window.removeEventListener("resize", checkTableOverflow);
    };
  }, []);

  const handleCheckAll = () => {
    const newState = !checkedAll;
    setCheckedAll(newState);
    setCheckedItems({
      nyu: newState,
      columbia: newState,
      mit: newState,
      bu: newState,
      ucla: newState,
    });
  };

  const handleCheckItem = (key) => {
    const newCheckedItems = {
      ...checkedItems,
      [key]: !checkedItems[key],
    };
    setCheckedItems(newCheckedItems);

    const allChecked = Object.values(newCheckedItems).every((value) => value);
    setCheckedAll(allChecked);
  };

  const handleToggleSaved = () => {
    setShowSaved(!showSaved);
  };

  const colleges = [
    { key: 'nyu', name: 'New York University', tuition: '$2,500 USD', location: 'New York, NY' },
    { key: 'columbia', name: 'Columbia University', tuition: '$1,800 USD', location: 'Los Angeles, CA' },
    { key: 'mit', name: 'MIT', tuition: '$3,150 USD', location: 'Chicago, IL' },
    { key: 'bu', name: 'Boston University', tuition: '$4,400 USD', location: 'San Francisco, CA' },
    { key: 'ucla', name: 'UCLA', tuition: '$2,200 USD', location: 'Austin, TX' },
  ];

  const filteredColleges = colleges.filter(college => {
    const matchesSearchQuery =
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.tuition.toLowerCase().includes(searchQuery.toLowerCase());

    if (showSaved) {
      return checkedItems[college.key] && matchesSearchQuery;
    }

    return matchesSearchQuery;
  });

  return (
    <>
      <div className="custom-screen py-20">
        <LayoutEffect
          className="duration-1000 delay-300"
          isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0",
          }}
        >
          <div>
            <div className="space-y-5 max-w-6xl mx-auto text-center">
              <h1
                className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl py-6"
                style={{
                  backgroundImage:
                    "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)",
                }}
              >
                Colleges
              </h1>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location, or tuition"
                className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-center"> {/* Centering the button horizontally */}
                <button
                  onClick={handleToggleSaved}
                  className="flex items-center justify-center gap-x-1 text-lg text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 px-4 py-2 rounded-lg md:inline-flex"
                >
                  {showSaved ? 'See Full List' : 'Go to Saved'}
                </button>
              </div>
              {isTableOverflow && (
                <p className="text-sm text-gray-500 mt-4">
                  Scroll to the right to view the full table.
                </p>
              )}
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-3xl bg-white">
                <div className="block w-full overflow-x-auto" ref={tableRef}> {/* Added ref to the table container */}
                  <table className="min-w-full items-center bg-transparent border-collapse table-fixed rounded-3xl">
                    <thead>
                      <tr className="bg-gray-100">
                        <th
                          className={
                            "w-1/4 px-2 sm:px-6 py-4 align-middle text-xs sm:text-sm uppercase font-semibold text-left text-gray-600 rounded-tl-3xl whitespace-nowrap"
                          }
                        >
                          Name
                        </th>
                        <th
                          className={
                            "w-1/4 px-2 sm:px-6 py-4 align-middle text-xs sm:text-sm uppercase font-semibold text-left text-gray-600 whitespace-nowrap"
                          }
                        >
                          Tuition
                        </th>
                        <th
                          className={
                            "w-1/4 px-2 sm:px-6 py-4 align-middle text-xs sm:text-sm uppercase font-semibold text-left text-gray-600 whitespace-nowrap"
                          }
                        >
                          Location
                        </th>
                        <th
                          className={
                            "w-12 px-2 sm:px-6 py-4 align-middle text-xs sm:text-sm uppercase font-semibold text-left text-gray-600 rounded-tr-3xl"
                          }
                        >
                          <div className="flex items-center w-full text-xs sm:text-sm uppercase font-semibold text-left whitespace-nowrap">
                            <span className="mr-2">Save</span>
                            {!showSaved && (
                              <input
                                type="checkbox"
                                className="h-5 w-5 text-blue-500"
                                checked={checkedAll}
                                onChange={handleCheckAll}
                              />
                            )}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredColleges.map((college, index) => (
                        <tr key={college.key} className="hover:bg-gray-50">
                          <td
                            className={`px-2 sm:px-6 py-4 align-middle text-xs sm:text-sm text-left font-bold text-gray-700 whitespace-nowrap ${
                              index === filteredColleges.length - 1 ? 'rounded-bl-3xl' : ''
                            }`}
                          >
                            {college.name}
                          </td>
                          <td
                            className={`px-2 sm:px-6 py-4 align-middle text-xs sm:text-sm text-left text-gray-700 whitespace-nowrap`}
                          >
                            {college.tuition}
                          </td>
                          <td
                            className={`px-2 sm:px-6 py-4 align-middle text-xs sm:text-sm text-left text-gray-700 whitespace-nowrap`}
                          >
                            {college.location}
                          </td>
                          <td
                            className={`px-2 sm:px-6 py-4 align-middle text-xs sm:text-sm text-left text-gray-700 whitespace-nowrap ${
                              index === filteredColleges.length - 1 ? 'rounded-br-3xl' : ''
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="h-5 w-5 text-blue-500"
                              checked={checkedItems[college.key]}
                              onChange={() => handleCheckItem(college.key)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </LayoutEffect>
      </div>
    </>
  );
}
