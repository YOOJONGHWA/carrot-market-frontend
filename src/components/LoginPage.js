import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 리다이렉션을 위한 useNavigate 훅

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      }, {
        withCredentials: true, // 쿠키를 전송하도록 설정
      });

      // 로그인 성공 후 리다이렉션
      navigate('/'); // useNavigate 훅을 사용하여 리다이렉션
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <Container className="login-container">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          로그인
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
