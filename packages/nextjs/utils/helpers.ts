export function formatTimeDifference(dateString: string): string {
  const givenDate: Date = new Date(dateString);
  const currentDate: Date = new Date();

  const timeDifference: number = currentDate.getTime() - givenDate.getTime();
  const hoursAgo: number = Math.floor(timeDifference / (1000 * 60 * 60));

  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate: string = givenDate.toLocaleDateString("en-US", options);

  return `${formattedDate} (${hoursAgo} hours ago)`;
}
