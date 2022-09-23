const ctx = document.getElementById('myChart').getContext('2d');
const dataFromPug = document.getElementById('data');
const preData = dataFromPug.classList.value.split("'");
const data = preData[1].split(",");

const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Total passagers', 'RechercheAlive', 'RechercheDead'],
        datasets: [{
            label: 'All',
            data: data,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});