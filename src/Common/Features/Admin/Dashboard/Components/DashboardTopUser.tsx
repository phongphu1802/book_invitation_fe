/* eslint-disable import/no-extraneous-dependencies */
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { getTopUser } from "../../../../../App/Services/Admin/dashboardService";
import { TopUserType } from "../../../../../App/Types/Common/dashboardType";
import ChartContainer from "../../../../Components/Container/ChartContainer";

const DashboardTopUser = () => {
  const { t } = useTranslation("admin");
  const [topUser, setTopUser] = useState<TopUserType[]>();
  const [rangeDate, setRangeDate] = useState<string[]>([
    dayjs().startOf("month").format("YYYY-MM-DD"),
    dayjs().endOf("month").format("YYYY-MM-DD"),
  ]);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const fetchProduct = useCallback(async () => {
    const { data: topUsers } = await getTopUser({
      form_date: new Date(rangeDate?.[0]),
      to_date: new Date(rangeDate?.[1]),
    });
    setTopUser(topUsers);
  }, [rangeDate]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct, rangeDate]);

  const dataChart = useMemo(() => {
    return {
      labels: topUser?.map((data) => data?.user?.email),
      datasets: [
        {
          label: t("dollar"),
          data: topUser?.map((data) => data?.total_price),
          backgroundColor: "rgb(53, 162, 235)",
        },
      ],
    };
  }, [t, topUser]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      y: {
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  };

  const handleChangeRange = useCallback(
    (date: string[]) => {
      if (JSON.stringify(rangeDate) !== JSON.stringify(date)) {
        setRangeDate(date);
      }
    },
    [rangeDate],
  );

  return (
    <ChartContainer title={t("top10User")} onChangeRange={handleChangeRange} valueRange={rangeDate}>
      <Bar options={options} data={dataChart} />
    </ChartContainer>
  );
};

export default memo(DashboardTopUser);
