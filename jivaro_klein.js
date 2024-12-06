// Lädt Einträge aus LocalStorage beim Start
document.addEventListener("DOMContentLoaded", ladeEintraege);

function neueZeile() {
  const kw = document.getElementById("kw").value;
  const datum = document.getElementById("datum").value;
  const uhrzeit = document.getElementById("uhrzeit").value;
  const name = document.getElementById("name").value;
  const notiz = document.getElementById("notiz").value;

  if (!kw || !datum || !uhrzeit || !name || !notiz) {
    alert("Bitte alle Felder ausfüllen.");
    return;
  }

  const tableBody = document.getElementById("table-body");
  const neueReihe = document.createElement("tr");

  neueReihe.innerHTML = `
        <td>${kw}</td>
        <td>${datum}</td>
        <td>${uhrzeit}</td>
        <td>${name}</td>
        <td>${notiz}</td>
        <td><button onclick="loescheZeile(this)">Löschen</button></td>
    `;

  tableBody.appendChild(neueReihe);

  // Speichern des Eintrags und des letzten Eintrags im LocalStorage
  speichereEintraege(); // Speichert alle Einträge
  speichereLetztenEintrag(kw, datum, uhrzeit, name, notiz); // Speichert nur den letzten Eintrag

  // Eingabefelder leeren
  document.getElementById("kw").value = "";
  document.getElementById("datum").value = "";
  document.getElementById("uhrzeit").value = "";
  document.getElementById("name").value = "";
  document.getElementById("notiz").value = "";
}

function loescheZeile(button) {
  if (confirm("Möchten Sie diesen Eintrag wirklich löschen?")) {
    const zeile = button.parentElement.parentElement;
    zeile.remove();
    speichereEintraege(); // Speichert die aktualisierte Tabelle in LocalStorage
  }
}

function speichereEintraege() {
  const tableRows = document.querySelectorAll("#table-body tr");
  const eintraege = [];

  tableRows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length > 0) {
      const eintrag = {
        kw: cells[0].innerText,
        datum: cells[1].innerText,
        uhrzeit: cells[2].innerText,
        name: cells[3].innerText,
        notiz: cells[4].innerText,
      };
      eintraege.push(eintrag);
    }
  });

  // Speichern der Einträge in LocalStorage mit einem eindeutigen Schlüssel
  localStorage.setItem("eintraege_Jivaro_klein", JSON.stringify(eintraege));
}

function speichereLetztenEintrag(kw, datum, uhrzeit, name, notiz) {
  const letzterEintrag = {
    kw: kw,
    datum: datum,
    uhrzeit: uhrzeit,
    name: name,
    notiz: notiz,
  };

  // Speichern des letzten Eintrags im LocalStorage
  localStorage.setItem(
    "letzterEintrag_Jivaro_klein",
    JSON.stringify(letzterEintrag)
  );
}

function ladeEintraege() {
  const gespeicherteEintraege = JSON.parse(
    localStorage.getItem("eintraege_Jivaro_klein")
  );
  if (gespeicherteEintraege) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Tabelle leeren, bevor sie gefüllt wird

    gespeicherteEintraege.forEach((eintrag) => {
      const neueReihe = document.createElement("tr");
      neueReihe.innerHTML = `
                <td>${eintrag.kw}</td>
                <td>${eintrag.datum}</td>
                <td>${eintrag.uhrzeit}</td>
                <td>${eintrag.name}</td>
                <td>${eintrag.notiz}</td>
                <td><button onclick="loescheZeile(this)">Löschen</button></td>
            `;
      tableBody.appendChild(neueReihe);
    });
  }
}
