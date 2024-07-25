// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import '../css/ItemPage.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/${id}`); // 서버 엔드포인트 수정
                setProduct(response.data);
            } catch (error) {
                console.error('상품 상세 정보를 가져오는데 실패했습니다.', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <Container className="py-4">
            <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.price}원</Card.Text>
                    <Card.Text>{product.description}</Card.Text> {/* 설명이 있다면 추가 */}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductDetail;
