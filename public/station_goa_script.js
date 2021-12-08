let x = [0];
let y = [0];
let z = [0];


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

  options:  {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero:true,
          min: -15,
          max: 15 
        }
      }]
    }
   // animation,
    // interaction: {
    //   intersect: false
    // },
    // plugins: {
    //   legend: false
    // },
    // scales: {
    //   x: {
    //     type: 'linear'
    //   }
    // }
  }
});


let socket = io.connect("http://3.130.18.167:9000");


let threshold = 0;
const err = document.getElementById("error");
const statuss = document.getElementById("status");

const thresh_btn = document.getElementById("thresh-btn");
thresh_btn.addEventListener("click", () => {
  t = document.getElementById("threshold");
  threshold = t;
})


function checkEarthQuake(x){
windows = 15;

num_points_thresh = 10; // number of points needed to cross threshold
// At position 2, remove 2 items: 
index = 0;
  while(index <= x.length){
      let check = x.slice(index, index + windows);
      let count = 0
      for(let i = 0 ; i < check.length ; i++){
          if(check[i] > threshold)
              count = count + 1;
      }
      if(count > num_points_thresh){
        statuss.innerText = "EarthQuake detected!"
          console.log("Earthquake")
      }
      console.log(check)
      index += windows
  }
}

socket.on("goa", (data) => {
  console.log(data);
  if(labels.length > 150){
    labels.shift();
    x.shift();
    y.shift();
    z.shift();
    checkEarthQuake(x);
    checkEarthQuake(y);
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

// const ctx = document.getElementById('myChart');
// const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Red', 'Blue',  'Green'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',

//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// })
