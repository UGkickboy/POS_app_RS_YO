from database import Base
from sqlalchemy import Column, Integer, String, DECIMAL

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    barcode = Column(String(255), unique=True, index=True)
    product_name = Column(String(255))
    price = Column(DECIMAL(10, 2))
