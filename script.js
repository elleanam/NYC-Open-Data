let data;

async function init() {

  let link =
  "https://data.cityofnewyork.us/resource/vfnx-vebw.json?$limit=500";

  let response = await fetch(link);

  data = await response.json();

  if(document.getElementById("output")){
    displayData(data);
  }

  if(document.getElementById("myChart")){
    createChart();
  }
}

function displayData(arr){

  let output = document.getElementById("output");

  let build = "";

  for(let i = 0; i < arr.length; i++){

    let squirrel = arr[i];

    build += `
    <div class="fitted card">

      <h3>${squirrel.unique_squirrel_id || "Squirrel"}</h3>

      <hr>

      <p><b>Fur Color:</b>
      ${squirrel.primary_fur_color || "Unknown"}</p>

      <p><b>Age:</b>
      ${squirrel.age || "Unknown"}</p>

      <p><b>Shift:</b>
      ${squirrel.shift || "Unknown"}</p>

      <p><b>Location:</b>
      ${squirrel.location || "Unknown"}</p>

    </div>
    `;
  }

  output.innerHTML = build;
}

function filterByColor(){

  let color =
  document.getElementById("furColor").value.toLowerCase();

  let filtered = [];

  for(let squirrel of data){

    if(
      squirrel.primary_fur_color &&
      squirrel.primary_fur_color.toLowerCase().includes(color)
    ){
      filtered.push(squirrel);
    }
  }

  document.getElementById("result").innerHTML =
  filtered.length + " Results Found";

  displayData(filtered);
}

function filterByAge(){

  let age =
  document.getElementById("age").value.toLowerCase();

  let filtered = [];

  for(let squirrel of data){

    if(
      squirrel.age &&
      squirrel.age.toLowerCase().includes(age)
    ){
      filtered.push(squirrel);
    }
  }

  document.getElementById("result").innerHTML =
  filtered.length + " Results Found";

  displayData(filtered);
}

function filterByShift(){

  let shift =
  document.getElementById("shift").value.toUpperCase();

  let filtered = [];

  for(let squirrel of data){

    if(squirrel.shift == shift){
      filtered.push(squirrel);
    }
  }

  document.getElementById("result").innerHTML =
  filtered.length + " Results Found";

  displayData(filtered);
}

function createChart(){

  let gray = 0;
  let black = 0;
  let cinnamon = 0;

  for(let squirrel of data){

    if(squirrel.primary_fur_color === "Gray") gray++;
    if(squirrel.primary_fur_color === "Black") black++;
    if(squirrel.primary_fur_color === "Cinnamon") cinnamon++;
  }

  const ctx =
  document.getElementById("myChart");

  new Chart(ctx, {

    type: "pie",

    data: {

      labels: [
        "Gray",
        "Black",
        "Cinnamon"
      ],

      datasets: [{

        label: "Fur Colors",

        data: [
          gray,
          black,
          cinnamon
        ],

        backgroundColor: [
          "gray",
          "black",
          "#C46A3A"
        ]

      }]
    }
  });
}