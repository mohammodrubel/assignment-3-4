export const calculateDurationInWeeks = (
  startDate: Date | string,
  endDate: Date | string,
): number => {
  const startDateObj =
    typeof startDate === 'string' ? new Date(startDate) : startDate;
  const endDateObj = typeof endDate === 'string' ? new Date(endDate) : endDate;

  const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
  const durationInMilliseconds = endDateObj.getTime() - startDateObj.getTime();
  return Math.ceil(durationInMilliseconds / millisecondsInWeek);
};
