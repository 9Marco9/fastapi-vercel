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
  const [anzeigeHinweis, setAnzeigeHinweis] = React.useState(false);

  const handleStandorteChange = (event) => {
    const value = event.target.value;
    setSelectedStandort(value);
    setStandort(value);
  };

  const handleAttributChange = (event) => {
    setAttribut(event.target.value);
  };

  const handleButtonClickAnzeigeHinweis = () => {
    updateDiagramm(selectedStandort || "Alle Standorte");
    setAnzeigeHinweis(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <FormControl style={{ minWidth: "200px" }}>
          <InputLabel id="standorte-label">Standorte</InputLabel>
          <Select
            labelId="standorte-label"
            value={selectedStandort}
            onChange={(e) => setStandort(e.target.value)}
          >
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
            onChange={(e) => setAttribut(e.target.value)}
          >
            <MenuItem value="T">Temperatur (°C)</MenuItem>
            <MenuItem value="RainDur">Regendauer (min)</MenuItem>
            <MenuItem value="p">Druck (hPa)</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClickAnzeigeHinweis}
        >
          VISUALISIERUNG
        </Button>
      </div>
    </div>
  );
}
