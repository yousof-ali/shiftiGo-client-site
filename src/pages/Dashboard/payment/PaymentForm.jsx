import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(user);

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${id}`);
      return res.data;
    },
  });

  console.log(parcel);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) {
      toast.error("Missing payment information");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card element not found");
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const res = await axiosSecure.post("/create-payment-intent", {
      amount: parcel.deliveryAmount,
      id,
    });

    const result = await stripe.confirmCardPayment(res.data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const payload = {
          parcelID: parcel._id,
          email: user?.email,
          amount: parcel.deliveryAmount,
          transactionId: result.paymentIntent.id,
        };
        console.log(payload)
        const res = await axiosSecure.post("/payments", payload);
        console.log(res)
        if (res.data.insertedId) {
          console.log(res);
          toast.success(`Payment Succeeded! TxnId: ${result.paymentIntent.id}`);
          navigate("/dashboard/my-parcels")
        }
      }
    }
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  console.log(parcel.deliveryAmount);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 ">
      <div className="w-full max-w-md bg-white rounded-md shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Parcel Payment</h2>
          <p className="text-sm text-indigo-100">ID: {parcel.parcelID}</p>
        </div>

        {/* Parcel Summary */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Receiver</span>
            <span className="font-medium text-gray-800">
              {parcel.receiverName}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Parcel Type</span>
            <span className="font-medium capitalize text-gray-800">
              {parcel.parcelType}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Route</span>
            <span className="font-medium text-gray-800">
              {parcel.senderRegion} → {parcel.receiverRegion}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Payment Status</span>
            <span
              className={`font-semibold ${
                parcel.paymentStatus === "unpaid"
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {parcel.paymentStatus}
            </span>
          </div>

          {/* Amount */}
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-gray-600 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-primary">
              {parcel.deliveryAmount}
            </span>
          </div>

          {/* Stripe Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="border rounded-lg p-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#1f2937",
                      fontFamily: "Inter, system-ui, sans-serif",
                      "::placeholder": {
                        color: "#9ca3af",
                      },
                    },
                    invalid: {
                      color: "#dc2626",
                    },
                  },
                }}
              />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={!stripe}
              className={`w-full py-3 rounded-lg font-medium text-white transition
                ${
                  stripe
                    ? "bg-primary hover:bg-primary/60 active:scale-[0.98]"
                    : "bg-indigo-300 cursor-not-allowed"
                }
              `}
            >
              Pay {parcel.deliveryAmount}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400">
            Secured payment powered by Stripe 🔒
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
