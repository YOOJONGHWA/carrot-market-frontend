import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form } from 'react-bootstrap';
import '../css/ItemPage.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [currentUser, setCurrentUser] = useState(null); // 로그인한 사용자 정보
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
                setProduct(response.data);
                setUpdatedProduct(response.data);
            } catch (error) {
                console.error('상품 상세 정보를 가져오는데 실패했습니다.', error);
            }
        };

        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth/me', {
                    withCredentials: true
                });
                setCurrentUser(response.data);
            } catch (error) {
                console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
            }
        };

        fetchProduct();
        fetchCurrentUser();
    }, [id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        if (!currentUser) {
            console.error('사용자가 로그인되어 있지 않습니다.');
            return;
        }

        try {
            await axios.put(`http://localhost:8080/api/posts/${id}`, {
                ...updatedProduct,
                authorUsername: currentUser.username // 현재 사용자 ID 포함
            }, {
                withCredentials: true
            });
            setProduct(updatedProduct);
            setIsEditing(false);
        } catch (error) {
            console.error('상품 수정에 실패했습니다.', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${id}`);
            navigate('/'); // 삭제 후 홈 페이지로 이동
        } catch (error) {
            console.error('상품 삭제에 실패했습니다.', error);
        }
    };

    if (!product || !currentUser) return <p>Loading...</p>;

    const isAuthor = currentUser.username === product.author.username; // 현재 사용자와 작성자 비교

    return (
        <Container className="py-4">
            <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    {isEditing ? (
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={updatedProduct.title || ''}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    value={updatedProduct.price || ''}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={updatedProduct.description || ''}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="authorUsername"
                                    value={updatedProduct.author.username || ''}
                                    readOnly
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleUpdate}>Update</Button>
                        </Form>
                    ) : (
                        <>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>{product.price}원</Card.Text>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>{product.author.username}</Card.Text>
                            <Card.Text>{product.createdAt}</Card.Text>
                            {isAuthor && (
                                <>
                                    <Button variant="warning" onClick={() => setIsEditing(true)}>Edit</Button>
                                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                                </>
                            )}
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductDetail;
