import { connect } from "../data/train.js";
import { TrainModel } from "../model/Train.js";

export default async function (req, res) {
  const params = {
    Sex: 'male',
    Class: 1,
    Alive: 0,
    Age: 50,
    ageType: '$gt',
  }
  const asArray = Object.entries(params)
  const filtered = asArray.filter(([key, value]) => value)
  let text = '{'
  const found = filtered.find((element) => element[0] === 'ageType')

  filtered.map((elem, index) => {
    if (elem[0] === 'ageType') return
    if (elem[0] === 'Age') {
      if (index === 0) {
        elem[1] = `{ "${found[1]}": ${elem[1]}}`
        text += ` "${elem[0]}": ${elem[1]}`
        return
      } else {
        elem[1] = `{ "${found[1]}": ${elem[1]}}`
        text += `, "${elem[0]}": ${elem[1]}`
        return
      }
    }
    if (index === 0) {
      text += ` "${elem[0]}": "${elem[1]}"`
    } else {
      text += `, "${elem[0]}": "${elem[1]}"`
    }
  }
  )
  text += `}`;
  text = JSON.parse(text);

  await connect();
  const passengers = await TrainModel.find(text);
  console.log(passengers)
  res.render('dashboard')
}
