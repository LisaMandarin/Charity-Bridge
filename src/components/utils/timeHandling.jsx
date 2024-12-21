import dayjs from "dayjs";
export function formatTime(time) {
  const now = dayjs();
  const formattedTime = dayjs(time);

  if (formattedTime.isSame(now, "day")) {
    return formattedTime.format("hh:mm a"); // eg. 08:00 am
  } else if (formattedTime.isSame(now, "week")) {
    return formattedTime.format("dddd"); // eg. Sunday
  } else if (formattedTime.isSame(now, "month")) {
    return formattedTime.format("MMM DD"); // eg. Jan 08
  }
  return formattedTime.format("YYYY-MM-DD");
}
