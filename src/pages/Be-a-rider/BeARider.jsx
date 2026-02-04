import Container from "@/components/shared/Container";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import rider from "@/assets/agent-pending.png";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

const BeARider = () => {
    const {user} = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedRegion = watch("region");

  // Regions
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

  // Service centers
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

  // Reset service center when region changes
  useEffect(() => {
    setValue("serviceCenter", "");
  }, [selectedRegion, setValue]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const inputClass =
    "w-full rounded-md border bg-gray-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300";

  const serviceCenters = serviceCentersByRegion[selectedRegion] || [];

  return (
    <Container className="py-12">
      <div className="mb-8 pb-6 border-b">
        {" "}
        <h2 className="mb-6 text-2xl font-semibold md:text-4xl">
          Be a Rider
        </h2>{" "}
        <p className="text-base">
          {" "}
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.{" "}
        </p>{" "}
      </div>
      <div className="lg:grid gap-12 lg:justify-between lg:items-center grid-cols-4">
        <form className="lg:col-span-2" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-6 text-2xl font-semibold text-gray-900">
            Tell us about yourself
          </h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Your Name *
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className={inputClass}
                placeholder="Your Name"
                value={user?.displayName}
                readOnly
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Your Age *
              </label>
              <input
                {...register("age", { required: "Age is required" })}
                className={inputClass}
                placeholder="Your Age"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Your Email *
              </label>
              <input
                type="email"
                value={user?.email}
                {...register("email", { required: "Email is required" })}
                className={inputClass}
                placeholder="Your Email"
                readOnly
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Region */}
            <div>
              <label className="mb-2 block text-sm font-medium">Region *</label>
              <select
                {...register("region", { required: "Region is required" })}
                className={inputClass}
              >
                <option value="">Select your region</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.region.message}
                </p>
              )}
            </div>

            {/* NID */}
            <div>
              <label className="mb-2 block text-sm font-medium">NID No *</label>
              <input
                {...register("nid", { required: "NID is required" })}
                className={inputClass}
                placeholder="NID No"
              />
              {errors.nid && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.nid.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number *
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                className={inputClass}
                placeholder="Phone Number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Service Center */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Which warehouse you want to work? *
            </label>
            <select
              {...register("serviceCenter", {
                required: "Service center is required",
              })}
              disabled={!selectedRegion}
              className={`${inputClass} ${
                !selectedRegion ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              <option value="">
                {selectedRegion
                  ? "Select service center"
                  : "Select region first"}
              </option>

              {serviceCenters.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name}
                </option>
              ))}
            </select>

            {errors.serviceCenter && (
              <p className="mt-1 text-sm text-red-500">
                {errors.serviceCenter.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="mt-8"
          >
            Submit
          </Button>
        </form>

        <div className="lg:col-span-2  hidden lg:block">
          <div className="w-full flex justify-end">
            <img className="" src={rider} alt="" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BeARider;
