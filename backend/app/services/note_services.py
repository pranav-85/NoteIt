from app.db import notes_collection
from app.models.note import Note

from bson import ObjectId
from datetime import datetime, timezone


def note_helper(note: dict) -> Note:
    return Note(
        id=str(note["_id"]),
        title=note["title"],
        user_id=note["user_id"],
        content=note["content"],
        created_at=note["created_at"],
        updated_at=note["updated_at"],
    )


async def list_notes():
    cursor = notes_collection.find({}, {"title": 1}).sort("updated_at", -1)
    notes = []
    async for note in cursor:
        notes.append({
        "id": str(note["_id"]),
        "title": note["title"]
    })
    return notes


async def create_note(note: Note):
    note_dict = note.model_dump(exclude={"id"})  
    new_note = await notes_collection.insert_one(note_dict)
    created_note = await notes_collection.find_one({"_id": new_note.inserted_id})
    return note_helper(created_note)


async def get_note(note_id: str):
    note = await notes_collection.find_one({"_id": ObjectId(note_id)})
    if not note:
        return None
    return note_helper(note)


async def update_note(note_id: str, note: Note):
    existing = await notes_collection.find_one({"_id": ObjectId(note_id)})
    if not existing:
        return None

    update_data = note.model_dump(exclude={"id", "created_at"})
    update_data["updated_at"] = datetime.now(timezone.utc)

    await notes_collection.update_one(
        {"_id": ObjectId(note_id)},
        {"$set": update_data}
    )

    updated = await notes_collection.find_one({"_id": ObjectId(note_id)})
    return note_helper(updated)


async def delete_note(note_id: str):
    result = await notes_collection.delete_one({"_id": ObjectId(note_id)})
    return result.deleted_count > 0

