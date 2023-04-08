export function formatName(val) {
  if (val.length >= 3) {
    return val.substr(0, 1) + ' * ' + val.substr(2);
  } else if (val.length == 2) {
    return val.substr(0, 1) + ' * ';
  }
}
export function formatPhone(val) {
  return val.replace(val.substr(3, 4), '****');
}
