const calcAverageHumanAge = function(ages){
    const humanAges = ages.map(age=>age<= 2 ? 2* age: 16 + age *4)
    const adults= humanAges.filter(age=>age>=18);
    const average = adults.reduce((acc, age, i, arr)=>(acc+age)/arr.length,0)
    return average;
}
const avg1= calcAverageHumanAge([5, 2,4, 1, 15, 8, 3])

const avg2 = calcAverageHumanAge([3, 4, 7,15, 73])