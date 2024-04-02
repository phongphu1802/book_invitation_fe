import { DataStatusEnum } from "../../Enums";

export interface LanguageDataType {
  image: string[];
  flag: string | null;
  code: string;
  name: string;
  status?: DataStatusEnum;
}
