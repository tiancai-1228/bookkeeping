import React, { useEffect, useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { numberSeparator } from '@/utils/number';
import { record } from '@/type/bookkeeping';
import { Balance } from '@/type/report';
import { t } from 'i18next';
import BalanceList from '../list/Balance.list';

interface Prop {
  income: { list: record[]; total: number };
  expenses: { list: record[]; total: number };
}

const BalanceView = ({ income, expenses }: Prop) => {
  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
  };

  const data = [
    {
      name: t('expenses'),
      count: expenses.total,
      color: '#cf667a',
      legendFontColor: '#fff',
      legendFontSize: 16,
    },
    {
      name: t('income'),
      count: income.total,
      color: '#00B0BF',
      legendFontColor: '#fff',
      legendFontSize: 16,
    },
  ];

  const BalanceData = useMemo(() => {
    const list = [...income.list, ...expenses.list];
    const dateSet: Set<string> = new Set([]);
    let result: { [key: string]: Balance } = {};

    list.forEach((el) => {
      const plusOrMinus = el.type === 'income' ? 1 : -1;
      const count = el.count * plusOrMinus;

      if (dateSet.has(el.date)) {
        const data = result[`${el.date}`];
        const newCount = data.count + count;
        result[`${el.date}`] = { date: data.date, count: newCount };
      } else {
        dateSet.add(el.date);
        const date = new Date(el.date).getTime();
        const data = { date, count };
        result[`${el.date}`] = data;
      }
    });

    return Object.values(result);
  }, [income, expenses]);

  return (
    <View className="flex-1 ">
      <View className="items-center justify-center">
        {(!!income.total || !!expenses.total) && (
          <PieChart
            data={data}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            accessor={'count'}
            backgroundColor={'transparent'}
            paddingLeft={'10'}
          />
        )}
        {!(!!income.total || !!expenses.total) && (
          <View className="h-[200px] w-full justify-center items-center">
            <Text className="text-gray-400 font-bold text-3xl">
              {t('empty')}
            </Text>
          </View>
        )}
      </View>

      <View className="w-full border-y-4 border-gray-500 py-2 flex-row justify-around mb-2">
        <View>
          <Text className=" text-sm font-bold text-white">
            {t('monthly_expenses')}:
          </Text>
          <Text className=" text-sm font-bold text-[#cf667a] ">
            $ {numberSeparator(expenses.total)}
          </Text>
        </View>
        <View>
          <Text className=" text-sm font-bold text-white">
            {t('monthly_income')}:
          </Text>
          <Text className=" text-sm font-bold text-[#00B0BF]" numberOfLines={1}>
            $ {numberSeparator(income.total)}
          </Text>
        </View>
        <View>
          <Text className=" text-sm font-bold text-white" numberOfLines={1}>
            {t('monthly_balance')}:
          </Text>
          <Text className=" text-sm font-bold text-[#dbb2ff]" numberOfLines={1}>
            $ {numberSeparator(income.total - expenses.total)}
          </Text>
        </View>
      </View>

      <BalanceList data={BalanceData} />
    </View>
  );
};

export default BalanceView;
