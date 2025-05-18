// Chargement initial du planning
fetch("planning.json")
  .then(res => res.json())
  .then(planning => afficherPlanning(planning));

// Affichage dans le tableau
function afficherPlanning(planning) {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";
  planning.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.nom} (${entry.classe})</td>
      <td><button data-index="${index}">Supprimer</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Ajout d’un élève
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const date = document.getElementById("date").value;
  const nom = document.getElementById("nom").value;
  const classe = document.getElementById("classe").value;

  if (!date || !nom.trim() || !classe) return;

  fetch("planning.json")
    .then(res => res.json())
    .then(planning => {
      planning.push({ date, nom, classe });
      return fetch("save.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planning)
      });
    })
    .then(() => location.reload());
});

// Suppression d’un élève
document.querySelector("table").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.dataset.index;
    fetch("planning.json")
      .then(res => res.json())
      .then(planning => {
        planning.splice(index, 1);
        return fetch("save.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(planning)
        });
      })
      .then(() => location.reload());
  }
});
