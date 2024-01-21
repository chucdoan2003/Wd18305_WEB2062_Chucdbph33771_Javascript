/*underscoreCase
firstName
someVariable
delayedDeparture
underscore_case
  first_name
Some_Variable
  calculate_AGE
delayed_Departure
*/

document.body.append(document.createElement('textarea'))
document.body.append(document.createElement('button'))

document.querySelector('button').addEventListener('click',function(){

const text = document.querySelector('textarea').value
const rows = text.split('\n')
console.log(rows)

for(const row of rows){
    const [first, second] = row.trim().toLowerCase().split('_')
    const outPut = `${first}${second.replace(second[0], second[0].toUpperCase())}`
    console.log(outPut)
}


})