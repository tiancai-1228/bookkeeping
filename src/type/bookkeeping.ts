import { category } from './categories';

type recordType = 'income' | 'expenses';

interface record {
  id: string;
  createAt: number;
  category: category;
  date: string;
  count: number;
  type: recordType;
  memo?: string;
}

interface recordList {
  [key: string]: record;
}

interface month {
  income?: recordList;
  expenses?: recordList;
}

interface monthList {
  [key: string]: month;
}

interface year {
  [key: string]: monthList;
}

interface yearList {
  [key: string]: year;
}

interface bookkeeping {
  id: string;
  name: string;
  createAt: number;
  data?: yearList;
}

interface bookkeepingList {
  [key: string]: bookkeeping;
}

export { bookkeepingList, bookkeeping, record, recordType };
