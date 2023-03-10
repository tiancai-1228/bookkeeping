import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootSlices';
import { record } from '@/type/bookkeeping';
import { deleteIncome } from '@/firebase/set/bookkeeping';
import CalendarItem from '../item/Calendar.item';

interface Prop {
  data: record[];
}

const CalendarList = ({ data }: Prop) => {
  const [item, setItem] = useState<record[]>([]);
  const { me } = useSelector((state: RootState) => state.account.value);

  const sortItem = (data: record[]) => {
    const list = data.sort(function (a, b) {
      return b.createAt - a.createAt;
    });
    setItem(list);
  };

  const handelDelete = (item: record) => {
    const date = item.date.split('-');
    deleteIncome(me!.id, me!.currentBookkeeping!.id, item.id, {
      year: date[0],
      month: date[1],
    });
  };

  useEffect(() => {
    sortItem(data);
  }, [data]);

  return (
    <ScrollView className="mb-[100px]">
      {item.length !== 0 &&
        item.map((el, index) => {
          const firstItem = index === 0;
          let isHeader = false;
          if (!firstItem) {
            isHeader = el.date !== item[index - 1].date;
          }
          return (
            <CalendarItem
              item={el}
              key={el.id}
              index={index}
              onDelete={() => {
                handelDelete(el);
              }}
            />
          );
        })}
    </ScrollView>
  );
};

export default CalendarList;
