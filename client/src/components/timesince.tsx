const formatTimeSince = (milliseconds: number) => {
  var remaining = milliseconds;

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  remaining %= 1000 * 60 * 60 * 24;

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  remaining %= 1000 * 60 * 60;

  const minutes = Math.floor(remaining / (1000 * 60));
  remaining %= 1000 * 60;

  const seconds = Math.floor(remaining / 1000);

  if (days) {
    if (days === 1) return "1 day";
    else return days + " days";
  } else if (hours) {
    if (hours === 1) return "1 hour";
    else return hours + " hours";
  } else if (minutes) {
    if (minutes === 1) return "1 minute";
    else return minutes + " minutes";
  } else {
    if (seconds === 0) return "now";
    if (seconds === 1) return "1 second";
    else return seconds + " seconds";
  }
};

export const timeSince = (datetime: string) => {
  const now: Date = new Date();
  return formatTimeSince(now.getTime() - Date.parse(datetime));
};
