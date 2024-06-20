from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, DECIMAL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://username:password@localhost/pos_app"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, index=True)
    barcode = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    price = Column(DECIMAL(10, 2))

Base.metadata.create_all(bind=engine)

app = FastAPI()

class BarcodeRequest(BaseModel):
    barcode: str

@app.post("/get-product")
def get_product(barcode_request: BarcodeRequest):
    session = SessionLocal()
    product = session.query(Product).filter(Product.barcode == barcode_request.barcode).first()
    session.close()

    if product:
        return {"name": product.name, "price": product.price}
    else:
        raise HTTPException(status_code=404, detail="Product not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
