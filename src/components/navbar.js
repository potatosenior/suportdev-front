import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavbarComponent = () => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="/">Suporte dev</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/calls/create">Criar chamados</Nav.Link>
      <Nav.Link href="/calls/index">Chamados</Nav.Link>
      <Nav.Link href="/clients/create">Cadastrar clientes</Nav.Link>
      <Nav.Link href="/clients/index">Clientes</Nav.Link>
    </Nav>
  </Navbar>
);

export default NavbarComponent;
