import { category } from './categories';

interface Balance {
  date: number;
  count: number;
}

interface RecordData {
  name: string;
  count: number;
  color: string;
  category: category;
}

export { Balance, RecordData };
