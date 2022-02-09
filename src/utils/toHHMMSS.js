export const toHHMMSS = seconds => {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hours * 3600) / 60);
  var sec = Math.floor(seconds - hours * 3600 - minutes * 60);

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }
  return hours + ':' + minutes + ':' + sec;
};
