export const formatAmount = amount => {
  // Проверка, что amount не undefined и является числом
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0.00';
  }

  // Преобразование числа в строку с двумя знаками после запятой
  const fixedAmount = amount.toFixed(2);

  // Разделение числа на целую и дробную части
  const [integerPart, decimalPart] = fixedAmount.split('.');

  // Форматирование целой части с пробелами для разделения тысяч
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ' ',
  );

  // Объединение целой и дробной частей с точкой
  const formattedAmount = `${formattedIntegerPart}.${decimalPart}`;

  return formattedAmount;
};
