'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


/////////////////////////////////////////////////

//148: creating dom element
const displayMovements = function(acc){
  containerMovements.innerHTML=''
  acc.movements.forEach(function(mov, i){
    const type= mov>0 ? 'deposit' : 'withdrawal'
    const html =`
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)


  })
}

//create user name
const createUsername=(accs)=>{
  accs.forEach((acc)=>{
    acc.username=acc.owner.toLowerCase()
                          .split(' ')
                          .map(name=>name[0])
                          .join('')
  })

}
createUsername(accounts)
// tính tổng tiền
const totalDisplayMovements = (acc)=>{
      acc.balance = acc.movements.reduce((acc, cur)=>acc+cur, 0)
labelBalance.textContent=acc.balance+'€'
      
}



//calc display summary

const calcDisplaysummary=(movements)=>{
const incomes=movements.filter((mov)=>mov>0)
                        .reduce((acc, cur, i, arr)=>acc+cur, 0)
labelSumIn.textContent=incomes+'€'
const outcomes=movements.filter((mov)=>mov<0)
                        .reduce((acc, cur, i, arr)=>acc+cur, 0)
labelSumOut.textContent=Math.abs(outcomes)+'€'
const interest =movements.filter((mov)=>mov>0)
                        .map((mov)=>(mov*1.2)/100)
                        .filter((mov)=>mov>1)
                        .reduce((acc, cur, i, arr)=>acc+cur, 0)
labelSumInterest.textContent=interest+'€'
 }

//update ui
const updateUI=(acc)=>{
  totalDisplayMovements(acc)
    //show movements

    displayMovements(acc)
    //show summary
    calcDisplaysummary(acc.movements)
}

/** <--------------------------------------------------------> */
//159:implementing login (labs 4.1)
let currentUser

//event handler
btnLogin.addEventListener('click',(e)=>{
  e.preventDefault()
  currentUser=accounts.find((acc)=>acc.username===inputLoginUsername.value)
  if(currentUser?.pin===Number(inputLoginPin.value)){
    inputLoginPin.blur()
    inputLoginUsername.value=inputLoginPin.value=""
    // show ui
    containerApp.style.opacity=100
    //welcome
    labelWelcome.textContent=`Welcome back, ${currentUser.owner.split(' ')[0]}`
    //update UI
    updateUI(currentUser)
  }
})

/** <--------------------------------------------------------> */
//160:Implement transfers (labs 4 4.2)

btnTransfer.addEventListener('click',(e)=>{
  e.preventDefault()
  const amount=Number(inputTransferAmount.value)
  const receiverAcc=accounts.find(acc=>acc.username==inputTransferTo.value)

  if(amount>0
    && receiverAcc
    && amount<=currentUser.balance
    && receiverAcc?.username!=currentUser.username)
    {
      inputTransferTo.value=inputTransferAmount.value=""
      currentUser.movements.push(-amount)
      receiverAcc.movements.push(amount)

    }
    updateUI(currentUser)
    console.log(currentUser)
})



/** <--------------------------------------------------------> */
/*
//158: The find method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithrawal= movements.find((mov)=>mov<0)
console.log(firstWithrawal)

console.log(accounts)

const account = accounts.find(acc=>acc.owner==='Jessica Davis')
console.log(account)

/** <--------------------------------------------------------> */

//156: The magic of chaining Methods
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurotoUSD= 1.1
//Pipeline 
const totalDepositUSD=movements.filter((mov)=>mov>0)
                              .map((mov)=> mov*eurotoUSD)
                              .reduce((acc, cur)=>acc + cur, 0)
console.log(totalDepositUSD)


/** <--------------------------------------------------------> */

//154: The reduce method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//accumulator -> biến khởi tạo ban đầu
const balance = movements.reduce((acc, cur, i, arr)=>acc+cur, 0)
console.log(balance)

let balance2= 0;
for(const mov of movements){balance2+=mov;}
console.log(balance2)
//maximum
const max = movements.reduce((acc, cur, i, arr)=>{
  if(acc>cur) return acc
  else return cur
}, movements[0])
console.log(max)
// min
const min = movements.reduce((acc, cur, i, arr)=>{
  if(acc<cur) return acc
  else return cur
}, movements[0])
console.log(movements)
console.log(min)

/** <--------------------------------------------------------> */
/*

//153: The filter method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposit= movements.filter((mov)=>mov>0)
console.log(deposit)
console.log(movements)
const deposit2=[];
for(const mov of movements) if(mov>0) deposit2.push(mov)
console.log(deposit2)
const withdrawals = movements.filter((mov)=>mov<0)
console.log(withdrawals)
/** <--------------------------------------------------------> */
/*
//152: computing usernames
const user = 'Steven Thomas Williams'
const username = user.toLowerCase().split(' ').map(name=>name[0]).join('') //return array tách phần tử bên trong mảng
console.log(username)
const createUsername=(accs)=>{
  accs.forEach((acc)=>{
    acc.username=acc.owner.toLowerCase()
                          .split(' ')
                          .map(name=>name[0])
                          .join('')
  })

}
createUsername(accounts)
console.log((accounts))
/** <--------------------------------------------------------> */

//151: The map method
/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurotoUSD=1.1
const movementsUSD=movements.map((mov)=>mov*eurotoUSD)
console.log(movements)
console.log(movementsUSD)

const movementsUSD2=[]
for(const mov of movements) movementsUSD2.push(mov*eurotoUSD)
console.log(movementsUSD2)

const movementDiscription = movements.map(
  (mov, i, )=>
  `Movement ${i+1}: You ${mov >0 ? 'deposited':'withdrew'} ${Math.abs(mov)}`
  )
console.log(movementDiscription)*/
/** <--------------------------------------------------------> */


