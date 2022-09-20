import { Search } from '../data/Train.js'

export default async function (req, res) {
  const params = {
    sex: 'male',
    class: 1,
    alive: 0,
    age: 50,
    ageType: '$gt',
  }
  const asArray = Object.entries(params)
  const filtered = asArray.filter(([key, value]) => value)
  let text = '{'
  const found = filtered.find((element) => element[0] === 'ageType')

  filtered.map((elem, index) => {
    if (elem[0] === 'ageType') return
    if (elem[0] === 'age') {
      elem[1] = `{ ${found[1]}: ${elem[1]}}`
      text += ` ${elem[0]}: ${elem[1]}`
      return
    }
    if (index === 0) {
      text += ` ${elem[0]}: '${elem[1]}'`
    } else {
      text += `, ${elem[0]}: '${elem[1]}'`
    }
  })
  text += `}`
  text = JSON.stringify(text)
  text = JSON.parse(text)
  const data = await Search(text)

  console.log(data)
  console.log(text)
  res.render('dashboard')
}
