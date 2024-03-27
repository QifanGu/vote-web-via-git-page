// 1. 初始化 Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCUaxhfOmvdJoTQULV6s1kYLL7CnHg3y80",
    authDomain: "web-vote-dbd56.firebaseapp.com",
    databaseURL: "https://web-vote-dbd56-default-rtdb.firebaseio.com",
    projectId: "web-vote-dbd56",
    storageBucket: "web-vote-dbd56.appspot.com",
    messagingSenderId: "834797078823",
    appId: "1:834797078823:web:07d297cc68117db6c64102",
    measurementId: "G-YZWKZESMQD"
};
firebase.initializeApp(firebaseConfig);

// 2. 更新数据库的函数
function vote(option) {
    var ref = firebase.database().ref('votes/' + option);
    ref.transaction(function(currentValue) {
        return (currentValue || 0) + 1;
    });
}

document.getElementById('trueButton').addEventListener('click', function() { vote('true'); });
document.getElementById('falseButton').addEventListener('click', function() { vote('false'); });

// 3. 读取数据并更新图表
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['True', 'False'],
        datasets: [{
            label: 'Votes',
            data: [0, 0], // 初始数据
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)'
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

// 监听数据库中的数据变化，并更新图表
firebase.database().ref('votes').on('value', (snapshot) => {
    const data = snapshot.val();
    myChart.data.datasets[0].data = [data.true || 0, data.false || 0];
    myChart.update();
});
