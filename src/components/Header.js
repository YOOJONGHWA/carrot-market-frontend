// src/components/Header.js
import React from 'react';
import { Container, Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <Navbar bg="white" expand="lg">
            <Container>
                <Navbar.Brand href="/" className="brand">
                    <div className="logo"></div>
                    클론 마켓
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate('/item')}>중고거래</Nav.Link>
                    <Nav.Link onClick={() => navigate('/my-posts')}>내가 쓴 글</Nav.Link>
                </Nav>
                <Form className="d-flex ms-auto">
                    <FormControl
                        id="search-input"
                        type="search"
                        placeholder="검색..."
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button id="search-button" variant="success">검색</Button>
                </Form>
                <div className="ms-3">
                    <Button id="login-button" variant="primary" className="me-2" as={Link} to="/login">로그인</Button>
                    <Button id="signup-button" variant="secondary" className="me-2" as={Link} to="/signup">회원가입</Button>
                    <Button id="chat-button" variant="secondary">채팅하기</Button>
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;
