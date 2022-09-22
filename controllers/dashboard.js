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
  /* const asArray = Object.entries(params)
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
  });
  text += `}`;
  text = JSON.parse(text); */

  await connect();
  const passengers = await TrainModel.find();
  const all = passengers.length
  const AgeVar = 5
  //console.log(passengers)
  const male = passengers.filter(elem => elem.Sex === 'male');
  const women = passengers.filter(elem => elem.Sex === 'female');
  const class1 = passengers.filter(elem => elem.Pclass === 1);
  const class2 = passengers.filter(elem => elem.Pclass === 2);
  const class3 = passengers.filter(elem => elem.Pclass === 3);
  const age = passengers.filter(elem => elem.Age >= AgeVar);
  console.log({
    "maleAlive": (male.filter(elem => elem.Survived === 1).length / male.length * 100).toFixed(2) + "%",
    "womenAlive": (women.filter(elem => elem.Survived === 1).length / male.length * 100).toFixed(2) + "%",
    "class1Alive": (class1.filter(elem => elem.Survived === 1).length / class1.length * 100).toFixed(2) + "%",
    "class2Alive": (class2.filter(elem => elem.Survived === 1).length / class2.length * 100).toFixed(2) + "%",
    "class3Alive": (class3.filter(elem => elem.Survived === 1).length / class3.length * 100).toFixed(2) + "%",
    AgeVar: (age.filter(elem => elem.Survived === 1).length / age.length * 100).toFixed(2) + "%"
  });

  res.render('dashboard')
}
// femme >30ans premiere vivante
