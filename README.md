# elevator

- The result should be an executable, or script, that can be run with the following inputs and generate the following outputs.
- Inputs: [list of floors to visit] (e.g elevator start=12 floor=2,9,1,32)
- Outputs: [total travel time, floors visited in order] (e.g 560 12,2,9,1,32)
- Program Constants: Single floor travel time: 10

# Assumptions
- Max number of floors is 163, which is the number of floors in the tallest building in the world currently (Burj Khalifa)
- Base floor is 0
- Start floor must be an integer greater than 0, less than or equal to 163
- List of floors to visit must have at least one value
- List of floors must all be integers greater than 0
- List of floors cannot have a value greater than max number of floors

# Features that weren’t implemented
- I wanted to prompt the user to set the max number of floors, but that wasn't part of the directions so I decided agsinst that
- I had initially wanted to sort the flooors so that we would travel to them in order, much like how a real elevator would function, but when I determined how total travel time was calculated I realized this was incorrect and was further confirmed by Monica via email