const ctx = document.getElementById('myChart').getContext('2d')
const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Total passagers', 'femme 30 1class'],
    datasets: [
      {
        label: 'Total passagers',
        data: [891, 423],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 0, 0, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 0, 0, 1)'],
        borderWidth: 0.5,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
})
