import React, { Component } from "react";
import '../css/ListaPrecos.css';

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

class ListaPrecos extends Component {
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
            produtoNaoLocalizado: false,
            listaspreco: [],
            searchTerm: '',
            produtos: [],
            codigo: 0,
            buscaProduto: '',
            dadosCarregados: false,
            showModal: false,
            errorMessage: ''
        };

        // Ambiente Local
        // this.buscarProdutosEndpoint = 'http://localhost:8081/api/v1/produtos'
        // this.buscarListaPrecoEndpoint = 'http://localhost:8081/api/v1/selecionarListas'
        // this.buscarIdListaEndpoint = 'http://localhost:8081/api/v1/selecionarLista'
        // this.deletarListaEndpoint = 'http://localhost:8081/api/v1/deletarLista'
        // this.cadastrarListaEndpoint = 'http://localhost:8081/api/v1/adicionarLista'
        // this.atualizarListaEndpoint = 'http://localhost:8081/api/v1/atualizarLista'

        // Ambiente Desenvolvimento
        this.buscarProdutosEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/produtos'
        this.buscarListaPrecoEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/selecionarListas'
        this.buscarIdListaEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/selecionarLista'
        this.deletarListaEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/deletarLista'
        this.cadastrarListaEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/adicionarLista'
        this.atualizarListaEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/atualizarLista'

        // Ambiente Produção
        // this.buscarProdutosEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produtos'
        // this.buscarListaPrecoEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/selecionarListas'
        // this.buscarIdListaEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/selecionarLista'
        // this.deletarListaEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produto'
        // this.cadastrarListaEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/adicionarLista'
        // this.atualizarListaEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/atualizarLista'
    };

    async componentDidMount() {
        try {
            await this.buscarListaPreco();
        } catch (error) {
            this.setState({ erro: `Erro ao conectar a API: ${error.message}` });
        }
    };

    //----------------------------------------- API BUSCA LISTAS ----------------------------------------------------------

    buscarListaPreco = () => {
        this.setState({ carregando: true });

        return new Promise((resolve, reject) => {
            fetch(this.buscarListaPrecoEndpoint, {
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
                        // Calcula o número de itens em cada lista dentro de cada elemento
                        const numerosDeItens = data.map(item => item.produtoLista.length);

                        // Extrai a primeira instância de fatorAplicado e baseado
                        const primeiraInstancia = data[0];
                        const fatorAplicado = primeiraInstancia ? primeiraInstancia.fatorAplicado : undefined;
                        const baseado = primeiraInstancia ? primeiraInstancia.baseado : undefined;

                        // console.log(numerosDeItens, fatorAplicado, baseado)

                        this.setState({
                            listaspreco: data,
                            numerosDeItens: numerosDeItens,
                            fatorAplicado: fatorAplicado,
                            baseado: baseado,
                            carregando: false,
                            dadosCarregados: true,
                        });
                    }
                    resolve();
                })
                .catch(error => {
                    // console.error('Erro ao buscar contatos:', error);
                    this.setState({ carregando: true, showModal: true, errorMessage: 'Erro ao buscar listas de preços. Por favor, tente novamente mais tarde.' });
                    reject('API lista preço fora do ar');
                });
        })
    };

    //----------------------------------------- API BUSCA IDLISTA ----------------------------------------------------------

    buscarIdLista = (idLista) => {
        this.setState({ carregando: true, dadosCarregados: false });

        return new Promise((resolve, reject) => {
            fetch(`${this.buscarIdListaEndpoint}/${idLista}`)
                .then(response => response.json())
                .then(data => {
                    // console.log('Resposta da API:', data);

                    const idLista = data.idLista;
                    const nomeLista = data.nomeLista;
                    const quantidadeProduto = data.quantidadeProduto;
                    const regraLista = data.regraLista;
                    const baseado = data.baseado;
                    const fatorAplicado = data.fatorAplicado;
                    const tipoLista = data.tipoLista;

                    if (idLista !== undefined) {
                        const produtoLista = data.produtoLista;

                        // console.log("nome lista: ", nomeLista);

                        // Certifique-se de limpar a lista antes de adicionar novos produtos
                        const produtosSelecionados = produtoLista.map((produto) => ({
                            produto: produto,
                            quantidade: 1, // ou qualquer valor padrão que você deseja
                            preco: produto.preco, // ou qualquer lógica para definir o preço padrão
                            precoProduto: produto.preco, // ou qualquer lógica para definir o preço padrão
                            precoLista: produto.precoLista
                            // Outras propriedades...
                        }));

                        this.setState({
                            idLista: idLista,
                            nomeLista: nomeLista,
                            quantidadeProduto: quantidadeProduto,
                            regraLista: regraLista,
                            baseado: baseado,
                            fatorAplicado: fatorAplicado,
                            tipoLista: tipoLista,
                            produtoLista: produtoLista,
                            produtosSelecionados: produtosSelecionados,
                            carregando: false,
                            dadosCarregados: true,
                        });

                        if (produtoLista && produtoLista.length > 0) {
                            // console.log('Produto Lista encontrada:', produtoLista[0]);

                            // Caso a loja seja encontrada, você pode atualizar o estado com a loja encontrada
                            this.setState({ listaEncontrada: produtoLista[0] });
                        } else {
                            // console.log('Lista não encontrada.');
                            // Caso a loja não seja encontrada, você pode mostrar uma mensagem de erro ou fazer alguma outra tratativa
                        }
                    }
                    resolve();
                })
                .catch(error => {
                    // console.error(error);
                    this.setState({ carregando: true, showModal: false, dadosCarregados: false, errorMessage: 'Erro ao buscar lista de preço. Por favor, tente novamente mais tarde.' });
                    reject('API buscar id lista preço fora do ar');
                });
        })
    };

    //----------------------------------------- API BUSCA PRODUTOS ----------------------------------------------------------

    buscarProdutos = (value) => {
        this.setState({ carregando: true, dadosCarregados: false });

        return new Promise((resolve, reject) => {
            const sanitizedValue = this.normalizeString(value).toLowerCase();
            let endpoint = this.buscarProdutosEndpoint;

            // Verifica se o valor de entrada é um código (todos os dígitos)
            if (/^\d+$/.test(sanitizedValue)) {
                endpoint += `?codigo=${sanitizedValue}`;
            }
            // Verifica se o valor de entrada é um GTIN (todos os dígitos e comprimento entre 8 e 14)
            else if (/^\d+$/.test(sanitizedValue) && sanitizedValue.length >= 8 && sanitizedValue.length <= 14) {
                endpoint += `?gtin=${sanitizedValue}`;
            }
            // Se não for código nem GTIN, assume que é uma descrição
            else if (sanitizedValue !== null && sanitizedValue.trim() !== "") {
                endpoint += `?descricao=${this.normalizeString(sanitizedValue)}`;
            } else {
                // Caso nenhum dos casos anteriores se aplique, você pode lidar com a situação conforme necessário
                // Por exemplo, lançar um erro, definir um valor padrão, etc.
                console.error("Entrada inválida. Pelo menos um dos parâmetros (código, GTIN, descrição) deve ser fornecido.");
                reject(new Error("Entrada inválida"));
                return;
            }

            this.setState({ buscaProduto: value, carregando: false, produtoNaoLocalizado: false });

            fetch(endpoint)
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error('Erro na chamada da API');
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados.retorno.produtos) {
                        const produtosFiltrados = dados.retorno.produtos;
                        if (produtosFiltrados.length === 0) {
                            // Nenhum produto encontrado
                            this.setState({
                                produtos: [],
                                produtoSelecionado: null,
                                carregando: false,
                                dadosCarregados: true,
                                produtoNaoLocalizado: true
                            });
                        } else {
                            // Produtos encontrados
                            this.setState({
                                produtos: produtosFiltrados,
                                produtoSelecionado: null,
                                carregando: false,
                                dadosCarregados: true,
                                produtoNaoLocalizado: false
                            });
                        }
                    } else {
                        // Nenhum produto encontrado
                        this.setState({
                            produtos: [],
                            carregando: false,
                            dadosCarregados: true,
                            produtoNaoLocalizado: true
                        });
                    }
                    resolve();
                })
                .catch((error) => {
                    reject('API buscar produtos fora do ar');
                    this.setState({ carregando: false, dadosCarregados: false, showModal: true, errorMessage: 'Erro ao buscar produtos. Por favor, tente novamente mais tarde.' });
                });
        });
    };

    normalizeString = (str) => {
        if (str === null || str === undefined) {
            return '';
        }

        const normalizedString = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        // console.log(`Original: ${str}, Normalized: ${normalizedString}`);

        return normalizedString;
    };

    //----------------------------------------- API DELETE IDLISTA ----------------------------------------------------------

    deletarLista(idLista) {
        const statusCode = fetch(`${this.deletarListaEndpoint}/${idLista}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.status; // Retorna o código de status HTTP
            })
            .catch(error => {
                // console.error('Erro ao deletar a loja:', error);
                this.setState({ showModal: true, errorMessage: 'Erro ao deletar lista de preço. Por favor, tente novamente mais tarde.' });
            });

        // console.log(statusCode)
        return statusCode;

    };

    //----------------------------------------- API CADASTRAR LISTA ----------------------------------------------------------

    cadastrarLista = (listaPrecoResponse) => {
        return fetch(this.cadastrarListaEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: listaPrecoResponse,
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

    //----------------------------------------- API ATUALIZAR LISTA ----------------------------------------------------------

    atualizarLista = (listaPrecoResponse) => {
        const idLista = this.state.idLista;

        return fetch(`${this.atualizarListaEndpoint}/${idLista}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: listaPrecoResponse,
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
    //---------------------------------------------- FUNÇÕES LISTA PRODUTO --------------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    atualizarBuscaProduto = (event) => {
        this.setState({
            buscaProduto: event.target.value
        });
    };

    selecionarProduto = (produto) => {
        const preco = parseFloat(produto.produto.preco).toFixed(2);
        this.setState({
            produtoSelecionado: produto,
            codigo: produto.produto.codigo,
            gtin: produto.produto.gtin,
            preco: preco,
            produtos: [],
        });
        this.adicionarProdutoSelecionado();

        this.atualizarBuscaProduto({ target: { value: '' } });
    };

    adicionarProdutoSelecionado = () => {
        const { produtoSelecionado, preco, gtin, produtosSelecionados } = this.state;
        if (!produtoSelecionado) {
            return;
        }

        const produtoExistente = produtosSelecionados.find(item => item.produto.codigo === produtoSelecionado.produto.codigo);

        if (produtoExistente) {
            // Produto já está na lista, exibe o modal
            this.modalProdutoExistente();
            return;
        }

        const produtoCopia = JSON.parse(JSON.stringify(produtoSelecionado.produto));

        const novoProduto = {
            produto: produtoCopia,
            preco: preco,
            gtin: gtin,
            precoLista: 0
        };

        this.calcularPreco(novoProduto);

        const novosProdutosSelecionados = [...produtosSelecionados, novoProduto];

        this.setState({
            produtosSelecionados: novosProdutosSelecionados,
            produtoSelecionado: null,
            buscaProduto: '',
            produtos: [],
            preco: '',
        });
    };

    deleteProduto = () => {
        // Lógica para excluir o produto
        const index = this.state.produtoAExcluirIndex;
        const produtosSelecionados = [...this.state.produtosSelecionados];
        produtosSelecionados.splice(index, 1);
        this.setState({
            produtosSelecionados,
            modalExcluirProduto: false,
            produtoAExcluirIndex: null,
        });
    };

    excluirProdutoSelecionado = (index) => {
        // Define o produto a ser excluído e abre o modal correspondente
        this.setState({
            produtoAExcluirIndex: index,
            modalExcluirProduto: true,
        });
    };

    calcularPreco = (produto) => {
        const { regraLista, baseado, fatorAplicado } = this.state;
        const preco = parseFloat(produto.preco).toFixed(2);

        let novoPrecoLista;

        if (regraLista === 'Acrescimo' && baseado === 'Porcentagem') {
            const acrescimoPorcentagem = preco * (fatorAplicado / 100);
            novoPrecoLista = parseFloat(preco) + parseFloat(acrescimoPorcentagem);
        } else if (regraLista === 'Desconto' && baseado === 'Porcentagem') {
            const descontoPorcentagem = preco * (fatorAplicado / 100);
            novoPrecoLista = parseFloat(preco) - parseFloat(descontoPorcentagem);
        } else if (regraLista === 'Acrescimo' && baseado === 'Valor') {
            const acrescimoValor = parseFloat(preco) + parseFloat(fatorAplicado);
            novoPrecoLista = acrescimoValor.toFixed(2);
        } else if (regraLista === 'Desconto' && baseado === 'Valor') {
            const descontoValor = parseFloat(preco) - parseFloat(fatorAplicado);
            novoPrecoLista = descontoValor.toFixed(2);
        } else {
            // Mantém o preco original
            novoPrecoLista = preco;
        };

        // Atualiza o precoLista do produto atualizado
        produto.precoLista = novoPrecoLista;

        this.setState({
            precoLista: novoPrecoLista
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    //---------------------------------------------- FUNÇÕES LISTA DESCONTO -------------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    atualizanomeLista = (event) => {
        const nomeLista = event.target.value;
        // console.log('nomeLista: ', nomeLista);
        this.setState({
            nomeLista: nomeLista
        });
    };

    atualizafatorAplicado = (event) => {
        const fatorAplicado = event.target.value;
        // console.log('fatorAplicado: ', fatorAplicado);
        this.setState({
            fatorAplicado: fatorAplicado
        });
    };

    atualizaBaseado = (event) => {
        const baseado = event.target.value;
        // console.log('baseado: ', baseado);
        this.setState({
            baseado: baseado
        });
    };

    atualizaRegraLista = (event) => {
        const regraLista = event.target.value;
        // console.log('regraLista: ', regraLista);
        this.setState({
            regraLista: regraLista
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    //---------------------------------------------- FUNÇÕES BOTÕES E JSON  -------------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    reset = () => {
        this.setState({
            idLista: '',
            nomeLista: '',
            quantidadeProduto: '',
            regraLista: '',
            baseado: '',
            fatorAplicado: '',
            tipoLista: '',
            produtosSelecionados: [],
            produtoSelecionado: null,
            buscaProduto: '',
        });

        // Condição para fechar o modal apenas se estiver aberto
        if (this.state.modalCadastrarLista) {
            this.modalCadastrarLista(); // Fechar o modal
        }
    };

    finalizaLista = () => {
        const produtoLista = [];

        this.state.produtosSelecionados.forEach((produto) => {
            const precoArredondado = parseFloat(produto.preco).toFixed(2);
            const precoListaArredondado = parseFloat(produto.precoLista).toFixed(2);

            const item = {
                id: produto.produto.id,
                codigo: produto.produto.codigo,
                descricao: produto.produto.descricao,
                preco: precoArredondado,
                gtin: produto.gtin,
                precoLista: precoListaArredondado
            };
            produtoLista.push(item);
        });

        return produtoLista;
    }

    submit = () => {
        const produtoLista = this.finalizaLista();
        const idLista = this.state.idLista;

        const lista = {
            idLista: idLista,
            nomeLista: this.state.nomeLista,
            fatorAplicado: this.state.fatorAplicado,
            baseado: this.state.baseado,
            regraLista: this.state.regraLista,
            dataValidade: '-',
            horarioVigencia: '-',
            produtoLista: produtoLista,
        };

        const listaPrecoResponse = JSON.stringify(lista);

        // console.log(listaPrecoResponse);

        if (this.state.idLista === '') {
            this.cadastrarLista(listaPrecoResponse)
                .then(responseData => {
                    if (responseData.data !== '') {
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
        } else {
            this.atualizarLista(listaPrecoResponse)
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
        };
    };

    deleteLista = () => {
        this.modalExcluirLista();
        this.deletarLista(this.state.codigoProdutoParaExcluir)
            .then(statusCode => {
                if (statusCode === 200) {
                    this.modalExcluindoLista()
                    this.buscarListaPreco();
                } else {
                    this.modalErro();
                }
            })
            .catch(error => {
                console.error('Erro na chamada da API:', error);
                this.modalErro();
            });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    //-------------------------------------------- FUNÇÕES MODAL´S E BUSCA  -------------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    modalCadastrarLista = () => {
        this.setState({
            modalCadastrarLista: !this.state.modalCadastrarLista
        });
    };

    modalExcluirLista = () => {
        this.setState({
            modalExcluirLista: !this.state.modalExcluirLista,
        });
    };

    modalExcluindoLista = () => {
        this.setState({
            modalExcluindoLista: !this.state.modalExcluindoLista,
        }, () => {
            setTimeout(() => {
                this.setState({
                    modalExcluindoLista: false
                })
            }, 1000);
        });
    };

    modalProdutoExistente = () => {
        this.setState({
            modalProdutoExistente: !this.state.modalProdutoExistente,
        });
    };

    modalExcluirProduto = () => {
        this.setState({
            modalExcluirProduto: !this.state.modalExcluirProduto,
        });
    };

    modalErro = () => {
        this.setState({
            modalErro: !this.state.modalErro,
        });
    };

    closeModalErro = () => {
        this.setState({ showModal: false, errorMessage: '' });
    }


    campoBusca = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    novaRenderizacao = (idLista) => {
        this.setState({ selectedListId: idLista });
    };

    render() {

        const { listaspreco, selectedListId, regraLista, nomeLista, baseado, fatorAplicado, numerosDeItens } = this.state;
        const { carregando, showModal, errorMessage } = this.state;

        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

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
                        <div className="text-loading text-white">Carregando listas preços...</div>
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
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Incluir Lista:</span>
                                <span style={{ marginRight: '0.8rem' }}>&nbsp;</span>
                                <button
                                    onClick={() => {
                                        this.setState({ dadosCarregados: true });
                                        this.modalCadastrarLista();
                                        this.reset();
                                    }}
                                    className="d-flex align-items-center botao-cadastro-produto"
                                >
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
                            <Table bordered hover variant="warning" responsive="xl">
                                <thead>
                                    <tr>
                                        <th title="Nome da lista">Nome da lista</th>
                                        <th title="Quantidade de produtos">Quantidade de produtos</th>
                                        <th title="Regra da lista">Regra da lista</th>
                                        <th title="Data de validade">Data de validade</th>
                                        <th title="Horário vigência">Horário vigência</th>
                                        <th>Opções</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaspreco.map((listaspreco, index) => {
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
                                                        this.novaRenderizacao(listaspreco.idLista)
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.cursor = 'pointer')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.cursor = 'default')}
                                                >
                                                    <td>{listaspreco.nomeLista}</td>
                                                    <td>{numerosDeItens[index]}</td>
                                                    <td>
                                                        {listaspreco.regraLista}{' '}
                                                        {listaspreco.baseado === 'Porcentagem' ? ` ${parseFloat(listaspreco.fatorAplicado).toFixed(2)} %` : ''}
                                                        {listaspreco.baseado === 'Valor' ? ` R$ ${parseFloat(listaspreco.fatorAplicado).toFixed(2)}` : ''}
                                                    </td>
                                                    <td>{listaspreco.dataValidade}</td>
                                                    <td>{listaspreco.horarioVigencia}</td>
                                                    <td>
                                                        <div className="button-container-table">

                                                            <Button variant="warning" title="Editar produto" onClick={() => this.handleEditarProduto(listaspreco.idLista)}>
                                                                <BsPencilSquare />
                                                            </Button>

                                                            <Button
                                                                variant="danger"
                                                                title="Excluir produto"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    this.setState({
                                                                        codigoProdutoParaExcluir: listaspreco.idLista,
                                                                        modalExcluirLista: true,
                                                                    });
                                                                }}
                                                            >
                                                                <FaTrash />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                    {this.state.listaspreco.length === 0 && <tr><td colSpan="6">Nenhum produto cadastrado.</td>
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

                    <Modal
                        show={this.state.modalCadastrarLista} onHide={this.modalCadastrarLista} size="xl" fullscreen="xxl-down" backdrop="static" dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
                        <Modal.Header closeButton className="modal-produto-header">
                            <Modal.Title>Lista de preços</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-produto-body">
                            <Form>
                                <Row>
                                    <Col xs={12} md={8}>
                                        <Form.Group controlId="nome" className="mb-3">
                                            <Form.Label>Escolha um nome para a lista</Form.Label>
                                            <Form.Control type="text" placeholder="Digite o nome" value={nomeLista || ''} onChange={this.atualizanomeLista} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Form.Group controlId="produção" className="mb-3">
                                            <Form.Label>Percentual/valor</Form.Label>
                                            <Form.Select as="select" placeholder="Tipo de contato" value={baseado || ''} onChange={this.atualizaBaseado} >
                                                <option value="">Selecione abaixo</option>
                                                <option value="Porcentagem">Porcentagem</option>
                                                <option value="Valor">Valor em R$</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Group controlId="nome" className="mb-3">
                                            <Form.Label>Qual porcentagem/valor deseja aplicar?</Form.Label>
                                            <Form.Control type="text" placeholder="Digite um valor para a lista" value={fatorAplicado || ''} onChange={this.atualizafatorAplicado} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={12}>
                                        <Form.Group controlId="nome" className="mb-3">
                                            <Form.Label>A lista de preços será de desconto ou acréscimo?</Form.Label>
                                            <div className="d-flex">
                                                <Form.Check
                                                    style={{ marginRight: '20px' }}
                                                    type="radio"
                                                    id="acrescimo"
                                                    label="Acrescimo"
                                                    name="regraLista"
                                                    value="Acrescimo"
                                                    checked={regraLista === 'Acrescimo'}
                                                    onChange={this.atualizaRegraLista}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    id="desconto"
                                                    label="Desconto"
                                                    name="regraLista"
                                                    value="Desconto"
                                                    checked={regraLista === 'Desconto'}
                                                    onChange={this.atualizaRegraLista}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                            <Row className="text-center">
                                <Col>
                                    <Form.Group controlId="buttonSalvar" className="mb-3">
                                        <div className="button-container d-flex justify-content-center">
                                            <button type="submit" className="botao-cadastro-produto" onClick={this.submit}>
                                                Salvar
                                            </button>
                                            <button type="button" onClick={this.modalCadastrarLista} className="botao-cancelar-produto">
                                                Cancelar
                                            </button>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>


                    <Modal show={this.state.modalExcluirLista} onHide={this.modalExcluirLista} centered>
                        <Modal.Header closeButton className="bg-danger text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Deseja excluir a lista de preço? Essa ação não poderá ser desfeita.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="botao-finalizarvenda" variant="outline-secondary" onClick={this.modalExcluirLista}>
                                Não
                            </Button>
                            <Button type="button" variant="secondary" onClick={this.deleteLista}>
                                Sim
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.modalExcluindoLista} onHide={this.modalExcluindoLista} centered>
                        <Modal.Body>
                            <span style={{ display: 'block' }}><strong>Excluindo lista de preço...</strong></span>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.modalErro} onHide={this.modalErro} centered>
                        <Modal.Header closeButton className="bg-danger text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Não foi possível salvar a exclusão da lista de preço. Estamos agora salvando o produto no banco de dados para posteriormente realizar a exclusão automaticamente.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="botao-finalizarvenda" variant="outline-secondary" onClick={() => {
                                this.modalErro();
                            }}>
                                Sair
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div >
            );
        }
    }

    renderTelaLista = () => {
        const { produtos, produtoSelecionado, buscaProduto, produtoNaoLocalizado, codigo, preco, imagem, regraLista, tipoLista, baseado, fatorAplicado, nomeLista } = this.state;
        const { carregando, showModal, errorMessage } = this.state;

        if (carregando) {
            return (
                <div className="spinner-container">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="custom-loader"></div>
                    </div>
                    <div >
                        <div className="text-loading text-white">Carregando lista de preços...</div>
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

                <Container fluid className="pb-5" >
                    <div className="grid-cadastro-listapreco">
                        <Row className="row align-items-center mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="mb-3" style={{ fontWeight: 'bold', color: 'gray', fontSize: '1.9rem', fontStyle: 'italic' }}>{nomeLista}</span>
                                <Form.Group controlId="buttonSalvar" className="mb-3">
                                    <div className="button-container d-flex">
                                        <button
                                            type="submit"
                                            onClick={() => this.submit()}
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
                                <div className="row">
                                    <Col>
                                        <div className="col-md-5" style={{ marginRight: '10px', display: 'inline-block' }}>
                                            <h4>Tipo Lista</h4>
                                            <strong>{tipoLista}</strong>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="col-md-5" style={{ marginRight: '10px', display: 'inline-block' }}>
                                            <h4>Baseado em:</h4>
                                            <strong>{baseado}</strong>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="col-md-5" style={{ display: 'inline-block' }}>
                                            <h4>Fator a ser aplicado</h4>
                                            <strong>
                                                {regraLista === 'Desconto' && baseado === 'Porcentagem' ? `- ${fatorAplicado} %` : ''}
                                                {regraLista === 'Desconto' && baseado === 'Valor' ? `- R$ ${fatorAplicado}` : ''}
                                                {regraLista !== 'Desconto' && baseado === 'Porcentagem' ? `${fatorAplicado} %` : ''}
                                                {regraLista !== 'Desconto' && baseado === 'Valor' ? `R$ ${fatorAplicado}` : ''}
                                            </strong>
                                        </div>
                                    </Col>
                                </div>
                            </Row>
                        </Row>
                        <Row className="row align-items-center">
                            <Col xs={6}>
                                <Form.Label htmlFor="produto" className="texto-campos">Adicionar produto</Form.Label>
                                <Form.Group className="mb-3">
                                    <InputGroup>
                                        <Form.Control type="text" className="form-control" placeholder="Busque um produto pelo (Nome ou Código ou SKU ou EAN ou Descrição/Nome Fornecedor)" value={buscaProduto || ''} onChange={this.atualizarBuscaProduto}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault(); // Evita o comportamento padrão de submit do formulário
                                                    if (buscaProduto) {
                                                        this.buscarProdutos(buscaProduto); // Chame a função de busca aqui
                                                    }
                                                }
                                            }}
                                        />
                                        <Button variant="secondary" onClick={() => { if (buscaProduto) { this.buscarProdutos(buscaProduto) } }}>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        {produtos.map((produto) => {

                            const precoFormatado = parseFloat(produto.produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                            return (
                                <ul className="lista-produtos">
                                    <li
                                        key={produto.produto.id}
                                        onClick={() => this.selecionarProduto(produto)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                this.selecionarProduto(produto);
                                            }
                                        }}
                                        tabIndex={0}
                                    >
                                        Cód: {produto.produto.codigo} Produto: {produto.produto.descricao} - Preço R$ {precoFormatado}
                                    </li>
                                </ul>
                            );
                        })}
                        {produtoNaoLocalizado && (
                            <Row className="row align-items-center">
                                <Col className="col" xs={4}>
                                    <Alert variant="danger">
                                        <p><BsXCircle style={{ marginRight: '0.5rem', marginBottom: '-1px' }} />
                                            Produto não localizado.</p>
                                    </Alert>
                                </Col>
                            </Row>
                        )}
                        {produtoSelecionado && (
                            <div className="produto-selecionado">
                                <div className="d-flex justify-content-end mb-2">
                                    <CloseButton
                                        onClick={() => this.setState({ produtoSelecionado: null })}
                                        className="close-button"
                                    />
                                </div>
                                <h2>Nome do Produto: </h2>
                                <h2>{produtoSelecionado.produto.descricao}</h2>
                                <Row className="row">
                                    <Col className="col">
                                        <Form.Group className="mb-3">
                                            <Row>
                                                <Col>
                                                    {imagem ? (
                                                        <Image src={imagem} className="imagem-preview" style={{ width: '171px', height: '180px' }} rounded />
                                                    ) : (
                                                        <Image src="https://www.bling.com.br/images/imagePdv.svg" className="imagem-preview" style={{ width: '171px', height: '180px' }} rounded />
                                                    )}
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col className="col">
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="preco" className="texto-campos">Preço no sistema:</Form.Label>
                                            <Form.Control type="number" id="preco" className="form-control no-spinners" name="preco" placeholder="00,00" value={preco || ''} readOnly />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col">
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="valorTotal" className="texto-campos">SKU</Form.Label>
                                            <Form.Control type="text" id="valorTotal" className="form-control" name="valorTotal" placeholder="00,00" value={codigo || ''} readOnly />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="text-end">
                                    <Button variant="secondary" onClick={() => this.adicionarProdutoSelecionado(produtoSelecionado)}>
                                        <BsListCheck style={{ marginRight: '0.5rem' }} />
                                        Inserir produto
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="table-container-produto row align-items-center">
                            <Container fluid className="pb-5">
                                <Table striped bordered hover responsive="xl" value>
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th>SKU</th>
                                            <th>EAN</th>
                                            <th>R$ Preço no Bling</th>
                                            <th>Fator</th>
                                            <th>R$ Preço da lista</th>
                                            <th>Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.produtosSelecionados.map((produto, index) => (
                                            <tr key={index}>
                                                <td>{produto.produto.descricao}</td>
                                                <td>{produto.produto.codigo}</td>
                                                <td>{produto.produto.gtin}</td>
                                                <td style={{ color: '#363636', fontWeight: 'bold' }}>R$ {produto.preco}</td>
                                                <td>
                                                    {regraLista === 'Desconto' && baseado === 'Porcentagem' ? `- ${parseFloat(fatorAplicado).toFixed(2)} %` : ''}
                                                    {regraLista === 'Desconto' && baseado === 'Valor' ? `- R$ ${parseFloat(fatorAplicado).toFixed(2)}` : ''}
                                                    {regraLista !== 'Desconto' && baseado === 'Porcentagem' ? `${parseFloat(fatorAplicado).toFixed(2)} %` : ''}
                                                    {regraLista !== 'Desconto' && baseado === 'Valor' ? `R$ ${parseFloat(fatorAplicado).toFixed(2)}` : ''}
                                                </td>
                                                <td style={{ color: '#483D8B', fontWeight: 'bold' }}>R$ {parseFloat(produto.precoLista).toFixed(2)}</td>
                                                <td>
                                                    <Button variant="light" title="Excluir produto" className="transparent-button" onClick={() => this.excluirProdutoSelecionado(index)}>
                                                        <BsTrashFill className="red-icon" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Container>
                        </div>

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
                    </div >
                </Container >
            );
        };
    }
}

export default ListaPrecos;