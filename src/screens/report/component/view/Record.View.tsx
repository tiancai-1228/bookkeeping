import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { randomColor } from '@/utils/color';
import { numberSeparator } from '@/utils/number';
import { record, recordType } from '@/type/bookkeeping';
import { RecordData } from '@/type/report';
import { t } from 'i18next';
import CategoryList from '../list/Category.list';
import RecordList from '../list/Record.list';

interface Prop {
  data: { list: record[]; total: number };
  type: recordType;
}

const RecordView = ({ data, type }: Prop) => {
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
  };

  const RecordData = useMemo(() => {
    const category: Set<string> = new Set([]);
    let result: { [key: string]: RecordData } = {};

    data.list.forEach((el) => {
      const count = el.count;

      if (category.has(el.category.name)) {
        const data = result[`${el.category.name}`];
        const newCount = data.count + count;
        result[`${el.category.name}`] = { ...data, count: newCount };
      } else {
        category.add(el.category.name);
        const data = {
          name: t(`${el.category.name}`),
          count,
          color: randomColor(),
          legendFontColor: '#fff',
          legendFontSize: 16,
          category: el.category,
        };
        result[`${el.category.name}`] = data;
      }
    });

    return Object.values(result);
  }, [data]);

  return (
    <View className="flex-1">
      <View className="justify-center flex-row h-[200px]">
        <View className="w-1/2">
          {RecordData.length !== 0 && (
            <PieChart
              data={RecordData}
              width={200}
              height={200}
              chartConfig={chartConfig}
              accessor={'count'}
              backgroundColor={'transparent'}
              paddingLeft={'50'}
              hasLegend={false}
            />
          )}
          {RecordData.length == 0 && (
            <View className="h-[200px] w-full justify-center items-center">
              <Text className="text-gray-400 font-bold text-3xl">
                {t('empty')}
              </Text>
            </View>
          )}
        </View>
        <View className="w-1/2 py-4">
          <CategoryList data={RecordData} total={data.total} />
        </View>
      </View>

      <View className="w-full border-y-4 border-gray-500 py-2 flex-row justify-around mb-2">
        <Text className=" text-sm font-bold text-white">
          {type === 'expenses' && `${t('monthly_expenses')} :`}
          {type === 'income' && `${t('monthly_income')} :`}
        </Text>
        <Text
          className=" text-sm font-bold"
          style={{ color: type === 'expenses' ? '#cf667a' : '#00B0BF' }}
        >
          $ {numberSeparator(data.total)}
        </Text>
      </View>

      <RecordList data={RecordData} />
    </View>
  );
};

export default RecordView;
