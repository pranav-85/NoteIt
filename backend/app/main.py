from fastapi import FastAPI
from datetime import datetime

from app.api import notes, search


app = FastAPI(title="NoteIt API")


@app.get("/")
async def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.now()
    }
 
app.include_router(notes.router)

app.include_router(search.router)
