import Container from "@/components/shared/Container";
import React, { useState } from "react";

const SendParcel = () => {
   const [parcelType, setParcelType] = useState("document")
  return (
    <Container className={"py-12"}>
      <h2 className="text-2xl mb-8 md:text-4xl font-semibold">Add Parcel</h2>
      <form action="">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">
          Enter your parcel details
        </h1>

        {/* Radio Buttons */}
        <div className="mb-8 flex gap-6">
          <label className="flex cursor-pointer items-center gap-2">
            <div className="relative">
              <input
                type="radio"
                name="parcel-type"
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#65a30d] checked:border-[6px]"
                checked={parcelType === "document"}
                onChange={() => setParcelType("document")}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">Document</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <div className="relative">
              <input
                type="radio"
                name="parcel-type"
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#65a30d] checked:border-[6px]"
                checked={parcelType === "not-document"}
                onChange={() => setParcelType("not-document")}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Not-Document
            </span>
          </label>
        </div>

        {/* Parcel Name and Weight */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Parcel Name
            </label>
            <input
              type="text"
              placeholder="Parcel Name"
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Parcel Weight (KG)
            </label>
            <input
              type="text"
              placeholder="Parcel Weight (KG)"
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Sender and Receiver Details Grid */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Sender Details */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Sender Details
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Sender Name
                </label>
                <input
                  type="text"
                  placeholder="Sender Name"
                  className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Sender Pickup Wire house
                </label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 pr-10 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300">
                    <option>Select Wire house</option>
                    <option>Warehouse 1</option>
                    <option>Warehouse 2</option>
                    <option>Warehouse 3</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Sender Contact No
                </label>
                <input
                  type="text"
                  placeholder="Sender Contact No"
                  className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Your Region
              </label>
              <div className="relative">
                <select className="w-full appearance-none rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 pr-10 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300">
                  <option>Select your region</option>
                  <option>Region 1</option>
                  <option>Region 2</option>
                  <option>Region 3</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Pickup Instruction
              </label>
              <textarea
                placeholder="Pickup Instruction"
                rows={4}
                className="w-full resize-none rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Receiver Details */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Receiver Details
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Receiver Name
                </label>
                <input
                  type="text"
                  placeholder="Sender Name"
                  className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Receiver Delivery Wire house
                </label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 pr-10 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300">
                    <option>Select Wire house</option>
                    <option>Warehouse 1</option>
                    <option>Warehouse 2</option>
                    <option>Warehouse 3</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Receiver Address
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Receiver Contact No
                </label>
                <input
                  type="text"
                  placeholder="Sender Contact No"
                  className="w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Receiver Region
              </label>
              <div className="relative">
                <select className="w-full appearance-none rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 pr-10 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300">
                  <option>Select your region</option>
                  <option>Region 1</option>
                  <option>Region 2</option>
                  <option>Region 3</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Delivery Instruction
              </label>
              <textarea
                placeholder="Delivery Instruction"
                rows={4}
                className="w-full resize-none rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Pickup Time Note */}
        <p className="mb-6 text-sm text-gray-600">
          * PickUp Time 4pm-7pm Approx.
        </p>

        {/* Submit Button */}
        <button className="rounded-md bg-[#84cc16] px-8 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-[#65a30d]">
          Proceed to Confirm Booking
        </button>
      </form>
    </Container>
  );
};

export default SendParcel;
