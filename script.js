document.getElementById('soloBtn').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    showConfig('solo');
});
document.getElementById('multiBtn').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    showConfig('multi');
});

function showConfig(mode) {
    const config = document.getElementById('config');
    config.style.display = 'block';
    config.innerHTML = `<h2>Configuration de la partie (${mode === 'solo' ? 'Solo' : 'Multijoueur'})</h2>
        <p>Fonctionnalités à venir : choix des thèmes, temps, type de questions...</p>
        <button onclick="startQuiz()">Commencer</button>`;
}

function startQuiz() {
    document.getElementById('config').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('quiz').innerHTML = '<h2>Quiz en cours...</h2><p>Les questions apparaîtront ici.</p>';
}
