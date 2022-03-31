import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
}