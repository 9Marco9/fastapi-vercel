import React from "react";
import { VegaLite } from "react-vega";

export default function Visualisierung({
  daten,
  attribut,
  ausgewaehlterStandort,
}) {
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 1600,
    height: 800,
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
              labelFontSize: 14,
              titleFontSize: 16,
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
            axis: {
              labelFontSize: 14,
              titleFontSize: 16,
            },
          },
          color: {
            field: "Standortname",
            type: "nominal",
            title: "Standort",
            scale: {
              range:
                ausgewaehlterStandort === "Alle Standorte"
                  ? ["#1F77B4", "#FF7F0E", "#2CA02C"]
                  : attribut === "p"
                  ? ["#59A14F", "#8CD17D", "#2CA02C"]
                  : attribut === "T"
                  ? ["#E15759", "#FF9D9A", "#D62728"]
                  : attribut === "RainDur"
                  ? ["#4E79A7", "#A0CBE8", "#1F77B4"]
                  : ["#AAAAAA"],
            },
            legend: {
              titleFontSize: 16,
              labelFontSize: 14,
              labelLimit: 200,
              labelAlign: "left",
              labelBaseline: "middle",
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
        data: {},
        mark: {
          type: "text",
          align: "left",
          baseline: "top",
          dx: 0,
          dy: 20,
        },
        encoding: {
          text: { field: "Hinweis", type: "nominal" },
          color: { value: "black" },
        },
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "left",
        padding: "1rem",
      }}
    >
      <VegaLite spec={spec} />
    </div>
  );
}
