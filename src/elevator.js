// const maxFloor= parseInt(prompt("What is the maximum floor in the building?"));
// const floorList = prompt("Please enter the list of floors you want to visit, separated by commas:")
//   .split(",")
//   .map(floor => parseInt(floor));



const currentFloor = 12;
const destinationFloors = [2, 9, 1, 32];
const singleFloorTravelTimeInSeconds = 10;

const differences = destinationFloors.reduce((acc, curr, index, arr) => {
  if (index === 0) {
    acc.push(Math.abs(currentFloor - arr[index]));
  } else if (index > 0) {
    acc.push(Math.abs(curr - arr[index - 1]));
  }
  return acc;
}, []);

const sumOfDifferences = differences.reduce((acc, curr) => acc + curr, 0);
const totalTravelTime = sumOfDifferences * singleFloorTravelTimeInSeconds;

destinationFloors.unshift(currentFloor);

console.log("Total travel time:", totalTravelTime);
console.log("Floors visited in order:", destinationFloors);
