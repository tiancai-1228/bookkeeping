import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { bookkeeping, record } from '@/type/bookkeeping';

function useBookkeepingFormat(data?: bookkeeping['data']) {
  const { year, month } = useSelector(
    (state: RootState) => state.bookkeeping.value,
  );

  const sortFn = (a: record, b: record) => {
    const first = a.date.split('-');
    const firstDate = parseInt(`${first[0]}${first[1]}${first[2]}`);
    const last = b.date.split('-');
    const lastDate = parseInt(`${last[0]}${last[1]}${last[2]}`);
    return lastDate > firstDate ? -1 : lastDate < firstDate ? 1 : 0;
  };

  const expenses = useMemo(() => {
    if (!data) return { list: [], total: 0 };
    const expenses = data?.[`${year}`]?.[`${month}`]?.['expenses'];
    const expensesList: record[] = expenses ? Object.values(expenses) : [];

    const total = expensesList.reduce((pre, curr) => {
      pre = pre + curr.count;
      return pre;
    }, 0);

    return {
      list: expensesList.sort(sortFn).reverse(),
      total: total,
    };
  }, [data, year, month]);

  const income = useMemo(() => {
    if (!data) return { list: [], total: 0 };
    const income = data?.[`${year}`]?.[`${month}`]?.['income'];
    const incomeList: record[] = income ? Object.values(income) : [];
    const total = incomeList.reduce((pre, curr) => {
      pre = pre + curr.count;
      return pre;
    }, 0);
    return {
      list: incomeList.sort(sortFn).reverse(),
      total: total,
    };
  }, [data, year, month]);

  return { expenses, income };
}

export default useBookkeepingFormat;
