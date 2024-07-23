import React from 'react';

import PropTypes from 'prop-types' // 프로퍼티 타입을 지정해주기 위해 사용 한다.
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Header = ({name, color}) => {

	return (
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand > {name} Blog </Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">

							{/* Link 를 이용한 부드로운 화면전환 */}
							<Nav.Link as={Link} to='/'>Home</Nav.Link>
							<Nav.Link as={Link} to="/products">Product</Nav.Link>

							<NavDropdown title="More" id="basic-nav-dropdown">
								<NavDropdown.Item as={Link} to="/add-product">Add Product</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/add-product">Add Product</NavDropdown.Item>
								<NavDropdown.Divider />

								<NavDropdown.Item href="/add-product">Add Product</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
	);
}

// 프로퍼티 타입 지정 및 필수값 설정
// 필수값 미선언시 콘솔에 오류 메시지가 노출됩니다.
Header.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string
}

// 기본값 설정
Header.defaultProps = {
	color: 'blue'
}

export default Header;