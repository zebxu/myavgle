/**
 * format duration value in different unit
 * @param {Number} duration duration value
 * @param {Number} scale magnification to seconds of the duration value 
 */
export function formatDuration(duration, scale = 1000) {
  const seconds = Math.floor((duration / scale) % 60)
  const minutes = Math.floor((duration / (scale * 60)) % 60)
  const hours = Math.floor((duration / (scale * 60 * 60)) % 24)

  let str = ''
  if(hours > 0) {
    const hoursStr = (hours < 10) ? "0" + hours : hours;
    str += hoursStr + ':'
  }
  str += (minutes < 10) ? "0" + minutes : minutes;
  str += ':'
  str += (seconds < 10) ? "0" + seconds : seconds;

  return str;
}
