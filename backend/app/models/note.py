from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from datetime import datetime, timezone


class Note(BaseModel):
    id: Optional[str] = None  
    title: str
    user_id: str
    content: Dict[str, Any]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
