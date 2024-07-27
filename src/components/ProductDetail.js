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
    const [imageFile, setImageFile] = useState(null); // 업로드할 이미지 파일
    const [imagePreview, setImagePreview] = useState(''); // 이미지 미리보기 URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
                setProduct(response.data);
                setUpdatedProduct(response.data);
                setImagePreview(response.data.image); // 기존 이미지 미리보기
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // 이미지 미리보기 URL 생성
        }
    };

    const handleUpdate = async () => {
        if (!currentUser) {
            console.error('사용자가 로그인되어 있지 않습니다.');
            return;
        }

        try {
            let imageUrl = updatedProduct.image;

            // 새로운 이미지 파일이 선택된 경우
            if (imageFile) {
                // S3에 업로드를 위한 URL 생성
                const filename = encodeURIComponent(imageFile.name);
                const response = await axios.get(`http://localhost:8080/api/posts/presigned-url?filename=${filename}`);
                const presignedUrl = response.data;

                // S3에 파일을 업로드
                const uploadResponse = await fetch(presignedUrl, {
                    method: 'PUT',
                    body: imageFile
                });

                if (uploadResponse.ok) {
                    // 업로드 후의 이미지 URL
                    imageUrl = presignedUrl.split("?")[0];
                } else {
                    console.error('이미지 업로드에 실패했습니다:', uploadResponse);
                    return;
                }
            }

            await axios.put(`http://localhost:8080/api/posts/${id}`, {
                ...updatedProduct,
                authorUsername: currentUser.username, // 현재 사용자 ID 포함
                image: imageUrl // 새로운 이미지 URL 포함
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
            // 이미지 삭제 요청 (필요한 경우)
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
                <Card.Img variant="top" src={imagePreview} />
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
                            <Form.Group controlId="formImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="미리보기"
                                        style={{ width: '100%', marginTop: '10px' }}
                                    />
                                )}
                            </Form.Group>
                            <Form.Group controlId="formAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="authorUsername"
                                    value={updatedProduct.authorUsername || ''}
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
