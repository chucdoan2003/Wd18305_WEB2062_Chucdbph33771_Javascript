const flights = 
'_Deleyed_Departure;fao93766109;txl2133758440;11:25+_Arrival;btu0943384722;fao93766109;11:45+_Delayed_arrival;hel74392299980;fao93766109;12:05+_Departure;fao93766109;list232369855;12:30'
console.log(flights.split('+'))
const flight2 = flights.split('+');

const getCode=str=>str.slice(0,3).toUpperCase()


for(const flight of flight2){
    const [type, from, to, time]=flight.split(';')
    const outPut = `${type.replaceAll('_',' ')} from ${getCode(from)} to ${getCode(to)} (${time.replace(':','h')})`
    console.log(outPut)

}