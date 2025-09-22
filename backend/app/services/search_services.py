from app.db import notes_collection


async def search_note_by_keyword(keyword: str):
    cursor = notes_collection.find(
        {"$or": [
            {"title": {"$regex": keyword, "$options": "i"}},
            {"content.blocks.text": {"$regex": keyword, "$options": "i"}}
        ]}
    )
    notes = []
    async for note in cursor:
        notes.append({
            "id": str(note["_id"]),
            "title": note["title"]
        })
    return notes