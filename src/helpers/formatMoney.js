export const formatMoney = (number) => {
  number = Number(number);
  return number.toLocaleString("en-us", {
    style: "currency",
    currency: "USD",
  })
};
