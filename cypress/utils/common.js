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

module.exports = {
    getDateNextDayOfWeek,
};