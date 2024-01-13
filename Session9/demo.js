const ordersSet = new Set([
    'piza',
    'pasta',
    'piza',
    'reisoto'
])
console.log(ordersSet)
console.log(ordersSet.values)
let staff = ['chucdoan', 'hoangnguyen', 'tuannguyen','chucdoan']
let staffUnique = [...new Set(staff)]
console.log(staffUnique)