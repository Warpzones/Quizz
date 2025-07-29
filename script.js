// Thème sombre
window.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleTheme');
    let dark = false;
    toggleBtn.addEventListener('click', function() {
        dark = !dark;
        document.body.classList.toggle('dark', dark);
        toggleBtn.textContent = dark ? '☀️ Thème clair' : '🌙 Thème sombre';
    });
    // Appliquer la couleur des boutons de thèmes au chargement
    setTimeout(() => {
        document.querySelectorAll('.theme-btn').forEach(b => {
            const t = b.getAttribute('data-theme');
            if (typeof selectedThemes !== 'undefined' && selectedThemes.includes(t)) {
                b.classList.remove('unselected');
            } else {
                b.classList.add('unselected');
            }
        });
    }, 100);
});
document.getElementById('soloBtn').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    showConfig('solo');
});
document.getElementById('multiBtn').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    showConfig('multi');
});

// Structure enrichie des questions avec QCM et sous-catégories détaillées
const questions = [
    // Géographie
    {
        categorie: "Géographie",
        sousCategorie: "Capitale",
        questionLibre: "Quelle est la capitale de la France ?",
        questionQCM: "Quelle est la capitale de la France ?",
        qcm: ["Paris", "Lyon", "Marseille"],
        questionVF: "Paris est la capitale de la France.",
        reponseVF: true,
        reponse: "Paris",
        explication: "La capitale de la France est Paris.",
        difficulte: 1
    },
    {
        categorie: "Géographie",
        sousCategorie: "Capitale",
        questionLibre: "Quelle est la capitale de l'Allemagne ?",
        questionQCM: "Quelle est la capitale de l'Allemagne ?",
        qcm: ["Berlin", "Munich", "Francfort"],
        questionVF: "Munich est la capitale de l'Allemagne.",
        reponseVF: false,
        reponse: "Berlin",
        explication: "La capitale de l'Allemagne est Berlin.",
        difficulte: 2
    },
    {
        categorie: "Géographie",
        sousCategorie: "Capitale",
        questionLibre: "Quelle est la capitale de l'Italie ?",
        questionQCM: "Quelle est la capitale de l'Italie ?",
        qcm: ["Rome", "Milan", "Venise"],
        questionVF: "Rome est la capitale de l'Italie.",
        reponseVF: true,
        reponse: "Rome",
        explication: "La capitale de l'Italie est Rome.",
        difficulte: 1
    },
    // Histoire
    {
        categorie: "Histoire",
        sousCategorie: "18e siècle/Révolution française",
        questionLibre: "En quelle année a eu lieu la Révolution française ?",
        questionQCM: "En quelle année a eu lieu la Révolution française ?",
        qcm: ["1789", "1848", "1917"],
        questionVF: "La Révolution française a eu lieu en 1789.",
        reponseVF: true,
        reponse: "1789",
        explication: "La Révolution française a eu lieu en 1789.",
        difficulte: 2
    },
    {
        categorie: "Histoire",
        sousCategorie: "20e siècle/WW1",
        questionLibre: "En quelle année a commencé la Première Guerre mondiale ?",
        questionQCM: "En quelle année a commencé la Première Guerre mondiale ?",
        qcm: ["1914", "1939", "1945"],
        questionVF: "La Première Guerre mondiale a commencé en 1939.",
        reponseVF: false,
        reponse: "1914",
        explication: "La Première Guerre mondiale a commencé en 1914.",
        difficulte: 3
    },
    {
        categorie: "Histoire",
        sousCategorie: "20e siècle/WW2",
        questionLibre: "En quelle année a commencé la Seconde Guerre mondiale ?",
        questionQCM: "En quelle année a commencé la Seconde Guerre mondiale ?",
        qcm: ["1939", "1914", "1945"],
        questionVF: "La Seconde Guerre mondiale a commencé en 1939.",
        reponseVF: true,
        reponse: "1939",
        explication: "La Seconde Guerre mondiale a commencé en 1939.",
        difficulte: 2
    },
    // Sciences
    {
        categorie: "Sciences",
        sousCategorie: "Physique",
        questionLibre: "Quel est le symbole chimique de l'eau ?",
        questionQCM: "Quel est le symbole chimique de l'eau ?",
        qcm: ["H2O", "CO2", "O2"],
        questionVF: "H2O est le symbole chimique de l'eau.",
        reponseVF: true,
        reponse: "H2O",
        explication: "Le symbole chimique de l'eau est H2O.",
        difficulte: 1
    },
    // Fun Facts
    {
        categorie: "Fun Facts",
        sousCategorie: "Animaux",
        questionLibre: "Quel est l'animal le plus rapide du monde ?",
        questionQCM: "Quel est l'animal le plus rapide du monde ?",
        qcm: ["Guépard", "Lion", "Aigle"],
        questionVF: "Le guépard est l'animal le plus rapide du monde.",
        reponseVF: true,
        reponse: "Guépard",
        explication: "Le guépard est l'animal le plus rapide du monde.",
        difficulte: 2
    }
];

// Catégories, sous-catégories et sous-sous-catégories dynamiques
const themes = {
    "Géographie": {
        "Capitale": null
    },
    "Histoire": {
        "18e siècle": {
            "Révolution française": null
        },
        "20e siècle": {
            "WW1": null,
            "WW2": null
        }
    },
    "Sciences": {
        "Physique": null
    },
    "Fun Facts": {
        "Animaux": null
    }
};
// Pour permettre de cocher "Fun Facts" ET ses sous-catégories, il faut ajouter la structure suivante :
themes["Fun Facts"] = {
    "Animaux": null
};

let currentQuestion = 0;
let quizQuestions = [];
let maxScore = 0;

function showConfig(mode) {
    const config = document.getElementById('config');
    config.style.display = 'block';
    if (mode === 'solo') {
        // Génération du formulaire de configuration
        let themeHtml = `<h2 class='config-title'>Configuration de la partie (Solo)</h2><form id="configForm">`;
        themeHtml += '<div id="themeSelect" class="theme-select">';
        Object.keys(themes).forEach(theme => {
            const nbQ = questions.filter(q => q.categorie === theme).length;
            themeHtml += `<button type='button' class='theme-btn' data-theme='${theme}'>${theme}<br><span class='theme-count'>${nbQ} questions</span></button>`;
        });
        themeHtml += '</div>';
        themeHtml += '<div id="sousCatDiv" class="souscat-select"></div>';
        themeHtml += `<div class='config-options'><strong>Objectif :</strong><br>
            <label><input type='radio' name='objectif' value='nbQuestions' checked> Nombre de questions</label>
            <input type='number' id='nbQuestions' name='nbQuestions' min='1' max='20' value='5'>
            <label><input type='radio' name='objectif' value='goalPoints'> Nombre de points à atteindre</label>
            <input type='number' id='goalPoints' name='goalPoints' min='1' max='100' value='10' disabled>
        </div>`;
        themeHtml += `<div class='config-options'><strong>Type de question :</strong><br>
            <label><input type='radio' name='typeQuestion' value='ouverte' checked> Réponse libre</label>
            <label><input type='radio' name='typeQuestion' value='qcm'> QCM</label>
            <label><input type='radio' name='typeQuestion' value='vf'> Vrai/Faux</label>
        </div>`;
        themeHtml += `<div class='config-options'><label><input type='checkbox' id='autoValidation'> Auto-validation</label></div>`;
        themeHtml += `<div class='config-options' id='delayedValidationDiv' style='display:none;'><label><input type='checkbox' id='delayedValidation'> Validation différée (revenir sur les questions pour valider)</label></div>`;
        themeHtml += `<button type='submit' class='config-start'>Commencer</button></form>`;
        config.innerHTML = themeHtml;

        // Sélection des thèmes (boutons-cadres)
        let selectedThemes = Object.keys(themes);
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const theme = btn.getAttribute('data-theme');
                if (selectedThemes.includes(theme)) {
                    selectedThemes = selectedThemes.filter(t => t !== theme);
                } else {
                    selectedThemes.push(theme);
                }
                document.querySelectorAll('.theme-btn').forEach(b => {
                    const t = b.getAttribute('data-theme');
                    b.classList.toggle('unselected', !selectedThemes.includes(t));
                });
                updateSousCat();
            });
        });

        // Sous-catégories en accordéon
        function updateSousCat() {
            let sousCatHtml = '';
            selectedThemes.forEach(theme => {
                sousCatHtml += `<details open><summary>${theme}</summary>`;
                const sousCats = themes[theme];
                Object.keys(sousCats).forEach(sous => {
                    if (sousCats[sous] === null) {
                        const nbQ = questions.filter(q => q.categorie === theme && q.sousCategorie === sous).length;
                        sousCatHtml += `<label><input type='checkbox' name='sousCat' value='${theme}::${sous}' checked> ${sous} <span class='theme-count'>(${nbQ})</span></label>`;
                    } else {
                        sousCatHtml += `<details open><summary>${sous}</summary>`;
                        Object.keys(sousCats[sous]).forEach(sss => {
                            const nbQ = questions.filter(q => q.categorie === theme && q.sousCategorie === `${sous}/${sss}`).length;
                            sousCatHtml += `<label><input type='checkbox' name='sousCat' value='${theme}::${sous}/${sss}' checked> ${sss} <span class='theme-count'>(${nbQ})</span></label>`;
                        });
                        sousCatHtml += '</details>';
                    }
                });
                sousCatHtml += '</details>';
            });
            document.getElementById('sousCatDiv').innerHTML = sousCatHtml;
        }
        updateSousCat();

        // Objectif exclusif
        document.getElementsByName('objectif').forEach(radio => {
            radio.addEventListener('change', function() {
                document.getElementById('nbQuestions').disabled = this.value !== 'nbQuestions';
                document.getElementById('goalPoints').disabled = this.value !== 'goalPoints';
            });
        });

        // Désactive le mode points si auto-validation cochée
        document.getElementById('autoValidation').addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('delayedValidationDiv').style.display = '';
                document.querySelector('input[name="typeQuestion"][value="ouverte"]').checked = true;
                document.querySelectorAll('input[name="typeQuestion"]').forEach(el => {
                    if (el.value !== 'ouverte') el.disabled = true;
                });
            } else {
                document.getElementById('delayedValidationDiv').style.display = 'none';
                document.querySelectorAll('input[name="typeQuestion"]').forEach(el => {
                    el.disabled = false;
                });
            }
        });
        document.getElementById('delayedValidation').addEventListener('change', function() {
            if (this.checked) {
                document.querySelector('input[name="objectif"][value="goalPoints"]').checked = false;
                document.querySelector('input[name="objectif"][value="nbQuestions"]').checked = true;
                document.getElementById('goalPoints').disabled = true;
                document.querySelectorAll('input[name="objectif"]').forEach(el => {
                    el.disabled = true;
                });
            } else {
                document.getElementById('goalPoints').disabled = false;
                document.querySelectorAll('input[name="objectif"]').forEach(el => {
                    el.disabled = false;
                });
            }
        });
        document.getElementById('configForm').onsubmit = function(e) {
            e.preventDefault();
            const selectedSousCats = Array.from(document.querySelectorAll('input[name="sousCat"]:checked')).map(e => e.value);
            const typeQuestion = document.querySelector('input[name="typeQuestion"]:checked').value;
            let objectif = document.querySelector('input[name="objectif"]:checked').value;
            let nbQuestions = parseInt(document.getElementById('nbQuestions').value);
            let goalPoints = parseInt(document.getElementById('goalPoints').value);
            let autoValidation = document.getElementById('autoValidation').checked;
            let delayedValidation = document.getElementById('delayedValidation').checked;
            if (delayedValidation) {
                objectif = 'nbQuestions';
                goalPoints = 0;
            }
            startQuiz({
                themes: selectedThemes,
                sousCats: selectedSousCats,
                typeQuestion,
                objectif,
                nbQuestions,
                goalPoints,
                autoValidation,
                delayedValidation
            });
        };
    } else {
        config.innerHTML = `<h2>Configuration de la partie (Multijoueur)</h2><p>À venir...</p>`;
    }
}

let quizConfig = {};
let score = 0;
let questionCount = 0;

function startQuiz(config) {
    quizConfig = config;
    score = 0;
    currentQuestion = 0;
    // Filtrer les questions selon la config
    quizQuestions = questions.filter(q => {
        const themeMatch = config.themes.includes(q.categorie);
        const sousCatMatch = config.sousCats.length === 0 || config.sousCats.includes(q.categorie + '::' + q.sousCategorie);
        return themeMatch && sousCatMatch;
    });
    // Limiter le nombre de questions si besoin
    if (config.objectif === 'nbQuestions') {
        quizQuestions = quizQuestions.slice(0, config.nbQuestions);
        // Calcul du score max selon la difficulté et le type de question
        maxScore = quizQuestions.reduce((acc, q) => {
            if (config.typeQuestion === 'qcm') {
                return acc + (q.difficulte * 0.5);
            } else if (config.typeQuestion === 'vf') {
                return acc + (q.difficulte * 0.25);
            } else {
                return acc + q.difficulte;
            }
        }, 0);
    } else {
        maxScore = config.goalPoints;
    }
    if (quizQuestions.length === 0) {
        document.getElementById('config').style.display = 'block';
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('quiz').innerHTML = `<p style='color:red;'>Aucune question ne correspond à votre sélection. Veuillez choisir au moins une sous-catégorie avec des questions.</p>`;
        return;
    }
    document.getElementById('config').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= quizQuestions.length || (quizConfig.objectif === 'goalPoints' && score >= quizConfig.goalPoints)) {
        if (quizConfig.delayedValidation) {
            // Affiche la liste des réponses pour validation manuelle
            let recapHtml = `<h2>Validation des réponses</h2><form id='recapForm'>`;
            quizQuestions.forEach((q, i) => {
                recapHtml += `<div class='recap-question'><strong>Q${i+1} :</strong> ${q.questionLibre}<br>
                <span>Votre réponse : <input type='text' name='userAnswer${i}' value='${q.userAnswer || ''}'></span><br>
                <span>Bonne réponse : <strong>${q.reponse}</strong></span><br>
                <label><input type='checkbox' name='isCorrect${i}'> Je considère ma réponse correcte</label>
                <hr></div>`;
            });
            recapHtml += `<button type='submit'>Valider le score</button></form>`;
            document.getElementById('quiz').innerHTML = recapHtml;
            document.getElementById('recapForm').onsubmit = function(e) {
                e.preventDefault();
                let finalScore = 0;
                quizQuestions.forEach((q, i) => {
                    if (document.querySelector(`input[name='isCorrect${i}']`).checked) {
                        finalScore += q.difficulte || 1;
                    }
                });
                document.getElementById('quiz').innerHTML = `<h2>Quiz terminé !</h2><p>Score final : <strong>${finalScore} / ${quizQuestions.length}</strong></p>`;
            };
        } else {
            document.getElementById('quiz').innerHTML = `<h2>Quiz terminé !</h2><p>Score final : <strong>${score} / ${maxScore}</strong></p>`;
        }
        return;
    }
    const q = quizQuestions[currentQuestion];
    let inputHtml = '';
    if (quizConfig.typeQuestion === 'qcm') {
        let choices = q.qcm ? [...q.qcm] : [q.reponse];
        while (choices.length < 3) {
            let r = questions[Math.floor(Math.random()*questions.length)].reponse;
            if (!choices.includes(r)) choices.push(r);
        }
        choices = choices.sort(() => Math.random()-0.5);
        inputHtml = choices.map(c => `<button class='qcm' onclick="checkAnswer('${c}')">${c}</button>`).join('<br>');
        document.getElementById('quiz').innerHTML = `
            <h2>Question ${currentQuestion+1}</h2>
            <p><strong>Catégorie :</strong> ${q.categorie} | <strong>Sous-catégorie :</strong> ${q.sousCategorie}</p>
            <p>${q.questionQCM}</p>
            ${inputHtml}
            <div id="feedback"></div>
            <div style="margin-top:1em;"><strong>Score :</strong> ${score} / ${maxScore}</div>
        `;
    } else if (quizConfig.typeQuestion === 'vf') {
        inputHtml = `<label><input type='radio' name='vf' value='true'> Vrai</label> <label><input type='radio' name='vf' value='false'> Faux</label>
        <button onclick="checkAnswer()">Valider</button>`;
        document.getElementById('quiz').innerHTML = `
            <h2>Question ${currentQuestion+1}</h2>
            <p><strong>Catégorie :</strong> ${q.categorie} | <strong>Sous-catégorie :</strong> ${q.sousCategorie}</p>
            <p>${q.questionVF}</p>
            ${inputHtml}
            <div id="feedback"></div>
            <div style="margin-top:1em;"><strong>Score :</strong> ${score} / ${maxScore}</div>
        `;
    } else {
        inputHtml = `<input type="text" id="answer" placeholder="Votre réponse...">
        <button onclick="checkAnswer()">Valider</button>`;
        document.getElementById('quiz').innerHTML = `
            <h2>Question ${currentQuestion+1}</h2>
            <p><strong>Catégorie :</strong> ${q.categorie} | <strong>Sous-catégorie :</strong> ${q.sousCategorie}</p>
            <p>${q.questionLibre}</p>
            ${inputHtml}
            <div id="feedback"></div>
            <div style="margin-top:1em;"><strong>Score :</strong> ${score} / ${maxScore}</div>
        `;
    }
}

function checkAnswer(selectedQcm) {
    const q = quizQuestions[currentQuestion];
    const feedback = document.getElementById('feedback');
    let points = q.difficulte || 1;
    if (quizConfig.typeQuestion === 'qcm') {
        points = (q.difficulte || 1) * 0.5;
    } else if (quizConfig.typeQuestion === 'vf') {
        points = (q.difficulte || 1) * 0.25;
    }
    let correct = false;
    let userAnswer = "";
    if (quizConfig.typeQuestion === 'qcm') {
        userAnswer = selectedQcm;
        correct = userAnswer.toLowerCase() === q.reponse.toLowerCase();
    } else if (quizConfig.typeQuestion === 'vf') {
        userAnswer = document.querySelector('input[name="vf"]:checked')?.value;
        correct = (userAnswer === 'true' && q.reponseVF === true) || (userAnswer === 'false' && q.reponseVF === false);
    } else {
        userAnswer = document.getElementById('answer').value.trim();
        if (quizConfig.autoValidation) {
            feedback.innerHTML = `<span style='color:blue;'>Votre réponse : ${userAnswer}<br>Bonne réponse : <strong>${q.reponse}</strong><br>Décidez si elle est correcte !</span><br><button onclick='validerAuto(true)'>Bonne réponse</button> <button onclick='validerAuto(false)'>Mauvaise réponse</button>`;
            // Stocke la réponse pour la validation différée si besoin
            q.userAnswer = userAnswer;
            return;
        } else {
            correct = userAnswer.toLowerCase() === q.reponse.toLowerCase();
        }
    }
    if (correct) {
        score += points;
        feedback.innerHTML = `<span style='color:green;'>Bonne réponse ! (+${points} pts)</span><br><em>${q.explication}</em>`;
    } else {
        feedback.innerHTML = `<span style='color:red;'>Mauvaise réponse. La bonne réponse était : ${q.reponse}</span><br><em>${q.explication}</em>`;
    }
    currentQuestion++;
    setTimeout(() => {
        showQuestion();
    }, 1500);
}

// Pour l'auto-validation en mode libre
function validerAuto(isCorrect) {
    const q = quizQuestions[currentQuestion];
    const feedback = document.getElementById('feedback');
    let points = q.difficulte || 1;
    if (quizConfig.typeQuestion === 'qcm') {
        points = (q.difficulte || 1) * 0.5;
    } else if (quizConfig.typeQuestion === 'vf') {
        points = (q.difficulte || 1) * 0.25;
    }
    if (isCorrect) {
        score += points;
        feedback.innerHTML = `<span style='color:green;'>Bonne réponse ! (+${points} pts)</span><br><em>${q.explication}</em><br><strong>La bonne réponse était : ${q.reponse}</strong>`;
    } else {
        feedback.innerHTML = `<span style='color:red;'>Mauvaise réponse.</span><br><em>${q.explication}</em><br><strong>La bonne réponse était : ${q.reponse}</strong>`;
    }
    currentQuestion++;
    setTimeout(() => {
        showQuestion();
    }, 1800);
}
