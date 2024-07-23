// src/components/ProductCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Card className="product-card">
            <Card.Img variant="top" src={product.image} alt={product.title} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                    {product.price} 원
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
