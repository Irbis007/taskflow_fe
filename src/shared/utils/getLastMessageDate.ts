import dayjs from "dayjs";

export function getLastMessageDate(
  data: Date | string | null | undefined,
): string | null {
  if (!data) return null;
  const date = new Date(data);
  const dateNow = new Date();
  const dif = dateNow.getTime() - date.getTime();
  if (date.getDate() === dateNow.getDate() && dif < 86400000) {
    return dayjs(date).format("mm:hh");
  }
  return dayjs(date).format("DD.MM.YYYY");
}
