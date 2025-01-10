import React from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";

export default function Operationen({
  setStandort,
  standorte,
  setAttribut,
  updateDiagramm,
}) {
  const [selectedStandort, setSelectedStandort] =
    React.useState("Alle Standorte");

  const handleStandorteChange = (event) => {
    const value = event.target.value;
    setSelectedStandort(value);
    setStandort(value === "Alle Standorte" ? "" : value); // "" für alle Standorte
  };

  const handleAttributChange = (event) => {
    setAttribut(event.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <FormControl style={{ minWidth: "200px" }}>
        <InputLabel id="standorte-label">Standorte</InputLabel>
        <Select
          labelId="standorte-label"
          value={selectedStandort}
          onChange={handleStandorteChange}
        >
          <MenuItem value="Alle Standorte">Alle Standorte</MenuItem>
          {standorte.map((standort) => (
            <MenuItem key={standort} value={standort}>
              {standort}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl style={{ minWidth: "200px" }}>
        <InputLabel id="attribut-label">Attribut</InputLabel>
        <Select
          labelId="attribut-label"
          defaultValue="p"
          onChange={handleAttributChange}
        >
          <MenuItem value="T">Temperatur (°C)</MenuItem>
          <MenuItem value="RainDur">Regendauer (min)</MenuItem>
          <MenuItem value="p">Druck (hPa)</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={() => updateDiagramm(selectedStandort)}
      >
        VISUALISIERUNG
      </Button>
    </div>
  );
}
