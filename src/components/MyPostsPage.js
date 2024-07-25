import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate import 추가
import ProductCard from './ProductCard';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import '../css/ItemPage.css';

const MyPostsPage = () => {
    const [posts, setPosts] = useState([
        { id: 1, title: '상품 1', price: '10,000원', image: 'https://via.placeholder.com/150' },
        { id: 2, title: '상품 2', price: '20,000원', image: 'https://via.placeholder.com/150' },
    ]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate 호출

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/posts/my-posts');
                setPosts(response.data);
            } catch (error) {
                setError('내 게시물을 가져오는데 실패했습니다.');
                console.error(error);
            }
        };

        fetchMyPosts();
    }, []);

    const handleEdit = (postId) => {
        navigate(`/edit/${postId}`);
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${postId}`);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            setError('게시물 삭제에 실패했습니다.');
            console.error(error);
        }
    };

    return (
        <div className="main-page">
            <main className="main-content py-4">
                <Container>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Row className="justify-content-center">
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <Col xs={12} sm={6} md={4} lg={3} key={post.id} className="mb-4">
                                    <ProductCard 
                                        product={post}
                                        onEdit={() => handleEdit(post.id)}
                                        onDelete={() => handleDelete(post.id)}
                                    />
                                </Col>
                            ))
                        ) : (
                            <Col xs={12} className="text-center">
                                <p>작성한 게시물이 없습니다.</p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </main>
        </div>
    );
};

export default MyPostsPage;
