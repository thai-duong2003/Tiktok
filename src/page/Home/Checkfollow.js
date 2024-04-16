export function CheckArray(arraylist, itemCheck) {
  let check_value;
  if (arraylist) {
    const check = arraylist.find(function (item) {
      if (item.id) {
        return item.id === itemCheck;
      }
    });
    if (check) {
      check_value = true;
    } else {
      check_value = false;
    }
  }
  return check_value;
}
