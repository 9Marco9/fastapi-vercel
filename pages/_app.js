import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Infobalken from "./Infobalken.jsx";
import { Operationen } from "./operationen.jsx";
import { Visualisierung } from "./Visualisierung.jsx";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [data, setData] = useState([]);
  const [standort, setStandort] = useState("");
  const [attribut, setAttribut] = useState("T");
  const [zeitraum, setZeitraum] = useState("Monat");
  const [gefilterteDaten, setGefilterteDaten] = useState([]);

  // Daten vom Backend laden
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/py/meteodaten")
      .then((response) => {
        setData(response.data);
        setGefilterteDaten(response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten:", error);
      });
  }, []);

  useEffect(() => {
    if (standort) {
      const gefiltert = data.filter((item) => item.Standortname === standort);
      setGefilterteDaten(gefiltert);
    }
  }, [standort, attribut, zeitraum, data]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Infobalken />
        <Operationen
          setStandort={setStandort}
          setAttribut={setAttribut}
          setZeitraum={setZeitraum}
          updateDiagramm={() => {}}
        />
        <Visualisierung daten={gefilterteDaten} attribut={attribut} />
      </div>
    </ThemeProvider>
  );
}

export default App;
