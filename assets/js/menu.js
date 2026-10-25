// Menu mobile: apre e chiude la navigazione sotto i 650 px
(function () {
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu-principale");

  if (!toggle || !menu) return;

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    menu.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });
})();
