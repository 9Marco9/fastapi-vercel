from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
from fastapi.responses import JSONResponse


app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["GET","POST"],  
    allow_headers=["*"],  
)


json_path = Path(__file__).parent / "meteodaten_2023_daily.json"

@app.get("/api/py/meteodaten")
def get_meteodaten():
    try:
        
        with open(json_path, encoding="utf-8") as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        return JSONResponse({"error": "JSON file nicht gefunden. Bitte überprüfe das Format und den Pfad."}, status_code=404)
    except json.JSONDecodeError:
        return JSONResponse({"error": "Ungultiges JSON file. Bitte überprüfe den Inhalt der Datei."}, status_code=400)

