const gameEvents = new Map([
    [17,'GOAL'],
    [36,'Substitution'],
    [47,'GOAL'],
    [61,'Substitution'],
    [64,'Yellow card'],
    [69,'Red Card'],
    [70,'Substitution'],
    [72,'Substitution'],
    [76,'GOAL'],
    [80,'GOAL'],
    [92,'Yellow card'],
])

// 1.
console.log*gameEvents.values();
const events = new Set(gameEvents.values());
console.log(events)

// 2.
gameEvents.delete(64);

// 3.
console.log(`An event happened, on vergae, every ${gameEvents.size} minutes`)
const time =[...gameEvents.keys()].pop() 
console.log(`An event happened, on vergae, every ${time/gameEvents.size} minutes`)

// 4.
for(const [min, events] of gameEvents){
    const half= min<=45? 'FIRST': 'SECOND'
    console.log(`[${half} HALF] ${min}: ${events}`)
}