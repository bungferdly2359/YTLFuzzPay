const price = money => {
  let float = money;
  if (typeof float === 'string') {
    float = float.replace('S$ ', '');
    float = parseFloat(money);
  }
  if (typeof float !== 'number' || isNaN(float)) {
    return 0;
  }
  return float;
};

const display = (money, showCurrency = true) => {
  return (showCurrency ? 'S$ ' : '') + price(money).toFixed(2);
};

export const MoneyHelper = {
  display,
  price
};
