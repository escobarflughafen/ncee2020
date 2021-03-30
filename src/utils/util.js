const dateStringOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

module.exports.timeStringConverter = (timestamp) => {
  const now = Date.now()
  let lapse = now - new Date(timestamp)
  if (lapse < 1000 * 60) {
    return `${Math.round(lapse / 1000)} 秒前`
  } else if (lapse < 1000 * 60 * 60) {
    return `${Math.round(lapse / 1000 / 60)} 分前`
  } else if (lapse < 1000 * 60 * 60 * 24) {
    return `${Math.round(lapse / 1000 / 60 / 60)} 小时前`
  } else {
    return new Date(timestamp).toLocaleDateString("zh")
  }
}
