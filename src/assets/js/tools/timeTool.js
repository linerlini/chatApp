function isToday(val) {
  return new Date().toLocaleDateString() === val.toLocaleDateString();
}
function isYesterday(val) {
  const yesterday = new Date(Date.now() - 1000 * 60 * 60 * 24);
  return yesterday.toLocaleDateString() === val.toLocaleDateString();
}
function isThisWeek(val) {
  const nowDay = new Date().getDay();
  const nowDate = new Date().getDate();
  const thisWeekFirstDay = new Date().setDate(nowDate
    - nowDay === 0 ? 6 : nowDay - 1);
  const thisWeekLastDay = new Date().setDate(nowDate
    + nowDay === 0 ? nowDay : 7 - nowDay);
  if (val >= thisWeekFirstDay && val <= thisWeekLastDay) {
    return true;
  }
  return false;
}
function formatTimeStr(val) {
  let str = '';
  if (isToday(val)) {
    str = `${val.getHours()}:${val.getMinutes()}`;
  } else if (isYesterday(val)) {
    str = '昨天';
  } else if (isThisWeek(val)) {
    str = `星期${val.getDay() === 0 ? '天' : val.getDay()}`;
  } else {
    str = `${val.getYear()}-${val.getMonth() + 1}-${val.getDate()}`;
  }
  return str;
}
export {
  formatTimeStr,
  isThisWeek,
};
