const grid = document.querySelector(".main");
const totalWaterEl = document.querySelector(".totalWater");
const input = document.querySelector(".input");

let constantInput;

input.addEventListener("keyup", () => {
  console.log(input.value);
  constantInput = JSON.parse(input.value);
});

const findWater = (heights) => {
  const n = heights.length;
  if (n === 0) return { water: 0, leftMax: [], rightMax: [] };

  let leftMax = new Array(n).fill(0);
  let rightMax = new Array(n).fill(0);
  let water = 0;

  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }

  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }

  for (let i = 0; i < n; i++) {
    water += Math.max(0, Math.min(leftMax[i], rightMax[i]) - heights[i]);
  }

  return { water, leftMax, rightMax };
};

const renderGrid = (heights, leftMax, rightMax) => {
  grid.innerHTML = "";
  const maxHeight = Math.max(...heights);

  for (let row = maxHeight; row >= 0; row--) {
    let rowDiv = document.createElement("div");

    for (let i = 0; i < heights.length; i++) {
      let cell = document.createElement("div");
      cell.style.width = "30px";
      cell.style.height = "30px";
      cell.style.border = "1px solid black";

      if (heights[i] > row) {
        cell.style.backgroundColor = "yellow";
      } else if (row < Math.min(leftMax[i], rightMax[i])) {
        cell.style.backgroundColor = "blue";
      }

      rowDiv.appendChild(cell);
    }
    grid.appendChild(rowDiv);
  }
};

const find = () => {
  const { water, leftMax, rightMax } = findWater(constantInput);
  totalWaterEl.innerHTML = `${water} units`;
  renderGrid(constantInput, leftMax, rightMax);
};
