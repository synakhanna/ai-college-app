import LayoutEffect from "@/components/LayoutEffect";

export default function Table() {
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
            <div className="space-y-5 max-w-3xl mx-auto text-center">
              <h1
                className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl py-6"
                style={{
                  backgroundImage:
                    "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)",
                }}
              >
                Colleges
              </h1>
              <div
                className={
                  "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
                }
              >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1"></div>
                  </div>
                </div>
                <div className="block w-full overflow-x-auto">
                  {/* Colleges table */}
                  <table className="items-center w-full bg-transparent border-collapse table-fixed">
                    <thead>
                      <tr>
                        <th
                          className={
                            "w-1/4 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center text-white"
                          }
                        >
                          Name
                        </th>
                        <th
                          className={
                            "w-1/4 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center text-white"
                          }
                        >
                          Tuition
                        </th>
                        <th
                          className={
                            "w-1/4 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center text-white"
                          }
                        >
                          Location
                        </th>
                        <th
                          className={
                            "w-1/4 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center text-white"
                          }
                        >
                          Saved
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center font-bold text-white">
                          New York University
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          $2,500 USD
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          New York, NY
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center font-bold text-white">
                          Columbia University
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          $1,800 USD
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          Los Angeles, CA
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center font-bold text-white">
                          MIT
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          $3,150 USD
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          Chicago, IL
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center font-bold text-white">
                          Boston University
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          $4,400 USD
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          San Francisco, CA
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center font-bold text-white">
                          UCLA
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          $2,200 USD
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          Austin, TX
                        </td>
                        <td className="w-1/4 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-white">
                          <input type="checkbox" />
                        </td>
                      </tr>
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
