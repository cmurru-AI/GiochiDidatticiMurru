// Pulsanti "Copia il prompt" nei report di IA e Didattica
(function () {
  document.querySelectorAll("[data-copia]").forEach(function (pulsante) {
    var testo = document.getElementById(pulsante.getAttribute("data-copia"));
    var stato = pulsante.parentNode.querySelector(".copy-status");

    pulsante.addEventListener("click", function () {
      navigator.clipboard.writeText(testo.textContent.trim()).then(function () {
        stato.textContent = "Prompt copiato.";
      }, function () {
        stato.textContent = "Copia non riuscita: seleziona il testo e copialo a mano.";
      });
    });
  });
})();
