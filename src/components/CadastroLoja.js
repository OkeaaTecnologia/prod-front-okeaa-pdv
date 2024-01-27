import React, { Component } from "react";
import '../css/CadastroLoja.css';

import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Table } from "react-bootstrap";

import { BsPersonAdd } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';

import 'bootstrap/dist/css/bootstrap.min.css';

class CadastroLoja extends Component {


  constructor(props) {
    super(props);

    this.state = {
      modalEditarProduto: false,
      id: '',
      idLoja: '',
      nomeLoja: '',
      unidadeLoja: '',
      modalCadastrarLoja: false,
      listaLojas: [],
      searchTerm: '',
      data: '',
    };

    // Ambiente Local
    // this.buscarLojasEndpoint = 'http://localhost:8080/api/v1/selecionarLojas'
    // this.buscarIdLojaEndpoint = 'http://localhost:8080/api/v1/selecionarLoja'
    // this.deletarLojaEndpoint = 'http://localhost:8080/api/v1/deletarLoja'
    // this.adicionarLojaEndpoint = 'http://localhost:8080/api/v1/adicionarLoja'
    // this.atualizarLojaEndpoint = 'http://localhost:8080/api/v1/atualizarLoja'

    // Ambiente Desenvolvimento
    // this.buscarLojasEndpoint = 'https://dev-api-okeaa-pdv.azurewebsites.net/api/v1/selecionarLojas'
    // this.buscarIdLojaEndpoint = 'https://dev-api-okeaa-pdv.azurewebsites.net/api/v1/selecionarLoja'
    // this.deletarLojaEndpoint = 'https://dev-api-okeaa-pdv.azurewebsites.net/api/v1/deletarLoja'
    // this.adicionarLojaEndpoint = 'https://dev-api-okeaa-pdv.azurewebsites.net/api/v1/adicionarLoja'
    // this.atualizarLojaEndpoint = 'https://dev-api-okeaa-pdv.azurewebsites.net/api/v1/atualizarLoja'

     //Ambiente Produção
     this.buscarLojasEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/selecionarLojas'
     this.buscarIdLojaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/selecionarLoja'
     this.deletarLojaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/deletarLoja'
     this.adicionarLojaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/adicionarLoja'
     this.atualizarLojaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/atualizarLoja'
  };

  async componentDidMount() {
    try {
      this.buscarLojas();
    } catch (error) {
      this.setState({ erro: `Erro ao conectar a API: ${error.message}` });
    }
  }

  //----------------------------------------- API BUSCA LOJAS ----------------------------------------------------------

  buscarLojas = () => {
    return new Promise((resolve, reject) => {
      fetch(this.buscarLojasEndpoint)
        .then((resposta) => {
          if (!resposta.ok) {
            throw new Error('Erro na chamada da API');
          }
          return resposta.json();
        })
        .then(data => {
          this.setState({
            listaLojas: data,
          });
          resolve(data); // Resolve com os dados obtidos da API
        })
        .catch(error => {
          console.error('Erro ao buscar as lojas:', error);

          this.setState({
            listaLojas: [],
          });
          reject(error);
        });
    });
  };

  //----------------------------------------- API BUSCA IDLOJA ----------------------------------------------------------

  buscarIdLoja = (idLoja) => {
    fetch(`${this.buscarIdLojaEndpoint}/${idLoja}`)
      .then(response => response.json())
      .then(data => {
        // console.log('Resposta da API:', data);

        const id = data.id;
        const idLoja = data.idLoja;
        const nomeLoja = data.nomeLoja;
        const unidadeLoja = data.unidadeLoja;

        this.setState({
          id: id,
          idLoja: idLoja,
          nomeLoja: nomeLoja,
          unidadeLoja: unidadeLoja,
        });

        this.modalCadastrarLoja(this.state.selecionaLoja);

      })
      .catch(error => {
        console.error('Erro ao buscar a loja:', error);
      });
  };

  //----------------------------------------- API DELETE IDLOJA ----------------------------------------------------------

  deletarLoja = (idLoja) => {
    fetch(`${this.deletarLojaEndpoint}/${idLoja}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao deletar loja');
        }
        // Atualizar o estado após a deleção bem-sucedida (opcional)
        this.buscarLojas();
      })
      .catch(error => {
        console.error('Erro ao deletar a loja:', error);
      });
  };

  //----------------------------------------- API CADASTRAR LOJA ----------------------------------------------------------

  adicionarLoja = (selecionaLoja) => {
    // console.log(selecionaLoja)
    return fetch(this.adicionarLojaEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: selecionaLoja,
    })
      .then(async response => {
        const statusCode = response.status; // Obtém o status da API externa
        const data = await response.text(); // Obtém os dados da resposta

        // Crie um objeto que inclui o status e os dados da API externa
        const responseData = {
          statusCode,
          data,
        };

        // Registre o status e os dados no console
        // console.log('Status da API externa:', statusCode);
        // console.log('Dados da resposta:', data);

        // Retorna a resposta, incluindo o status da API externa
        return responseData;
      });
  };

  //----------------------------------------- API ATUALIZAR LOJA ----------------------------------------------------------

  atualizarLoja = (selecionaLoja) => {
    const id = this.state.id;

    return fetch(`${this.atualizarLojaEndpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: selecionaLoja,
    })
      .then(async response => {
        const statusCode = response.status; // Obtém o status da API externa
        const data = await response.text(); // Obtém os dados da resposta

        // Crie um objeto que inclui o status e os dados da API externa
        const responseData = {
          statusCode,
          data,
        };

        // Registre o status e os dados no console
        // console.log('Status da API externa:', statusCode);
        // console.log('Dados da resposta:', data);

        // Retorna a resposta, incluindo o status da API externa
        return responseData;
      });
  };

  //-----------------------------------------------------------------------------------------------------------------------|
  //----------------------------------------- FUNÇÕES DE AÇÕES (EVENTOS) TELA ---------------------------------------------|
  //-----------------------------------------------------------------------------------------------------------------------|

  //-----------------------------------------------------------------------------------------------------------------------|
  //---------------------------------------------- FUNÇÕES CAMPOS TELA ----------------------------------------------------|
  //-----------------------------------------------------------------------------------------------------------------------|

  atualizarIDLoja = (event) => {
    const idLoja = event.target.value;
    // console.log('idLoja: ', idLoja);
    this.setState({
      idLoja: idLoja
    });
  };

  atualizarNomeLoja = (event) => {
    const nomeLoja = event.target.value;
    // console.log('nomeLoja: ', nomeLoja);
    this.setState({
      nomeLoja: nomeLoja
    });
  };

  atualizarUnidadeLoja = (event) => {
    const unidadeLoja = event.target.value;
    // console.log('unidadeLoja: ', unidadeLoja);
    this.setState({
      unidadeLoja: unidadeLoja
    });
  };

  //-----------------------------------------------------------------------------------------------------------------------|
  // -------------------------------------------------- FUNÇÕES BOTÕES ----------------------------------------------------|
  //-----------------------------------------------------------------------------------------------------------------------|

  reset = () => {
    this.setState({
      id: '',
      idLoja: '',
      nomeLoja: '',
      unidadeLoja: '',
      listaLojas: [],
      searchTerm: '',
    });
  };

  salvarLoja = () => {
    const { idLoja, nomeLoja, unidadeLoja } = this.state;
    const id = this.state.id;

    const lista = {
      idLoja,
      nomeLoja,
      unidadeLoja,
    };

    const selecionaLoja = JSON.stringify(lista);

    // console.log(selecionaLoja);

    if (id === '') {
      this.adicionarLoja(selecionaLoja)
        .then(responseData => {
          if (responseData.data !== '') {
            this.buscarLojas();
            this.reset();
            this.fecharModalCadastrar()
          } else {
            this.modalErro();
          }
        })
        .catch(error => {
          console.error('Erro na chamada da API:', error);
          this.modalErro();
        });
    } else {
      this.atualizarLoja(selecionaLoja)
        .then(responseData => {
          if (responseData.data !== '') {
            this.buscarLojas();
            this.reset();
            this.fecharModalCadastrar()
          } else {
            this.modalErro();
          }
        })
        .catch(error => {
          console.error('Erro na chamada da API:', error);
          this.modalErro();
        });
    };
  };

  campoBusca = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  //-----------------------------------------------------------------------------------------------------------------------|
  //--------------------------------------- SCRIPT´S DE AÇÃO DO MODALS DE CADASTRO. ---------------------------------------|
  //-----------------------------------------------------------------------------------------------------------------------|

  modalCadastrarLoja = () => {
    this.setState({
      modalCadastrarLoja: !this.state.modalCadastrarLoja
    });
  };

  fecharModalCadastrar = () => {
    this.setState({
      modalCadastrarLoja: false
    });
  };

  render() {

    const { searchTerm, selecionaLoja, listaLojas, idLoja, nomeLoja, unidadeLoja, modalCadastrarLoja } = this.state;

    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    return (
      <div className="grid-loja">
        <Container fluid>
          <Col className="col">
            <div className="d-flex align-items-center mt-3 mb-3">
              <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>
                Cadastrar uma nova loja:
              </span>
              <span style={{ marginRight: '0.8rem' }}>&nbsp;</span>
              <button onClick={this.modalCadastrarLoja} className="d-flex align-items-center botao-cadastro-loja">
                <BsPersonAdd style={{ marginRight: '0.8rem' }} />
                Incluir Cadastro
              </button>
              <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white', fontSize: '1.9rem', fontStyle: 'italic' }}>
                UNIDADE LOJA
              </span>
            </div>

            <Col className="col">
              <div className="d-flex align-items-center mt-3 mb-3">
                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Buscar contato:</span>
                <input type="text" placeholder="Digite o termo de busca..." value={searchTerm} onChange={this.campoBusca} className="form-control ml-2" />
              </div>
            </Col>
          </Col>
        </Container>

        <div className="table-container-loja">
          <Container fluid className="pb-5">
            <Table striped bordered hover responsive="xl">
              <thead>
                <tr>
                  <th title="ID loja">ID Loja</th>
                  <th title="Nome loja">Nome Loja</th>
                  <th title="Unidade loja">Unidade Loja</th>
                  <th title="Ações">Ações</th>
                </tr>
              </thead>
              <tbody>
                {listaLojas.map((listaLojas, index) => {
                  const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase());
                  const normalizedDescription = removeAccents(listaLojas.nomeLoja.toLowerCase());
                  const normalizedCodigo = listaLojas.idLoja.toLowerCase();

                  if (
                    normalizedDescription.includes(normalizedSearchTerm) ||
                    normalizedCodigo.includes(normalizedSearchTerm)
                  ) {
                    return (
                      <tr
                        key={listaLojas.id}
                        onClick={() => this.buscarIdLoja(listaLojas.idLoja)}
                        onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
                        onMouseLeave={(e) => e.currentTarget.style.cursor = 'default'}
                      >
                        <td>{listaLojas.idLoja}</td>
                        <td>{listaLojas.nomeLoja}</td>
                        <td>{listaLojas.unidadeLoja}</td>
                        <td>
                          <div className="button-container-table">
                            <Button variant="warning" title="Editar loja" onClick={(e) => { e.stopPropagation(); this.modalCadastrarLoja(listaLojas) }}>
                              <BsPencilSquare />
                            </Button>
                            <Button variant="danger" title="Excluir loja" onClick={(e) => { e.stopPropagation(); this.deletarLoja(listaLojas.idLoja) }}>
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>);
                  } else {
                    return null;
                  }
                })}
                {listaLojas.length === 0 && <tr><td colSpan="6">Nenhuma loja cadastrada.</td>
                  <td>
                    <div className="button-container-table">
                      <Button variant="warning" title="Editar produto" disabled>
                        <BsPencilSquare />
                      </Button>
                      <Button variant="danger" title="Excluir produto" disabled>
                        <FaTrash />
                      </Button>
                    </div>
                  </td></tr>}
              </tbody>
            </Table>
          </Container>
        </div>

        <Modal show={modalCadastrarLoja} onHide={this.modalCadastrarLoja} size="lg" centered>
          <Modal.Header closeButton className="modal-loja-header">
            <Modal.Title>{selecionaLoja ? 'Editar Loja' : 'Adicionar Nova Loja'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-loja-body">
            <div>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="idLoja" className="texto-campos">ID Loja</Form.Label>
                    <Form.Control
                      type="text"
                      id="idLoja"
                      className="form-control"
                      name="idLoja"
                      value={idLoja || ''}
                      onChange={this.atualizarIDLoja}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="nomeLoja" className="texto-campos">Nome da Loja</Form.Label>
                    <Form.Control
                      type="text"
                      id="nomeLoja"
                      className="form-control"
                      name="nomeLoja"
                      value={nomeLoja || ''}
                      onChange={this.atualizarNomeLoja}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="unidadeNegocio" className="texto-campos">Unidade de Negócio</Form.Label>
                    <Form.Control
                      type="text"
                      id="unidadeNegocio"
                      className="form-control"
                      name="unidadeNegocio"
                      value={unidadeLoja || ''}
                      onChange={this.atualizarUnidadeLoja}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-loja-footer">
            <button className="botao-cancelar-loja" onClick={this.fecharModalCadastrar}>Cancelar</button>
            <button className="botao-cadastro-loja" onClick={() => this.salvarLoja()}>Salvar</button>
          </Modal.Footer>
        </Modal>
      </div >
    );
  }
}

export default CadastroLoja;
