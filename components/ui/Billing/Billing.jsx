import React from "react";
import LayoutEffect from "@/components/LayoutEffect";
import NavLink from 'next/link'; // Ensure you're using the correct import for NavLink

export default function Table() {
  const account = {
    name: 'Full Name',
    dateJoined: '01/05/2024',
    subscriptionStatus: 'Active'
  };

  const tableHeaders = ["Name", "Date Joined", "Subscription Status"];

  return (
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
              Billing Information
            </h1>
            <NavLink href="/">
              <button
                className="flex items-center justify-center gap-x-1 text-lg ml-5 text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 px-4 py-2 rounded-lg md:inline-flex"
              >
                Visit Stripe to Pay, Edit Payment Method, or Unsubscribe
              </button>
            </NavLink>
            <div
              className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-3xl bg-white"
              }
            >
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse rounded-3xl">
                  <tbody>
                    {tableHeaders.map((header, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td
                          className={`px-6 py-4 align-middle text-sm text-left font-bold text-gray-700 ${index === 0 ? 'rounded-tl-3xl' : ''} ${index === tableHeaders.length - 1 ? 'rounded-bl-3xl' : ''}`}
                          style={{ width: '150px' }}
                        >
                          {header}
                        </td>
                        <td
                          className={`px-6 py-4 align-middle text-sm text-left text-gray-700 ${index === 0 ? 'rounded-tr-3xl' : ''} ${index === tableHeaders.length - 1 ? 'rounded-br-3xl' : ''}`}
                        >
                          {header === "Name"
                            ? account.name
                            : header === "Date Joined"
                            ? account.dateJoined
                            : account.subscriptionStatus}
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
  );
}
