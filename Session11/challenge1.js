const checkDogs = function (dogsJulia, dogsKate){
    const dogsJuliaCorrected = dogsJulia;
    // 1.sao chép mảng dogsjukia bỏ tuổi mèo
    dogsJuliaCorrected.splice(0, 1)
    dogsJuliaCorrected.splice(2,2);
    console.log(dogsJuliaCorrected);

    //2. nối mảng julia vs kate
    const dogs = dogsJuliaCorrected.concat(dogsKate)
    //3. kiểm tra 
   dogs.forEach(function(dog, i){
    if(dog>=3){
        console.log(`Dog number ${i+1} is an adult, and is ${dog} year old`)
    }else {
        console.log(`Dog number ${i+1} is still a puppy`)
    }
   }); 
}
//4. check
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])
checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4])