import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch } from "react-redux";
import { fetchEarningsStatistics } from "../../../../../store/actions/earningsStatistics";
import { useTypedSelector } from "../../../../../hook/useTypeSelector";

export const Steam: React.FC = () => {
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState<"daily" | "weekly" | "monthly">("daily");
  const { statistics, loading, error } = useTypedSelector((state) => state.earningsStatistics);

  useEffect(() => {
    dispatch(fetchEarningsStatistics());
  }, [dispatch]);

  if (loading) return <div className="text-center p-4 text-gray-300">Loading sales data...</div>;
  if (error) return <div className="text-red-400 text-center p-4">{error}</div>;

  const categories =
    viewMode === "daily"
      ? statistics.daily_details.map((detail) => detail.day)
      : viewMode === "weekly"
      ? statistics.weekly_details.map((detail) => detail.week)
      : statistics.monthly_details.map((detail) => detail.month);

  const totalAmounts =
    viewMode === "daily"
      ? statistics.daily_details.map((detail) => detail.total_amount)
      : viewMode === "weekly"
      ? statistics.weekly_details.map((detail) => detail.total_amount)
      : statistics.monthly_details.map((detail) => detail.total_amount);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      background: "transparent",
      toolbar: { show: false },
      foreColor: "hsl(var(--nextui-default-800))",
      dropShadow: {
        enabled: true,
        color: "#676767",
        top: 0,
        left: 0,
        blur: 4,
        opacity: 0.2,
      },
    },
    colors: ["#4ecdc4", "#45b7d1", "#007bff"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },
    theme: {
      mode: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#a1a9b3",
          fontSize: "12px",
        },
      },
      title: {
        text: `${viewMode === "daily" ? "Дни" : viewMode === "weekly" ? "Недели" : "Месяцы"}`,
        style: {
          color: "#a1a9b3",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#a1a9b3",
        },
      },
      title: {
        text: "Сумма (₽)",
        style: {
          color: "#a1a9b3",
        },
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val.toFixed(2)} ₽`,
      },
    },
    grid: {
      show: true,
      borderColor: "hsl(var(--nextui-default-200))",
      strokeDashArray: 0,
      position: "back",
    },
  };

  const series = [
    {
      name: `${viewMode === "daily" ? "Дневная" : viewMode === "weekly" ? "Недельная" : "Месячная"} выручка`,
      data: totalAmounts,
    },
  ];

  return (
    <div className="p-6 rounded-lg shadow-xl">
      <div className="flex justify-center mb-4 space-x-4">
        {["daily", "weekly", "monthly"].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as "daily" | "weekly" | "monthly")}
            className={`
              px-4 py-2 rounded-lg transition-all duration-300 
              ${viewMode === mode ? "bg-[#4ecdc4] text-black" : "bg-[#2c2c3a] text-gray-400 hover:bg-[#3a3a4f]"}
            `}
          >
            {mode === "daily" ? "День" : mode === "weekly" ? "Неделя" : "Месяц"}
          </button>
        ))}
      </div>
      <div id="sales-chart">
        <Chart options={options} series={series} type="bar" height={425} />
      </div>
      <div className="text-center mt-4 text-gray-300">
        <p>
          Общая сумма: <span className="text-[#4ecdc4]">{statistics.total_amount.toFixed(2)} ₽</span>
        </p>
        <p>
          Всего заказов: <span className="text-[#45b7d1]">{statistics.total_orders}</span>
        </p>
      </div>
    </div>
  );
};

export default Steam;
