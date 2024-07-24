import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../css/SignupPage.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/auth/signup', {
        email,
        username,
        password,
        profileImage,
        bio
      });

      setSuccess('회원 가입에 성공했습니다. 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000); // 2초 후 로그인 페이지로 리다이렉트
    } catch (err) {
      console.error('회원 가입 오류:', err);
      setError('회원 가입 실패: 정보를 확인하고 다시 시도하세요.');
    }
  };

  return (
    <Container className="signup-container">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
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

        <Form.Group controlId="formBasicUsername">
          <Form.Label>사용자 이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="사용자 이름을 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <Form.Group controlId="formBasicProfileImage">
          <Form.Label>프로필 이미지 URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="프로필 이미지 URL을 입력하세요"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBio">
          <Form.Label>자기소개</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="자기소개를 입력하세요"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          회원 가입
        </Button>
      </Form>
    </Container>
  );
}

export default SignupPage;
