import Container from "@/components/shared/Container";
import useAuth from "@/hooks/useAuth";
import usePublicApi from "@/hooks/usePublicApi";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SendParcel = () => {
  const [parcelType, setParcelType] = useState("document");
  const [senderServiceCenters, setSenderServiceCenters] = useState([]);
  const [receiverServiceCenters, setReceiverServiceCenters] = useState([]);
  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const userinfo = useAuth();
  const publicApi = usePublicApi()
  const [parcelLoading,setParcelLoading] = useState(false);

  console.log(userinfo);

  const generateTrakingID = () => {
    const data = new Date();
    const datePart = data.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: "document",
      parcelName: "",
      parcelWeight: "",
      senderName: "",
      senderAddress: "",
      senderContact: "",
      senderRegion: "",
      senderServiceCenter: "",
      pickupInstruction: "",
      receiverName: "",
      receiverAddress: "",
      receiverContact: "",
      receiverRegion: "",
      receiverServiceCenter: "",
      deliveryInstruction: "",
    },
  });

  const watchParcelType = watch("parcelType");
  const watchSenderRegion = watch("senderRegion");
  const watchReceiverRegion = watch("receiverRegion");
  const watchWeight = watch("parcelWeight");

  // Regions data
  const regions = [
    { id: "dhaka", name: "Dhaka" },
    { id: "khulna", name: "Khulna" },
    { id: "rangpur", name: "Rangpur" },
    { id: "chittagong", name: "Chittagong" },
    { id: "sylhet", name: "Sylhet" },
    { id: "barisal", name: "Barisal" },
    { id: "mymensingh", name: "Mymensingh" },
    { id: "rajshahi", name: "Rajshahi" },
  ];

  // Service Centers data by region
  const serviceCentersByRegion = {
    dhaka: [
      { id: "dhaka-central", name: "Dhaka Central Service Center" },
      { id: "gazipur", name: "Gazipur Service Center" },
      { id: "narayanganj", name: "Narayanganj Service Center" },
      { id: "narsingdi", name: "Narsingdi Service Center" },
      { id: "tangail", name: "Tangail Service Center" },
      { id: "kishoreganj", name: "Kishoreganj Service Center" },
    ],
    khulna: [
      { id: "khulna-central", name: "Khulna Central Service Center" },
      { id: "bagerhat", name: "Bagerhat Service Center" },
      { id: "satkhira", name: "Satkhira Service Center" },
      { id: "jessore", name: "Jessore Service Center" },
      { id: "jhenaidah", name: "Jhenaidah Service Center" },
    ],
    rangpur: [
      { id: "rangpur-central", name: "Rangpur Central Service Center" },
      { id: "dinajpur", name: "Dinajpur Service Center" },
      { id: "gaibandha", name: "Gaibandha Service Center" },
      { id: "kurigram", name: "Kurigram Service Center" },
      { id: "lalmonirhat", name: "Lalmonirhat Service Center" },
    ],
    chittagong: [
      { id: "chittagong-central", name: "Chittagong Central Service Center" },
      { id: "coxsbazar", name: "Cox's Bazar Service Center" },
      { id: "comilla", name: "Comilla Service Center" },
      { id: "feni", name: "Feni Service Center" },
      { id: "brahmanbaria", name: "Brahmanbaria Service Center" },
    ],
    sylhet: [
      { id: "sylhet-central", name: "Sylhet Central Service Center" },
      { id: "moulvibazar", name: "Moulvibazar Service Center" },
      { id: "habiganj", name: "Habiganj Service Center" },
      { id: "sunamganj", name: "Sunamganj Service Center" },
    ],
    barisal: [
      { id: "barisal-central", name: "Barisal Central Service Center" },
      { id: "bhola", name: "Bhola Service Center" },
      { id: "patuakhali", name: "Patuakhali Service Center" },
      { id: "pirojpur", name: "Pirojpur Service Center" },
    ],
    mymensingh: [
      { id: "mymensingh-central", name: "Mymensingh Central Service Center" },
      { id: "netrokona", name: "Netrokona Service Center" },
      { id: "jamalpur", name: "Jamalpur Service Center" },
      { id: "sherpur", name: "Sherpur Service Center" },
    ],
    rajshahi: [
      { id: "rajshahi-central", name: "Rajshahi Central Service Center" },
      { id: "bogra", name: "Bogra Service Center" },
      { id: "joypurhat", name: "Joypurhat Service Center" },
      { id: "naogaon", name: "Naogaon Service Center" },
      { id: "natore", name: "Natore Service Center" },
    ],
  };

  // Update service centers when region changes
  useEffect(() => {
    if (watchSenderRegion) {
      setSenderServiceCenters(serviceCentersByRegion[watchSenderRegion] || []);
    } else {
      setSenderServiceCenters([]);
    }
  }, [watchSenderRegion]);

  useEffect(() => {
    if (watchReceiverRegion) {
      setReceiverServiceCenters(
        serviceCentersByRegion[watchReceiverRegion] || []
      );
    } else {
      setReceiverServiceCenters([]);
    }
  }, [watchReceiverRegion]);

  useEffect(() => {
    if (!watchSenderRegion || !watchReceiverRegion) {
      setDeliveryAmount(0);
      return;
    }

    const isWithinCity = watchSenderRegion === watchReceiverRegion;
    let amount = 0;

    // DOCUMENT
    if (watchParcelType === "document") {
      amount = isWithinCity ? 60 : 80;
    }

    // NON-DOCUMENT
    if (watchParcelType === "not-document") {
      const weight = parseFloat(watchWeight || 0);

      if (weight <= 0) {
        setDeliveryAmount(0);
        return;
      }

      // Up to 3 KG
      if (weight <= 3) {
        amount = isWithinCity ? 110 : 150;
      }
      // More than 3 KG
      else {
        const extraKg = weight - 3;

        if (isWithinCity) {
          amount = 110 + extraKg * 40;
        } else {
          amount = 150 + extraKg * 40 + 40;
        }
      }
    }

    setDeliveryAmount(amount);
  }, [watchParcelType, watchWeight, watchSenderRegion, watchReceiverRegion]);

  // Handle parcel type change
  const handleParcelTypeChange = (type) => {
    setParcelType(type);
    if (type === "document") {
      resetField("parcelWeight");
    }
  };

  const getPriceBreakdown = () => {
    const isWithinCity = watchSenderRegion === watchReceiverRegion;
    const areaText = isWithinCity ? "Within City" : "Outside City/District";
    const weight = parseFloat(watchWeight || 0);

    // DOCUMENT
    if (watchParcelType === "document") {
      return {
        title: "Document Parcel",
        lines: [
          `Parcel Type: Document`,
          `Delivery Area: ${areaText}`,
          `Charge: ৳${isWithinCity ? 60 : 80}`,
        ],
      };
    }

    // NON-DOCUMENT (≤ 3 KG)
    if (weight <= 3) {
      return {
        title: "Non-Document Parcel",
        lines: [
          `Parcel Type: Non-Document`,
          `Weight: ${weight} KG`,
          `Delivery Area: ${areaText}`,
          `Base Charge (up to 3 KG): ৳${isWithinCity ? 110 : 150}`,
        ],
      };
    }

    // NON-DOCUMENT (> 3 KG)
    const extraKg = weight - 3;

    return {
      title: "Non-Document Parcel",
      lines: [
        `Parcel Type: Non-Document`,
        `Weight: ${weight} KG`,
        `Delivery Area: ${areaText}`,
        `Base Charge (first 3 KG): ${isWithinCity ? 110 : 150}`,
        `Extra Weight: ${extraKg} KG × 40 = ${extraKg * 40}`,
        !isWithinCity && `Outside City Extra Charge: 40`,
      ].filter(Boolean),
    };
  };

  const onSubmit = async (data) => {
    const breakdown = getPriceBreakdown();

    const result = await Swal.fire({
      title: "Booking Overview",
      html: `
  <div style="text-align:left;">
    <h3 style="font-weight:600; margin-bottom:12px;">
      ${breakdown.title}
    </h3>

    <div>
      ${breakdown.lines
        .map((line) => {
          const parts = line.split(":");
          return `
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span>${parts[0]}</span>
                <span style="font-weight:500;">${parts
                  .slice(1)
                  .join(":")}</span>
              </div>
            `;
        })
        .join("")}
    </div>

    <hr style="margin:12px 0;" />

    <div style="display:flex; justify-content:space-between; font-size:18px; font-weight:700;">
      <span>Total Amount</span>
      <span> ${deliveryAmount}</span>
    </div>
  </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#84cc16",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      setParcelLoading(true);
      const finalData = {
        ...data,
        deliveryAmount,
        createdBy: userinfo.user.email,
        createdAt: new Date().toISOString(),
        paymentStatus: "unpaid",
        deliveryStatus: "pending",
        parcelID: generateTrakingID(),
      };
      try {
        setParcelLoading(true);
        const res = await publicApi.post("/parcels", finalData);
        if (res.data.insertedId) {
          setParcelLoading(false)
          toast.success("Parcel send successfully!");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong!")
        setParcelLoading(false)
      }finally{
        setParcelLoading(false);
      }
    }
  };

  return (
    <Container className={"py-12"}>
      <h2 className="mb-8 text-2xl font-semibold md:text-4xl">Add Parcel</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">
          Enter your parcel details
        </h1>

        {/* Radio Buttons */}
        <div className="mb-8 flex gap-6">
          <label className="flex cursor-pointer items-center gap-2">
            <div className="relative">
              <Controller
                name="parcelType"
                control={control}
                render={({ field }) => (
                  <input
                    type="radio"
                    value="document"
                    checked={field.value === "document"}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleParcelTypeChange("document");
                    }}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#65a30d] checked:border-[6px]"
                  />
                )}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">Document</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <div className="relative">
              <Controller
                name="parcelType"
                control={control}
                render={({ field }) => (
                  <input
                    type="radio"
                    value="not-document"
                    checked={field.value === "not-document"}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleParcelTypeChange("not-document");
                    }}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-[#65a30d] checked:border-[6px]"
                  />
                )}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Non-Document
            </span>
          </label>
        </div>

        {/* Parcel Name and Weight */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Parcel Name *
            </label>
            <input
              type="text"
              placeholder="Parcel Name"
              {...register("parcelName", {
                required: "Parcel name is required",
              })}
              className={`w-full rounded-md border ${
                errors.parcelName ? "border-red-500" : "border-gray-200"
              } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300`}
            />
            {errors.parcelName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.parcelName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Parcel Weight (KG) {watchParcelType === "not-document" && "*"}
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Parcel Weight (KG)"
              disabled={watchParcelType === "document"}
              {...register("parcelWeight", {
                required:
                  watchParcelType === "not-document"
                    ? "Parcel weight is required for non-document"
                    : false,
                min:
                  watchParcelType === "not-document"
                    ? {
                        value: 0.1,
                        message: "Weight must be at least 0.1 KG",
                      }
                    : undefined,
                max:
                  watchParcelType === "not-document"
                    ? {
                        value: 100,
                        message: "Weight cannot exceed 100 KG",
                      }
                    : undefined,
              })}
              className={`w-full rounded-md border ${
                errors.parcelWeight ? "border-red-500" : "border-gray-200"
              } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:opacity-50`}
            />
            {errors.parcelWeight && (
              <p className="mt-1 text-sm text-red-500">
                {errors.parcelWeight.message}
              </p>
            )}
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
                  Sender Name *
                </label>
                <input
                  type="text"
                  placeholder="Sender Name"
                  {...register("senderName", {
                    required: "Sender name is required",
                  })}
                  className={`w-full rounded-md border ${
                    errors.senderName ? "border-red-500" : "border-gray-200"
                  } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300`}
                />
                {errors.senderName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.senderName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Sender Contact No *
                </label>
                <input
                  type="tel"
                  placeholder="Sender Contact No"
                  {...register("senderContact", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "Please enter a valid contact number",
                    },
                  })}
                  className={`w-full rounded-md border ${
                    errors.senderContact ? "border-red-500" : "border-gray-200"
                  } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300`}
                />
                {errors.senderContact && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.senderContact.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Your Region *
              </label>
              <div className="relative">
                <Controller
                  name="senderRegion"
                  control={control}
                  rules={{ required: "Region selection is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        resetField("senderServiceCenter");
                      }}
                      className={`w-full appearance-none rounded-md border ${
                        errors.senderRegion
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-gray-100 px-4 py-2.5 pr-10 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300`}
                    >
                      <option value="">Select your region</option>
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
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
              {errors.senderRegion && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.senderRegion.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Service Center *
              </label>
              <div className="relative">
                <Controller
                  name="senderServiceCenter"
                  control={control}
                  rules={{ required: "Service center selection is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      disabled={!watchSenderRegion}
                      className={`w-full appearance-none rounded-md border ${
                        errors.senderServiceCenter
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-gray-100 px-4 py-2.5 pr-10 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:opacity-50`}
                    >
                      <option value="">Select service center</option>
                      {senderServiceCenters.map((center) => (
                        <option key={center.id} value={center.id}>
                          {center.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
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
              {errors.senderServiceCenter && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.senderServiceCenter.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Address *
              </label>
              <input
                type="text"
                placeholder="Address"
                {...register("senderAddress", {
                  required: "Address is required",
                })}
                className={`w-full rounded-md border ${
                  errors.senderAddress ? "border-red-500" : "border-gray-200"
                } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300`}
              />
              {errors.senderAddress && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.senderAddress.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Pickup Instruction
              </label>
              <textarea
                placeholder="Pickup Instruction"
                rows={4}
                {...register("pickupInstruction")}
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
                  Receiver Name *
                </label>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  {...register("receiverName", {
                    required: "Receiver name is required",
                  })}
                  className={`w-full rounded-md border ${
                    errors.receiverName ? "border-red-500" : "border-gray-200"
                  } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300`}
                />
                {errors.receiverName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.receiverName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Receiver Contact No *
                </label>
                <input
                  type="tel"
                  placeholder="Receiver Contact No"
                  {...register("receiverContact", {
                    required: "Receiver contact number is required",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "Please enter a valid contact number",
                    },
                  })}
                  className={`w-full rounded-md border ${
                    errors.receiverContact
                      ? "border-red-500"
                      : "border-gray-200"
                  } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300`}
                />
                {errors.receiverContact && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.receiverContact.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Receiver Region *
              </label>
              <div className="relative">
                <Controller
                  name="receiverRegion"
                  control={control}
                  rules={{ required: "Receiver region is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        resetField("receiverServiceCenter");
                      }}
                      className={`w-full appearance-none rounded-md border ${
                        errors.receiverRegion
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-gray-100 px-4 py-2.5 pr-10 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300`}
                    >
                      <option value="">Select receiver region</option>
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
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
              {errors.receiverRegion && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.receiverRegion.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Service Center *
              </label>
              <div className="relative">
                <Controller
                  name="receiverServiceCenter"
                  control={control}
                  rules={{ required: "Service center selection is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      disabled={!watchReceiverRegion}
                      className={`w-full appearance-none rounded-md border ${
                        errors.receiverServiceCenter
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-gray-100 px-4 py-2.5 pr-10 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:opacity-50`}
                    >
                      <option value="">Select service center</option>
                      {receiverServiceCenters.map((center) => (
                        <option key={center.id} value={center.id}>
                          {center.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
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
              {errors.receiverServiceCenter && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.receiverServiceCenter.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Receiver Address *
              </label>
              <input
                type="text"
                placeholder="Receiver Address"
                {...register("receiverAddress", {
                  required: "Receiver address is required",
                })}
                className={`w-full rounded-md border ${
                  errors.receiverAddress ? "border-red-500" : "border-gray-200"
                } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300`}
              />
              {errors.receiverAddress && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.receiverAddress.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Delivery Instruction
              </label>
              <textarea
                placeholder="Delivery Instruction"
                rows={4}
                {...register("deliveryInstruction")}
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
        <button
          type="submit"
          className="rounded-md bg-[#84cc16] px-8 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-[#65a30d]"
        >
          Proceed to Confirm {parcelLoading&&<span className="loading loading-spinner text-success"></span>}
        </button>
      </form>
    </Container>
  );
};

export default SendParcel;
