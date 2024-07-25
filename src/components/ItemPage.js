import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import '../css/ItemPage.css';

const ItemPage = () => {
    const [products, setProducts] = useState([
        
    ]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/posts');
                setProducts(response.data);
                console.log(response.data); // 콘솔에 데이터 출력
            } catch (error) {
                setError('상품 데이터를 가져오는데 실패했습니다.');
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="main-page">
            <main className="main-content py-4">
                <Container>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Button 
                            variant="primary" 
                            onClick={() => navigate('/create-post')}>게시물 작성
                        </Button>
                    </div>
                    <Row className="justify-content-center">
                        {products.map(product => (
                            <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-4">
                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                    <ProductCard product={product} />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </main>
        </div>
    );
};

export default ItemPage;

