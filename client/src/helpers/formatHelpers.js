const formatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
const formatterPencent = Intl.NumberFormat('pt-BR', { style: 'decimal' });

function formatNumber(value) {
  return formatter.format(value);
}

function formatPercent(value) {
  return formatterPencent.format(value) + ' %';
}

export { formatNumber, formatPercent };
