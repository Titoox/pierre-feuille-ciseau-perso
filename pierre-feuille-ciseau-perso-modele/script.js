

function jouer(event) {
    document.getElementById("pierre").addEventListener("click", jouer);
    document.getElementById("feuille").addEventListener("click", jouer);
    document.getElementById("ciseaux").addEventListener("click", jouer);
    const options = ["pierre", "feuille", "ciseaux"];
    const nombre = Math.floor(Math.random() * 3);
    console.log(nombre);
    console.log(options[nombre]);

}