import React, { useState, useEffect } from "react";
//import axios from "axios";
import { VegaLite } from "react-vega";

import { Infobalken } from "./Infobalken.jsx";
import { Operationen } from "./operationen.jsx";
import { Visualisierung } from "./Visualisierung.jsx";

// Vega-Lite-Spezifikation für das Diagramm
const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    values: [
      {
        Datum: 1672531200000,
        Standortname: "Zürich Rosengartenstrasse",
        RainDur: 0,
        T: 12.23,
        p: 972.02,
      },
      {
        Datum: 1672531200000,
        Standortname: "Zürich Schimmelstrasse",
        RainDur: 0,
        T: 12.18,
        p: 974.46,
      },
    ],
  },
  repeat: {
    layer: ["T", "p"],
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

export function app() {
  return (
    <div>
      <h1>Wetterdaten Anwendung</h1>
      <Infobalken />
      <Operationen />
      <Visualiserung />
    </div>
  );
}
