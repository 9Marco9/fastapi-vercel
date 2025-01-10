import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Infobalken from "./Infobalken";
import Operationen from "./operationen";
import Visualisierung from "./Visualisierung";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [daten, setDaten] = useState([]);
  const [gefilterteDaten, setGefilterteDaten] = useState([]);
  const [ausgewaehlterStandort, setAusgewaehlterStandort] =
    useState("Alle Standorte");
  const [attribut, setAttribut] = useState("p");
  const [anzeigen, setAnzeigen] = useState(false); // Zustand für Visualisierung

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/py/meteodaten")
      .then((response) => setDaten(response.data))
      .catch((error) => console.error("Fehler beim Abrufen der Daten:", error));
  }, []);

  const handleVisualisierung = () => {
    let gefiltert;
    if (ausgewaehlterStandort === "Alle Standorte") {
      // Alle Standorte auswählen
      gefiltert = daten.filter(
        (item) => item[attribut] !== undefined && item[attribut] !== null
      );
    } else {
      // Spezifischen Standort filtern
      gefiltert = daten.filter(
        (item) =>
          item.Standortname === ausgewaehlterStandort &&
          item[attribut] !== undefined &&
          item[attribut] !== null
      );
    }
    setGefilterteDaten(gefiltert);
    setAnzeigen(true); // Visualisierung anzeigen
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Infobalken />
        <div style={{ flex: "0 0 auto", padding: "1rem" }}>
          <Operationen
            setStandort={setAusgewaehlterStandort}
            standorte={[
              "Alle Standorte", // Option für alle Standorte
              "Zürich Rosengartenstrasse",
              "Zürich Schimmelstrasse",
              "Zürich Stampfenbachstrasse",
            ]}
            setAttribut={setAttribut}
            updateDiagramm={handleVisualisierung}
          />
        </div>
        {anzeigen && (
          <div style={{ flex: "1 1 auto", overflow: "auto", padding: "1rem" }}>
            <Visualisierung daten={gefilterteDaten} attribut={attribut} />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
