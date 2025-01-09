from fastapi import FastAPI
import json
from pathlib import Path

# erstellen FastAPI Instanz
app = FastAPI(docs_API_url="/api/py/docs_API",
              openapi_url ="/api/py/openapi.json")

# Pfad zur JSON-Datei
#json_pfad =  Path("src/meteodaten_2023_daily.json")

json_pfad = Path(__file__).parent.parent.parent / "src" / "meteodaten_2023_daily.json"



@app.get("/api/py/meteodaten")
def get_meteodaten():
    try:
        #print("JSON-Pfad:", json_pfad)  # Gibt den berechneten Pfad aus
        #print("Existiert die Datei?", json_pfad.exists())  # Prüft, ob die Datei existiert

        with open(json_pfad, encoding= "utf-8") as file:
            daten= json.load(file)
        return daten
        
    except FileNotFoundError: 
        return{"error":"json Datei konnte nicht gefunden werden. Ursache: falsche Pfad oder Dateiname"}
    except json.JSONDecodeError: 
        return{"error":"ungültiges json Format. Bitte überprüfen Sie das Format."}

        
      

 
