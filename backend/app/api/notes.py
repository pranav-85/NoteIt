from fastapi import APIRouter, HTTPException

from app.services import note_services
from app.models.note import Note

router = APIRouter(prefix="/notes", tags=["notes"])


@router.get("/")
async def list_notes():
    return await note_services.list_notes()


@router.get("/{note_id}")
async def find_note(note_id: str = None):
    result = await note_services.get_note(note_id)

    if not result:
        raise HTTPException(status_code=404, detail="Note not found")

    return result

@router.post("/")
async def create_note(note: Note):
    return await note_services.create_note(note)


@router.put("/{note_id}")
async def modify_note(note_id: str, note: Note):
    updated_note = await note_services.update_note(note_id, note)
    if not updated_note:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated_note


@router.delete("/{note_id}")
async def delete_note(note_id: str):
    if not await note_services.delete_note(note_id):
        raise HTTPException(status_code=404, detail="Note not found")

    return {"status": "deleted"}
