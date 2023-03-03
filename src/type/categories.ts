type iconType =
  | 'MaterialCommunity'
  | 'Material'
  | 'FontAwesome'
  | 'Ionicons'
  | 'FontAwesome5';
interface category {
  name: string;
  icon: string;
  type: iconType;
}

export { category, iconType };
