// ============================================================
// VARIABLES GLOBALES
// ============================================================
let score = 0;
let manches = 0;
let victoiresJoueur = 0;
let victoiresOrdinateur = 0;

// ============================================================
// ÉCOUTEURS D'ÉVÉNEMENTS
// ============================================================
document.getElementById("pierre").addEventListener("click", jouer);
document.getElementById("feuille").addEventListener("click", jouer);
document.getElementById("ciseaux").addEventListener("click", jouer);
document.getElementById("rejouer").addEventListener("click", rejouer);

// ============================================================
// FONCTION JOUER — appelée à chaque clic sur un choix
// ============================================================
function jouer(event) {
  // 1. Compter la manche et afficher l'écran de résultat
  manches++;
  document.getElementById("icones").style.display = "none";
  document.getElementById("affichage-choix").style.display = "flex";

  // 2. Récupérer les choix
  const choixJoueur = event.currentTarget.id;
  const options = ["pierre", "feuille", "ciseaux"];
  const choixOrdinateur = options[Math.floor(Math.random() * 3)];
  const icones = {
    pierre: "icon-rock.svg",
    feuille: "icon-paper.svg",
    ciseaux: "icon-scissors.svg",
  };
  document.getElementById("icone-joueur").innerHTML =
    `<img src="${icones[choixJoueur]}">`;
  document.getElementById("icone-ordi").innerHTML =
    `<img src="${icones[choixOrdinateur]}">`;

  if (choixJoueur === "pierre") {
    document.getElementById("icone-joueur").className = "border-pierre";
  } else if (choixJoueur === "feuille") {
    document.getElementById("icone-joueur").className = "border-feuille";
  } else {
    document.getElementById("icone-joueur").className = "border-ciseaux";
  }

  if (choixOrdinateur === "pierre") {
    document.getElementById("icone-ordi").className = "border-pierre";
  } else if (choixOrdinateur === "feuille") {
    document.getElementById("icone-ordi").className = "border-feuille";
  } else {
    document.getElementById("icone-ordi").className = "border-ciseaux";
  }
  // 3. Comparer et mettre à jour le score
  // === vérifie que les deux valeurs sont exactement égales
  // && = ET  |  || = OU
  if (choixJoueur === choixOrdinateur) {
    document.getElementById("resultat").textContent = "Égalité";
  } else if (
    (choixJoueur === "pierre" && choixOrdinateur === "ciseaux") ||
    (choixJoueur === "feuille" && choixOrdinateur === "pierre") ||
    (choixJoueur === "ciseaux" && choixOrdinateur === "feuille")
  ) {
    document.getElementById("resultat").textContent = "Gagné !";
    score++;
    victoiresJoueur++;
  } else {
    document.getElementById("resultat").textContent = "Perdu !";
    score--;
    victoiresOrdinateur++;
  }

  // 4. Mettre à jour le score affiché
  document.getElementById("score").textContent = score;

  // 5. Après 3 manches : afficher le résultat final + bouton rejouer
  if (manches === 3) {
    document.getElementById("rejouer").style.display = "block";

    if (victoiresJoueur > victoiresOrdinateur) {
      document.getElementById("resultat-final").textContent =
        "Victoire du joueur !";
    } else if (victoiresOrdinateur > victoiresJoueur) {
      document.getElementById("resultat-final").textContent =
        "Victoire de l'ordinateur !";
    } else {
      document.getElementById("resultat-final").textContent =
        "Égalité générale !";
    }
  }
  if (manches < 3) {
    setTimeout(function () {
      document.getElementById("icones").style.display = "flex";
      document.getElementById("affichage-choix").style.display = "none";
    }, 2000); // 2000 = 2 secondes
  }
}

// ============================================================
// FONCTION REJOUER — remet tout à zéro
// ============================================================
function rejouer() {
  score = 0;
  manches = 0;
  victoiresJoueur = 0;
  victoiresOrdinateur = 0;

  document.getElementById("score").textContent = 0;
  document.getElementById("resultat").textContent = "";
  document.getElementById("resultat-final").textContent = "";
  document.getElementById("rejouer").style.display = "none";
  document.getElementById("icones").style.display = "flex";
  document.getElementById("affichage-choix").style.display = "none";
}

// ============================================================
// MODALE RÈGLES
// ============================================================
document.getElementById("regles").addEventListener("click", function () {
  document.getElementById("modal-regles").style.display = "flex";
});

document.getElementById("fermer-modal").addEventListener("click", function () {
  document.getElementById("modal-regles").style.display = "none";
});

document
  .getElementById("modal-regles")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      this.style.display = "none";
    }
  });
