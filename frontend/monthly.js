const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
];

// Disease data (example realistic pattern)
const data = {
    potatoBlight: [60, 25, 55, 20, 10, 5, 3, 2, 5, 15, 20, 30],
    tomatoLeafMold: [20, 30, 40, 50, 45, 35, 25, 20, 18, 22, 28, 35],
    leafSpot: [15, 20, 25, 30, 28, 22, 18, 15, 14, 16, 20, 24],
    bacterialWilt: [10, 12, 15, 18, 20, 22, 25, 27, 24, 20, 16, 12],
    earlyBlight: [30, 35, 45, 55, 50, 40, 30, 25, 28, 35, 40, 45]
};

new Chart(document.getElementById("monthlyChart"), {
    type: "bar",
    data: {
        labels: months,
        datasets: [
            {
                label: "Potato Blight",
                data: data.potatoBlight,
                backgroundColor: "#ef4444",
                borderRadius: 10
            },
            {
                label: "Tomato Leaf Mold",
                data: data.tomatoLeafMold,
                backgroundColor: "#f59e0b",
                borderRadius: 10
            },
            {
                label: "Leaf Spot",
                data: data.leafSpot,
                backgroundColor: "#3b82f6",
                borderRadius: 10
            },
            {
                label: "Bacterial Wilt",
                data: data.bacterialWilt,
                backgroundColor: "#8b5cf6",
                borderRadius: 10
            },
            {
                label: "Early Blight",
                data: data.earlyBlight,
                backgroundColor: "#14b8a6",
                borderRadius: 10
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    boxWidth: 18,
                    font: {
                        size: 13
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "#e5e7eb"
                },
                title: {
                    display: true,
                    text: "Disease Severity Level"
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});
