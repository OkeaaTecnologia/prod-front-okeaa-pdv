import React, { Component } from "react";
import '../css/ListaPrecos.css';

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container } from "react-bootstrap";
import { Image } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';

import { FaTrash } from 'react-icons/fa';
import { parse } from 'js2xmlparser';
import { BsPersonAdd } from 'react-icons/bs';
import { BsShieldFillExclamation } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';

class ListaPrecos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listaspreco: [],
            carregando: false,
            searchTerm: '',          // Adicionando o campo searchTerm
            selectedListId: null,    // Adicionando o campo selectedListId
        };
    }


    componentDidMount() {
        this.buscarListaPreco();
    };

    buscarListaPreco = () => {
        fetch("http://localhost:8081/api/v1/selecionarListas", {
            // fetch("https://dev-api-okeaa-produto.azurewebsites.net/api/v1/selecionarListas", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ listaspreco: data });
            })
            .catch(error => {
                console.error('Erro ao buscar as lojas:', error);

                this.setState({ listaspreco: [] });
            });
    };

    buscarIdLista = (idLista) => {
        fetch(`http://localhost:8081//api/v1/selecionarLista/${idLista}`)
            // fetch(`https://dev-api-forma-pagamento.azurewebsites.net/api/v1/${idLista}`)
            .then(response => response.json())
            .then(data => {
                console.log('Resposta da API:', data);

                if (data && data.length > 0) {
                    console.log('Loja encontrada:', data[0]);

                    // Caso a loja seja encontrada, você pode atualizar o estado com a loja encontrada
                    this.setState({ listaEncontrada: data[0] });
                } else {
                    console.log('Loja não encontrada.');
                    // Caso a loja não seja encontrada, você pode mostrar uma mensagem de erro ou fazer alguma outra tratativa
                }
            })
            .catch(error => {
                console.error('Erro ao buscar a loja:', error);
            });
    };

    campoBusca = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    render() {

        const { listaspreco } = this.state

        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        if (this.state.carregando) {
            return (
                <div className="spinner-container" >
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="custom-loader"></div>
                    </div>
                    <div>
                        <div className="text-loading text-white">Carregando lista de preços...</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="grid-produto">
                    <Container fluid>
                        <Col className="col">
                            <div className="d-flex align-items-center mt-3 mb-3">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Incluir Lista:</span>
                                <span style={{ marginRight: '0.8rem' }}>&nbsp;</span>
                                <button onClick={this.reset} className="d-flex align-items-center botao-cadastro-produto">
                                    <BsPersonAdd style={{ marginRight: '0.6rem', fontSize: '1.3rem' }} />
                                    Incluir Lista
                                </button>
                                <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white', fontSize: '1.9rem', fontStyle: 'italic' }}>LISTA PREÇOS</span>
                            </div>
                        </Col>

                        <Col className="col">
                            <div className="d-flex align-items-center justify-content-start mt-3 mb-3 flex-row">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Buscar lista:</span>
                                <input type="text" placeholder="Nome da lista..." value={this.state.searchTerm} onChange={this.campoBusca} className="form-control ml-2" />
                            </div>
                        </Col>
                    </Container >
                    <div className="table-container-produto">
                        <Container fluid className="pb-5">
                            <Table striped bordered hover responsive="xl">
                                <thead>
                                    <tr>
                                        <th title="Nome da lista">Nome da lista</th>
                                        <th title="Quantidade de produtos">Quantidade de produtos</th>
                                        <th title="Regra da lista">Regra da lista</th>
                                        <th title="Data de validade">Data de validade</th>
                                        <th title="Horário vigência">Horário vigência</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaspreco.map((listaspreco) => {
                                        const normalizedSearchTerm = removeAccents(this.state.searchTerm.toLowerCase());
                                        const normalizedDescription = removeAccents(listaspreco.nomeLista.toLowerCase());
                                        const normalizedCodigo = listaspreco.idLista.toLowerCase();

                                        if (
                                            normalizedDescription.includes(normalizedSearchTerm) ||
                                            normalizedCodigo.includes(normalizedSearchTerm)
                                        ) {
                                            return (
                                                <tr
                                                    key={listaspreco.id}
                                                    onClick={() => {
                                                        this.buscarIdLista(listaspreco.idLista);
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.cursor = 'pointer')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.cursor = 'default')}
                                                >
                                                    <td>{listaspreco.nomeLista}</td>
                                                    <td>{listaspreco.quantidadeProduto}</td>
                                                    <td>{listaspreco.regraLista}</td>
                                                    <td>{listaspreco.dataValidade}</td>
                                                    <td>{listaspreco.horarioVigencia}</td>
                                                </tr>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                </div >
            );
        }
    }
}

export default ListaPrecos;
