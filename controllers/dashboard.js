import { connect } from "../data/train.js";
import { TrainModel } from "../model/Train.js";
let data = [];
export default async function (req, res) {
  const params = {
    Sex: 'male',
    Pclass: 1,
    //Age: 50,
  }
  const asArray = Object.entries(params)
  const filtered = asArray.filter(([key, value]) => value);

  await connect();
  const passengers = await TrainModel.find();
  let searchData = passengers;

  filtered.map((elemSearch) => {
    console.log(elemSearch[0])
    console.log(elemSearch[1]);
    searchData = searchData.filter(elem => elem[elemSearch[0]] === elemSearch[1]);
  });

  const searchDataAlive = searchData.filter(elem => elem.Survived === 1);
  const searchDataDead = searchData.filter(elem => elem.Survived === 0);
  data.push(passengers, searchDataAlive, searchDataDead)

  res.render('dashboard')
}
// femme >30ans premiere vivante
export { data }

export function reset(data){
  return data = 0
}