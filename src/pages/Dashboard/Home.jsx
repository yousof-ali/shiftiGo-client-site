
import { Package, Truck, CheckCircle, Clock } from "lucide-react";


export default function DashboardHome() {
  const stats = [
    {
      title: "Total Parcels",
      value: "128",
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: "Pending Deliveries",
      value: "34",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "In Transit",
      value: "56",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: "Completed",
      value: "38",
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ];

  return (
    <div className="p-6 space-y-6">

        Delivery Dashboard


      {/* Stats divs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
         
            <div className="rounded-2xl shadow-md">
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted">
                  {stat.icon}
                </div>
              </div>
            </div>
         
        ))}
      </div>

      {/* Recent Parcels */}
      <div className="rounded-2xl shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Parcels</h2>
          <div className="space-y-3">
            {["Pending", "In Transit", "Completed"].map((status, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl border"
              >
                <div>
                  <p className="font-medium">Parcel #{1023 + i}</p>
                  <p className="text-sm text-muted-foreground">
                    Destination: New City
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : status === "In Transit"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
