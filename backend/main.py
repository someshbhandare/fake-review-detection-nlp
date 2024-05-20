from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils import load_model, text_process

# FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to be more restrictive in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model("model.pkl")

# Request Body
class Item(BaseModel):
    review: str

@app.post("/api/fake-review-detection")
def fake_review_detection(item: Item):
    res = model.predict([item.review])
    return {"result": res[0]}