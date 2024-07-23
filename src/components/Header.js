// src/components/Header.js
import React from 'react';
import { Container, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import './Header.css';

const Header = () => {
    return (
        <Navbar bg="warning" expand="lg">
            <Container>
                <Navbar.Brand href="#home">당근 마켓</Navbar.Brand>
                <Form className="d-flex ms-auto">
                    <FormControl
                        type="search"
                        placeholder="검색..."
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">검색</Button>
                </Form>
                <div className="ms-3">
                    <Button variant="primary" className="me-2">로그인</Button>
                    <Button variant="secondary">회원가입</Button>
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;
