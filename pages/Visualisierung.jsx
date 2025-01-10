import React from "react";
import { VegaLite } from "react-vega";

export default function Visualisierung({
  daten,
  attribut,
  ausgewaehlterStandort,
}) {
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 1400, // Breiter als vorher
    height: 700, // Höher als vorher
    layer: [
      {
        data: {
          values: daten,
        },
        mark: "line",
        encoding: {
          x: {
            field: "Datum",
            type: "temporal",
            title: "Datum (Monatlich Gruppiert)",
            axis: {
              format: "%b",
            },
          },
          y: {
            field: attribut,
            type: "quantitative",
            title:
              attribut === "p"
                ? "Druck (hPa)"
                : attribut === "T"
                ? "Temperatur (°C)"
                : attribut === "RainDur"
                ? "Regendauer (min)"
                : "Wert",
          },
          color: {
            field: "Standortname",
            type: "nominal",
            title: "Standort",
            scale: {
              range:
                ausgewaehlterStandort === "Alle Standorte"
                  ? ["#1F77B4", "#FF7F0E", "#2CA02C"] // Farben für Standorte (Alle Standorte)
                  : attribut === "p"
                  ? ["#4E79A7", "#A0CBE8", "#1F77B4"] // Blau-Töne für Druck
                  : attribut === "T"
                  ? ["#E15759", "#FF9D9A", "#D62728"] // Rot-Töne für Temperatur
                  : attribut === "RainDur"
                  ? ["#59A14F", "#8CD17D", "#2CA02C"] // Grün-Töne für Regen
                  : ["#AAAAAA"], // Standardfarbe
            },
          },
          tooltip: [
            { field: "Standortname", type: "nominal", title: "Standort" },
            { field: "Datum", type: "temporal", title: "Datum" },
            { field: attribut, type: "quantitative", title: "Wert" },
          ],
        },
      },
      {
        data: {
          values: [
            { Hinweis: "Hinweis: Alle Daten stammen aus dem Jahr 2023" },
          ],
        },
        mark: {
          type: "text",
          align: "left",
          baseline: "top",
          dx: 1000, // Verschiebung nach rechts
          dy: -320, // Position unterhalb der Legende
        },
        encoding: {
          text: { field: "Hinweis", type: "nominal" },
          color: { value: "black" }, // Schwarzer Text für den Hinweis
        },
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        padding: "1rem",
      }}
    >
      <VegaLite spec={spec} />
    </div>
  );
}
