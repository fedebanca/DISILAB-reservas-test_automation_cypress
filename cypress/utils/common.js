function getDateNextDayOfWeek(dayOfWeek){
    const today = new Date(); // Create a new Date object for today
    const currentDayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    var daysUntilNextDayOfWeek
    switch(dayOfWeek){
      case "sunday":
        daysUntilNextDayOfWeek = 7 - currentDayOfWeek; // Calculate the number of days until the next Sunday
        break;
      case "saturday":
        daysUntilNextDayOfWeek = 6 - currentDayOfWeek; // Calculate the number of days until the next Saturday
        break;
      default:
        console.log('Invalid dayOfWeek');
    }
    const nextDayOfWeek = new Date(today); // Create a new Date object for the next dayOfWeek
    nextDayOfWeek.setDate(today.getDate() + daysUntilNextDayOfWeek);
    return nextDayOfWeek;
}

function period_idToText(period_id){
  const period_idAsInt = parseInt(period_id, 10);
  if (period_idAsInt === 1) {
    return 'Mañana';
  } else if (period_idAsInt === 2) {
    return 'Tarde';
  } else if (period_idAsInt === 3) {
    return 'Noche';
  } else {
    console.log('Invalid period_id');
    return 'Error'
  }
}

function formatToInvertedDate(date) {
  if (!(date instanceof Date)) {
    throw new Error('Input is not a Date object');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

module.exports = {
    getDateNextDayOfWeek,
    period_idToText,
    formatToInvertedDate,
};