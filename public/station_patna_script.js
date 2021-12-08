let x = [];
let y = [];
let z = [];

let labels = [0];
console.log("hi");

var ctx = document.getElementById("myChart").getContext("2d");

var chart1 = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: labels,
    datasets: [
      {
        label: "X",
        //backgroundColor: 'rgb(255, 99, 132)',
        borderColor: "rgb(255, 99, 132)",
        data: x,
      },
      {
        label: "Y",
        //backgroundColor: 'rgb(255, 99, 132)',
        borderColor: "rgb(0, 99, 132)",
        data: y,   
      },
    ],
  },

 
});

let threshold = 0;
const err = document.getElementById("error");
const statuss = document.getElementById("status");

const thresh_btn = document.getElementById("thresh-btn");
thresh_btn.addEventListener("click", () => {
  t = document.getElementById("threshold").value;
  console.log(t);
  threshold = t;
})




function detectEarthQuake(x){
  let count = 0;
  x.forEach(element => {
    if(element > threshold)
      count = count + 1;
  });

  if(count > 10){
    statuss.innerText = "EarthQuake detected!"
    console.log("Earthquake")
  }

  else{
    statuss.innerText = ""
    console.log("no Earthquake")
    console.log(count)
  }

}

let socket = io.connect("http://3.130.18.167:9000");

socket.on("patna", (data) => {
  console.log(data);
  if(labels.length > 150){
    labels.shift();
    x.shift();
    y.shift();
    z.shift();
    detectEarthQuake(x);
    detectEarthQuake(y);
  }
if(data.z < data.x || data.z < data.y)
  err.innerText = "Check sensor configuration"
else
  err.innerText = ""

  x.push(data.x);
  y.push(data.y);
  z.push(data.z);
  labels.push(labels[labels.length - 1] + 1);
  chart1.update(); 
});