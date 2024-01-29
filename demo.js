var voters = [
  {name:'Bob' , age: 30, voted: true},
  {name:'Jake' , age: 32, voted: true},
  {name:'Kate' , age: 25, voted: false},
  {name:'Sam' , age: 20, voted: false},
  {name:'Phil' , age: 21, voted: true},
  {name:'Ed' , age:55, voted:true},
  {name:'Tami' , age: 54, voted:true},
  {name: 'Mary', age: 31, voted: false},
  {name: 'Becky', age: 43, voted: false},
  {name: 'Joey', age: 41, voted: true},
  {name: 'Jeff', age: 30, voted: true},
  {name: 'Zack', age: 19, voted: false}
  ];
  // dùng hàm reduce
// 1. trả về một đối tượng
// Số lượng người vote từ 20-30 tuổi
const age20_30 =voters.filter((cur, i)=>cur.age>=20 && cur.age<=30)
                      .reduce((acc,cur)=>acc+1,0);
      console.log(age20_30)
      
// Số lượng người vote từ 30-40 tuổi
const age30_40=voters.reduce((acc,cur,i, arr)=>{
  if(cur.age>30 && cur.age<=40 )return acc +1
  else return acc;
}, 0)
console.log(age30_40)

// Số lượng người vote từ 40 trở lên
const age_40 =voters.reduce((acc,cur,i, arr)=>{
  if(cur.age>40 )return acc +1
  else return acc;
}, 0)
console.log(age_40)

  