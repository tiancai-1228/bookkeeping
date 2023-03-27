import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

interface bookkeepingDate {
  year: string;
  month: string;
  date: string;
}
interface CalendarType {
  year: string;
  month: string;
  date: string;
  selectDate: string;
}
type MarkedDates = {
  [key: string]: MarkingProps;
};

enum enumViewType {
  Month = 'Month',
  Calendar = 'Calendar',
}

export { bookkeepingDate, enumViewType, MarkedDates, CalendarType };
