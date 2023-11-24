"use client";
import { Chart } from "chart.js/auto";
import { use, useEffect, useRef, useState } from "react";
import DropdownCustom from "../DropdownCustom";
import AdminDashboardCard from "./AdminDashboardCard";
import { Heart, ShoppingBag, Bot } from "@/app/components/iconWrapper";
import RecentSubsribeTable from "./RecentSubsribeTable";
import useSWR from "swr";

const AdminDashboard = () => {
  const [staticsData, setStaticsData] = useState("");

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          const token = localStorage.getItem("token");
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/statis`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setStaticsData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, e.g., set an error state
      }
    };

    fetchData(); // Call the async function immediately

    // Note: If you ever need to clean up (e.g., cancel a request),
    // you can return a cleanup function here
  }, []);
  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext("2d");
      const newChart = new Chart(context, {
        type: "line",
        data: {
          labels: [1, 2, 3, 4, 5],
          datasets: [
            {
              label: "Info ( By Month)",
              data: [34, 45, 66, 34, 61],
              backgroundColor: ["rgba(58, 54, 219, 0.5)"],
              borderColor: ["rgba(255, 105, 180, 0.35)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      chartRef.current.chart = newChart;
    }
  });
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">Dashboard</h1>
        </div>
        <div className="">
          <DropdownCustom
            icon=""
            text="oct 2023"
            dropDownItem={["nov 2023", "dec 2023"]}
          />
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <AdminDashboardCard
          iconColor="#EC2222"
          icon={<Heart />}
          number={staticsData.numberOfCustomers}
          title="Number of Customers"
          color="#F21111"
        />
        <AdminDashboardCard
          iconColor="#03A89E"
          icon={<ShoppingBag />}
          number={staticsData.numberOfSims}
          title="Total Sims"
          color="#03A89E"
        />
        <AdminDashboardCard
          iconColor="#FF69B4"
          icon={<Bot />}
          number="2.248"
          title="Total Tracking"
          color="#FF69B4"
        />
        <AdminDashboardCard
          iconColor="#4F4F4F"
          icon={<ShoppingBag />}
          number="90"
          title="Unsubscribe"
          color="#333333"
        />
      </div>
      <div className="w-1/2 mt-5">
        <canvas ref={chartRef} />
      </div>
      <div className="mt-5">
        <h2 className="font-bold mb-2 text-xl">Recent Subscriber</h2>
        <RecentSubsribeTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
