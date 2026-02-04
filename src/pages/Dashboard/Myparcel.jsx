import useAuth from "@/hooks/useAuth";
import useSecureApi from "@/hooks/useAxiosSecure";
import usePublicApi from "@/hooks/usePublicApi";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Myparcel = () => {
  const { user } = useAuth();
  const publicApi = usePublicApi()
  const secureApi = useSecureApi()
  const [selectedParcel, setSelectedParcel] = useState(null);
  const navigate = useNavigate();

  const {
    data: parcels,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user.email],
    queryFn: async () => {
      const res = await secureApi.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  console.log(parcels)

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(id);
        try {
          const res = await publicApi.delete(`/parcel/${id}`);
          console.log(res);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">My Parcels</h2>

      {/* Desktop Table */}
      <div className="w-full overflow-x-auto">
        <table className="border-collapse w-full">
          <thead className="bg-[#edf1ea] text-sm">
            <tr>
              <th className="text-left px-4 py-2">Parcel ID</th>
              <th className="text-left px-4 py-2">Type</th>
              <th className="text-left px-4 py-2">Created</th>
              <th className="text-left px-4 py-2">Weight</th>
              <th className="text-left px-4 py-2">Amount</th>
              <th className="text-left px-4 py-2">Payment</th>
              <th className="text-left px-4 py-2">Delivery</th>
              <th className="text-center px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {parcels?.map((parcel) => (
              <tr key={parcel.parcelID} className="border-b">
                <td className="px-4 py-3 text-nowrap">{parcel.parcelID}</td>
                <td className="px-4 py-3 capitalize">{parcel.parcelType}</td>
                <td className="px-4 py-3">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {parcel.parcelType === "document"
                    ? "N/A"
                    : parcel.parcelWeight || "-"}
                </td>
                <td className="px-4 py-3">{parcel.deliveryAmount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      parcel.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {parcel.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="capitalize">{parcel.deliveryStatus}</span>
                </td>
                <td className="px-4 py-3  text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setSelectedParcel(parcel)}
                      className="px-3 py-1 text-nowrap cursor-pointer text-sm rounded bg-[#5EBB2B] text-white"
                    >
                      View details
                    </button>
                    <button
                      disabled={parcel.paymentStatus === "paid"}
                      onClick={() => handlePay(parcel._id)}
                      className={`px-3 py-1 text-sm rounded text-white transition
    ${
      parcel.paymentStatus === "paid"
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-sky-400 hover:bg-sky-500 cursor-pointer"
    }
  `}
                    >
                      {parcel.paymentStatus === "paid" ? "Paid" : "Payment"}
                    </button>

                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="px-3 py-1 cursor-pointer text-sm rounded bg-red-400 text-white"
                    >
                      Delete
                    </button>
                  </div>
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

export default Myparcel;
