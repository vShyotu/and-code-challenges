
const hourStrings = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['twenty', 'thirty', 'forty', 'fifty'];

const timeToSpokenFormat = (timeString) => {
  const [hours, minutes] = timeString.split(':');

  let minuteString = '';
  if (1 <= minutes && minutes <= 9) {
    minuteString = `o' ${units[parseInt(minutes, 10)]}`;
  } else if (10 <= minutes && minutes <= 19) {
    minuteString = teens[minutes - 10];
  } else if (minutes >= 20) {
    minuteString = `${tens[minutes[0]-2]}`
    const unitValue = minutes[1];
    if (unitValue > 0) {
      minuteString += ` ${units[minutes[1]]}`;
    }
  }

  const hourString = hourStrings[hours % 12];
  const timeSuffix = 0 <= hours && hours < 12 ? 'a.m.' : 'p.m.'
  if (minuteString) {
    return `It's ${hourString} ${minuteString} ${timeSuffix}`;
  } else {
    return `It's ${hourString} ${timeSuffix}`;
  }
  
}

module.exports = { timeToSpokenFormat };