import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export function Operationen({
  setStandort,
  setAttribut,
  setZeitraum,
  updateDiagramm,
}) {
  const [lokalStandort, setLokalStandort] = useState("");
  const [lokalAttribut, setLokalAttribut] = useState("T");
  const [lokalZeitraum, setLokalZeitraum] = useState("Monat");

  const handleVisualisierung = () => {
    setStandort(lokalStandort);
    setAttribut(lokalAttribut);
    setZeitraum(lokalZeitraum);
    updateDiagramm();
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <FormControl fullWidth>
        <InputLabel>Standort</InputLabel>
        <Select
          value={lokalStandort}
          onChange={(e) => setLokalStandort(e.target.value)}
        >
          <MenuItem value="Zürich Rosengartenstrasse">
            Zürich Rosengartenstrasse
          </MenuItem>
          <MenuItem value="Zürich Schimmelstrasse">
            Zürich Schimmelstrasse
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Attribut</InputLabel>
        <Select
          value={lokalAttribut}
          onChange={(e) => setLokalAttribut(e.target.value)}
        >
          <MenuItem value="T">Temperatur (°C)</MenuItem>
          <MenuItem value="RainDur">Regendauer (min)</MenuItem>
          <MenuItem value="p">Luftdruck (hPa)</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Zeitraum</InputLabel>
        <Select
          value={lokalZeitraum}
          onChange={(e) => setLokalZeitraum(e.target.value)}
        >
          <MenuItem value="Monat">Monat</MenuItem>
          <MenuItem value="Jahr">Jahr</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleVisualisierung}>
        <Visualisierung></Visualisierung>
      </Button>
    </div>
  );
}
