import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

interface bookkeepingDate {
  year: string;
  month: string;
  date: string;
}
type MarkedDates = {
  [key: string]: MarkingProps;
};

enum enumViewType {
  Month = 'Month',
  Calendar = 'Calendar',
}

export { bookkeepingDate, enumViewType, MarkedDates };
