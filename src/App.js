import React, { Component } from 'react';

import Home from './components/Home'
import Contato from './components/Contato';
import Produto from "./components/Produto";
import Categoria from "./components/Categoria";
import FrenteCaixa from "./components/FrenteCaixa";
import CadastroLoja from './components/CadastroLoja';
import ListaPrecos from './components/ListaPrecos';
import ControleCaixa from './components/ControleCaixa';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import { BrowserRouter, Routes, Link, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/css/App.css'
import Login from './components/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    };
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogout = () => {
    // Remover a informação de autenticação do Local Storage
    localStorage.removeItem('isLoggedIn');
    this.setState({ isLoggedIn: false });
  };


  render() {
    // Se o usuário estiver logado, renderize o conteúdo normal da aplicação
    if (this.state.isLoggedIn) {
      return (
        <div className="App">
          <Container fluid>
            <BrowserRouter>
              <Navbar bg="dark" expand="lg" variant="dark" fixed="top" label="Toggle navigation" >
                <Container fluid>
                  <Link to="/">
                    <img alt="" src="/assets/logo.png" width="130" height="20" className="d-inline-block align-top" style={{ marginRight: '10px' }} />
                  </Link>{' '}
                  <Navbar.Brand href="/">ERP</Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbar-dark-example" />
                  <Navbar.Collapse id="navbar-dark-example">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                      <Nav.Link href="/" className="text-light">Página inicial</Nav.Link>

                      <NavDropdown title="Cadastros" id="nav-dropdown-dark-example" menuVariant="dark">
                        <NavDropdown.Item as={Link} to="/Contato">Clientes e Fornecedores</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/Produto">Produtos</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/ListaPrecos">Lista Preços</NavDropdown.Item>
                      </NavDropdown>

                      <NavDropdown title="Vendas" id="nav-dropdown-dark-example" menuVariant="dark">
                        <NavDropdown.Item as={Link} to="/ControleCaixa" >Controle de Caixa</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/FrenteCaixa" >Frente de Caixa</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/Loja" >Unidade Loja</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>

                    {this.state.isLoggedIn && (  // Renderizar botão de deslogar apenas quando logado
                      <Button variant="danger" onClick={this.handleLogout} className="btn btn-link text-light ms-auto">
                        <img alt="" src="/assets/sair.png" width="30" height="30" className="d-inline-block align-top" />
                      </Button>
                    )}

                  </Navbar.Collapse>
                </Container>
              </Navbar>

              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/Contato" element={<Contato />}></Route>
                <Route path="/Produto" element={<Produto />}></Route>
                <Route path="/ListaPrecos" element={<ListaPrecos />}></Route>
                <Route path="/Categoria" element={<Categoria />}></Route>
                <Route path="/FrenteCaixa" element={<FrenteCaixa />}></Route>
                <Route path="/ControleCaixa" element={<ControleCaixa />}></Route>
                <Route path="/Loja" element={<CadastroLoja />}></Route>
              </Routes>

            </BrowserRouter >
          </Container>
        </div >
      );
    }

    // Caso contrário, renderize o componente de login
    return (
      <div className="App">
        <Container fluid>
          <Login onLogin={this.handleLogin} />
        </Container>
      </div>

    );
  }
}

export default App;
