import React, { useState } from "react";
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
              <button
                onClick={handleToggleSaved}
                className="flex items-center justify-center gap-x-1 text-lg ml-5 text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 px-4 py-2 rounded-lg md:inline-flex"
              >
                {showSaved ? 'See Full List' : 'Go to Saved'}
              </button>
              <div
                className={
                  "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-3xl bg-white"
                }
              >
                <div className="block w-full overflow-x-auto ">
                  <table className="items-center w-full bg-transparent border-collapse table-fixed rounded-3xl">
                    <thead>
                      <tr className="bg-gray-100">
                        <th
                          className={
                            "w-1/4 px-6 py-4 align-middle text-sm uppercase font-semibold text-left text-gray-600 rounded-tl-3xl"
                          }
                        >
                          Name
                        </th>
                        <th
                          className={
                            "w-1/4 px-6 py-4 align-middle text-sm uppercase font-semibold text-left text-gray-600"
                          }
                        >
                          Tuition
                        </th>
                        <th
                          className={
                            "w-1/4 px-6 py-4 align-middle text-sm uppercase font-semibold text-left text-gray-600"
                          }
                        >
                          Location
                        </th>
                        <th
                          className={
                            "w-12 px-2 py-4 align-middle text-sm uppercase font-semibold text-left text-gray-600 rounded-tr-3xl"
                          }
                        >
                          <div className="flex items-center w-full text-sm uppercase font-semibold text-left">
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
                      {filteredColleges.map((college) => (
                        <tr key={college.key} className="hover:bg-gray-50">
                          <td className="px-6 py-4 align-middle text-sm text-left font-bold text-gray-700">
                            {college.name}
                          </td>
                          <td className="px-6 py-4 align-middle text-sm text-left text-gray-700">
                            {college.tuition}
                          </td>
                          <td className="px-6 py-4 align-middle text-sm text-left text-gray-700">
                            {college.location}
                          </td>
                          <td className="px-2 py-4 align-middle text-sm text-left text-gray-700">
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
