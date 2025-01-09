import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Infobalken() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" componetn="div" sx={{ flexGrow: 1 }}>
          "Standortbasierte Wetteranalyse"
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
