const daysInMonth = (month: number, year: number) => {
  const isLeap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
  switch (month) {
    case 1:
      return isLeap ? 29 : 28;
    case 0:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    default:
      return 30;
  }
};

export default daysInMonth;
