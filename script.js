// CONFIGURAÇÃO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBBS9DDIHiUgE9UHsYSGKW06JB3Ba8C4xQ",
  authDomain: "projeto-ti-verde.firebaseapp.com",
  projectId: "projeto-ti-verde",
  databaseURL: "https://projeto-ti-verde-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
let chartInstance = null;

// LOGIN ADMIN (Senha "disfarçada")
function verificarAcesso() {
    const entrada = document.getElementById('senhaAdmin').value;
    // O código abaixo verifica se a senha é "1234" sem escrever o número direto
    const chaveMestra = (617 * 2).toString(); 
    
    if (entrada === chaveMestra) {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('edit-panel').style.display = 'block';
    } else { 
        alert("Chave de acesso inválida!"); 
    }
}

function fazerLogout() {
    document.getElementById('login-box').style.display = 'block';
    document.getElementById('edit-panel').style.display = 'none';
    document.getElementById('senhaAdmin').value = "";
}

// BARRA DE PESQUISA FUNCIONAL
document.getElementById('barraPesquisa').addEventListener('keyup', function() {
    let busca = this.value.toLowerCase();
    let cards = document.querySelectorAll('.card-info');

    cards.forEach(card => {
        let textoCard = card.innerText.toLowerCase();
        card.style.display = textoCard.includes(busca) ? "block" : "none";
    });
});

// SINCRONIZAR COM BANCO DE DADOS
database.ref('dashboard').on('value', (snapshot) => {
    const d = snapshot.val();
    if (d && chartInstance) {
        chartInstance.data.datasets[0].data = [d.p, d.c, d.i];
        chartInstance.update();
    }
});

function atualizarDadosGrafico() {
    const p = document.getElementById('in-politica').value;
    const c = document.getElementById('in-coleta').value;
    const i = document.getElementById('in-interesse').value;
    database.ref('dashboard').set({ p, c, i }).then(() => alert("Impacto atualizado na nuvem!"));
}

// CALCULADORA
function calcularImpacto() {
    const q = document.getElementById('qtd-lixo').value;
    if(q > 0) {
        document.getElementById('resultado-impacto').innerText = `♻️ Recuperação estimada: ${(q * 0.25).toFixed(2)}kg de metais valiosos.`;
    }
}

// INICIALIZAR GRÁFICO
function initChart() {
    const ctx = document.getElementById('meuGrafico').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Políticas', 'Coleta', 'Interesse'],
            datasets: [{ label: '% de Impacto', data: [33, 70, 85], backgroundColor: '#1b3d17', borderRadius: 5 }]
        },
        options: { 
            responsive: true, 
            scales: { y: { beginAtZero: true, max: 100 } } 
        }
    });
}

window.onload = () => { setTimeout(initChart, 500); };