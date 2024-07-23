import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="bg-light text-center py-3">
            <Container>
                <p className="mb-0">© 2024 클론 마켓. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;
