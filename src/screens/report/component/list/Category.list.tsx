import React from 'react';
import { ScrollView } from 'react-native';
import { RecordData } from '@/type/report';
import CategoryItem from '../item/Category.item';

interface Prop {
  data: RecordData[];
  total: number;
}

const CategoryList = ({ data, total }: Prop) => {
  return (
    <ScrollView>
      {data.length !== 0 &&
        data.map((el, index) => {
          return (
            <CategoryItem item={el} key={el.name} index={index} total={total} />
          );
        })}
    </ScrollView>
  );
};

export default CategoryList;
