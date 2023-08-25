import React from "react";

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
import '../css/CadastroLoja.css';

class CadastroLoja extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      lojas: [],
      modalEditarProduto: false,
    };
  }

  componentDidMount() {
    this.buscaLojas();
  }

  componentDidUpdate(prevProps, prevState) {
    const { modalEditarLoja } = this.state;
    const prevModalEditarLoja = prevState.modalEditarLoja;

    if (prevModalEditarLoja && !modalEditarLoja) {
      // Se o modal estiver fechando, chame a função para buscar as lojas novamente
      this.buscaLojas();
    }
  }

  buscaLojas = () => {
    fetch('https://prod-api-forma-pagamento.azurewebsites.net/api/v1/selecionarLojas')
      .then(response => response.json())
      .then(data => {
        this.setState({ lojas: data });
      })
      .catch(error => {
        console.error('Erro ao buscar as lojas:', error);

        const loja1 = {
          idLoja: '204607447',
          nomeLoja: 'Loja - Araucaria',
          unidadeLoja: 'Matriz',
        };

        const loja3 = {
          idLoja: '204607448',
          nomeLoja: 'Loja - Londrina',
          unidadeLoja: 'Filial',
        };

        const loja2 = {
          idLoja: '204607449',
          nomeLoja: 'Loja - Curitiba',
          unidadeLoja: 'Filial',
        };

        const lojasComAdicionais = [loja1, loja2, loja3];
        this.setState({ lojas: lojasComAdicionais });
      });
  };

  buscarIdLoja = (idLoja) => {
    fetch(`https://prod-api-forma-pagamento.azurewebsites.net/api/v1/${idLoja}`)
      .then(response => response.json())
      .then(data => {
        console.log('Resposta da API:', data);

        if (data && data.length > 0) {
          console.log('Loja encontrada:', data[0]);

          // Caso a loja seja encontrada, você pode atualizar o estado com a loja encontrada
          this.setState({ lojaEncontrada: data[0] });
        } else {
          console.log('Loja não encontrada.');
          // Caso a loja não seja encontrada, você pode mostrar uma mensagem de erro ou fazer alguma outra tratativa
        }
      })
      .catch(error => {
        console.error('Erro ao buscar a loja:', error);
      });
  };

  deletarLoja = (idLoja) => {
    fetch(`https://prod-api-forma-pagamento.azurewebsites.net/api/v1/${idLoja}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao deletar loja');
        }
        // Atualizar o estado após a deleção bem-sucedida (opcional)
        this.buscaLojas();
      })
      .catch(error => {
        console.error('Erro ao deletar a loja:', error);
      });
  };

  adicionarLoja = (selecionaLoja) => {
    fetch('https://prod-api-forma-pagamento.azurewebsites.net/api/v1/adicionarLoja/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selecionaLoja),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar loja');
        }
        // Atualizar o estado após a adição bem-sucedida (opcional)
        this.buscaLojas();
      })
      .catch(error => {
        console.error('Erro ao adicionar a loja:', error);
      });
  };

  handleModalEditarLoja = (loja) => {
    // Verificar se a loja existe
    if (loja) {
      // Caso a loja exista, setar o estado com os dados para edição
      this.setState({
        modalEditarLoja: true,
        selecionaLoja: {
          idLoja: loja.idLoja,
          nomeLoja: loja.nomeLoja,
          unidadeLoja: loja.unidadeLoja,
        },
      });
    } else {
      // Caso a loja não exista, setar o estado com os dados para adicionar nova loja
      this.setState({
        modalEditarLoja: true,
        selecionaLoja: {
          idLoja: '',
          nomeLoja: '',
          unidadeLoja: '',
        },
      });
    }
  };

  fecharModalEditarLoja = () => {
    // Limpe os dados da loja editando quando o modal for fechado
    this.setState({
      modalEditarLoja: false,
      selecionaLoja: null,
    });
  };

  handleCadastrarClick = () => {
    // Chamar a função handleModalEditarLoja sem nenhum argumento para abrir o modal de cadastro de nova loja
    this.handleModalEditarLoja(null);
  };

  atualizarIDLoja = (event) => {
    const idLoja = event.target.value;
    this.setState(prevState => ({
      selecionaLoja: {
        ...prevState.selecionaLoja,
        idLoja,
      },
    }));
  };

  // Função para atualizar o estado com o valor do campo Nome da Loja
  atualizarNomeLoja = (event) => {
    const nomeLoja = event.target.value;
    this.setState(prevState => ({
      selecionaLoja: {
        ...prevState.selecionaLoja,
        nomeLoja,
      },
    }));
  };

  // Função para atualizar o estado com o valor do campo Unidade de Negócio
  atualizarUnidadeLoja = (event) => {
    const unidadeLoja = event.target.value;
    this.setState(prevState => ({
      selecionaLoja: {
        ...prevState.selecionaLoja,
        unidadeLoja,
      },
    }));
  };

  salvarLoja = () => {
    const { selecionaLoja } = this.state;

    this.adicionarLoja(selecionaLoja);
    this.fecharModalEditarLoja();
  };

  render() {

    const { lojas, modalEditarLoja, selecionaLoja } = this.state;

    return (
      <div className="grid-loja">
        <Container fluid>
          <Col className="col">
            <div className="d-flex align-items-center mt-3 mb-3">
              <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Cadastrar uma nova loja:</span>
              <span style={{ marginRight: '0.8rem' }}>&nbsp;</span>
              <button onClick={this.handleCadastrarClick} className="d-flex align-items-center botao-cadastro-loja">
                <BsPersonAdd style={{ marginRight: '0.8rem' }} />
                Incluir Cadastro
              </button>
              <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white', fontSize: '1.9rem', fontStyle: 'italic' }}>UNIDADE LOJA</span>
            </div>

            <Col className="col">
              <div className="d-flex align-items-center mt-3 mb-3">
                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Buscar contato:</span>
                <input type="text" placeholder="Digite o termo de busca..." value={this.state.searchTerm} onChange={this.handleSearchChange} className="form-control ml-2" />
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
                {lojas.map(loja => (
                  <tr key={loja.id}
                    onClick={() => this.handleModalEditarLoja(loja)}
                    onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
                    onMouseLeave={(e) => e.currentTarget.style.cursor = 'default'}
                  >
                    <td>{loja.idLoja}</td>
                    <td>{loja.nomeLoja}</td>
                    <td>{loja.unidadeLoja}</td>
                    <td>
                      <div className="button-container-table">
                        <Button variant="warning" title="Editar loja" onClick={() => { this.handleModalEditarLoja(loja) }}>
                          <BsPencilSquare />
                        </Button>
                        <Button variant="danger" title="Excluir loja" onClick={() => { this.deletarLoja(loja.idLoja) }}>
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>

        {/* Modal */}
        <Modal show={modalEditarLoja} onHide={this.fecharModalEditarLoja} size="lg" centered>
          <Modal.Header closeButton className="modal-loja-header">
            <Modal.Title>{selecionaLoja ? 'Editar Loja' : 'Adicionar Nova Loja'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-loja-body">
            {selecionaLoja && (
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
                        value={selecionaLoja.idLoja}
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
                        value={selecionaLoja.nomeLoja}
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
                        value={selecionaLoja.unidadeLoja}
                        onChange={this.atualizarUnidadeLoja}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="modal-loja-footer">
            <button className="botao-cancelar-loja" onClick={this.fecharModalEditarLoja}>Cancelar</button>
            <button className="botao-cadastro-loja" onClick={() => this.salvarLoja()}>Salvar</button>
          </Modal.Footer>
        </Modal>
      </div >
    );
  }
}

export default CadastroLoja;
