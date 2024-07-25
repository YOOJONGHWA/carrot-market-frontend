// src/components/ProductCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import '../css/ProductCard.css'; // 스타일을 위한 CSS 파일 임포트

const ProductCard = ({ product }) => {
    return (
        <Card className="product-card shadow-sm rounded">
            <Card.Img variant="top" src={product.image} className="product-image" />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <Card.Text>{product.author_username}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
