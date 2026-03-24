// 1. Navegação Suave (Botões do menu)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 2. Gráfico (Dashboard)
const ctx = document.getElementById('meuGrafico');

if (ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Empresas', 'Público Geral', 'Descarte'],
            datasets: [{
                label: '% de Conscientização (N=20)',
                data: [33, 45, 20],
                backgroundColor: ['#1b3d17', '#4ade80', '#ef4444'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}