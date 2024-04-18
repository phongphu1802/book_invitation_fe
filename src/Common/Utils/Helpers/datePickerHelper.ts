import dayjs from "dayjs";

// eslint-disable-next-line import/no-cycle
import { DatePickerRangeItemType, DatePickerRangeNameEnum } from "../../Components/DatePicker";

const calculateDatePickerRange = (value: DatePickerRangeItemType) => {
  switch (value.name) {
    case DatePickerRangeNameEnum.TODAY: {
      return {
        start: dayjs().startOf("day").toDate(),
        end: dayjs().endOf("day").toDate(),
      };
    }
    case DatePickerRangeNameEnum.YESTERDAY: {
      return {
        start: dayjs().add(-1, "day").toDate(),
        end: dayjs().add(-1, "day").toDate(),
      };
    }
    case DatePickerRangeNameEnum.LAST_7_DAYS: {
      return {
        start: dayjs().add(-6, "day").toDate(),
        end: dayjs().toDate(),
      };
    }
    case DatePickerRangeNameEnum.LAST_30_DAYS: {
      return {
        start: dayjs().add(-29, "day").toDate(),
        end: dayjs().toDate(),
      };
    }
    case DatePickerRangeNameEnum.THIS_MONTH: {
      return {
        start: dayjs().startOf("month").toDate(),
        end: dayjs().toDate(),
      };
    }
    default: {
      return {
        start: dayjs().add(-1, "month").startOf("month").toDate(),
        end: dayjs().add(-1, "month").endOf("month").toDate(),
      };
    }
  }
};

export { calculateDatePickerRange };
