import WORKOUTS_JSON from "../../data/weekly-workouts.json" assert { type: "json" };

// Assign weeks data
const weeks = WORKOUTS_JSON.map(function (e) {
  return e.week;
});

// Assign workouts data
const workouts = WORKOUTS_JSON.map(function (e) {
  return e.workouts;
});

// Data for BarChart
const dataBarChart = {
  labels: weeks,
  datasets: [
    {
      label: "Workouts per Week",
      data: workouts,
    },
  ],
};

// Config for BarChart
const configBarChart = {
  type: "bar",
  data: dataBarChart,
  options: {
    plugins: {
      legend: false,
    },
    elements: {
      bar: {
        backgroundColor: "#0000FF",
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 25,
      },
    },
  },
};

// Instantiate BarChart
let weekly_workouts_chart = new Chart(
  document.getElementById("weekly-workouts-chart"),
  configBarChart
);
