import React from "react";
import { VegaLite } from "react-vega";

export default function Visualisierung({ daten, attribut }) {
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 1400, // Breiter als vorher
    height: 700, // Höher als vorher
    data: {
      values: daten,
    },
    mark: "line",
    encoding: {
      x: {
        field: "Datum",
        type: "temporal",
        title: "Datum",
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
      },
      tooltip: [
        { field: "Standortname", type: "nominal", title: "Standort" },
        { field: "Datum", type: "temporal", title: "Datum" },
        { field: attribut, type: "quantitative", title: "Wert" },
      ],
    },
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
