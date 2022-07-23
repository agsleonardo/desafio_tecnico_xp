module.exports = (oldQty, oldPrice, newQty, newPrice) => {
  const oldTotal = oldQty * oldPrice;
  const newTotal = newQty * newPrice;
  const averagePrice = (oldTotal + newTotal) / (oldQty + newQty);
  return averagePrice;
};
