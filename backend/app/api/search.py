from fastapi import APIRouter, Query
from app.services import search_services


router = APIRouter(prefix="/search", tags=["search"])

@router.get("/")
async def search_notes(keyword: str = Query(..., description="Keyword for search")):
    results = await search_services.search_note_by_keyword(keyword)
    return results