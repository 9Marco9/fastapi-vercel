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
  const [anzeigen, setAnzeigen] = useState(false);

  useEffect(() => {
    axios
      .get("https://fastapi-vercel-six-omega.vercel.app/api/py/meteodaten")
      .then((response) => {
        console.log("Daten von der API:", response.data);
        setDaten(response.data);
      })
      .catch((error) => console.error("Fehler beim Abrufen der Daten:", error));
  }, []);

  const handleVisualisierung = () => {
    console.log("Aktueller Standort:", ausgewaehlterStandort);
    console.log("Attribut:", attribut);

    let gefiltert;
    if (ausgewaehlterStandort === "Alle Standorte") {
      gefiltert = daten.filter(
        (item) => item[attribut] !== undefined && item[attribut] !== null
      );
    } else {
      gefiltert = daten.filter(
        (item) =>
          item.Standortname === ausgewaehlterStandort &&
          item[attribut] !== undefined &&
          item[attribut] !== null
      );
    }

    console.log("Gefilterte Daten:", gefiltert);
    setGefilterteDaten([...gefiltert]);
    setAnzeigen(true);
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
              "Alle Standorte",
              "Zürich Rosengartenstrasse",
              "Zürich Schimmelstrasse",
              "Zürich Stampfenbachstrasse",
            ]}
            setAttribut={setAttribut}
            updateDiagramm={handleVisualisierung}
          />
        </div>
        {gefilterteDaten.length > 0 && (
          <div style={{ flex: "1 1 auto", overflow: "auto", padding: "1rem" }}>
            <Visualisierung
              daten={gefilterteDaten}
              attribut={attribut}
              ausgewaehlterStandort={ausgewaehlterStandort}
            />
            {anzeigen && (
              <div
                style={{
                  marginTop: "1rem",
                  textAlign: "left",
                  fontSize: "14px",
                  color: "white",
                }}
              >
                <p>Hinweis: Alle Daten stammen aus dem Jahr 2023</p>
                <p>Datenquelle: opendata.swiss</p>
              </div>
            )}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
