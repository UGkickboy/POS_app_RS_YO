from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/products/")
def create_product(product: models.Product, db: Session = Depends(database.get_db)):
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@app.get("/products/{barcode}")
def read_product(barcode: str, db: Session = Depends(database.get_db)):
    product = db.query(models.Product).filter(models.Product.barcode == barcode).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
