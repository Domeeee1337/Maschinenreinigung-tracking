document.addEventListener("DOMContentLoaded", function () {
  // Funktion zum Laden der letzten Einträge jeder Seite aus LocalStorage
  function ladeLetzteEintraege() {
    const lastEntriesContainer = document.getElementById("last-entries");

    const maschinen = [
      { name: "Jivaro klein", key: "eintraege_Jivaro_klein" },
      { name: "Jivaro groß", key: "eintraege_Jivaro_gross" },
      { name: "Lantech klein", key: "eintraege_Lantech_klein" },
      { name: "Lantech groß", key: "eintraege_Lantech_gross" },
    ];

    maschinen.forEach((maschine) => {
      const gespeicherteEintraege = JSON.parse(
        localStorage.getItem(maschine.key)
      );

      if (gespeicherteEintraege && gespeicherteEintraege.length > 0) {
        const letzterEintrag =
          gespeicherteEintraege[gespeicherteEintraege.length - 1];

        const eintragZeile = document.createElement("tr");
        eintragZeile.innerHTML = `
                    <td>${maschine.name}</td>
                    <td>${letzterEintrag.kw}</td>
                    <td>${letzterEintrag.datum}</td>
                    <td>${letzterEintrag.uhrzeit}</td>
                    <td>${letzterEintrag.name}</td>
                    <td>${letzterEintrag.notiz}</td>
                `;
        lastEntriesContainer.appendChild(eintragZeile);
      } else {
        const eintragZeile = document.createElement("tr");
        eintragZeile.innerHTML = `<td colspan="6">Keine Einträge gefunden</td>`;
        lastEntriesContainer.appendChild(eintragZeile);
      }
    });
  }

  ladeLetzteEintraege();
});
