const randomColor = () => {
  const hue = Math.floor(Math.random() * 190);
  let saturation = Math.floor(Math.random() * 100 + 20);
  let lightness = Math.floor(Math.random() * (85 - 20) + 20);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export { randomColor };
