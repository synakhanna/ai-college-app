import LayoutEffect from "@/components/LayoutEffect";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // Import heart icons

export default function Table() {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [showSaved, setShowSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState([]);
  const { user, isLoaded, isSignedIn } = useUser();
  // Helper function to create a unique key for each college based on name, city, and state
  const generateUniqueKey = (college) =>
    `${college["school.name"]}_${college["school.city"]}_${college["school.state"]}`;

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const fetchCollegeList = async () => {
        try {
          const response = await axios.get("/api/fetch_colleges");
          if (response.status === 200) {
            const data = response.data;

            console.log("Number of colleges fetched:", data.length);

            data.forEach((college, index) => {
              const uniqueKey = generateUniqueKey(college);
              // console.log(`College ${index + 1}:`, college);
              // console.log(college["school.name"]);

              setCheckedItems((prevCheckedItems) => ({
                ...prevCheckedItems,
                [uniqueKey]: college['isFavorite'],
              }));

            });

            setColleges(data);
          }
        } catch (error) {
          console.error("Error fetching college list:", error);
        }
      };

      fetchCollegeList();
    }
  }, [isLoaded, isSignedIn]);

  const handleToggleSaved = () => {
    setShowSaved(!showSaved);
  };

  const toggleHeart = (college) => {
    const uniqueKey = generateUniqueKey(college);

    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [uniqueKey]: !prevCheckedItems[uniqueKey],
    }));

    setFavoriteDB(college, !checkedItems[uniqueKey]); // Pass new status directly
  };

  const setFavoriteDB = async (college, isFavorite) => {
    const uniqueKey = generateUniqueKey(college);

    try {
      const response =await axios.post("/api/toggle_favorite", {
        collegeKey: uniqueKey,
        isFavorite: isFavorite,
      });
      console.log(`Favorite status updated for ${uniqueKey}`);
      if (response.status === 200) {
        const data = response.data;

        console.log("Number of colleges fetched in setFavoriteDb:", data.length);

        data.forEach((college, index) => {
          const uniqueKey = generateUniqueKey(college);
          console.log(`College ${index + 1}:`, college);
          console.log(college["school.name"]);

          setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [uniqueKey]: college['isFavorite'],
          }));

          console.log(
            `The checked item in fetch for ${uniqueKey}: ${checkedItems[uniqueKey]}`
          );
        });

        setColleges(data);
      }
    } catch (error) {
      console.error(`Failed to update favorite status for ${uniqueKey}:`, error);
    }
  };

  const filteredColleges = colleges.filter((college) => {
    const matchesSearchQuery =
      college["school.name"].toLowerCase().includes(searchQuery.toLowerCase()) ||
      college["school.city"].toLowerCase().includes(searchQuery.toLowerCase()) ||
      college["school.state"].toLowerCase().includes(searchQuery.toLowerCase());

    if (showSaved) {
      return college.isFavorite && matchesSearchQuery;
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
                College List
              </h1>

              {/* Search bar and saved button side by side */}
              <div className="flex justify-center space-x-4 items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, location, or tuition"
                  className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleToggleSaved}
                  className="flex items-center justify-center gap-x-1 text-lg text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 px-4 py-2 rounded-lg md:inline-flex"
                >
                  {showSaved ? "See Full List" : "Go to Favorites"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                {filteredColleges.map((college, index) => {
                  const uniqueKey = generateUniqueKey(college);
                  return (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-lg overflow-hidden relative"
                    >
                      <div className="absolute top-2 right-2">
                        <button onClick={() => toggleHeart(college)}>
                          {checkedItems[uniqueKey] ? (
                            <AiFillHeart className="text-red-500 text-2xl" />
                          ) : (
                            <AiOutlineHeart className="text-gray-500 text-2xl" />
                          )}
                        </button>
                      </div>

                      <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">
                          {college["school.name"]}
                        </h2>
                      </div>

                      <div className="p-4 text-left">
                        <p>
                          <strong>City:</strong> {college["school.city"]}
                        </p>
                        <p>
                          <strong>State:</strong> {college["school.state"]}
                        </p>
                        <p>
                          <strong>Accreditor:</strong>{" "}
                          {college["latest.school.accreditor"]}
                        </p>
                        <p>
                          <strong>Website:</strong>{" "}
                          <a
                            href={`http://${college["school.school_url"]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {college["school.school_url"]}
                          </a>
                        </p>
                        <p>
                          <strong>Acceptance Rate:</strong>{" "}
                          {college["latest.admissions.admission_rate.overall"] ===
                          null
                            ? "Not Available"
                            : `${Math.round(
                                college["latest.admissions.admission_rate.overall"] *
                                  100
                              )}%`}
                        </p>
                        <p>
                          <strong>Main Campus:</strong>{" "}
                          {college["latest.school.main_campus"] === 1
                            ? "YES"
                            : "NO"}
                        </p>
                        <p>
                          <strong>Attendance Cost (Academic Year):</strong> $
                          {college["latest.cost.attendance.academic_year"]}
                        </p>
                        <p>
                          <strong>Price Calculator:</strong>{" "}
                          <a
                            href={`http://${college["latest.school.price_calculator_url"]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {college["latest.school.price_calculator_url"]}
                          </a>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </LayoutEffect>
      </div>
    </>
  );
}
