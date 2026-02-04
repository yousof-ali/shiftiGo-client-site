import useAuth from "@/hooks/useAuth";
import usePublicApi from "@/hooks/usePublicApi";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React, { useState } from "react";


const TransactionHistory = () => {
  const { user } = useAuth();
  const publicApi = usePublicApi()
  const [selectedParcel, setSelectedParcel] = useState(null);

  const {
    data: transaction,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transaction", user.email],
    queryFn: async () => {
      const res = await publicApi.get(`/transaction?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

      {/* Desktop Table */}
      <div className="w-full overflow-x-auto">
        <table className="border-collapse w-full">
          <thead className="bg-[#edf1ea] text-sm">
            <tr>
              <th className="text-left px-4 py-2">Parcel Id</th>
              <th className="text-left px-4 py-2">Amount</th>
              <th className="text-left px-4 py-2">Payment Method</th>
              <th className="text-left px-4 py-2">Transaction Id</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Currency</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {transaction?.map((parcel) => (
              <tr key={parcel.parcelID} className="border-b">
                <td className="px-4 py-3 text-nowrap">{parcel.parcelID}</td>
                <td className="px-4 py-3 capitalize">{parcel.amount}</td>
                <td className="px-4 py-3">{parcel.paymentMethod}</td>
                <td className="px-4 py-3">{parcel.transactionId}</td>
                <td className="px-4 py-3">{parcel.paidAt}</td>
                <td className="px-4 py-3">{parcel.currency}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      parcel.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedParcel && (
        <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/50">
          {/* Modal Box */}
          <div className="bg-white w-full max-w-md rounded-lg p-6 mx-4 lg:mx-0 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedParcel(null)}
              className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <h3 className="text-lg font-semibold mb-4">Parcel Details</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Receiver Name</span>
                <span>{selectedParcel.receiverName}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Receiver Region</span>
                <span className="capitalize">
                  {selectedParcel.receiverRegion}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Receiver Service Center</span>
                <span>
                  <span className="font-medium">
                    {selectedParcel.receiverServiceCenter}
                  </span>
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Receiver Contact</span>
                <span className="font-medium">
                  {selectedParcel.receiverContact}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Delivery Instruction</span>
                <span className="font-medium">
                  {selectedParcel.deliveryInstruction}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Amount</span>
                <span>{selectedParcel.deliveryAmount}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Payment</span>
                <span
                  className={`text-xs px-2 py-1 rounded
            ${
              selectedParcel.paymentStatus === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
                >
                  {selectedParcel.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Delivery</span>
                <span className="capitalize">
                  {selectedParcel.deliveryStatus}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedParcel(null)}
              className="mt-6 w-full py-2 cursor-pointer rounded-md bg-[#5EBB2B] text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
