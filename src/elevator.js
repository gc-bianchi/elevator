const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// set base and max floors as constants
// that way we only need to change them in one place, and the rest of the code will still work
const baseFloor = 0;
const maxNumberOfFloors = 163;
const singleFloorTravelTimeInSeconds = 10;

// function to prompt the user to enter their current floor
function askCurrentFloor() {
  return new Promise((resolve) => {
    rl.question(
      `Please enter current floor (${baseFloor}-${maxNumberOfFloors}): `,
      (answer) => {
        // convert string input to an integer
        const currentFloor = parseInt(answer);

        // data validation to determine whether the input is valid
        // data validation is used to prevent the user from inputting invalid data that could cause the program to crash or produce incorrect results.
        if (
          isNaN(currentFloor) ||
          currentFloor < baseFloor ||
          currentFloor > maxNumberOfFloors
        ) {
          console.log("Invalid input, please try again.");
          resolve(askCurrentFloor());
        } else {
          resolve(currentFloor);
        }
      }
    );
  });
}

// function to prompt user to enter list of floors to travel to
function askDestinationFloors() {
  return new Promise((resolve) => {
    rl.question(
      "Please enter destination floors separated by commas: ",
      (answer) => {
        // convert input into an array
        const floorsArray = answer
          .split(",")
          .map((floor) => parseInt(floor.trim()));

        // data validation to determine whether the input is valid
        // data validation is used to prevent the user from inputting invalid data that could cause the program to crash or produce incorrect results.
        if (
          floorsArray.some(
            (floor) =>
              isNaN(floor) || floor < baseFloor || floor > maxNumberOfFloors
          )
        ) {
          console.log("Invalid input, please try again.");
          resolve(askDestinationFloors());
        } else {
          resolve(floorsArray);
        }
      }
    );
  });
}

// function to remove duplicate values if they are adjacent to each other in the list
// because there would be no elevator movement between these values
function removeAdjacentDuplicates(array) {
  return array.filter((val, index) => val !== array[index + 1]);
}

module.exports = {
  askCurrentFloor,
  removeAdjacentDuplicates,
  askDestinationFloors
};

async function main() {
  const currentFloor = await askCurrentFloor();
  const destinationFloors = await askDestinationFloors();
  const destinationFloorsWithDuplicateValuesRemoved =
    removeAdjacentDuplicates(destinationFloors);

  // calculate the differences in each value of the list of floors.
  // This determines how many floors were passed during travel time.
  // We push these values into an array which we will later use
  const differences = destinationFloorsWithDuplicateValuesRemoved.reduce(
    (acc, curr, index, arr) => {
      // if it's the first value in the list, we subtract the current floor with the intial floor in the list
      if (index === 0) {
        acc.push(Math.abs(currentFloor - arr[index]));
      }
      // otherwise we subtract current list value starting at index 1, but the previous value
      else if (index > 0) {
        acc.push(Math.abs(curr - arr[index - 1]));
      }
      // we push all of these into our initial value in the reduce function, which is an empty array
      return acc;
    },
    []
  );

  // we use the reduce function to add all the values in the array calculated from const differences
  // this number represents the number of floors visited
  const numberOfFloorsVisited = differences.reduce(
    (acc, curr) => acc + curr,
    0
  );

  // multiply number of floors traveled by time it takes to travel to a single floor to calculate total travel time
  const totalTravelTime =
    numberOfFloorsVisited * singleFloorTravelTimeInSeconds;

  // if the initial floor is equal to the list of floors traveled to, then it is omitted from the list of floors traveled to because it is redundant
  // otherwise, add the initial floor to the list of floors traveled to
  if (currentFloor != destinationFloorsWithDuplicateValuesRemoved[0]) {
    destinationFloorsWithDuplicateValuesRemoved.unshift(currentFloor);
  }

  console.log("Total travel time:", totalTravelTime);
  console.log(
    "Floors visited in order:",
    destinationFloorsWithDuplicateValuesRemoved
  );
  rl.close();
}

main();
