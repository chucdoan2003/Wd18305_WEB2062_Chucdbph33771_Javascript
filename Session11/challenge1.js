const checkDogs = function (dogsJulia, dogsKate){
    const dogsJuliaCorrected = dogsJulia.slice();
    dogsJuliaCorrected.splice(0, 1)
    dogsJuliaCorrected.splice(-2);

    const dogs = dogsJuliaCorrected.concat(dogsKate)
    console.log(dogs);
   dogs.forEach(function(dog, i){
    if(dog>=3){
        console.log(`Dog number ${i+1} is an adult, and is ${dog} year old`)
    }else {
        console.log(`Dog number ${i+1} is still a puppy`)
    }
   }); 
}
checkDogs([3,4,5,6,7,8], [12,24,53,45,1])