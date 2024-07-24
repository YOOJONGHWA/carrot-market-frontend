// src/components/MainPage.js
import React from 'react';
import ProductCard from './ProductCard';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/ItemPage.css';

const products = [
    { id: 1, title: '상품 1', price: '10,000', image: 'https://via.placeholder.com/150' },
    { id: 2, title: '상품 2', price: '20,000', image: 'https://via.placeholder.com/150' },
    { id: 2, title: '상품 2', price: '20,000', image: 'https://via.placeholder.com/150' },
    { id: 2, title: '상품 2', price: '20,000', image: 'https://via.placeholder.com/150' },
    // 더 많은 상품을 추가할 수 있습니다.
];

const ItemPage = () => {
    return (
        <div className="main-page">
            <main className="main-content py-4">
                <Container>
                    <h2 className="mb-4"></h2>
                    <Row>
                        {products.map(product => (
                            <Col sm={12} md={6} lg={4} key={product.id} className="mb-4">
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </main>
        </div>
    );
};

export default ItemPage;
