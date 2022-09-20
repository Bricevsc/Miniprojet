import { all } from '../data/Train.js'

export default async function (req, res) {
  const data = await all()
  console.log(data)
  res.render('dashboard')
}
