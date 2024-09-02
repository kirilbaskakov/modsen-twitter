const displayDate = (date: Date): string => {
  const currentDate = new Date();
  const diffMinutes = Math.floor(
    (currentDate.getTime() - date.getTime()) / 60000
  );
  if (diffMinutes == 0) {
    return 'now';
  }
  if (diffMinutes < 60) {
    return diffMinutes + 'm';
  }
  if (diffMinutes < 60 * 24) {
    const h = Math.floor(diffMinutes / 60);
    return h + 'h';
  }
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default displayDate;
