import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

// 사용자 정보를 가져오는 함수
const fetchUser = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/auth/me', {
            withCredentials: true
        });
        return response.data; // 사용자 정보를 반환
    } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
        throw error;
    }
};

function PostPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState(null);
    const [error, setError] = useState('');

    // 사용자 현재 위치를 가져오는 함수
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error('위치 정보를 가져오는 데 실패했습니다:', error);
                    setError('위치 정보를 가져오는 데 실패했습니다.');
                }
            );
        } else {
            console.error('이 브라우저는 Geolocation API를 지원하지 않습니다.');
            setError('이 브라우저는 Geolocation API를 지원하지 않습니다.');
        }
    };

    // 사용자 정보를 가져오는 함수
    const loadUser = async () => {
        try {
            const user = await fetchUser();
            setAuthor(user); // 사용자 정보를 상태에 저장
            console.log(user);
        } catch (error) {
            setError('사용자 정보를 가져오는 데 실패했습니다.');
        }
    };

    // 폼 제출 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!author) {
            console.error('작성자 정보를 가져오지 못했습니다.');
            setError('작성자 정보를 가져오지 못했습니다.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/posts', {
                title,
                description,
                price,
                latitude,
                longitude,
                image,
                authorId: author.id // 작성자 ID를 서버로 전달
            }, {
                withCredentials: true
            });

            // 게시물 작성 후 처리 (예: 성공 페이지로 리다이렉션)
            window.location.href = '/';
        } catch (error) {
            console.error('게시물 작성에 실패했습니다:', error);
            setError('게시물 작성에 실패했습니다.');
        }
    };

    useEffect(() => {
        getCurrentLocation();
        loadUser(); // 사용자 정보를 가져옴
    }, []);

    return (
        <Container className="post-create-container">
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>제목</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>설명</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="설명을 입력하세요"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPrice">
                    <Form.Label>가격</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="가격을 입력하세요"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formLatitude">
                    <Form.Label>위도</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="위도를 자동으로 가져옵니다"
                        value={latitude}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="formLongitude">
                    <Form.Label>경도</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="경도를 자동으로 가져옵니다"
                        value={longitude}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="formImage">
                    <Form.Label>이미지 URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이미지 URL을 입력하세요"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Group>

                {/* 사용자의 ID를 표시하는 읽기 전용 입력 필드 */}
                {author && (
                    <Form.Group controlId="formAuthorId">
                        <Form.Label>작성자 ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={author.id || ''}
                            readOnly
                        />
                    </Form.Group>
                )}

                <Button variant="primary" type="submit" className="mt-3">
                    게시물 작성
                </Button>
            </Form>
        </Container>
    );
}

export default PostPage;
