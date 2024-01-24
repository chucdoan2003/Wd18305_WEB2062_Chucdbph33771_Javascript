const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
   ];
   //1
for(const dog of dogs ){
    dog.recommended=Math.trunc((dog.weight)**0.75*28)
}
console.log(dogs)
//2
const dogSarah = dogs.find(dog=>{
    return dog.owners.includes('Sarah')
})
console.log(dogSarah)
const mucdo= dogSarah.curFood>dogSarah.recommended ?'much':'little'
console.log(`Sarah dog's eat too ${mucdo} `)
//3.
const ownersEatTooMuch=dogs.filter(dog=>dog.curFood>dog.recommended).flatMap(dog=>dog.owners)
console.log(ownersEatTooMuch)
const ownersEatTooLittle=dogs.filter(dog=>dog.curFood<dog.recommended).flatMap(dog=>dog.owners)
console.log(ownersEatTooLittle)
//4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`)
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`)
//5.
console.log(dogs.some(dog=>dog.curFood==dog.recommended))
//6
console.log(dogs.some(dog=>dog.curFood>dog.recommended*0.9&& dog.curFood<dog.recommended*1.1))
//7.
const checkEating= dog =>dog.curFood>dog.recommended*0.9&& dog.curFood<dog.recommended*1.1
console.log(dogs.filter(checkEating))
//8.
const dogsSorted = dogs.slice().sort((a,b)=>a.recommended-b.recommended)
console.log(dogsSorted)