const xzqhs = [
  '广州市',
  '深圳市',
  '东莞市',
  '梅州市',
  '佛山市',
  '中山市',
  '湛江市',
  '惠州市',
  '河源市',
  '珠海市',
  '江门市',
  '阳江市',
  '茂名市',
  '韶关市',
  '汕头市',
  '清远市',
  '揭阳市',
  '云浮市',
  '汕尾市'
]
const levels = [
  '<1°',
  '3-8°',
  '8-15°',
  '15-25°',
  '>25°'
]

export let tableData = createScopeData()

function createScopeData() {
  let arr = []
  for (let i = 0; i < xzqhs.length; i++) {
    arr.push({
      xzqh: xzqhs[i],
      wgsl: getRandomIntInclusive(1, 50),
      fgmj: getRandomIntInclusive(1, 10),
      bl: getRandomIntInclusive(1, 50) + '%'
    })
  }
  return arr
}

function createLevelData() {
  let arr = []
  for (let i = 0; i < levels.length; i++) {
    arr.push({
      level: levels[i],
      wgsl: getRandomIntInclusive(1, 50),
      fgmj: getRandomIntInclusive(1, 10),
      bl: getRandomIntInclusive(1, 50) + '%'
    })
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
