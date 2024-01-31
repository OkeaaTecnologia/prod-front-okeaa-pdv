import React, { Component } from "react";
import '../css/ControleCaixa.css';

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Image } from 'react-bootstrap';
import { Alert } from "react-bootstrap";
import { CloseButton } from 'react-bootstrap';


import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaTrash } from 'react-icons/fa';
import { BsListCheck } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import { BsPersonAdd } from 'react-icons/bs';
import { BsShieldFillExclamation } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import { BsTrashFill } from 'react-icons/bs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ControleCaixa extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produtoLista: [],
            produtosSelecionados: [],
            idLista: '',
            nomeLista: '',
            imagem: '',
            quantidadeProduto: '',
            regraLista: '',
            baseado: '',
            fatorAplicado: '',
            tipoLista: '',
            precoLista: '',
            preco: '',
            numerosDeItens: '',
            ListaPreco: 0,
            data: '',
            erro: null,
            carregando: false,
            selectedListId: null,
            modalErro: false,
            modalCadastrarLista: false,
            modalExcluirProduto: false,
            produtoAExcluirIndex: null,
            modalProdutoExistente: false,
            modalExcluirLista: false,
            modalExcluindoLista: false,
            listaspreco: [],
            searchTerm: '',
            produtos: [],
            codigo: 0,
            buscaProduto: '',
            buscaListas: [],
            listaCaixaNaoLocalizado: false,
            listasCaixa: [],
            id: '',
            idLoja: '',
            descricaoLoja: '',
            operadorAbertura: '',
            operadorFechamento: '',
            dataAbertura: '',
            dataFechamento: '',
            trocoCaixaAnterior: '',
            trocoCaixa: '',
            totalInformado: '',
            diferencas: '',
            situacao: '',
            modalSelecionarLoja: false,
            controleCaixa: '',
            formaPagamentoCaixa: [],
            valoresInformados: [],  // Inicializa como uma lista vazia de objetos
            formaspagamento: [],
            CalculoTotalInformado: '',
            idPagamento: '',
            totalCalculado: '',
            dadosCarregados: '',
            showModal: false,
            errorMessage: ''
        };

        // Ambiente Local
        // this.buscarListasCaixaEndpoint = 'http://localhost:8080/api/v1/controleCaixas'
        // this.buscarIdCaixaEndpoint = 'http://localhost:8080/api/v1/controleCaixa'
        // this.cadastrarListaEndpoint = 'http://localhost:8080/api/v1/adicionarControleCaixa'
        // this.buscarLojaEndpoint = 'http://localhost:8080/api/v1/selecionarLojas'
        // this.buscarFormaDePagamentoEndpoint = 'http://localhost:8080/api/v1/formaspagamento'
        // this.atualizarListaEndpoint = 'http://localhost:8080/api/v1/atualizarControleCaixa'
        // this.deletarListaEndpoint = 'http://localhost:8080/api/v1/deletarControleCaixa'


        // Ambiente Desenvolvimento
        this.buscarListasCaixaEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/controleCaixas'
        this.buscarIdCaixaEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/controleCaixa'
        this.cadastrarListaEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/adicionarControleCaixa'
        this.buscarLojaEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/selecionarLojas'
        this.buscarFormaDePagamentoEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/formaspagamento'
        this.atualizarListaEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/atualizarControleCaixa'
        this.deletarListaEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/deletarControleCaixa'

        // // Ambiente Produção
        // this.buscarListasCaixaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/controleCaixas'
        // this.buscarIdCaixaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/controleCaixa'
        // this.cadastrarListaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/adicionarLista'
        // this.buscarLojaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/selecionarLojas'
        // this.buscarFormaDePagamentoEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/formaspagamento'
        // this.atualizarListaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/atualizarControleCaixa'
        // this.deletarListaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/deletarControleCaixa'
    };

    async componentDidMount() {
        try {
            await this.buscarLoja();
            await this.buscarListasCaixa();
            await this.buscarFormaDePagamento()
        } catch (error) {
            this.setState({ erro: `Erro ao conectar a API: ${error.message}` });
        }
    };

    componentDidUpdate(prevProps, prevState) {
    }


    buscarListasCaixa = () => {
        this.setState({ carregando: true });
        return new Promise((resolve, reject) => {
            let endpoint = this.buscarListasCaixaEndpoint;

            fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Assume que data é um array onde cada elemento possui uma propriedade produtoLista
                    // console.log(data);
                    if (data) {
                        this.setState({
                            listasCaixa: data,
                            carregando: false,
                        });
                    }
                    resolve();
                })
                .catch(error => {
                    // console.error('Erro ao buscar as lojas:', error);
                    this.setState({ carregando: true, showModal: true, errorMessage: 'Erro ao buscar listas de controle de caixa. Por favor, tente novamente mais tarde.' });
                    reject(error);
                });
        })
    };

    buscarIdLista = (id) => {
        return new Promise((resolve, reject) => {
            this.setState({ carregando: true, dadosCarregados: false });

            let endpoint = this.buscarIdCaixaEndpoint;

            fetch(`${endpoint}/${id}`)
                .then(response => response.json())
                .then(data => {
                    // console.log('buscarIdLista:', data);

                    const id = data.id;
                    const idLoja = data.idLoja;
                    const descricaoLoja = data.descricaoLoja;
                    const operadorAbertura = data.operadorAbertura;
                    const operadorFechamento = data.operadorFechamento;
                    const dataAbertura = data.dataAbertura;
                    const dataFechamento = data.dataFechamento;
                    const trocoCaixaAnterior = data.trocoCaixaAnterior;
                    const trocoCaixa = data.trocoCaixa;
                    const diferencas = data.diferencas;
                    const situacao = data.situacao;

                    const totalInformadoCaixa = data.totalInformadoCaixa.map(item => ({
                        idPagamento: item.idPagamento,
                        descricaoPagamento: item.descricaoPagamento,
                        totalInformado: item.totalInformado
                    }));

                    const valoresInformados = totalInformadoCaixa.map(item => ({
                        idPagamento: item.idPagamento,
                        descricaoPagamento: item.descricaoPagamento,
                        totalInformado: item.totalInformado
                    }));

                    // Extrair a lista de formas de pagamento
                    const formaPagamentoCaixaSet = new Set(); // Conjunto para garantir descrições únicas
                    data.formaPagamentoCaixa.forEach(item => {
                        formaPagamentoCaixaSet.add(item.descricao); // Adicionar descrição ao conjunto
                    });

                    const formaPagamentoCaixa = Array.from(formaPagamentoCaixaSet).map(descricao => ({
                        descricao: descricao,
                        totalCalculado: data.formaPagamentoCaixa.find(item => item.descricao === descricao).totalCalculado
                    }));

                    // Calcular o total informado
                    let CalculoTotalRegistrado = 0;
                    formaPagamentoCaixa.forEach(item => {
                        CalculoTotalRegistrado += parseFloat(item.totalCalculado);
                    });

                    // Formatar o total informado com duas casas decimais e separador de milhar
                    const totalRegistradoFormatado = CalculoTotalRegistrado.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });

                    // console.log('CalculoTotalInformado:', totalInformadoFormatado);
                    // console.log(formaPagamentoCaixa)

                    this.setState({
                        listaIdCaixa: data,
                        id: id,
                        idLoja: idLoja,
                        descricaoLoja: descricaoLoja,
                        operadorAbertura: operadorAbertura,
                        operadorFechamento: operadorFechamento,
                        dataAbertura: dataAbertura,
                        dataFechamento: dataFechamento,
                        trocoCaixaAnterior: trocoCaixaAnterior,
                        trocoCaixa: trocoCaixa,
                        diferencas: diferencas,
                        situacao: situacao,
                        formaPagamentoCaixa: formaPagamentoCaixa,
                        CalculoTotalRegistrado: totalRegistradoFormatado,
                        totalInformadoCaixa: totalInformadoCaixa,
                        valoresInformados: valoresInformados,
                        carregando: false,
                        dadosCarregados: true,
                    });
                    resolve();
                })
                .catch(error => {
                    console.error('Erro ao buscar a loja:', error);
                    reject(error);
                    this.setState({ carregando: true, dadosCarregados: false, showModal: true, errorMessage: 'Erro ao buscar controle de caixa. Por favor, tente novamente mais tarde.' });
                });
        });
    };


    buscarLoja = () => {
        this.setState({ carregando: true });

        return new Promise((resolve, reject) => {
            fetch(this.buscarLojaEndpoint)
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error("Erro na chamada da API");
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados && dados.length > 0) {
                        // Suponha que você deseja armazenar a primeira loja da lista
                        const primeiraLoja = dados[0];

                        this.setState({
                            idLoja: primeiraLoja.idLoja,
                            nomeLoja: primeiraLoja.nomeLoja,
                            objeto: dados,
                            carregando: false,
                        });
                    }
                    resolve();
                })
                .catch(error => {
                    // console.error(error);
                    this.setState({ carregando: true, showModal: true, errorMessage: 'Erro ao buscar lojas. Por favor, tente novamente mais tarde.' });
                });
        });
    };

    buscarFormaDePagamento = () => {
        this.setState({ carregando: true });

        return new Promise((resolve, reject) => {
            fetch(this.buscarFormaDePagamentoEndpoint)
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error("Erro na chamada da API");
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados.retorno.formaspagamento) {
                        // console.log("Forma de pagamento objeto retornado:", dados);
                        this.setState({
                            formaspagamento: dados.retorno.formaspagamento,
                            carregando: false,
                        });
                    }
                    resolve(); // Resolva a Promise quando a chamada da API for concluída com sucesso
                })
                .catch(error => {
                    // console.error('Erro ao buscar contatos:', error);
                    this.setState({ carregando: true, showModal: true, errorMessage: 'Erro ao buscar produtos. Por favor, tente novamente mais tarde.' });
                    reject(error); // Rejeite a Promise se ocorrer um erro na chamada da API
                });
        });
    };

    excluirCaixa(id) {
        const statusCode = fetch(`${this.deletarListaEndpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.status; // Retorna o código de status HTTP
            });
        // console.log(statusCode)
        return statusCode;
    };

    cadastrarLista = (controleCaixa) => {
        return fetch(this.cadastrarListaEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: controleCaixa,
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

    atualizarLista = (controleCaixa) => {
        const id = this.state.id;

        return fetch(`${this.atualizarListaEndpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: controleCaixa,
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


    reset = () => {
        this.setState({
            idLista: '',
            trocoCaixa: '',
            descricaoLoja: '',
            idLoja: ''
        });

        // Condição para fechar o modal apenas se estiver aberto
        if (this.state.modalSelecionarLoja) {
            this.modalSelecionarLoja(); // Fechar o modal
        }
    };

    obterTimestampFormatado = () => {
        // Criar um objeto Date representando o momento atual
        const dataAtual = new Date();

        // Função para formatar um número com dois dígitos
        const formatarDoisDigitos = (numero) => (numero < 10 ? `0${numero}` : numero);

        // Obter componentes de data e hora
        const dia = formatarDoisDigitos(dataAtual.getDate());
        const mes = formatarDoisDigitos(dataAtual.getMonth() + 1); // Meses são indexados de 0 a 11
        const ano = dataAtual.getFullYear();
        const horas = formatarDoisDigitos(dataAtual.getHours());
        const minutos = formatarDoisDigitos(dataAtual.getMinutes());
        const segundos = formatarDoisDigitos(dataAtual.getSeconds());

        // Construir a string de timestamp
        const timestamp = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;

        return timestamp;
    }


    submitCadastrar = () => {
        const idLoja = this.state.idLoja;
        const descricaoLoja = this.state.nomeLoja;
        const operadorAbertura = this.state.operadorAbertura;
        const dataAbertura = this.obterTimestampFormatado();
        const trocoCaixaAnterior = this.trocoCaixaAnterior;
        const trocoCaixa = this.state.trocoCaixa;


        const lista = {
            idLoja: idLoja,
            descricaoLoja: descricaoLoja,
            operadorAbertura: operadorAbertura,
            dataAbertura: dataAbertura,
            trocoCaixaAnterior: trocoCaixaAnterior,
            trocoCaixa: trocoCaixa,
        };

        const controleCaixa = JSON.stringify(lista);

        // console.log(controleCaixa);

        if (this.state.idLista === '') {
            this.cadastrarLista(controleCaixa)
                .then(responseData => {
                    if (responseData.data !== '') {
                        this.novaRenderizacao();
                        this.buscarListasCaixa();
                        this.reset();
                    } else {
                        this.modalErro();
                    }
                })
                .catch(error => {
                    console.error('Erro na chamada da API:', error);
                    this.modalErro();
                });
        }
    };


    submitFecharCaixa = () => {
        const dataFechamento = this.obterTimestampFormatado();
        const operadorFechamento = this.state.operadorFechamento;
        const totalInformadoCaixa = [];

        this.state.valoresInformados.forEach((valor) => {
            const totalInformadoItem = {
                idPagamento: valor.idPagamento,
                totalInformado: valor.totalInformado,
                descricaoPagamento: valor.descricaoPagamento
            };
            totalInformadoCaixa.push(totalInformadoItem);
        });

        // console.log(totalInformadoCaixa);

        const lista = {
            dataFechamento: dataFechamento,
            operadorFechamento: operadorFechamento,
            totalInformadoCaixa: totalInformadoCaixa
        };

        const controleCaixa = JSON.stringify(lista);

        // console.log(controleCaixa);

        if (this.state.idLista === '') {
            this.atualizarLista(controleCaixa)
                .then(responseData => {
                    if (responseData.data !== '') {
                        this.novaRenderizacao();
                        this.buscarListaPreco();
                        this.reset();
                    } else {
                        this.modalErro();
                    }
                })
                .catch(error => {
                    console.error('Erro na chamada da API:', error);
                    this.modalErro();
                });
        }
    };

    modalSelecionarLoja = () => {
        this.setState({
            modalSelecionarLoja: !this.state.modalSelecionarLoja
        });
    };


    atualizaIdLoja = (idLoja) => {
        // console.log("idLoja: ", idLoja);
        this.setState({
            idLoja: idLoja
        });
    };

    atualizaNomeLoja = (nomeLoja) => {
        // console.log("nomeLoja: ", nomeLoja);
        this.setState({
            nomeLoja: nomeLoja
        });
    };

    atualizaTroco = (event) => {
        const inputTroco = event.target.value;
        const trocoCaixa = inputTroco.replace(',', '.').replace(/[^\d.]/g, ''); // Substitui vírgula por ponto e remove caracteres não numéricos, exceto ponto decimal
        this.setState({
            trocoCaixa: trocoCaixa,
        });
    };

    formatarTroco = (event) => {
        const trocoCaixa = event.target.value.trim();
        this.setState({
            trocoCaixa: trocoCaixa !== '' && !isNaN(trocoCaixa) ? parseFloat(trocoCaixa).toFixed(2) : ''
        });
    };

    campoBusca = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    novaRenderizacao = (idLista) => {
        this.setState({ selectedListId: idLista });
    };

    modalExcluirProduto = () => {
        this.setState({
            modalExcluirProduto: !this.state.modalExcluirProduto,
        });
    };

    modalExcluindoCaixa = () => {
        this.setState({
            modalExcluindoCaixa: !this.state.modalExcluindoCaixa,
        }, () => {
            setTimeout(() => {
                this.setState({
                    modalExcluindoCaixa: false
                })
            }, 1000);
        });
    };

    closeModalErro = () => {
        this.setState({ showModal: false, errorMessage: '' });
    }

    deletarCaixa = () => {
        this.modalExcluirProduto()
        this.excluirCaixa(this.state.codigoProdutoParaExcluir)
            .then(statusCode => {
                if (statusCode === 200) {
                    this.modalExcluindoCaixa()
                    this.buscarListasCaixa();
                } else {
                    this.modalErro();
                }
            })
            .catch(error => {
                console.error('Erro na chamada da API:', error);
                this.modalErro();
            });
    }


    adicionarCampo = () => {
        this.setState(prevState => ({
            valoresInformados: [...prevState.valoresInformados, { idPagamento: '', totalInformado: 0, descricaoPagamento: '' }]
        }));
    };

    removerCampo = index => {
        this.setState(prevState => {
            const novosValoresInformados = [...prevState.valoresInformados];
            novosValoresInformados.splice(index, 1);
            return { valoresInformados: novosValoresInformados };
        });
    };

    handleidPagamentoChange = (index, event) => {
        const novosValoresInformados = [...this.state.valoresInformados];
        novosValoresInformados[index].idPagamento = event.target.value;
        // console.log('Novo valor de descrição:', novosValoresInformados[index].idPagamento); // Imprime o novo valor de descrição
        this.setState({ valoresInformados: novosValoresInformados });
    };

    handleDescricaoChange = (index, descricaoPagamento) => {
        const novosValoresInformados = [...this.state.valoresInformados];
        novosValoresInformados[index].descricaoPagamento = descricaoPagamento;

        // console.log('Descrição selecionada:', descricaoPagamento);
        // console.log('Dados da parcela atualizados:', novosValoresInformados[index]);

        this.setState({ valoresInformados: novosValoresInformados });

    };

    handleTotalInformadoChange = (index, event) => {
        const novosValoresInformados = [...this.state.valoresInformados];
        novosValoresInformados[index].totalInformado = event.target.value;
        // console.log('Novo valor de total informado:', novosValoresInformados[index].totalInformado); // Imprime o novo valor de total informado
        this.setState({ valoresInformados: novosValoresInformados });
    };


    render() {

        const { listasCaixa, selectedListId, regraLista, nomeLista, baseado, fatorAplicado, numerosDeItens, modalSelecionarLoja, objeto, idLoja, trocoCaixa, modalExcluirProduto, codigoProdutoParaExcluir } = this.state;
        const { carregando, showModal, errorMessage } = this.state;

        if (selectedListId) {
            // Se selectedListId estiver definido, renderiza a nova tela
            return this.renderTelaLista();
        }

        if (carregando) {
            return (
                <div className="spinner-container">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="custom-loader"></div>
                    </div>
                    <div >
                        <div className="text-loading text-white">Carregando listas de controle de caixa...</div>
                    </div>
                    <div>
                        {/* Modal de erro */}
                        <Modal className="modal-erro" show={showModal} onHide={this.closeModalErro}>
                            <Modal.Header closeButton>
                                <Modal.Title>Erro</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{errorMessage}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeModalErro}>
                                    Fechar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="grid-listapreco-table">
                    <Container fluid>
                        <Col className="col">
                            <div className="d-flex align-items-center mt-3 mb-3">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Abrir Caixa</span>
                                <span style={{ marginRight: '0.8rem' }}>&nbsp;</span>
                                <button
                                    onClick={() => {
                                        this.setState({ dadosCarregados: true });
                                        this.modalSelecionarLoja();
                                        this.reset();
                                    }}
                                    className="d-flex align-items-center botao-cadastro-produto"
                                >
                                    <BsPersonAdd style={{ marginRight: '0.6rem', fontSize: '1.3rem' }} />
                                    Abrir Caixa
                                </button>
                                <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white', fontSize: '1.9rem', fontStyle: 'italic' }}>CONTROLE DE CAIXA</span>
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
                            <Table bordered hover variant="warning" responsive="xl">
                                <thead>
                                    <tr>
                                        <th title="Loja">Loja</th>
                                        <th title="Operador">Operador</th>
                                        <th title="Data">Data</th>
                                        <th title="Situação">Situação</th>
                                        <th title="Opções">Opções</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listasCaixa.map((listasCaixa, index) => {
                                        return (
                                            <tr
                                                key={listasCaixa.id}
                                                onClick={() => {
                                                    this.buscarIdLista(listasCaixa.id);
                                                    this.novaRenderizacao(listasCaixa.id)
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.cursor = 'pointer')}
                                                onMouseLeave={(e) => (e.currentTarget.style.cursor = 'default')}
                                            >
                                                <td>{listasCaixa.descricaoLoja}</td>
                                                <td>{listasCaixa.operadorAbertura}</td>
                                                <td>{listasCaixa.dataAbertura}</td>
                                                <td>{listasCaixa.situacao}</td>
                                                <td>
                                                    <div className="button-container-table">
                                                        {/* <Button variant="warning" title="Editar produto" onClick={(e) => {
                                                                e.stopPropagation();
                                                                this.carregarProdutos(produtos.produto.codigo);
                                                                this.carregarProdutoFornecedor(produtos.produto.id);
                                                            }}>
                                                                <BsPencilSquare />
                                                            </Button> */}
                                                        <Button
                                                            variant="danger"
                                                            title="Excluir produto"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                this.setState({
                                                                    codigoProdutoParaExcluir: listasCaixa.id,
                                                                    modalExcluirProduto: true,
                                                                });
                                                            }}
                                                        >
                                                            <FaTrash />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {this.state.listasCaixa.length === 0 && <tr><td colSpan="6">Nenhum conttrole de caixa cadastrado.</td></tr>}
                                </tbody>
                            </Table>
                        </Container>
                    </div>

                    <Modal show={modalSelecionarLoja} onHide={this.modalSelecionarLoja} backdrop="static" centered>
                        <Modal.Header closeButton className="bg-secondary text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Abrir Caixa
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            <div className="text-center" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#6c757d' }}>
                                Bem vindo ao controle de caixa!
                            </div>
                            <Col className="col">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="depositolancamento" className="texto-campos">Selecione a loja</Form.Label>
                                    <Form.Select
                                        as="select"
                                        className="form-control"
                                        id="depositolancamento"
                                        name="depositolancamento"
                                        value={this.state.idLoja || ''}
                                        onChange={(event) => {
                                            const selectedId = event.target.value;
                                            let selectedName = '';
                                            if (selectedId) {
                                                selectedName = objeto.find(obj => obj.idLoja === selectedId)?.nomeLoja || '';
                                            }
                                            this.atualizaIdLoja(selectedId);
                                            this.atualizaNomeLoja(selectedName);
                                        }}
                                    >
                                        <option value="">Selecione a loja</option>
                                        {objeto && objeto.map((obj) => (
                                            <option key={obj.idLoja} value={obj.idLoja}>
                                                {obj.nomeLoja}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col className="col">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="unidadenegocio" className="texto-campos">Troco</Form.Label>
                                    <Form.Control type="text" className="form-control" id="unidadenegocio" name="unidadenegocio" value={trocoCaixa || ''} onChange={this.atualizaTroco} onBlur={this.formatarTroco} />
                                </Form.Group>
                            </Col>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { this.submitCadastrar(); this.reset(); }}>Salvar</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={modalExcluirProduto} onHide={this.modalExcluirProduto} centered>
                        <Modal.Header closeButton className="bg-danger text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Deseja excluir o produto? Essa ação não poderá ser desfeita.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="botao-finalizarvenda" variant="outline-secondary" onClick={this.modalExcluirProduto}>
                                Não
                            </Button>
                            <Button type="button" variant="secondary" onClick={() => {
                                this.deletarCaixa(codigoProdutoParaExcluir);
                            }}>
                                Sim
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.modalExcluindoCaixa} onHide={this.modalExcluindoCaixa} centered>
                        <Modal.Body>
                            <span style={{ display: 'block' }}><strong>Excluindo controle de caixa...</strong></span>
                        </Modal.Body>
                    </Modal>
                </div >
            );
        }
    }

    renderTelaLista = () => {

        const { produtos, produtoSelecionado, buscaProduto, produtoNaoLocalizado, codigo, preco, imagem, regraLista, tipoLista, baseado, fatorAplicado, nomeLista,
            descricaoLoja, listasCaixa, formaPagamentoCaixa, totalInformado, idPagamento, totalInformadoCaixa, dadosCarregados } = this.state;

        // Calcula o total registrado somando os valores de totalCalculado para cada forma de pagamento
        const CalculoTotalRegistrado = this.state.formaPagamentoCaixa ? this.state.formaPagamentoCaixa.reduce((total, formaPagamento) => total + parseFloat(formaPagamento.totalCalculado || 0), 0) : 0;

        // Calcula o total informado somando os valores de totalInformado para cada forma de pagamento
        const CalculoTotalInformado = this.state.totalInformadoCaixa ? this.state.totalInformadoCaixa.reduce((total, totalInformado) => total + parseFloat(totalInformado.totalInformado || 0), 0) : 0;

        // Calcula a diferença entre o total registrado e o total informado
        const diferencaTotal = CalculoTotalRegistrado - CalculoTotalInformado;
        const { carregando, showModal, errorMessage } = this.state;


        if (carregando) {
            return (
                <div className="spinner-container">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="custom-loader"></div>
                    </div>
                    <div >
                        <div className="text-loading text-white">Carregando controle de caixa...</div>
                    </div>
                    <div>
                        {/* Modal de erro */}
                        <Modal className="modal-erro" show={showModal} onHide={this.closeModalErro}>
                            <Modal.Header closeButton>
                                <Modal.Title>Erro</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{errorMessage}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeModalErro}>
                                    Fechar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            )
        } else {
            return (

                <Container fluid className="pb-5">
                    <Form>
                        <Row className="d-flex">
                            {/* Lado Esquerdo (grid-pdv-1) */}
                            <Col md={4}>
                                <div className="grid-pdv-1">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="mb-3" style={{ fontWeight: 'bold', color: 'gray', fontSize: '1.6rem', fontStyle: 'italic' }}>CONTROLE DE CAIXA</span>
                                        <Form.Group controlId="buttonSalvar" className="mb-3">
                                            <div className="button-container d-flex">
                                                <button
                                                    type="submit"
                                                    onClick={() => { this.submitFecharCaixa(); this.reset(); }}
                                                    className="botao-cadastro-produto"
                                                >
                                                    Salvar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => this.novaRenderizacao()}
                                                    className="botao-cancelar-produto"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <Row className="row align-items-center">
                                        <Col xs={12} md={8}>
                                            <Col className="col">
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="loja" className="texto-campos">Loja</Form.Label>
                                                    <Form.Control type="text" id="preco" name="loja" value={this.state.descricaoLoja} disabled />
                                                </Form.Group>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <div className="mb-3">
                                        <h5>Valores informados</h5>
                                        <p>Insira as formas de pagamento utilizadas neste caixa</p>
                                    </div>
                                    {this.state.valoresInformados.map((valor, index) => (
                                        <Row key={index}>
                                            <Col xs={12} md={4} className="mb-3">
                                                <Form.Label htmlFor={`idPagamento${index}`} className="texto-campos">
                                                    Forma de Pagamento
                                                </Form.Label>
                                                <Form.Select
                                                    as="select"
                                                    id={`idPagamento${index}`}
                                                    name={`idPagamento${index}`}
                                                    value={`${valor.idPagamento || ''}-${valor.descricaoPagamento || ''}`}
                                                    onChange={(e) => {
                                                        const [formaId, descricao] = e.target.value.split('-');
                                                        this.handleidPagamentoChange(index, { target: { value: formaId } });
                                                        this.handleDescricaoChange(index, descricao);
                                                    }}
                                                    disabled={this.state.situacao === "Fechado"}
                                                >
                                                    <option value="">Selecione a forma</option>
                                                    {this.state.formaspagamento.map((formapagamento) => (
                                                        <option key={formapagamento.formapagamento.id} value={`${formapagamento.formapagamento.id}-${formapagamento.formapagamento.descricao}`}>
                                                            {formapagamento.formapagamento.descricao}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                            <Col xs={12} md={4} className="mb-3">
                                                <Form.Label htmlFor={`totalInformado${index}`} className="texto-campos">
                                                    Valor
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id={`totalInformado${index}`}
                                                    name={`totalInformado${index}`}
                                                    value={valor.totalInformado || totalInformado || ''}
                                                    onChange={e => this.handleTotalInformadoChange(index, e)}
                                                    disabled={this.state.situacao === "Fechado"}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="mb-3 d-flex align-items-end">
                                                <Button
                                                    variant="danger"
                                                    onClick={() => this.removerCampo(index)}
                                                    disabled={this.state.situacao === "Fechado"}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))}


                                    <Button
                                        variant="dark"
                                        onClick={this.adicionarCampo}
                                    >
                                        Adicionar forma de pagamento
                                    </Button>
                                </div>
                            </Col>

                            <Col md={8}>
                                <div className="grid-pdv-2">
                                    <Row>
                                        <Col md={12}>
                                            <div className="table-container-produto row align-items-center">
                                                <Container fluid className="pb-5">
                                                    <Table striped bordered hover responsive="xl" value>
                                                        <thead>
                                                            <tr>
                                                                <th>Loja</th>
                                                                <th>Operador de Abertura</th>
                                                                <th>Data Abertura</th>
                                                                <th>Troco caixa anterior</th>
                                                                <th>Troco</th>
                                                                <th>Operador de Fechamento</th>
                                                                <th>Data Fechamento</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listasCaixa.filter(item => item.id === this.state.id)  // Filtra com base no ID desejado
                                                                .map((listasCaixa, index) => (
                                                                    <tr key={listasCaixa.id}>
                                                                        <td>{listasCaixa.descricaoLoja}</td>
                                                                        <td>{listasCaixa.operadorAbertura}</td>
                                                                        <td>{listasCaixa.dataAbertura}</td>
                                                                        <td>{listasCaixa.trocoCaixaAnterior}</td>
                                                                        <td>{listasCaixa.trocoCaixa}</td>
                                                                        <td>{listasCaixa.operadorFechamento}</td>
                                                                        <td>{listasCaixa.dataFechamento}</td>
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </Table>
                                                </Container>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={12}>
                                            <div className="table-container-produto row align-items-center">
                                                <Container fluid className="pb-5">
                                                    <Table striped bordered hover responsive="xl" value>
                                                        <thead>
                                                            <tr>
                                                                <th>Descrição</th>
                                                                <th>Total Registrado</th>
                                                                <th>Total Informado</th>
                                                                <th>Diferença</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.formaPagamentoCaixa.map((formaPagamento, index) => {
                                                                const totalCalculado = parseFloat(formaPagamento.totalCalculado);
                                                                const totalInformado = this.state.totalInformadoCaixa[index]; // Acessando diretamente o índice correspondente em totalInformadoCaixa
                                                                const totalInformadoNum = totalInformado ? parseFloat(totalInformado.totalInformado) : null;
                                                                const diferenca = totalInformadoNum !== null ? (totalCalculado - totalInformadoNum) : '-';
                                                                return (

                                                                    <tr key={index}>
                                                                        <td>{formaPagamento.descricao || '-'}</td>
                                                                        <td>{totalCalculado || '-'}</td>
                                                                        <td>{totalInformadoNum !== null ? totalInformadoNum.toFixed(2) : '-'}</td>
                                                                        <td>{totalInformadoNum !== null ? diferenca.toFixed(2) : '-'}</td> {/* Formata a diferença com duas casas decimais */}
                                                                    </tr>
                                                                );
                                                            })}
                                                            <tr>
                                                                <td><strong>Total</strong></td>
                                                                <td><strong>{CalculoTotalRegistrado.toFixed(2)}</strong></td>
                                                                <td><strong>{CalculoTotalInformado.toFixed(2)}</strong></td>
                                                                <td><strong>{diferencaTotal.toFixed(2)}</strong></td>
                                                            </tr>

                                                        </tbody>
                                                    </Table>
                                                </Container>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Form >



                    <Modal show={this.state.modalExcluirProduto} onHide={this.modalExcluirProduto} centered>
                        <Modal.Header closeButton className="bg-warning text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Deseja excluir o produto? Essa ação não poderá ser desfeita.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botao-finalizarvenda" variant="outline-secondary" onClick={this.modalExcluirProduto}>Não</Button>
                            <Button variant="secondary" onClick={this.deleteProduto}>Sim</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.modalProdutoExistente} onHide={this.modalProdutoExistente} centered>
                        <Modal.Header closeButton className="bg-warning text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Este produto Cód: {codigo} encontra-se na lista, adicione outro produto.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalProdutoExistente}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container >
            );
        };
    }
}

export default ControleCaixa;