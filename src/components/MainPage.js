// src/components/MainPage.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductCard from './ProductCard';
import { Container, Row, Col } from 'react-bootstrap';
import './MainPage.css';

const products = [
    { id: 1, title: '상품 1', price: '10,000', image: 'https://via.placeholder.com/150' },
    { id: 2, title: '상품 2', price: '20,000', image: 'https://via.placeholder.com/150' },
    // 더 많은 상품을 추가할 수 있습니다.
];

const MainPage = () => {
    return (
        <div className="main-page">
            <Header />
            <main className="main-content py-4">
                <Container>
                    <h2 className="mb-4">최신 상품</h2>
                    <Row>
                        {products.map(product => (
                            <Col sm={12} md={6} lg={4} key={product.id} className="mb-4">
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default MainPage;
