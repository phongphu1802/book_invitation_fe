/* eslint-disable import/no-extraneous-dependencies */
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { getTopProduct } from "../../../../../App/Services/Admin/dashboardService";
import { TopProductType } from "../../../../../App/Types/Common/dashboardType";
import ChartContainer from "../../../../Components/Container/ChartContainer";

const DashboardTopProduct = () => {
  const { t } = useTranslation("admin");
  const [topProduct, setTopProduct] = useState<TopProductType[]>();
  const [rangeDate, setRangeDate] = useState<string[]>([
    dayjs().startOf("month").format("YYYY-MM-DD"),
    dayjs().endOf("month").format("YYYY-MM-DD"),
  ]);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const fetchProduct = useCallback(async () => {
    const { data: topProducts } = await getTopProduct({
      form_date: new Date(rangeDate?.[0]),
      to_date: new Date(rangeDate?.[1]),
    });
    setTopProduct(topProducts);
  }, [rangeDate]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct, rangeDate]);

  const dataChart = useMemo(() => {
    return {
      labels: topProduct?.map((data) => data?.product?.name),
      datasets: [
        {
          label: t("quantity"),
          data: topProduct?.map((data) => data?.total_product),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }, [t, topProduct]);

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
    <ChartContainer title={t("top10Product")} onChangeRange={handleChangeRange} valueRange={rangeDate}>
      <Bar options={options} data={dataChart} />
    </ChartContainer>
  );
};

export default memo(DashboardTopProduct);
