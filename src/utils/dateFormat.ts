export const dateFormat = (date: string) => {
  if (!date) return;
  return new Date(date).toLocaleDateString();
};

export const formatDateToIsoString = (date: string) => {
  return date ? new Date(date)?.toISOString() : '';
};

export const getDateTime = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid Date object');
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
    // timeZone: "Africa/Lagos"
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

// Example Usage
console.log(formatDateTime('2025-02-23T11:39:39.374Z'));
// Output: "Sunday, 23 February 2025, 11:39 AM"

export const getTimeDifference = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  let diffInSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);

  const days = Math.floor(diffInSeconds / (24 * 3600));
  diffInSeconds %= 24 * 3600;

  const hours = Math.floor(diffInSeconds / 3600);
  diffInSeconds %= 3600;

  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;

  return `${days ? `${days} days, ` : ''}${hours ? `${hours} hours, ` : ''}${
    minutes ? `${minutes} minutes, ` : ''
  }${seconds} seconds`;
};

// Example Usage
console.log(getTimeDifference('2025-02-20T10:30:00Z', '2025-02-22T13:45:40Z'));
// Output: "2 days, 3 hours, 15 minutes, 40 seconds"
