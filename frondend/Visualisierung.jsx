import React from "react";
import { VegaLite } from "react-vega";

export default function Visualisierung({ daten, attribut }) {
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: {
      values: daten,
    },
    repeat: {
      layer: [attribut],
    },
    spec: {
      mark: "line",
      encoding: {
        x: {
          field: "Datum",
          type: "temporal",
          title: "Datum",
        },
        y: {
          field: { repeat: "layer" },
          type: "quantitative",
          title: "Wert",
        },
        color: {
          datum: { repeat: "layer" },
          type: "nominal",
          title: "Parameter",
        },
        tooltip: [
          { field: "Standortname", type: "nominal", title: "Standort" },
          { field: "Datum", type: "temporal", title: "Datum" },
          { field: { repeat: "layer" }, type: "quantitative", title: "Wert" },
        ],
      },
    },
  };

  return <VegaLite spec={spec} />;
}
