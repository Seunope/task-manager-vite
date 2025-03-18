export function addEllipsisToLongString(str: string, num: number): string {
  //turn long string into a string with ellipsis, num is the max length of the string
  if (!str) return '';
  if (str?.length <= num) return str;
  return `${str?.substring(0, num)}...`;
}

export function getInitials(name: string): string {
  const names = name.split(' ');
  return `${names[0][0]}${names[1][0] || names[0][1]}`;
}
