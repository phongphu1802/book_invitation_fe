/* eslint-disable import/no-extraneous-dependencies */
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { getProfitStatistic } from "../../../../../App/Services/Admin/dashboardService";
import { DashboardType } from "../../../../../App/Types/Common/dashboardType";
import ChartContainer from "../../../../Components/Container/ChartContainer";
import { DashboardTypeEnum } from "../../../../../App/Enums";

const DashboardProfit = () => {
  const { t } = useTranslation("admin");
  const [profitStatistic, setProfitStatistic] = useState<DashboardType[]>();
  const [rangeDate, setRangeDate] = useState<string[]>([
    dayjs().startOf("month").format("YYYY-MM-DD"),
    dayjs().endOf("month").format("YYYY-MM-DD"),
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, setType] = useState<DashboardTypeEnum>(DashboardTypeEnum.DAY);

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

  const fetchProduct = useCallback(async () => {
    const { data: profits } = await getProfitStatistic({
      form_date: new Date(rangeDate?.[0]),
      to_date: new Date(rangeDate?.[1]),
      type,
    });
    setProfitStatistic(profits);
  }, [rangeDate, type]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct, rangeDate, type]);

  const dataChart = useMemo(() => {
    return {
      labels: profitStatistic?.map((data) => data?.name),
      datasets: [
        {
          fill: true,
          label: t("dollar"),
          data: profitStatistic?.map((data) => data?.value),
          borderColor: "rgb(253,186,116)",
          backgroundColor: "rgb(254,215,170)",
        },
      ],
    };
  }, [t, profitStatistic]);

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

  const handleOnChangeType = useCallback((dataType: DashboardTypeEnum) => {
    setType(dataType);
  }, []);

  return (
    <ChartContainer
      title={t("revenueStatistics")}
      onChangeRange={handleChangeRange}
      valueRange={rangeDate}
      valueType={type}
      onChangeType={handleOnChangeType}
    >
      <Line options={options} data={dataChart} />
    </ChartContainer>
  );
};

export default memo(DashboardProfit);
