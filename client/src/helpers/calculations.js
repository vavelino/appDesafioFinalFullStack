function calculoRate(capital, rate, months) {
  rate = rate / 100;
  let capitalPlots = capital;
  let resultPlots = [];
  const colorReal = rate >= 0 ? '#4cb48a' : '#f44391';
  const colorPencent = rate >= 0 ? '#38a4ff' : '#ff5787';

  for (let a = 0; a < months; a++) {
    const currentCapital = parseFloat(capitalPlots) + capitalPlots * rate;
    const difference = currentCapital - capital;
    const rateCurrent = (difference * 100) / capital;

    resultPlots.push({
      id: a + 1,
      currentCapital,
      difference,
      rateCurrent,
      colorReal,
      colorPencent,
    });
    capitalPlots = currentCapital;
  }
  return resultPlots;
}
export { calculoRate };
