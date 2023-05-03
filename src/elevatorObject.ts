const elevatorObject = {
  currentFloor: 1,
  direction: "up",
  destinationFloors: [],
  maxFloor: 100,
  minFloor: 1,
  moveToFloor(floor: number) {
    if(floor === this.currentFloor){
        console.log(`Already on floor ${floor}`)
        return;
    }
    if(floor > this.maxFloor){
        console.log(`Max floor that can be reached is ${this.maxFloor}`);
        return;
    }
    // implementation for moving the elevator
    floor > this.currentFloor ? (this.direction = "up") : "down";

    this.destinationFloors.push(floor);

    this.sortFloors(this.direction);
    // Move the elevator to the next destination floor
    while (this.destinationFloors.length > 0) {
      const nextFloor = this.destinationFloors[0];

      console.log(`Moving to floor ${nextFloor}`);

      this.currentFloor = nextFloor;
      this.destinationFloors.shift();
    }
  },
  sortFloors(direction: string) {
    // Sort the destination floors based on the direction
    if (direction === "up") {
      this.destinationFloors.sort((a, b) => a - b);
    } else {
      this.destinationFloors.sort((a, b) => b - a);
    }
  },
  getCurrentFloor() {
    return this.currentFloor;
  },
};
