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

// 初始化图表的函数
function initChart(dataTrue, dataFalse) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['True', 'False'],
            datasets: [{
                label: 'Votes',
                data: [dataTrue, dataFalse], // 使用实际数据初始化
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
}

// 页面加载时获取数据
firebase.database().ref('votes').once('value').then((snapshot) => {
    const data = snapshot.val() || { true: 0, false: 0 }; // 防止数据未定义
    initChart(data.true, data.false); // 使用获取的数据初始化图表
});
