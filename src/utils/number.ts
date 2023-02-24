const numberSeparator = (numb: number) => {
  const str = numb.toString().split('.');
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return str.join('.');
};

export { numberSeparator };
