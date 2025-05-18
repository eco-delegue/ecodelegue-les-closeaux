let planning = JSON.parse(localStorage.getItem("roulement") || "[]");
const tbody = document.getElementById("planning");

function afficherPlanning() {
  tbody.innerHTML = "";
  planning.forEach((e, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${e.date}</td>
      <td>${e.eleves}</td>
      <td><button onclick="supprimerEntree(${index})">Supprimer</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function ajouterEntree() {
  const date = document.getElementById("date").value;
  const noms = document.getElementById("noms").value.trim();
  if (!date || !noms) return;
  planning.push({ date, eleves: noms });
  localStorage.setItem("roulement", JSON.stringify(planning));
  afficherPlanning();
  document.getElementById("date").value = "";
  document.getElementById("noms").value = "";
}

function supprimerEntree(index) {
  planning.splice(index, 1);
  localStorage.setItem("roulement", JSON.stringify(planning));
  afficherPlanning();
}

function sauvegarder() {
  const blob = new Blob([JSON.stringify(planning, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "planning_brouillons.json";
  a.click();
  URL.revokeObjectURL(url);
}

afficherPlanning();

