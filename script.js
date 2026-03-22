// ============================================================
// VARIABLES GLOBALES
// ============================================================
let manches = 0;
let victoiresJoueur = 0;
let victoiresOrdinateur = 0;

// Score global persistant (localStorage)
let scoreGlobal = parseInt(localStorage.getItem("scoreGlobal")) || 0;
document.getElementById("score").textContent = scoreGlobal;

// ============================================================
// ÉCOUTEURS D'ÉVÉNEMENTS
// ============================================================
document.getElementById("pierre").addEventListener("click", jouer);
document.getElementById("feuille").addEventListener("click", jouer);
document.getElementById("ciseaux").addEventListener("click", jouer);
document.getElementById("rejouer").addEventListener("click", rejouer);

// ============================================================
// FONCTION JOUER
// ============================================================
function jouer(event) {
  manches++;
  document.getElementById("icones").style.display = "none";
  document.getElementById("affichage-choix").style.display = "flex";
  document.getElementById("compteur-manches").style.display = "none";

  const choixJoueur = event.currentTarget.id;
  const options = ["pierre", "feuille", "ciseaux"];
  const choixOrdinateur = options[Math.floor(Math.random() * 3)];

  const icones = {
    pierre: "icon-rock.svg",
    feuille: "icon-paper.svg",
    ciseaux: "icon-scissors.svg",
  };
  document.getElementById("icone-joueur").innerHTML =
    '<img src="' + icones[choixJoueur] + '">';
  document.getElementById("icone-ordi").innerHTML =
    '<img src="' + icones[choixOrdinateur] + '">';

  const classes = {
    pierre: "border-pierre",
    feuille: "border-feuille",
    ciseaux: "border-ciseaux",
  };
  document.getElementById("icone-joueur").className = classes[choixJoueur];
  document.getElementById("icone-ordi").className = classes[choixOrdinateur];

  // Résultat de la manche (sans toucher au score global)
  if (choixJoueur === choixOrdinateur) {
    document.getElementById("resultat").textContent = "Egalite";
  } else if (
    (choixJoueur === "pierre" && choixOrdinateur === "ciseaux") ||
    (choixJoueur === "feuille" && choixOrdinateur === "pierre") ||
    (choixJoueur === "ciseaux" && choixOrdinateur === "feuille")
  ) {
    document.getElementById("resultat").textContent = "Gagne !";
    victoiresJoueur++;
  } else {
    document.getElementById("resultat").textContent = "Perdu !";
    victoiresOrdinateur++;
  }

  // Fin de partie : 3 manches OU victoire anticipée à 2
  const partieTerminee =
    manches === 3 || victoiresJoueur === 2 || victoiresOrdinateur === 2;

  if (partieTerminee) {
    document.getElementById("rejouer").style.display = "block";

    if (victoiresJoueur > victoiresOrdinateur) {
      document.getElementById("resultat-final").textContent = "Victoire !";
      scoreGlobal++;
    } else if (victoiresOrdinateur > victoiresJoueur) {
      document.getElementById("resultat-final").textContent = "Defaite...";
      scoreGlobal--;
    } else {
      document.getElementById("resultat-final").textContent = "Egalite !";
    }

    // Sauvegarder et afficher le score global
    localStorage.setItem("scoreGlobal", scoreGlobal);
    document.getElementById("score").textContent = scoreGlobal;
  } else {
    setTimeout(function () {
      document.getElementById("icones").style.display = "flex";
      document.getElementById("affichage-choix").style.display = "none";
      document.getElementById("compteur-manches").textContent =
        "Manche " + (manches + 1) + " / 3";
      document.getElementById("compteur-manches").style.display = "block";
    }, 2000);
  }
}

// ============================================================
// FONCTION REJOUER
// ============================================================
function rejouer() {
  manches = 0;
  victoiresJoueur = 0;
  victoiresOrdinateur = 0;

  document.getElementById("resultat").textContent = "";
  document.getElementById("resultat-final").textContent = "";
  document.getElementById("rejouer").style.display = "none";
  document.getElementById("icones").style.display = "flex";
  document.getElementById("affichage-choix").style.display = "none";
  document.getElementById("compteur-manches").textContent = "Manche 1 / 3";
  document.getElementById("compteur-manches").style.display = "block";
}

// ============================================================
// MODALE REGLES
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
