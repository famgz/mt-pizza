export function parseTime(str) {
  return str.replace('T', ' ').substring(0,16)
}