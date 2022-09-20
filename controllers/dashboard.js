import { connect } from "../data/train.js";
import { TrainModel } from "../model/Train.js";
export default async function (req, res) {

  console.log(req.query)

  const params = {
    Sex: req.query.sex,
    Class: req.query.class,
    Survived: req.query.alive,
    Age: req.query.age,
    ageType: req.query.AgeType,
  }

  const asArray = Object.entries(params)
  const filtered = asArray.filter(([key, value]) => value)
  let text = '{'
  const found = filtered.find((element) => element[0] === 'ageType')

  filtered.map((elem, index) => {
    if (elem[0] === 'ageType') return;
    if (elem[0] === 'Age') {
      if (index === 0) {
        elem[1] = `{ "${found[1]}": ${elem[1]}}`
        text += ` "${elem[0]}": ${elem[1]}`
        return;
      } else {
        elem[1] = `{ "${found[1]}": ${elem[1]}}`
        text += `, "${elem[0]}": ${elem[1]}`
        return;
      }
    }
    if (index === 0) {
      text += ` "${elem[0]}": "${elem[1]}"`
    } else {
      text += `, "${elem[0]}": "${elem[1]}"`
    }
  })
  text += `}`;
  text = JSON.parse(text);
  if (req.query.age) {
    await connect();
    const passengers = await TrainModel.find(text);
    console.log(passengers.length)
  }
  res.render('dashboard')
}
