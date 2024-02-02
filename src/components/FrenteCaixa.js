import React from "react";

import '../css/FrenteCaixa.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-medium-image-zoom/dist/styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Table } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Offcanvas } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { InputGroup } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CloseButton } from 'react-bootstrap';

import { BsInfoCircle } from 'react-icons/bs';
import { BsShieldFillExclamation } from 'react-icons/bs';
import { BsPersonAdd } from 'react-icons/bs';
import { BsClipboardCheck } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import { IoTrash } from "react-icons/io5";
import { BsPencilSquare } from 'react-icons/bs';
import { BsArrowDown } from "react-icons/bs";
import { FaExchangeAlt } from "react-icons/fa";

import Zoom from 'react-medium-image-zoom';


// import { Spinner } from 'react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import ptBR from 'date-fns/locale/pt-BR';
// import DatePicker from 'react-datepicker';
// import { Stack } from "react-bootstrap"
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import { format } from 'date-fns';
// import { parse } from 'js2xmlparser';
// import Autosuggest from 'react-autosuggest';

// import { IonIcon } from '@ionic/react';
// import { trashOutline } from 'ionicons/icons';
// import { pencil } from 'ionicons/icons';


class FrenteCaixa extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            produtos: [],
            contatos: [],
            depositos: [],
            vendedores: [],
            pedidos: [],
            formaspagamento: [],
            lojas: [],
            produtosSelecionados: [],
            contatosSelecionados: [],
            vendedoresSelecionados: [],
            vendedoresFiltrados: [],
            itensSelecionados: [],
            forma: [],
            parcelas: [{ dias: 0 }],
            preco: 0,
            precoProdutoSelecionado: 0,
            quantidade: 1,
            valorTotal: 0,
            valorDesconto: 0,
            totalComDesconto: 0,
            subTotalComDesconto: 0,
            desconto: 0,
            total: 0,
            subTotal: 0,
            dinheiroRecebido: 0,
            troco: 0,
            dinheiro: 0,
            contribuinte: 9,
            subtotalComFrete: 0,
            frete: 0,
            condicao: 0,
            subtotalGeral: 0,
            numLinhas: 0,
            newParcelas: 0,
            numeroPedido: 0,
            ultimoPedido: 0,
            prazo: 0,
            descontoProduto: 0,
            descontoTotal: 0,
            buscaProduto: '',
            buscaContato: '',
            buscaVendedor: '',
            vendedor: '',
            nome: '',
            consumidorFinal: '',
            cnpj: '',
            ie: '',
            rg: '',
            tipo: '',
            cep: '',
            endereco: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
            email: '',
            fone: '',
            celular: '',
            observacoes: '',
            observacaointerna: '',
            comentario: '',
            produtoSelecionado: '',
            contatoSelecionado: '',
            vendedorSelecionado: '',
            carregandoProduto: '',
            carregandoContato: '',
            carregandoVendedor: '',
            dataPrevista: '',
            data: '',
            valor: '',
            observacao: '',
            imagem: '',
            nomeLoja: '',
            idLoja: '',
            unidadeLoja: '',
            unidade: '',
            un: '',
            vlr_desconto: '',
            depositoSelecionado: null,
            erro: null,
            modalFinalizarVendaSemItem: false,
            modalExcluirPedido: false,
            modalInserirProduto: false,
            modalSalvarPedido: false,
            modalInserirParcela: false,
            modalEditarProduto: false,
            modalSelecionarLoja: false,
            modalCadastrarCliente: false,
            modalFormaPagamento: false,
            modalExcluirProduto: false,
            modalCpfValido: false,
            canvasFinalizarPedido: false,
            freteInserido: false,
            carregando: false,
            carregado: false,
            validated: false,
            produtoNaoLocalizado: false,
            contatoNaoLocalizado: false,
            vendedorNaoLocalizado: false,
            primeiroProdutoDesconto: false,
            cpfValido: false,
            cnpjValido: false,
            opcaoDescontoItem: 'desliga',
            opcaoDescontoLista: 'desliga',
            precoLista: '',
            precoBling: '',
            produtoSelecionadoLista: '',
            dadosCarregados: false,
            gerarparcelas: '',
            idLista: '',
            dataNascimento: '',
            codigo: '',
            fantasia: '',
            ie_rg: '',
            subTotalGeral: 0,
            listaspreco: [],
            descontoInicialProduto: 0,
            valorLista: 0,
            quantidadeLista: 0,
            descontoItemLista: 0,
            valorUnitarioLista: 0,
            subTotalLista: 0,
            objeto: '',
            modalPedidoExcluido: false,
            situacaoCaixa: ''
        };

        this.atualizaDesconto = this.atualizaDesconto.bind(this);
        this.atualizaTotalComFrete = this.atualizaTotalComFrete.bind(this);
        this.adicionarParcela = this.adicionarParcela.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePrazo = this.handleChangePrazo.bind(this);

        // Ambiente Local
        // this.buscarProdutosEndpoint = 'http://localhost:8081/api/v1/produtos'
        // this.buscarListaPrecoEndpoint = 'http://localhost:8081/api/v1/selecionarListas'
        // this.buscarContatoEndpoint = 'http://localhost:8080/api/v1/contatos'
        // this.buscarVendedorEndpoint = 'http://localhost:8080/api/v1/contatos'
        // this.buscarPedidoEndpoint = 'http://localhost:8080/api/v1/pedidos'
        // this.buscarFormaDePagamentoEndpoint = 'http://localhost:8080/api/v1/formaspagamento'
        // this.buscarLojaEndpoint = 'http://localhost:8080/api/v1/selecionarLojas'
        // this.cadastrarPedidoEndpoint = 'http://localhost:8080/api/v1/cadastrarpedido'
        // this.buscarListasCaixaEndpoint = 'http://localhost:8080/api/v1/controleCaixas'
        // this.buscarIdListaCaixaEndpoint = 'http://localhost:8080/api/v1/controleCaixa'
        // this.cadastrarListaCaixaEndpoint = 'http://localhost:8080/api/v1/adicionarControleCaixa'


        // Ambiente Desenvolvimento
        this.buscarProdutosEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/produtos'
        this.buscarListaPrecoEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/selecionarListas'
        this.buscarContatoEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/contatos'
        this.buscarVendedorEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/contatos'
        this.buscarPedidoEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/pedidos'
        this.buscarFormaDePagamentoEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/formaspagamento'
        this.buscarLojaEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/selecionarLojas'
        this.cadastrarPedidoEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/cadastrarpedido'
        this.buscarListasCaixaEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/controleCaixas'
        this.buscarIdListaCaixaEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/controleCaixa'
        this.cadastrarListaCaixaEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/adicionarControleCaixa'

        // // Ambiente Produção
        // this.buscarProdutosEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produtos'
        // this.buscarListaPrecoEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/selecionarListas'
        // this.buscarContatoEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/contatos'
        // this.buscarVendedorEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/contatos'
        // this.buscarPedidoEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/pedidos'
        // this.buscarFormaDePagamentoEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/formaspagamento'
        // this.buscarLojaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/selecionarLojas'
        // this.cadastrarPedidoEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/cadastrarpedido'
        // this.buscarListasCaixaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/controleCaixas'
        // this.buscarIdListaCaixaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/controleCaixa'
        // this.cadastrarListaCaixaEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/adicionarControleCaixa'

    };

    modalCadastrarCliente = () => {
        this.setState({
            modalCadastrarCliente: !this.state.modalCadastrarCliente,
            contatoNaoLocalizado: false
        });
    };

    modalCpfValido = () => {
        this.setState((prevState) => ({
            modalCpfValido: !prevState.modalCpfValido,
        }));
    };

    modalSelecionarLoja = () => {
        this.setState({
            modalSelecionarLoja: !this.state.modalSelecionarLoja
        });
    };

    modalFinalizarVendaSemItem = () => {
        this.setState({
            modalFinalizarVendaSemItem: !this.state.modalFinalizarVendaSemItem
        });
    };

    modalFormaPagamento = () => {
        this.setState({
            modalFormaPagamento: !this.state.modalFormaPagamento
        });
    };

    modalExcluirPedido = () => {
        this.buscarPedido();

        this.setState({
            modalExcluirPedido: !this.state.modalExcluirPedido
        });
    };

    modalPedidoExcluido = () => {
        this.setState({
            modalPedidoExcluido: !this.state.modalPedidoExcluido
        }, () => {
            setTimeout(() => {
                this.setState({
                    modalPedidoExcluido: false
                })
            }, 3000);
        });
    };

    modalInserirProduto = () => {
        this.setState({
            modalInserirProduto: !this.state.modalInserirProduto
        });
    };

    modalExcluirProduto = () => {
        this.setState({
            modalExcluirProduto: !this.state.modalExcluirProduto
        });
    };

    modalInserirParcela = () => {
        this.setState({
            modalInserirParcela: !this.state.modalInserirParcela
        });
    };

    modalSalvarPedido = () => {
        this.setState({
            modalSalvarPedido: !this.state.modalSalvarPedido
        }, () => {
            setTimeout(() => {
                this.setState({
                    modalSalvarPedido: false
                })
            }, 3000);
        });
    };

    canvasFinalizarPedido = () => {
        this.setState({
            canvasFinalizarPedido: !this.state.canvasFinalizarPedido
        });
    };

    async componentDidMount() {
        try {
            this.buscarLoja()
            this.modalSelecionarLoja();
            this.buscarFormaDePagamento()
            this.buscarPedido()
            this.buscarListaPreco();
        } catch (error) {
            this.setState({ erro: `Erro ao conectar a API: ${error.message}` });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.nome !== this.state.nome) {
            this.atualizaNome({ target: { value: this.state.nome } });
        }

        if (prevState.cnpj !== this.state.cnpj) {
            this.atualizaCpfCnpj({ target: { value: this.state.cnpj } });
        }

        if (prevState.descontoItemLista !== this.state.descontoItemLista) {
            this.atualizaSubTotalLista({ target: { value: this.state.descontoItemLista } });
        }


        if (
            prevState.produtosSelecionados !== this.state.produtosSelecionados ||
            prevState.subTotal !== this.state.subTotal ||
            prevState.valorDesconto !== this.state.valorDesconto ||
            prevState.subTotalComFrete !== this.state.subTotalComFrete
        ) {
            const subtotalGeral = this.calcularSubTotalGeral().toFixed(2);
            this.setState({ subTotalGeral: subtotalGeral });
        }
    }

    /**
     *  -------------------- CHAMADAS E CONSUMO DAS API´s QUE COMPÕE O PDV. -------------------- 
     */

    // buscarProdutos = (value) => {
    //     return new Promise((resolve, reject) => {
    //         this.setState({ buscaProduto: value, carregando: false, produtoNaoLocalizado: false });

    //         fetch(this.buscarProdutosEndpoint)
    //             .then((resposta) => {
    //                 if (!resposta.ok) {
    //                     throw new Error('Erro na chamada da API');
    //                 }
    //                 return resposta.json();
    //             })
    //             .then((dados) => {
    //                 // console.log("Produto: ", dados)
    //                 if (dados.retorno.produtos) {
    //                     const palavrasBusca = value.toLowerCase().split(' ');

    //                     const produtosFiltrados = dados.retorno.produtos.filter((produto) => {
    //                         const descricao = this.normalizeString(produto.produto.descricao || '').toLowerCase();
    //                         const codigo = this.normalizeString(produto.produto.codigo || '').toLowerCase();
    //                         const gtin = this.normalizeString(produto.produto.gtin || '').toLowerCase();
    //                         const gtinEmbalagem = this.normalizeString(produto.produto.gtinEmbalagem || '').toLowerCase();
    //                         const descricaoFornecedor = this.normalizeString(produto.produto.descricaoFornecedor || '').toLowerCase();
    //                         const nomeFornecedor = this.normalizeString(produto.produto.nomeFornecedor || '').toLowerCase();
    //                         const codigoFabricante = this.normalizeString(produto.produto.codigoFabricante || '').toLowerCase();

    //                         return palavrasBusca.every((palavra) =>
    //                             descricao.includes(palavra) ||
    //                             codigo.includes(palavra) ||
    //                             gtin.includes(palavra) ||
    //                             gtinEmbalagem.includes(palavra) ||
    //                             descricaoFornecedor.includes(palavra) ||
    //                             nomeFornecedor.includes(palavra) ||
    //                             codigoFabricante.includes(palavra)
    //                         );
    //                     });

    //                     if (produtosFiltrados.length === 0) {
    //                         // Nenhum produto encontrado
    //                         this.setState({
    //                             produtos: [],
    //                             produtoSelecionado: null,
    //                             carregando: false,
    //                             produtoNaoLocalizado: true
    //                         });
    //                     } else {
    //                         // Produtos encontrados
    //                         this.setState({
    //                             produtos: produtosFiltrados,
    //                             produtoSelecionado: null,
    //                             carregando: false,
    //                             produtoNaoLocalizado: false
    //                         });
    //                     }
    //                 } else {
    //                     // Nenhum produto encontrado
    //                     this.setState({
    //                         produtos: [],
    //                         carregando: false,
    //                         produtoNaoLocalizado: true
    //                     });
    //                 }
    //                 resolve();
    //             })
    //             .catch((error) => {
    //                 this.setState({
    //                     produtos: [],
    //                     carregando: false,
    //                     produtoNaoLocalizado: true
    //                 });
    //                 reject(error);
    //             });
    //     });
    // };


    buscarProdutos = async (value) => {
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
                // console.error("Entrada inválida. Pelo menos um dos parâmetros (código, GTIN, descrição) deve ser fornecido.");
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
                                produtoNaoLocalizado: true
                            });
                        } else {
                            // Produtos encontrados
                            this.setState({
                                produtos: produtosFiltrados,
                                produtoSelecionado: null,
                                carregando: false,
                                produtoNaoLocalizado: false
                            });
                        }
                    } else {
                        // Nenhum produto encontrado
                        this.setState({
                            produtos: [],
                            carregando: false,
                            produtoNaoLocalizado: true
                        });
                    }
                    resolve();
                })
                .catch((error) => {
                    this.setState({
                        produtos: [],
                        carregando: false,
                        produtoNaoLocalizado: true
                    });
                    reject('API produtos fora do ar');
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

    //----------------------------------------- API BUSCA CONTATO  ----------------------------------------------------------

    buscarContato = (nome, cnpj, value) => {
        return new Promise((resolve, reject) => {

            const sanitizedValue = this.sanitizeString(value).toLowerCase();
            const sanitizedNome = this.sanitizeString(nome);
            const sanitizedCnpj = this.sanitizeString(cnpj);

            let endpoint = this.buscarContatoEndpoint;

            if (sanitizedNome && !isNaN(parseFloat(sanitizedNome))) {
                endpoint += `?cnpj=${sanitizedNome}`;
            } else if (sanitizedCnpj && !isNaN(parseFloat(sanitizedCnpj))) {
                endpoint += `?cnpj=${sanitizedCnpj}`;
            } else {
                endpoint += `?nome=${sanitizedNome}`;
            }

            this.setState({ buscaContato: value, carregando: true, contatoNaoLocalizado: false });


            fetch(endpoint)
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error('Erro na chamada da API');
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados.retorno.contatos) {
                        const contatosFiltrados = dados.retorno.contatos.filter((contato) => {
                            const nome = this.sanitizeString(contato.contato.nome || '');
                            const cnpj = this.sanitizeString(contato.contato.cnpj || '');
                            const rg = this.sanitizeString(contato.contato.rg || '');
                            const ie_rg = this.sanitizeString(contato.contato.ie_rg || '');
                            const contribuinte = this.sanitizeString(contato.contato.contribuinte || '');
                            const cidade = this.sanitizeString(contato.contato.cidade || '');
                            const endereco = this.sanitizeString(contato.contato.endereco || '');
                            const numero = this.sanitizeString(contato.contato.numero || '');
                            const bairro = this.sanitizeString(contato.contato.bairro || '');
                            const complemento = this.sanitizeString(contato.contato.complemento || '');
                            const cep = this.sanitizeString(contato.contato.cep || '');
                            const uf = this.sanitizeString(contato.contato.uf || '');
                            const email = this.sanitizeString(contato.contato.email || '');
                            const celular = this.sanitizeString(contato.contato.celular || '');
                            const fone = this.sanitizeString(contato.contato.fone || '');

                            return (
                                nome.toLowerCase().includes(sanitizedValue) ||
                                cnpj.toLowerCase().includes(sanitizedValue) ||
                                rg.toLowerCase().includes(sanitizedValue) ||
                                ie_rg.toLowerCase().includes(sanitizedValue) ||
                                contribuinte.toLowerCase().includes(sanitizedValue) ||
                                cidade.toLowerCase().includes(sanitizedValue) ||
                                endereco.toLowerCase().includes(sanitizedValue) ||
                                numero.toLowerCase().includes(sanitizedValue) ||
                                bairro.toLowerCase().includes(sanitizedValue) ||
                                complemento.toLowerCase().includes(sanitizedValue) ||
                                cep.toLowerCase().includes(sanitizedValue) ||
                                uf.toLowerCase().includes(sanitizedValue) ||
                                email.toLowerCase().includes(sanitizedValue) ||
                                celular.toLowerCase().includes(sanitizedValue) ||
                                fone.toLowerCase().includes(sanitizedValue)
                            );
                        });

                        if (contatosFiltrados.length === 0) {
                            // Nenhum contato encontrado
                            this.setState({
                                contatos: [],
                                contatoSelecionado: null,
                                carregando: false,
                                contatoNaoLocalizado: true
                            });
                        } else {
                            // Contatos encontrados
                            this.setState({
                                contatos: contatosFiltrados,
                                contatoSelecionado: null,
                                carregando: false,
                                contatoNaoLocalizado: false
                            });
                        }
                    } else {
                        // Nenhum contato encontrado
                        this.setState({
                            contatos: [],
                            carregando: false,
                            contatoNaoLocalizado: true
                        });
                    }
                    resolve();
                })
                .catch((error) => {
                    // console.log("Erro ao buscar contatos:", error);
                    this.setState({
                        contatos: [],
                        carregando: false,
                        contatoNaoLocalizado: true
                    });
                    reject('API contatos fora do ar');
                });
        });
    };


    sanitizeString = (str) => {
        return str.replace(/[\.\,\;\-\/]/g, '');
    };


    //----------------------------------------- API BUSCA VENDEDOR ----------------------------------------------------------

    buscarVendedor = (nome, codigo, value) => {
        return new Promise((resolve, reject) => {

            const sanitizedNome = this.sanitizeString(nome);
            const sanitizedCodigo = this.sanitizeString(codigo);

            let endpoint = this.buscarVendedorEndpoint;

            if (sanitizedNome && !isNaN(parseFloat(sanitizedNome))) {
                endpoint += `?nome=${sanitizedNome}`;
            } else if (sanitizedCodigo && !isNaN(parseFloat(sanitizedCodigo))) {
                endpoint += `?codigo=${sanitizedCodigo}`;
            } else {
                endpoint += `?nome=${sanitizedNome}`;
            }

            this.setState({ buscaVendedor: value, carregando: true, vendedorNaoLocalizado: false });

            fetch(endpoint)
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error("Erro na chamada da API");
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados.retorno.contatos) {
                        const vendedoresFiltrados = dados.retorno.contatos.filter(
                            (contato) =>
                                contato?.contato?.tiposContato?.some(
                                    (tipoContato) =>
                                        tipoContato?.tipoContato?.descricao
                                            ?.toLowerCase()
                                            .includes("vendedor")
                                ) &&
                                (contato?.contato?.nome?.toLowerCase().includes(value.toLowerCase()) ||
                                    contato?.contato?.codigo?.toLowerCase().includes(value.toLowerCase()))
                        );
                        // console.log("dados: ", dados);
                        // console.log("vendedor: ", vendedoresFiltrados);
                        if (vendedoresFiltrados.length === 0) {
                            // Nenhum vendedor encontrado
                            this.setState({
                                vendedores: [],
                                vendedorSelecionado: null,
                                carregando: false,
                                vendedorNaoLocalizado: true
                            });
                        } else {
                            // Vendedores encontrados
                            this.setState({
                                vendedores: vendedoresFiltrados,
                                vendedorSelecionado: null,
                                carregando: false,
                                vendedorNaoLocalizado: false
                            });
                        }
                    } else {
                        // Nenhum vendedor encontrado
                        this.setState({
                            vendedores: [],
                            carregando: false,
                            vendedorNaoLocalizado: true
                        });
                    }
                    resolve();
                })
                .catch((error) => {
                    // console.log("Erro ao buscar vendedor:", error);
                    this.setState({
                        vendedores: [],
                        carregando: false,
                        vendedorNaoLocalizado: true
                    });
                    reject('API contatos (vendedor) fora do ar');
                });
        });
    };

    //----------------------------------------- API BUSCA DEPOSITO ----------------------------------------------------------

    // buscarDeposito = () => {
    //     return new Promise((resolve, reject) => {
    //         fetch("http://localhost:8083/api/v1/depositos")
    //             .then((resposta) => {
    //                 if (!resposta.ok) {
    //                     throw new Error("Erro na chamada da API");
    //                 }
    //                 return resposta.json();
    //             })
    //             .then(dados => {
    //                 if (dados.retorno.depositos) {
    //                     this.setState({
    //                         depositos: dados.retorno.depositos,
    //                     });
    //                 } else {
    //                     this.setState({
    //                         depositos: []
    //                     });
    //                 }
    //                 this.setState({
    //                     carregando: false
    //                 });
    //                 resolve(); // Resolva a Promise quando a chamada da API for concluída com sucesso
    //             })
    //             .catch((error) => {
    //                 console.log("Erro ao buscar deposito:", error);
    //                 this.setState({
    //                     depositos: [],
    //                     carregando: false
    //                 });
    //                 reject(error); // Rejeite a Promise se ocorrer um erro na chamada da API
    //             });
    //     });
    // };

    //----------------------------------------- API BUSCA PEDIDO ----------------------------------------------------------

    buscarPedido = async (value) => {
        return new Promise((resolve, reject) => {
            this.setState({ buscaPedido: value, carregando: true });

            fetch(this.buscarPedidoEndpoint)
                .then((resposta) => {
                    if (!resposta.ok) {
                        throw new Error("Erro na chamada da API");
                    }
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados.retorno.pedidos) {
                        const ultimoPedido = dados.retorno.pedidos[dados.retorno.pedidos.length - 1];
                        const numeroPedido = +ultimoPedido.pedido.numero + 1; // Adiciona 1 ao último pedido
                        // console.log("Numero do ultimo pedido:", ultimoPedido);
                        // console.log("Numero do proximo pedido:", numeroPedido);
                        this.setState({
                            numeroPedido: ultimoPedido.pedido.numero,
                            ultimoPedido: numeroPedido,
                        });
                    } else {
                        this.setState({
                            pedidos: [],
                        });
                    }
                    this.setState({
                        carregando: false,
                    });
                    resolve(); // Resolva a Promise quando a chamada da API for concluída com sucesso
                })
                .catch((error) => {
                    // console.log("Erro ao buscar pedido:", error);
                    this.setState({
                        pedidos: [],
                        carregando: false,
                    });
                    reject('API pedidos fora do ar');
                });
        });
    };

    //----------------------------------------- API BUSCA FORMA DE PAGAMENTO ----------------------------------------------------------

    buscarFormaDePagamento = async () => {
        return new Promise((resolve, reject) => {

            fetch(this.buscarFormaDePagamentoEndpoint)
                .then((resposta) => resposta.json())
                .then((dados) => {
                    if (dados.retorno.formaspagamento) {
                        // console.log("Forma de pagamento objeto retornado:", dados);
                        this.setState({
                            formaspagamento: dados.retorno.formaspagamento,
                        });
                    } else {
                        this.setState({
                            formaspagamento: [],
                        });
                    }
                    this.setState({
                        carregando: false,
                    });
                    resolve(); // Resolva a Promise quando a chamada da API for concluída com sucesso
                })
                .catch((error) => {
                    // console.log("Erro ao buscar forma de pagamento:", error);
                    this.setState({
                        formaspagamento: [],
                        carregando: false,
                    });
                    reject('API forma de pagamento fora do ar');
                });
        });
    };

    //----------------------------------------- API BUSCA LOJA ----------------------------------------------------------

    buscarLoja = async () => {
        return new Promise((resolve, reject) => {
            // Primeiro fetch para buscar os dados da loja
            fetch(this.buscarLojaEndpoint)
                .then((resposta) => resposta.json())
                .then((dados) => {
                    // console.log('Fetch 1', dados)

                    if (dados && dados.length > 0) {
                        const primeiraLoja = dados[0];

                        // Atualiza o estado com os dados da primeira loja
                        this.setState({
                            idLoja: primeiraLoja.idLoja,
                            nomeLoja: primeiraLoja.nomeLoja,
                            objeto: dados,
                            dadosCarregados: true,
                        });

                        // Segundo fetch para buscar outras informações
                        let endpoint = this.buscarListasCaixaEndpoint;
                        fetch(endpoint, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => response.json())
                            .then(dadosSegundoFetch => {
                                // console.log('Fetch 2', dadosSegundoFetch)

                                // Encontra os dados do segundo fetch que correspondem ao idLoja do primeiro fetch
                                const dadosCorrespondentes = dadosSegundoFetch.find(item => item.idLoja === primeiraLoja.idLoja && item.situacao === "Aberto");

                                if (dadosCorrespondentes) {
                                    // Atualiza o estado com os dados correspondentes do segundo fetch
                                    this.setState({
                                        listasCaixa: dadosSegundoFetch,
                                        idCaixa: dadosCorrespondentes.id,
                                        situacaoCaixa: dadosCorrespondentes.situacao,
                                        carregando: false,
                                        dadosCarregados: true,
                                    });

                                    // Chama a função para buscar a loja com o id correspondente do segundo fetch
                                    this.buscarIdLoja(dadosCorrespondentes.id);
                                } else {
                                    // Caso não haja correspondência, mantém o estado sem alterações
                                    this.setState({
                                        carregando: false,
                                    });
                                }
                                resolve();
                            })
                            .catch(error => {
                                // console.error('Erro ao buscar as listas de caixa:', error);
                                this.setState({ carregando: false });
                                reject('API seleciona loja fora do ar');
                            });
                    } else {
                        this.setState({
                            idLoja: null,
                            nomeLoja: null,
                            unidadLoja: null,
                            objeto: [],
                            dadosCarregados: false,
                        });
                        this.setState({
                            carregando: false,
                        });
                    }
                    resolve();
                })
                .catch(error => {
                    // console.error(error);
                    this.setState({
                        carregando: false,
                        idLoja: null,
                        nomeLoja: null,
                        objeto: [],
                        dadosCarregados: false,
                    });
                    reject('API seleciona loja fora do ar');
                });
        });
    };

    buscarIdLoja = (id) => {
        fetch(`${this.buscarIdListaCaixaEndpoint}/${id}`)
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error("Erro na chamada da API");
                }
                return resposta.json();
            })
            .then((dados) => {
                if (dados) {
                    this.setState({
                        descricaoLoja: dados.descricaoLoja,
                        situacaoCaixa: dados.situacao,
                        trocoCaixa: dados.trocoCaixa,
                    });
                } else {
                    this.setState({
                        descricaoLoja: null,
                        situacao: null,
                        trocoCaixa: null,
                    });
                }
                this.setState({
                    carregando: false,
                });
            })
            .catch(error => {
                // console.error(error);
                this.setState({
                    descricaoLoja: null,
                    situacao: null,
                    trocoCaixa: null,
                });
            });
    };

    atualizaIdLoja = (idLoja) => {
        // console.log("idLoja: ", idLoja);
        // console.log("idLoja: ", this.state.idLoja);
        const lojaSelecionada = this.state.objeto.find(obj => obj.idLoja === idLoja);
        if (lojaSelecionada) {
            let endpoint = this.buscarListasCaixaEndpoint;
            fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(dadosSegundoFetch => {
                    // console.log('Fetch 2', dadosSegundoFetch);

                    // Encontra os dados do segundo fetch que correspondem ao idLoja do primeiro fetch
                    const dadosCorrespondentes = dadosSegundoFetch.find(item => item.idLoja === lojaSelecionada.idLoja && item.situacao === "Aberto");

                    if (dadosCorrespondentes) {
                        // Atualiza o estado com os dados correspondentes do segundo fetch
                        this.setState({
                            idLoja: idLoja,
                            trocoCaixa: dadosCorrespondentes.trocoCaixa,
                            situacaoCaixa: dadosCorrespondentes.situacao,
                            idCaixa: dadosCorrespondentes.id,
                        });

                        // Chama a função para buscar a loja com o id correspondente do segundo fetch
                        this.buscarIdLoja(dadosCorrespondentes.id);
                    } else {
                        // Caso não haja correspondência, mantém o estado sem alterações
                        this.setState({
                            idLoja: idLoja,
                            trocoCaixa: lojaSelecionada.trocoCaixa,
                            situacaoCaixa: lojaSelecionada.situacao,
                        });
                    }
                })
                .catch(error => {
                    // console.error('Erro ao buscar as listas de caixa:', error);
                    this.setState({
                        carregando: false,
                    });
                });
        }
    };

    atualizaNomeLoja = (nomeLoja) => {
        // console.log("nomeLoja: ", nomeLoja);
        this.setState({
            nomeLoja: nomeLoja
        });
    };

    //----------------------------------------- API BUSCA LISTA DE PREÇO ----------------------------------------------------------

    buscarListaPreco = async () => {
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

                    // Extrai a primeira instância de fatorAplicado e baseado
                    const primeiraInstancia = data[0];
                    const fatorAplicado = primeiraInstancia ? primeiraInstancia.fatorAplicado : undefined;
                    const baseado = primeiraInstancia ? primeiraInstancia.baseado : undefined;

                    //console.log(fatorAplicado, baseado)

                    this.setState({
                        listaspreco: data,
                        fatorAplicado: fatorAplicado,
                        baseado: baseado
                    });
                    resolve();
                })
                .catch(error => {
                    // console.error('Erro ao buscar as lojas:', error);

                    this.setState({
                        nomeListas: [],
                        listaspreco: [],
                        numerosDeItens: []
                    });
                    reject('API lista de preço fora do ar');
                });
        });
    };

    //----------------------------------------- API CADASTRAR PEDIDO ----------------------------------------------------------

    cadastrarPedido = (xmlPedido) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlPedido, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);

        fetch(this.cadastrarPedidoEndpoint, {
            method: 'POST',
            body: stringXml,
            headers: {
                'Content-Type': 'application/xml'
            }
        });

        this.buscarPedido();
    };

    //----------------------------------------- API´s PUBLICAS (CEP) ----------------------------------------------------------

    buscarCep = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                const { logradouro, bairro, localidade, uf } = data;

                this.setState({
                    endereco: logradouro,
                    bairro: bairro,
                    cidade: localidade,
                    uf: uf,
                });

                this.atualizaCidade({ target: { value: localidade } });
                this.atualizaUf({ target: { value: uf } });
                this.atualizaEndereco({ target: { value: logradouro } });
                this.atualizaBairro({ target: { value: bairro } });
                // console.log("CHECKCEP", data);
            });
    };

    cadastrarLista = (controleCaixa) => {
        return fetch(this.cadastrarListaCaixaEndpoint, {
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

    //-----------------------------------------------------------------------------------------------------------------------|
    //----------------------------------------- FUNÇÕES DE AÇÕES (EVENTOS) TELA ---------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    //-----------------------------------------------------------------------------------------------------------------------|
    //------------------------------------------------- FUNÇÕES VENDEDOR ----------------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    atualizaBuscaVendedor = (event) => {
        // console.log("vendedor selecionado:", vendedorSelecionado);
        this.setState({
            buscaVendedor: event.target.value
        });
    };

    selecionarVendedor = (vendedor) => {
        this.setState({
            vendedorSelecionado: vendedor,
            buscaVendedor: vendedor.contato.nome,
            vendedor: vendedor.contato.nome
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    // ------------------------------------------- FUNÇÕES / CADASTRO DE CONTATO --------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    atualizarBuscaContato = (event) => {
        const buscaContato = event.target.value;
        // console.log("atualizarBuscaContato (buscaContato):", buscaContato);
        this.setState({
            buscaContato: buscaContato,
            nome: buscaContato,
        });
    };

    selecionarContato = (contato) => {
        this.setState({
            buscaContato: contato.contato.nome,
            contatoSelecionado: contato,
            nome: contato.contato.nome,
            consumidorFinal: contato.contato.nome,
            ie_rg: contato.contato.ie_rg,
            contribuinte: contato.contato.contribuinte,
            rg: contato.contato.rg,
            cep: contato.contato.cep,
            complemento: contato.contato.complemento,
            email: contato.contato.email,
            fone: contato.contato.fone,
            celular: contato.contato.celular,
            dataNascimento: contato.contato.dataNascimento,
            tipo: contato.contato.tipo,
            cnpj: contato.contato.cnpj,
            codigo: contato.contato.codigo,
            fantasia: contato.contato.fantasia,
            endereco: contato.contato.endereco,
            numero: contato.contato.numero,
            bairro: contato.contato.bairro,
            cidade: contato.contato.cidade,
            uf: contato.contato.uf,
            contatos: [],
        });
    };

    atualizaNome = (event) => {
        const nome = event.target.value;
        // console.log("Nome:", nome);
        this.setState({
            nome: nome,
            buscaContato: nome
        });
    };

    atualizaTipoPessoa = (event) => {
        // console.log("tipo:", event.target.value);
        this.setState({
            tipo: event.target.value
        });
    };

    atualizaCodigo = (event) => {
        // console.log("Codigo:", event.target.value);
        this.setState({
            codigo: event.target.value
        });
    };

    atualizaFantasia = (event) => {
        // console.log("Fantasia:", event.target.value);
        this.setState({
            fantasia: event.target.value
        });
    };

    atualizaCpfCnpj = (event) => {
        const cpfCnpj = event.target.value;
        const cpfCnpjSemPontuacao = cpfCnpj.replace(/[^\d]/g, "");

        // Verifica se é um CPF válido
        if (cpfCnpjSemPontuacao.length === 11) {
            if (!this.validarCPF(cpfCnpjSemPontuacao)) {
                this.setState({
                    cnpj: cpfCnpj,
                    cpfValido: false, // Define a flag de CPF válido como false
                    cnpjValido: false // Define a flag de CNPJ válido como false
                });
                return; // Retorna antecipadamente para evitar ações adicionais
            };

            const cpfFormatado = cpfCnpjSemPontuacao.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            this.setState({
                cnpj: cpfFormatado,
                cpfValido: true, // Define a flag de CPF válido como true
                cnpjValido: false // Define a flag de CNPJ válido como false
            });
        }
        // Verifica se é um CNPJ válido
        else if (cpfCnpjSemPontuacao.length === 14) {
            if (!this.validarCNPJ(cpfCnpjSemPontuacao)) {
                this.setState({
                    cnpj: cpfCnpj,
                    cpfValido: false, // Define a flag de CPF válido como false
                    cnpjValido: false // Define a flag de CNPJ válido como false
                });
                return; // Retorna antecipadamente para evitar ações adicionais
            };

            const cnpjFormatado = cpfCnpjSemPontuacao.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            this.setState({
                cnpj: cnpjFormatado,
                cpfValido: false, // Define a flag de CPF válido como false
                cnpjValido: true // Define a flag de CNPJ válido como true
            });
        }
        // Caso contrário, mantém o valor original e define as flags de validação como false
        else {
            this.setState({
                cnpj: cpfCnpj,
                cpfValido: false,
                cnpjValido: false
            });
        };
    };

    validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false; // CPF inválido se não tiver 11 dígitos ou se todos os dígitos forem iguais
        };

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        };

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        };

        if (resto !== parseInt(cpf.substring(9, 10))) {
            return false; // CPF inválido se o dígito verificador não bater
        };

        soma = 0;

        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        };

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        };

        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false; // CPF inválido se o dígito verificador não bater
        };

        return true; // CPF válido
    };

    validarCNPJ(cnpj) {

        if (!cnpj) {
            return true; // Retorna true se o CPF estiver vazio
        }

        cnpj = cnpj.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

        if (cnpj.length !== 14) {
            return false; // CNPJ inválido se não tiver 14 dígitos
        };

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
            if (pos < 2) {
                pos = 9;
            };
        };

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (resultado !== parseInt(digitos.charAt(0), 10)) {
            return false; // CNPJ inválido se o primeiro dígito verificador não bater
        };

        tamanho += 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
            if (pos < 2) {
                pos = 9;
            };
        };

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (resultado !== parseInt(digitos.charAt(1), 10)) {
            return false; // CNPJ inválido se o segundo dígito verificador não bater
        };

        return true; // CNPJ válido
    };

    atualizaRg = (event) => {
        const rg = event.target.value;
        const rgSemPontuacao = rg.replace(/[^\d]/g, "");
        const rgFormatado = rgSemPontuacao.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
        this.setState({
            rg: rgFormatado
        });
    };

    atualizaIe = (event) => {
        const ie_rg = event.target.value;
        const ieSemPontuacao = ie_rg.replace(/[^\d]/g, "");
        const ieFormatado = ieSemPontuacao.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1.$2.$3.$4");
        this.setState({
            ie_rg: ieFormatado,
            ie: ieFormatado
        });

        // console.log("IE/RG:", ieFormatado);

        if (this.state.contribuinte === "2") {
            this.setState({
                ie_rg: "ISENTO",
                ie: "ISENTO"
            });
        };
    };

    atualizaContribuinte = (event) => {
        const contribuinte = event.target.value;
        let ie_rg = this.state.ie_rg;
        let ie = this.state.ie;

        if (contribuinte === "2") {
            ie_rg = "ISENTO";
            ie = "ISENTO";
        }

        this.setState({
            contribuinte: contribuinte,
            ie_rg: ie_rg,
            ie: ie
        });

        // console.log("Contribuinte:", contribuinte);
        // console.log("IE/RG:", ie_rg);
    };

    atualizaCidade = (event) => {
        // console.log("cidade: ", event.target.value);
        this.setState({
            cidade: event.target.value
        });
    };

    atualizaEndereco = (event) => {
        // console.log("endereco: ", event.target.value);
        this.setState({
            endereco: event.target.value
        });
    };

    atualizaNumero = (event) => {
        // console.log("numero: ", event.target.value);
        this.setState({
            numero: event.target.value
        });
    };

    atualizaBairro = (event) => {
        // console.log("bairro: ", event.target.value);
        this.setState({
            bairro: event.target.value
        });
    };

    atualizaComplemento = (event) => {
        // console.log("complemento: ", event.target.value);
        this.setState({
            complemento: event.target.value
        });
    };

    atualizaCep = (event) => {
        const cep = event.target.value;
        const cepSemPontuacao = cep.replace(/[^\d]/g, "");
        const cepFormatado = cepSemPontuacao.replace(/(\d{5})(\d{3})/, "$1-$2");
        this.setState({
            cep: cepFormatado
        });
    };

    atualizaUf = (event) => {
        // console.log("uf: ", event.target.value);
        this.setState({
            uf: event.target.value
        });
    };

    atualizaEmail = (event) => {
        // console.log("email: ", event.target.value);
        this.setState({
            email: event.target.value
        });
    };

    atualizaCelular = (event) => {
        const celular = event.target.value;
        const celularSemPontuacao = celular.replace(/[^\d]/g, "");
        const celularFormatado = celularSemPontuacao.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        this.setState({
            celular: celularFormatado
        });
    };

    atualizaDataNascimento = (event) => {
        const dataNascimento = event.target.value;
        const dataNascimentoSemPontuacao = dataNascimento.replace(/[^\d]/g, "");
        const dataNascimentoFormatada = dataNascimentoSemPontuacao.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
        this.setState({
            dataNascimento: dataNascimentoFormatada
        });
    };

    atualizaFone = (event) => {
        const fone = event.target.value;
        const foneSemPontuacao = fone.replace(/[^\d]/g, "");
        const foneFormatado = foneSemPontuacao.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        this.setState({
            fone: foneFormatado
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    // ------------------------------------- FUNÇÕES PRODUTO / LISTA DE PRODUTO ---------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    atualizarBuscaProduto = (event) => {
        this.setState({
            buscaProduto: event.target.value
        });
    };

    selecionarProduto = (produto) => {
        const preco = parseFloat(produto.produto.preco).toFixed(2);
        const valorTotal = (parseFloat(produto.produto.preco) * 1).toFixed(2);

        // Verifica se o idLista está disponível
        if (this.state.idLista !== undefined) {
            // Obtém a lista de descontos selecionada
            const listaSelecionada = this.state.listaspreco.find(lista => lista.idLista === this.state.idLista);

            // Verifica se a lista foi selecionada e se o produto está nela
            const produtoNaListaDesconto = listaSelecionada?.produtoLista.find(item => item.codigo === produto.produto.codigo);

            // console.log("Produto na lista de desconto:", produtoNaListaDesconto);

            if (produtoNaListaDesconto) {
                // Se o produto estiver na lista de descontos, chame a função buscarListaPreco
                // console.log("Chamando buscarListaPreco");
                this.buscarListaPreco();

                // Atualiza o preço com o valor de precoLista, se disponível
                this.setState({
                    produtoSelecionado: produto,
                    preco: produtoNaListaDesconto.precoLista || preco,
                    precoUnitario: produtoNaListaDesconto.precoLista || preco,
                    valorTotal: produtoNaListaDesconto.precoLista || preco,
                    precoBling: produtoNaListaDesconto.preco || '',
                    produtos: [],
                    quantidade: 1,
                    comentario: '',
                    descontoInicialProduto: '',
                    imagem: produto.produto.imageThumbnail,
                    opcaoDescontoItem: 'desliga', // Desativa o switch ao selecionar um novo produto
                });

                return; // Encerra a função após atualizar o estado
            }
        }

        // Se idLista não estiver disponível ou o produto não estiver na lista de descontos, chame a função buscarProdutos
        // console.log("Chamando buscarProdutos");

        // Mantém o preço original
        this.setState({
            produtoSelecionado: produto,
            preco: preco,
            precoUnitario: preco,
            precoBling: preco,
            produtos: [],
            quantidade: 1,
            valorTotal: valorTotal,
            comentario: '',
            descontoInicialProduto: '',
            imagem: produto.produto.imageThumbnail,
            opcaoDescontoItem: 'desliga' // Desliga o switch ao selecionar um novo produto
        });

        this.atualizarBuscaProduto({ target: { value: '' } });
    };

    adicionarProdutoSelecionado = (produtoSelecionado) => {

        const {
            produtosSelecionados,
            quantidade,
            preco,
            precoUnitario,
            descontoInicialProduto
        } = this.state;

        if (!produtoSelecionado) {
            this.modalInserirProduto();
            return;
        };

        const produtoExistenteIndex = produtosSelecionados.findIndex(
            (produto) => produto.produto.id === produtoSelecionado.produto.id
        );

        if (produtoExistenteIndex !== -1) {
            const produtosAtualizados = [...produtosSelecionados];
            produtosAtualizados[produtoExistenteIndex].quantidade += quantidade;
            produtosAtualizados[produtoExistenteIndex].preco = preco;
            produtosAtualizados[produtoExistenteIndex].precoUnitario = precoUnitario;
            produtosAtualizados[produtoExistenteIndex].valorUnitarioLista = preco;
            produtosAtualizados[produtoExistenteIndex].descontoInicialProduto = descontoInicialProduto;
            produtosAtualizados[produtoExistenteIndex].possuiDesconto = descontoInicialProduto ? true : false;

            this.setState(
                {
                    produtosSelecionados: produtosAtualizados,
                    produtoSelecionado: null,
                    buscaProduto: '',
                    produtos: [],
                    quantidade: 1,
                    valorTotal: '',
                    precoUnitario: '',
                    preco: '',
                    precoBling: '',
                    desconto: 0,
                    comentario: '',
                    descontoInicialProduto: '',
                    descontoItem: '',
                    valorUnitarioLista: '',
                    possuiDesconto: false,
                    opcaoDescontoItem: 'desliga', // Desativa o switch ao adicionar um produto
                },
                () => {
                    this.calcularTotal();
                }
            );
        } else {
            produtosSelecionados.push({
                produto: produtoSelecionado.produto,
                quantidade: quantidade,
                preco: preco,
                precoBling: '',
                precoUnitario: precoUnitario,
                valorUnitarioLista: preco,
                descontoInicialProduto: descontoInicialProduto,
                possuiDesconto: descontoInicialProduto ? true : false
            });

            // console.log("PS: ", produtosSelecionados)

            this.setState(
                {
                    produtosSelecionados: produtosSelecionados,
                    produtoSelecionado: null,
                    buscaProduto: '',
                    produtos: [],
                    quantidade: 1,
                    valorTotal: '',
                    precoUnitario: '',
                    preco: '',
                    desconto: 0,
                    comentario: '',
                    descontoInicialProduto: '',
                    descontoItem: '',
                    valorUnitarioLista: '',
                    possuiDesconto: false
                },
                () => {
                    this.calcularTotal();
                }
            );
        };
    };

    excluirProdutoSelecionado = (index) => {
        const produtosSelecionados = [...this.state.produtosSelecionados];
        const produtoExcluido = produtosSelecionados.splice(index, 1)[0];
        const quantidadeExcluida = produtoExcluido.quantidade;
        const produto = produtoExcluido.produto;
        const subTotalAnterior = this.state.subTotal;
        const subTotal = (parseFloat(subTotalAnterior) - this.calcularSubTotal(produto, quantidadeExcluida)).toFixed(2);
        // console.log("Novo Subtotal:", subTotal);
        this.setState({
            produtosSelecionados,
            subTotal,
        });

        this.modalExcluirProduto();
    };

    selecionaListaDesconto = (event) => {
        const idLista = event.target.value; // Pega o ID da lista selecionada
        this.setState({
            idLista: idLista
        });
    };

    produtoEstaNaListaDeDesconto = (produto) => {
        const { idLista, listaspreco, produtoSelecionadoLista, produtoSelecionado } = this.state;

        if (idLista !== undefined) {
            // Obtém a lista de descontos selecionada
            const listaSelecionada = listaspreco.find(lista => lista.idLista === idLista);

            // Verifica se a lista foi selecionada e se o produto está nela
            const produtoNaListaDesconto = listaSelecionada?.produtoLista.find(item => item.codigo === produto.produto.codigo);

            // Retorna true se o produto estiver na lista de descontos
            return !!produtoNaListaDesconto;
        }

        // Retorna false se idLista não estiver disponível
        return false;
    };


    //-----------------------------------------------------------------------------------------------------------------------|
    // ------------------------------------------------- FUNÇÕES CALCULOS ---------------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    calcularTotal() {
        let total = 0;
        this.state.produtosSelecionados.forEach((produto) => {
            total += this.calcularSubTotal(produto.produto, produto.quantidade, produto.preco);
        });
        const subTotal = total.toFixed(2);

        if (this.state.subTotal !== subTotal) {
            this.setState({
                subTotal
            });
        };
        return parseFloat(subTotal);
    };

    calcularTotalLista = () => {
        const {
            produtosSelecionados,
            idLista,
            listaspreco
        } = this.state;

        let totalForaDesconto = 0;
        let totalNaListaDesconto = 0;

        produtosSelecionados.forEach((produto) => {
            const precoTotalProduto = produto.quantidade * parseFloat(produto.preco);

            if (this.produtoEstaNaListaDeDesconto(produto)) {
                totalNaListaDesconto += precoTotalProduto;
            } else {
                totalForaDesconto += precoTotalProduto;
            }
        });

        return {
            totalForaDesconto,
            totalNaListaDesconto
        };
    };

    calcularSubTotal = (produto, quantidade, preco) => {
        return preco * quantidade
    };

    atualizaQuantidade = (event) => {
        let quantidade = event.target.value.trim(); // Remover espaços em branco no início e no final

        if (quantidade === '') {
            this.setState({
                quantidade: ''
            }, () => {
                this.atualizarValorTotal();
            });
        } else {
            quantidade = parseInt(quantidade, 10);
            quantidade = isNaN(quantidade) || quantidade <= 0 ? 1 : quantidade;

            this.setState({
                quantidade: quantidade
            }, () => {
                this.atualizarValorTotal();
            });
        }
    };

    atualizaPreco = (event) => {
        const preco = event.target.value.replace(',', '.');
        this.setState({
            preco: preco
        }, () => {
            this.atualizarValorTotal();
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    // ---------------------------------------------- FUNÇÕES CAMPO PREÇO (%) -----------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    atualizaDescontoProduto = (event) => {
        const descontoInicialProduto = event.target.value;
        this.setState({
            descontoInicialProduto: descontoInicialProduto
        }, () => {
            clearTimeout(this.valorTotalTimeout);
            this.valorTotalTimeout = setTimeout(this.atualizarValorTotal, 500);
        });

        if (descontoInicialProduto === '' || descontoInicialProduto === '0') {
            const { produtoSelecionado } = this.state;
            const precoOriginal = parseFloat(produtoSelecionado.produto.preco).toFixed(2);
            this.setState({
                preco: precoOriginal
            });
        };
    };

    atualizarValorTotal = () => {
        const { quantidade, preco, descontoInicialProduto } = this.state;

        let novoPrecoDesconto = parseFloat(preco);
        let descontoTotal = 0;

        if (descontoInicialProduto !== '') {
            const descontoPorcentagem = parseFloat(descontoInicialProduto.replace(',', '.'));
            const descontoDecimal = descontoPorcentagem / 100;
            descontoTotal = novoPrecoDesconto * descontoDecimal;
            novoPrecoDesconto -= descontoTotal;
        };

        // console.log(descontoInicialProduto)

        const valorTotal = quantidade * novoPrecoDesconto;

        // console.log("DESCONTO: ", descontoTotal);
        // console.log("VALOR TOTAL: ", valorTotal);

        this.setState({
            preco: novoPrecoDesconto,
            valorTotal: valorTotal.toFixed(2)
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    // -------------------------------------------- FUNÇÕES CAMPO DESCONTO (TOTAL) ------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    calcularTotalComDesconto = (desconto, subTotal) => {
        const subtotal = subTotal || this.calcularTotal();
        const valorDesconto = desconto || 0;
        const totalComDesconto = subtotal - valorDesconto;

        let formattedValorDesconto = 0;
        let formattedTotalComDesconto = 0;

        formattedValorDesconto = valorDesconto
        formattedTotalComDesconto = totalComDesconto.toFixed(2);

        if (isNaN(totalComDesconto)) {
            // console.log("Total com desconto é NaN!");
        };

        return {
            valorDesconto: formattedValorDesconto,
            totalComDesconto: formattedTotalComDesconto,
        };
    };

    atualizaDesconto(event) {
        const descontoString = event.target.value;
        const descontoNumber = parseFloat(descontoString.replace(/[^\d.-]/g, ''));

        // console.log(descontoString, descontoNumber)

        if (isNaN(descontoNumber)) {
            this.setState({
                valorDesconto: '',
                desconto: false,
                totalComDesconto: '',
            });
            return;
        };

        const resultado = this.calcularTotalComDesconto(descontoNumber);
        this.setState({
            valorDesconto: descontoString,
            desconto: descontoNumber.toFixed(2),
            totalComDesconto: resultado.totalComDesconto,
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    // ---------------------------------- FUNÇÕES CAMPOS TOTAL EM DINHEIRO E TROCO ------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    calcularTotalComDinheiro = (dinheiro) => {
        const totalRecebidoEmDinheiro = parseFloat(dinheiro) || 0;
        const subTotalGeral = this.state.subTotalGeral;

        if (isNaN(totalRecebidoEmDinheiro)) {
            return {
                dinheiroRecebido: 0,
                troco: 0,
            };
        };

        let troco = totalRecebidoEmDinheiro - subTotalGeral;

        if (troco < 0) {
            troco = 0;
        };

        return {
            dinheiroRecebido: dinheiro,
            troco: troco.toFixed(2),
        };
    };

    atualizaTroco = (event) => {
        const valorRecebido = event.target.value;

        if (!valorRecebido && valorRecebido !== '0') {
            this.setState({
                dinheiroRecebido: '',
                troco: 0,
            });
            return;
        };

        if (!isNaN(parseFloat(valorRecebido)) && parseFloat(valorRecebido) >= 0) {
            const { totalComDesconto } = this.state;
            const { dinheiroRecebido, troco } = this.calcularTotalComDinheiro(valorRecebido, totalComDesconto);

            this.setState({
                dinheiroRecebido,
                troco: troco,
            });
        };
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    // ------------------------------------------------ FUNÇÕES CAMPO FRETE -------------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    atualizaTotalComFrete(event) {
        const valor = event.target.value.replace(',', '.');
        let frete = parseFloat(valor);
        if (isNaN(frete)) {
            frete = 0;
        };
        const subTotal = this.state.subTotal;
        const totalComDesconto = this.state.totalComDesconto;

        let subTotalComFrete;
        if (totalComDesconto && totalComDesconto.length > 0) {
            subTotalComFrete = (parseFloat(totalComDesconto) + frete).toFixed(2);
        } else {
            subTotalComFrete = (parseFloat(subTotal) + frete).toFixed(2);
        };

        this.setState({
            subTotalComFrete: subTotalComFrete.replace('.', ','),
            frete: frete,
            freteInserido: true,
        });
    };

    calcularSubTotalGeral = () => {
        const subTotal = this.calcularTotal().toFixed(2);
        const desconto = this.state.valorDesconto;
        const totalComDesconto = this.calcularTotalComDesconto(desconto, subTotal).totalComDesconto;
        const frete = this.state.frete;
        const subTotalComFrete = parseFloat(totalComDesconto) + parseFloat(frete);
        let subTotalGeral = subTotalComFrete.toFixed(2);

        return parseFloat(subTotalGeral);
    };

    atualizaDataPrevista = (event) => {
        // Obtém o valor do campo de input
        let valorInput = event.target.value;

        // Remove caracteres não numéricos
        valorInput = valorInput.replace(/\D/g, '');

        // Formata a data enquanto o usuário digita
        if (valorInput.length >= 2 && valorInput.length < 4) {
            valorInput = valorInput.replace(/(\d{2})(\d{0,2})/, '$1/$2');
        } else if (valorInput.length >= 4) {
            valorInput = valorInput.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
        }

        // Atualiza o estado com o valor do campo de input
        this.setState({ dataPrevista: valorInput });
    }
    //-----------------------------------------------------------------------------------------------------------------------|
    // -------------------------------------- FUNÇÕES TELA SELEÇÃO DE LOJA E UNIDADE ----------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|



    atualizaUnidadeNegocio = (event) => {
        const unidadeLojaSelecionada = event.target.value;
        // console.log("UnidadeNegocio: ", unidadeLojaSelecionada)
        this.setState({
            unidadeLoja: unidadeLojaSelecionada
        });
    };

    atualizaObservacoes = (event) => {
        const observacoes = event.target.value;
        // console.log(event.target.value);
        this.setState({
            observacoes
        });
    };

    atualizaObservacaoInterna = (event) => {
        const observacaointerna = event.target.value;
        // console.log(event.target.value);
        this.setState({
            observacaointerna
        });
    };

    atualizarComentario = (event) => {
        const comentario = event.target.value;
        // console.log("Comentario", event.target.value);
        this.setState({
            comentario
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    // -------------------------------------------------- FUNÇÕES BOTÕES ----------------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    submitCadastrar = () => {
        const situacao = this.state.situacaoCaixa;

        if (situacao !== 'Aberto') {
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
                            this.resetCaixa();
                        } else {
                            this.modalErro();
                        }
                    })
                    .catch(error => {
                        // console.error('Erro na chamada da API:', error);
                        this.modalErro();
                    });
            }
        }
    };


    resetCaixa = () => {
        // Condição para fechar o modal apenas se estiver aberto
        if (this.state.modalSelecionarLoja) {
            this.modalSelecionarLoja(); // Fechar o modal
        }
    };

    excluirPedido = () => {
        this.setState({
            // Contato
            vendedor: '',
            vendedorSelecionado: '',
            contatoSelecionado: '',
            nome: '',
            tipo: '',
            cnpj: '',
            codigo: '',
            fantasia: '',
            buscaContato: '',
            consumidorFinal: '',
            ie_rg: '',
            contribuinte: 9,
            rg: '',
            cep: '',
            complemento: '',
            email: '',
            fone: '',
            celular: '',
            dataNascimento: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            uf: '',

            // Produtos
            produtosSelecionados: [],
            produtoSelecionado: '',
            quantidade: 1,
            desconto: 0,
            preco: 0,
            valorTotal: 0,
            comentario: '',
            subTotal: 0,
            valorDesconto: 0,
            totalComDesconto: 0,

            // Pagamento
            dinheiroRecebido: '',
            dinheiro: 0,
            troco: 0,
            condicao: '',

            // Parcelas
            parcelas: [{ dias: 0, observacao: '', valor: '' }],

            // Data
            dataPrevista: '',

            // Outros
            depositoSelecionado: '',
            frete: 0,
            observacoes: '',
            observacaointerna: '',
            subTotalGeral: 0,
            descontoInicialProduto: 0,
            validated: false,

            // Vendedores
            buscaVendedor: '',
            vendedores: [],
        });

        this.modalExcluirPedido();
        this.modalPedidoExcluido();
    };

    limparPedido = () => {
        this.setState({
            // Contato
            vendedor: '',
            vendedorSelecionado: '',
            buscaVendedor: '',
            contatoSelecionado: '',
            nome: '',
            tipo: '',
            cnpj: '',
            codigo: '',
            fantasia: '',
            buscaContato: '',
            consumidorFinal: '',
            ie_rg: '',
            contribuinte: 9,
            rg: '',
            cep: '',
            complemento: '',
            email: '',
            fone: '',
            celular: '',
            dataNascimento: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            uf: '',

            // Produtos
            produtosSelecionados: [],
            quantidade: 1,
            desconto: 0,
            preco: 0,
            valorTotal: 0,
            comentario: '',
            subTotal: 0,
            valorDesconto: 0,
            totalComDesconto: 0,

            // Pagamento
            dinheiroRecebido: '',
            dinheiro: 0,
            troco: 0,
            condicao: '',

            // Parcelas
            parcelas: [{ dias: 0, observacao: '', valor: '' }],

            // Data
            dataPrevista: '',

            // Outros
            depositoSelecionado: '',
            frete: 0,
            observacoes: '',
            observacaointerna: '',
            descontoInicialProduto: 0,
            validated: false,

            // Vendedores
            vendedores: [],
        });
    };

    validaVenda = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            this.setState({ validated: true });
        } else {
            // Verifica se o CPF é válido
            if (this.validarCPF(this.state.cnpj) || this.validarCNPJ(this.state.cnpj)) {
                this.finalizaVenda();
            } else {
                this.modalCpfValido();
            }
        }
    };

    finalizaVenda = () => {
        const dataPrevista = this.state.dataPrevista;
        const condicao = this.state.condicao;
        const nome = this.state.nome;
        const cnpj = this.state.cnpj;
        const vendedor = this.state.vendedor;
        const observacoes = this.state.observacoes;
        const observacaointerna = this.state.observacaointerna;
        const valorDesconto = this.state.desconto;
        const unidade = this.state.unidade;
        const itens = [];
        const prazo = [];

        this.state.produtosSelecionados.forEach((produto) => {
            let vlr_unit;
            let descontoItemLista;

            // console.log("PS: ", this.state.produtosSelecionados)

            if (produto.descontoInicialProduto > 0 && produto.descontoItem > 0) {
                produto.descontoInicialProduto = 0;
            };

            if (produto.descontoInicialProduto === 0 && produto.descontoItem >= 0) {
                vlr_unit = produto.produto.preco;
            } else if (produto.descontoInicialProduto > 0) {
                vlr_unit = produto.precoUnitario;
                descontoItemLista = produto.descontoInicialProduto;
            } else if (produto.descontoItem > 0) {
                vlr_unit = produto.valorUnitarioLista;
                descontoItemLista = produto.descontoItem;
            } else if (produto.descontoInicialProduto === 0 && produto.descontoItem >= 0) {
                vlr_unit = produto.produto.preco;
            } else {
                vlr_unit = produto.preco;
            };

            descontoItemLista = produto.descontoInicialProduto || produto.descontoItem;

            const item = {
                codigo: produto.produto.codigo,
                descricao: produto.produto.descricao,
                qtde: produto.quantidade,
                un: unidade,
                vlr_unit,
                descontoItemLista
            };
            itens.push(item);
        });

        // console.log(prazo);

        this.state.parcelas.forEach((parcela) => {
            const parcelas = {
                dias: parcela.dias,
                data: parcela.data,
                valor: parcela.valor,
                observacao: parcela.observacao,
                forma: parcela.forma,
                descricaoForma: parcela.descricaoForma
            };
            prazo.push(parcelas);
        });

        if (itens.length === 0) {
            this.modalFinalizarVendaSemItem();
            return;
            // } else if (!condicao || condicao === 'Selecione a forma') {
            // this.modalFormaPagamento();
            //return;
        } else {
            this.canvasFinalizarPedido();
        };

        return {
            nome,
            cnpj,
            itens,
            vendedor,
            observacoes,
            observacaointerna,
            valorDesconto,
            prazo,
            dataPrevista,
        };
    };

    gerarXmlItensParaEnvio = () => {
        const { itens, prazo, dataPrevista = '' } = this.finalizaVenda();

        // Função para criar um nó XML se o valor não estiver vazio
        const createXmlNodeIfNotEmpty = (nodeName, value) => {
            if (value !== '' && value !== undefined) {
                return `<${nodeName}>${value}</${nodeName}>`;
            } else {
                return '';
            };
        };

        const xml = `<?xml version="1.0"?>
            <pedido>
              ${createXmlNodeIfNotEmpty('vlr_desconto', this.state.valorDesconto)}
              ${createXmlNodeIfNotEmpty('data_prevista', dataPrevista)}
              ${createXmlNodeIfNotEmpty('obs', this.state.observacoes)}
              ${createXmlNodeIfNotEmpty('obs_internas', this.state.observacaointerna)}
              ${createXmlNodeIfNotEmpty('vendedor', this.state.vendedor)}
              ${createXmlNodeIfNotEmpty('vlr_frete', this.state.frete)}
              ${createXmlNodeIfNotEmpty('loja', this.state.idLoja)}
              <cliente>
                ${createXmlNodeIfNotEmpty('nome', this.state.nome)}
                ${createXmlNodeIfNotEmpty('cpf_cnpj', this.state.cnpj)}
                ${createXmlNodeIfNotEmpty('tipoPessoa', this.state.tipo)}
                ${createXmlNodeIfNotEmpty('ie', this.state.ie)}
                ${createXmlNodeIfNotEmpty('rg', this.state.rg)}
                ${createXmlNodeIfNotEmpty('contribuinte', this.state.contribuinte)}
                ${createXmlNodeIfNotEmpty('endereco', this.state.endereco)}
                ${createXmlNodeIfNotEmpty('numero', this.state.numero)}
                ${createXmlNodeIfNotEmpty('complemento', this.state.complemento)}
                ${createXmlNodeIfNotEmpty('bairro', this.state.bairro)}
                ${createXmlNodeIfNotEmpty('cep', this.state.cep)}
                ${createXmlNodeIfNotEmpty('cidade', this.state.cidade)}
                ${createXmlNodeIfNotEmpty('uf', this.state.uf)}
                ${createXmlNodeIfNotEmpty('fone', this.state.fone)}
                ${createXmlNodeIfNotEmpty('celular', this.state.celular)}
                ${createXmlNodeIfNotEmpty('email', this.state.email)}
                ${createXmlNodeIfNotEmpty('dataNascimento', this.state.dataNascimento)}
              </cliente>
              <itens>
                ${itens.map((item) => `
                  <item>
                    ${createXmlNodeIfNotEmpty('codigo', item.codigo)}
                    ${createXmlNodeIfNotEmpty('descricao', item.descricao)}
                    ${createXmlNodeIfNotEmpty('un', item.un)}
                    ${createXmlNodeIfNotEmpty('qtde', item.qtde)}
                    ${createXmlNodeIfNotEmpty('vlr_unit', item.vlr_unit)}
                    ${createXmlNodeIfNotEmpty('vlr_desconto', item.descontoItemLista)}
                  </item>`).join('')}
              </itens>
              <parcelas>
                ${prazo.map((parcelas) => `
                  <parcela>
                    ${createXmlNodeIfNotEmpty('dias', parcelas.dias)}
                    ${createXmlNodeIfNotEmpty('data', parcelas.data)}
                    ${createXmlNodeIfNotEmpty('vlr', parcelas.valor)}
                    ${createXmlNodeIfNotEmpty('obs', parcelas.observacao)}
                    <forma_pagamento>
                    ${createXmlNodeIfNotEmpty('id', parcelas.forma)}
                    ${createXmlNodeIfNotEmpty('descricaoPagamento', parcelas.descricaoForma)}
                  </forma_pagamento>
                  
                  </parcela>`).join('')}
              </parcelas>
            </pedido>`;

        // console.log(xml);

        const xmlContato = ('xml', xml);

        this.cadastrarPedido(xmlContato);
        this.limparPedido();
        this.modalSalvarPedido();
        this.canvasFinalizarPedido();

        return xml;
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    // ------------------------------------------------- FUNÇÕES PARCELAS ---------------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|



    // PARCELA POR PARCELA EXEMPLO: 30 GERAR PARCELA, 60 GERAR PARCELA, 90 GERAR PARCELA, UMA POR UMA 
    // adicionarParcela() {
    //     const { condicao } = this.state;
    //     const { prazo } = this.state;
    //     // console.log("prazo: ", prazo)
    //     const dias = parseInt(prazo);
    //     const forma = condicao;
    //     const hoje = new Date();
    //     const data = new Date(hoje.getTime() + parseInt(dias) * 24 * 60 * 60 * 1000);
    //     const dataFormatada = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    //     const novaParcela = {
    //         dias: prazo,
    //         data: dataFormatada,
    //         valor: '',
    //         forma, // Atribui o valor de "condicao" em "forma"
    //         observacao: '',
    //         acao: '',
    //     };

    //     let parcelas = [...this.state.parcelas];
    //     const index = parcelas.findIndex((parcela) => parcela.dias === 0);

    //     if (index !== -1) {
    //         parcelas.splice(index, 1);
    //     };

    //     parcelas = [...parcelas, novaParcela];

    //     // Divide o valor total entre as parcelas
    //     const numParcelas = parcelas.length;
    //     const valorParcela = (this.state.subTotalGeral / numParcelas).toFixed(2);

    //     // Atualiza o valor de cada parcela
    //     const newParcelas = parcelas.map((parcela, i) => ({
    //         ...parcela,
    //         valor: valorParcela,
    //     }));

    //     this.setState({
    //         numLinhas: this.state.numLinhas + 1,
    //         parcelas: newParcelas,
    //     });

    //     // console.log("dias", dias)
    //     // console.log("data", dataFormatada)
    // };

    handleChange(event) {
        this.setState({
            condicao: event.target.value,
        });
    };

    handleChangePrazo(event) {
        this.setState({
            prazo: event.target.value
        });
    };

    handleChangeDias = (index, value) => {
        const { parcelas } = this.state;
        const newParcelas = [...parcelas];

        newParcelas[index].dias = value;

        // Atualize o valor da data com base nos dias alterados
        newParcelas[index].data = this.calcularData(value);
        this.setState({
            parcelas: newParcelas
        });
    };

    handleChangeParcela(index, campo, valor) {
        const parcelas = [...this.state.parcelas];
        parcelas[index][campo] = valor;
        this.setState({
            parcelas
        });
    };

    //VARIAS PARCELAS EXEMPLO: 30 60 90 GERAR PARCELAS, AO GERAR É CRIADO 3 LINHAS CONFORME 30, 60 E 90 DIAS.
    adicionarParcela = () => {
        const { condicao, prazo, formaspagamento } = this.state;

        // Remova os espaços e divida a string em números
        const dias = prazo.trim().split(/\s+/).map(valor => parseInt(valor));

        // Verifique se o último item da lista é NaN (não é um número)
        if (isNaN(dias[dias.length - 1])) {
            // Se não for um número, remova o último item
            dias.pop();
        }

        // Se não houver números válidos, saia da função
        if (dias.length === 0) {
            return;
        }

        const forma = condicao;

        const hoje = new Date();
        const dataFormatada = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

        const novasParcelas = dias.map((valor, index) => {
            const formaSelecionada = formaspagamento.find(forma => forma.id === condicao);
            const descricaoForma = formaSelecionada ? formaSelecionada.descricao : '';

            return {
                dias: valor,
                data: this.calcularData(valor),
                valor: '',
                forma: condicao,
                descricaoForma: descricaoForma, // Defina a descrição aqui
                observacao: '',
                acao: '',
            };
        });

        const numParcelas = novasParcelas.length;
        const valorParcela = (this.state.subTotalGeral / numParcelas).toFixed(2);

        const primeiraLinha = novasParcelas.shift(); // Remova a primeira linha do array
        const newParcelas = [primeiraLinha, ...novasParcelas].map((parcela, i) => ({
            ...parcela,
            valor: valorParcela,
        }));

        this.setState((prevState) => ({
            parcelas: [...newParcelas],
        }));
    };



    handleValorChangeParcela(index, campo, valor) {
        const parcelas = [...this.state.parcelas];
        const numParcelas = parcelas.length;

        // Calcula a soma total dos valores das parcelas
        const valorTotalParcelas = parcelas.reduce((acc, curr) => acc + parseFloat(curr.valor || 0), 0);

        // Calcula o valor atual da parcela selecionada
        const valorAtualParcela = parseFloat(parcelas[index].valor || 0);

        // Calcula a diferença de valor a ser aplicada nas demais parcelas
        const diferenca = (valorAtualParcela - parseFloat(valor)) / (numParcelas - 1);

        // Atualiza o valor da parcela selecionada
        parcelas[index][campo] = parseFloat(valor);

        // Atualiza os valores das outras parcelas com a diferença calculada
        const newParcelas = parcelas.map((parcela, i) => {
            if (i !== index) {
                const novoValor = parseFloat(parcela.valor || 0) + diferenca;
                return { ...parcela, valor: novoValor.toFixed(2) };
            };
            return parcela;
        });

        this.setState({
            parcelas: newParcelas
        });
    };

    handleFormaChange = (index, event) => {
        const formaId = event.target.value; // Extrair o ID da opção selecionada
        const parcelas = [...this.state.parcelas];
        parcelas[index].forma = formaId;

        // console.log('Forma ID selecionada:', formaId);
        // console.log('Dados da parcela atualizados:', parcelas[index]);

        this.setState({
            parcelas
        });
    };

    handleDescricaoChange = (index, descricao) => {
        const parcelas = [...this.state.parcelas];
        parcelas[index].descricaoForma = descricao;

        // console.log('Descrição selecionada:', descricao);
        // console.log('Dados da parcela atualizados:', parcelas[index]);

        this.setState({
            parcelas
        });
    };



    handleObservacaoChange = (index, event) => {
        const parcelas = [...this.state.parcelas];
        parcelas[index].observacao = event.target.value;
        this.setState({
            parcelas
        });
    };

    handleDeleteParcela(index) {
        const parcelas = [...this.state.parcelas];
        const valorExcluido = parseFloat(parcelas[index].valor || 0);
        parcelas.splice(index, 1);

        const numParcelas = parcelas.length;
        const valorParcela = this.state.subTotalGeral / numParcelas;
        const valorRestante = this.state.subTotalGeral - valorExcluido;

        const diferenca = valorRestante - parcelas.reduce((acc, cur) => acc + parseFloat(cur.valor || 0), 0);
        const valorRestanteParcela = diferenca / numParcelas;

        const newParcelas = parcelas.map((parcela, i) => {
            return {
                ...parcela,
                valor: (valorParcela + valorRestanteParcela).toFixed(2)
            };
        });

        let parcelasRestantes = [];
        if (numParcelas < this.state.numParcelas) {
            const numParcelasRestantes = this.state.numParcelas - numParcelas;
            parcelasRestantes = new Array(numParcelasRestantes).fill().map((_, i) => {
                return {
                    numeroParcela: numParcelas + i + 1,
                    valor: valorRestanteParcela.toFixed(2)
                };
            });
        };

        this.setState({
            parcelas: [...newParcelas, ...parcelasRestantes],
            valorTotalParcela: valorRestanteParcela.toFixed(2),
        });
    };

    calcularData = (dias) => {
        const dataAtual = new Date();
        const dataCalculada = new Date(dataAtual.getTime() + dias * 24 * 60 * 60 * 1000);
        const dia = dataCalculada.getDate().toString().padStart(2, '0');
        const mes = (dataCalculada.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataCalculada.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    // ------------------------------------------- FUNÇÕES ACRESCENTA .00 CAMPOS --------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    formatarPreco = (event) => {
        let preco = event.target.value.trim();
        let precoEdit = preco !== '' && !isNaN(preco) ? parseFloat(preco).toFixed(2) : 0;
        this.setState({
            preco: precoEdit
        });
    };

    formatarPrecoLista = (event) => {
        let valorUnitarioLista = event.target.value.trim();
        let valorUnitarioListaEdit = valorUnitarioLista !== '' && !isNaN(valorUnitarioLista) ? parseFloat(valorUnitarioLista).toFixed(2) : 0;
        this.setState({
            valorUnitarioLista: valorUnitarioListaEdit
        });
    };

    formatarDesconto = (event) => {
        let valor = event.target.value.trim();
        let desconto = valor !== '' && !isNaN(valor) ? parseFloat(valor).toFixed(2) : 0;
        this.setState({
            valorDesconto: desconto
        });
    };

    formatarFrete = (event) => {
        const valorFrete = event.target.value.trim();
        const frete = valorFrete !== '' && !isNaN(valorFrete) ? parseFloat(valorFrete).toFixed(2) : 0;
        this.setState({
            frete: frete
        });
    };

    formatarTroco = (event) => {
        const dinheiroRecebido = event.target.value.trim();
        const dinheiro = dinheiroRecebido !== '' ? parseFloat(dinheiroRecebido).toFixed(2) : '';
        this.setState({
            dinheiroRecebido: dinheiro
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    // ------------------------------------ FUNÇÕES EDITAR LISTA DE PRODUTOS (MODAL) ----------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    modalEditarProduto = (produto) => {
        const { produtosSelecionados, valorUnitarioAtualizado } = this.state;
        const index = produtosSelecionados.findIndex((p) => p.produto.id === produto.produto.id);
        const { preco } = produto.produto;
        const valorUnitario = produto.precoUnitario || (preco ? preco.toString() : '');

        this.setState({
            modalEditarProduto: true,
            produtoSelecionadoIndex: index,
            produtoSelecionadoLista: produto,
            valorLista: preco ? parseFloat(preco).toFixed(2) : '',
            quantidadeLista: produto.quantidade || '',
            descontoItemLista: produto.descontoItem || produto.descontoInicialProduto,
            valorUnitarioLista: valorUnitarioAtualizado || valorUnitario,
            valorTotalLista: produto.subTotal || '',
            observacaointerna: produto.observacaointerna || '',
            valorUnitarioOriginal: preco ? parseFloat(preco).toFixed(2) : '',
            valorUnitarioAtualizado: null
        }, () => {
            this.atualizaSubTotalLista();
        });
    };

    atualizaValorLista = (event) => {
        const valorLista = event.target.value
        this.setState({
            valorLista: valorLista
        });
    };

    atualizaQuantidadeLista = (event) => {
        const quantidade = event.target.value;
        this.setState({
            quantidadeLista: quantidade
        }, () => {
            this.atualizaSubTotalLista();
        });
    };

    atualizaDescontoItem = (event) => {
        const descontoItem = event.target.value;
        this.setState({
            descontoItemLista: descontoItem
        }, () => {
            this.aplicaDescontoItem();
            this.atualizaSubTotalLista();
        });
    };

    aplicaDescontoItem = () => {
        const {
            descontoItemLista,
            valorUnitarioOriginal
        } = this.state;

        if (descontoItemLista !== '') {
            const desconto = parseFloat(descontoItemLista.replace(',', '.')) / 100;
            const valorUnitario = (valorUnitarioOriginal * (1 - desconto)).toFixed(2);
            this.setState({
                valorUnitarioLista: valorUnitario
            }, () => {
                this.atualizaSubTotalLista();
            });
        };
    };

    atualizaValorUnitarioLista = (event) => {
        const valorUnitario = event.target.value.replace(',', '.');
        this.setState({
            valorUnitarioLista: valorUnitario
        });
    };

    atualizaValorUnitario = (event) => {
        const valorUnitario = event.target.value.replace(',', '.');
        this.setState({
            valorUnitarioLista: valorUnitario
        }, () => {
            this.atualizaSubTotalLista();
        });
    };

    salvarProdutoLista = () => {
        const {
            produtoSelecionadoIndex,
            quantidadeLista,
            valorUnitarioLista,
            descontoItemLista,
            produtosSelecionados,
            produtoSelecionadoLista,
        } = this.state;

        if (produtoSelecionadoIndex !== null && produtoSelecionadoIndex >= 0) {
            const produtosAtualizados = [...produtosSelecionados];

            // Obtém o preço original do produto
            const precoOriginal = produtoSelecionadoLista.precoUnitario || produtoSelecionadoLista.produto.preco;

            // Converte os valores para números
            const novoPreco = parseFloat(valorUnitarioLista);
            const descontoItem = parseFloat(descontoItemLista);

            // Calcula o preço unitário considerando o desconto, se houver
            const precoUnitario = descontoItem > 0 ? (precoOriginal * (1 - descontoItem / 100)) : novoPreco;

            // Atualiza o produto na lista
            produtosAtualizados[produtoSelecionadoIndex] = {
                ...produtosAtualizados[produtoSelecionadoIndex],
                quantidade: quantidadeLista,
                preco: novoPreco,
                descontoItem: descontoItemLista,
                precoUnitario: precoUnitario.toFixed(2),
            };

            this.setState({
                produtosSelecionados: produtosAtualizados,
                modalEditarProduto: false,
                preco: '',
                precoUnitario: '',
                quantidade: '',
                descontoItem: '',
            });
        }
    };

    atualizaSubTotalLista = () => {
        const { quantidadeLista, valorUnitarioLista } = this.state;
        const subTotal = (quantidadeLista * valorUnitarioLista).toFixed(2);
        this.setState({
            subTotalLista: subTotal
        });
    };

    fecharModalEditarProduto = () => {
        this.setState({
            modalEditarProduto: false,
        });
    };

    atualizaTrocoCaixa = (event) => {
        const inputTroco = event.target.value;
        const trocoCaixa = inputTroco.replace(',', '.').replace(/[^\d.]/g, ''); // Substitui vírgula por ponto e remove caracteres não numéricos, exceto ponto decimal
        this.setState({
            trocoCaixa: trocoCaixa,
        });
    };

    formatarTrocoCaixa = (event) => {
        const trocoCaixa = event.target.value.trim();
        this.setState({
            trocoCaixa: trocoCaixa !== '' && !isNaN(trocoCaixa) ? parseFloat(trocoCaixa).toFixed(2) : ''
        });
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

    //-----------------------------------------------------------------------------------------------------------------------
    // --------------------------------------- BOTÃO LEITOR DE CODIGO DE BARRAS ---------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------

    render() {

        //Produto.
        const { produtos, produtoNaoLocalizado, produtoSelecionado, produtosSelecionados, buscaProduto, preco, quantidade, desconto, imagem, produtoSelecionadoLista, precoBling } = this.state;
        //Contatos.
        const { contatos, vendedores, contatoNaoLocalizado, vendedorNaoLocalizado, buscaContato, buscaVendedor, vendedorSelecionado, nome, cnpj, rg, ie_rg, tipo, contribuinte,
            cep, cidade, uf, endereco, numero, complemento, bairro, email, fone, celular } = this.state;
        //Calculos.
        const { valorTotal, subTotalGeral, observacoes, observacaointerna, valorDesconto, dinheiroRecebido, troco, frete, condicao, subTotal, dataPrevista } = this.state;
        //Modals.
        const { modalCadastrarCliente, modalEditarProduto, modalFinalizarVendaSemItem, modalFormaPagamento, modalExcluirPedido, modalInserirProduto, modalExcluirProduto, modalCpfValido,
            modalInserirParcela, modalSalvarPedido, modalSelecionarLoja, modalPedidoExcluido, canvasFinalizarPedido, validated, idLoja, objeto, unidadeLoja, nomeLoja, cpfValido, cnpjValido, dadosCarregados } = this.state;
        //Listas de preço.
        const { idLista, listaspreco, descontoInicialProduto, opcaoDescontoItem, valorLista, quantidadeLista, descontoItemLista,
            opcaoDescontoLista, valorUnitarioLista, subTotalLista, prazo, parcelas, ultimoPedido, codigo, value, trocoCaixa } = this.state;


        let quantidadeTotal = 0;
        for (const produto of produtosSelecionados) {
            quantidadeTotal += produto.quantidade;
        }

        if (!dadosCarregados) {
            return (
                <div className="spinner-container">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="custom-loader"></div>
                    </div>
                    <div >
                        <div className="text-loading text-white">Carregando frente de caixa...</div>
                    </div>
                </div>
            )
        } else {
            return (
                <Container fluid className="pb-5" >
                    <Form noValidate validated={validated} onSubmit={this.validaVenda}>
                        <Row className="d-flex">
                            <Col md={6} className="">
                                <div className="grid-pdv-1">
                                    <div className="mb-3 d-flex justify-content-between align-items-center">
                                        <h5>Vendedor</h5>
                                        <div className="custom-container d-flex align-items-center">
                                            <span className="me-2"><strong>Loja:</strong> {nomeLoja}</span>
                                            <Button variant="outline-light" onClick={() => this.setState({ modalSelecionarLoja: true })}>
                                                <FaExchangeAlt style={{ fontSize: '1.25em' }} />
                                            </Button>
                                        </div>
                                    </div>

                                    <Row className="row align-items-center">
                                        <Col className="col" xs={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="tipo" className="texto-campos">Lista de preço</Form.Label>
                                                <Form.Select as="select" id="tipo" className="form-control" name="tipo" value={idLista || ''} onChange={this.selecionaListaDesconto}>
                                                    <option value="undefined">Selecione uma lista de preço</option>
                                                    {Array.isArray(listaspreco) && listaspreco.map(lista => (
                                                        <option key={lista.idLista} value={lista.idLista}>
                                                            {lista.nomeLista}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4} >
                                            <Form.Label htmlFor="vendedor" className="texto-campos">Adicionar vendedor</Form.Label>
                                            <Form.Group className="mb-3" >
                                                <InputGroup>
                                                    <Form.Control required type="text" className="form-control" placeholder="Digite o nome do vendedor" value={buscaVendedor || ''} onChange={this.atualizaBuscaVendedor}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault(); // Evita o comportamento padrão de submit do formulário
                                                                if (buscaVendedor) {
                                                                    this.buscarVendedor(buscaVendedor, nome, codigo);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <Button variant="secondary" onClick={() => { if (buscaVendedor) { this.buscarVendedor(buscaVendedor, nome, codigo) } }} >
                                                        <FontAwesomeIcon icon={faSearch} />
                                                    </Button>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        {vendedorNaoLocalizado && (
                                            <Row className="row align-items-center">
                                                <Col className="col" xs={4}>
                                                    <Alert variant="danger">
                                                        <p><BsXCircle style={{ marginRight: '0.5rem', marginBottom: '-1px' }} />
                                                            Vendedor não localizado.</p>
                                                    </Alert>
                                                </Col>
                                            </Row>
                                        )}
                                        {vendedorSelecionado && (
                                            <Col className="col" xs={4}>
                                                <Form.Label htmlFor="vendedorSelecionado" className="text-center d-block">Vendedor selecionado</Form.Label>
                                                <Form.Group className="mb-3">
                                                    <Form.Control type="text" id="vendedorSelecionado" className="form-control text-center" name="vendedorSelecionado" value={vendedorSelecionado.contato.nome || ''} disabled />
                                                </Form.Group>
                                            </Col>
                                        )}
                                    </Row>
                                    {!vendedorSelecionado && (
                                        <ul className="lista-produtos">
                                            {vendedores.map((contato) => (
                                                <li
                                                    key={contato.contato.id}
                                                    onClick={() => this.selecionarVendedor(contato)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === " ") {
                                                            e.preventDefault();
                                                            this.selecionarVendedor(contato)
                                                        }
                                                    }}
                                                    tabIndex={0}
                                                >
                                                    Cód: {contato.contato.codigo} Vendedor: {contato.contato.nome}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="mb-3">
                                        <h5>Produto</h5>
                                    </div>
                                    <Row className="row align-items-center">
                                        <Col xs={10}>
                                            <Form.Label htmlFor="produto" className="texto-campos">
                                                Adicionar produto
                                            </Form.Label>
                                            <Form.Group className="mb-3">
                                                <InputGroup>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Busque um produto pelo (Nome ou Código ou SKU ou EAN ou Descrição/Nome Fornecedor)"
                                                        value={buscaProduto || ''}
                                                        onChange={this.atualizarBuscaProduto}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                if (buscaProduto) {
                                                                    this.buscarProdutos(buscaProduto, value);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() => {
                                                            if (buscaProduto) {
                                                                this.buscarProdutos(buscaProduto, value);
                                                            }
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faSearch} />
                                                    </Button>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <ul className="lista-produtos">
                                        {produtos.map((produto) => {
                                            const precoFormatado = parseFloat(produto.produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                            return (
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
                                            );
                                        })}
                                    </ul>
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
                                            <div>
                                                <Row className="row">
                                                    <Col className="col">
                                                        <Form.Group className="mb-3">
                                                            <Row>
                                                                <Col>
                                                                    {imagem ? (
                                                                        <Zoom
                                                                            overlayBgColorEnd="rgba(255, 255, 255, 0.95)"
                                                                            zoomMargin={40}
                                                                            position="fixed"  // Defina a posição como 'fixed'
                                                                            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}  // Centralize na tela
                                                                        >
                                                                            <img
                                                                                alt="Imagem"
                                                                                src={imagem}
                                                                                className="imagem-preview com-borda img-responsive rounded"
                                                                                style={{ width: '390px', height: '264px', maxHeight: '230px' }}
                                                                            />

                                                                        </Zoom>
                                                                    ) : (
                                                                        <Image
                                                                            src="https://www.bling.com.br/images/imagePdv.svg"
                                                                            className="imagem-preview com-borda img-responsive"
                                                                            style={{ width: '390px', height: '264px', maxHeight: '230px' }}
                                                                            rounded
                                                                        />
                                                                    )}
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Col>
                                                            <div className="position-relative product-details">
                                                                <h2>{produtoSelecionado.produto.codigo} - {produtoSelecionado.produto.descricao}</h2>
                                                                {this.produtoEstaNaListaDeDesconto(produtoSelecionado) ? (
                                                                    <>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <span className="strike-through">Preço no Bling: R$ {parseFloat(precoBling).toFixed(2).replace('.', ',')}</span>
                                                                            <span className="discount-message">Este produto está na lista de desconto.</span>
                                                                        </div>
                                                                        <div className="price-container">Valor da lista aplicado:
                                                                            <h2 className="total-price">{parseFloat(preco).toFixed(2).replace('.', ',')}</h2>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <span className="strike-through">&nbsp;</span>
                                                                            <span className="discount-message">&nbsp;</span>
                                                                        </div>
                                                                        <div className="price-container">Preço unitario:
                                                                            <h2 className="total-price">{parseFloat(preco).toFixed(2).replace('.', ',')}</h2>
                                                                        </div>
                                                                    </>)}
                                                            </div>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Row className="row align-items-center">
                                                <Col className="col">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="quantidade" className="texto-campos">Quantidade</Form.Label>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Form.Control type="text" id="quantidade" className="form-control" name="quantidade" value={quantidade || ''} onChange={this.atualizaQuantidade} disabled={!produtoSelecionado} />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="desconto" className="texto-campos">
                                                            Desconto preço (%)
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            id="desconto"
                                                            className="form-control"
                                                            name="desconto"
                                                            placeholder="0.00"
                                                            value={descontoInicialProduto || ''}
                                                            onChange={this.atualizaDescontoProduto}
                                                            disabled={opcaoDescontoItem === 'desliga'}
                                                        />
                                                        {!this.produtoEstaNaListaDeDesconto(produtoSelecionado) && (
                                                            <Form.Check
                                                                type="switch"
                                                                id="ligaSwitch"
                                                                label={opcaoDescontoItem === 'liga' ? 'Habilitado' : 'Desabilitado'}
                                                                checked={opcaoDescontoItem === 'liga'}
                                                                onChange={(e) => this.setState({ opcaoDescontoItem: e.target.checked ? 'liga' : 'desliga' })}
                                                            />
                                                        )}
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="preco" className="texto-campos">Preço unitário</Form.Label>
                                                        <Form.Control type="number" id="preco" className="form-control no-spinners" name="preco" placeholder="00,00" value={preco || ''} onChange={this.atualizaPreco} onBlur={this.formatarPreco} readOnly={descontoInicialProduto !== ''}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="valorTotal" className="texto-campos">Sub total</Form.Label>
                                                        <Form.Control type="text" id="valorTotal" className="form-control" name="valorTotal" placeholder="00,00" value={valorTotal ? valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).replace('.', ',') : ''} onChange={this.atualizarValorTotal} readOnly />
                                                    </Form.Group>
                                                </Col>
                                                <div>
                                                    <div className="text-end">
                                                        <Button variant="secondary" onClick={() => this.adicionarProdutoSelecionado(produtoSelecionado)}>
                                                            <BsListCheck style={{ marginRight: '0.5rem' }} />
                                                            Inserir produto
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Row>
                                        </div>
                                    )}

                                    <div className="divisa"></div>
                                    <div className="table-container-produto">
                                        <Table bordered hover variant="secondary" responsive="xl"  >
                                            <thead>
                                                <tr>
                                                    <th>Produto</th>
                                                    <th>Quantidade</th>
                                                    <th>Preço</th>
                                                    <th>Subtotal</th>
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {produtosSelecionados.map((produto, index) => (
                                                    <tr key={produto.produto.id}>
                                                        <td>{produto.produto.codigo} - {produto.produto.descricao}</td>
                                                        <td>{produto.quantidade}</td>
                                                        <td style={{ alignItems: 'center' }}>
                                                            {this.produtoEstaNaListaDeDesconto(produto) && (
                                                                <div style={{ alignItems: 'center' }}>
                                                                    <BsArrowDown style={{ color: 'red', flexShrink: 0, marginRight: '5px' }} />
                                                                    <span style={{ color: 'red' }}>
                                                                        R$ {typeof produto.preco === "number"
                                                                            ? produto.preco.toFixed(2).replace('.', ',')
                                                                            : parseFloat(produto.preco).toFixed(2).replace('.', ',')}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {!this.produtoEstaNaListaDeDesconto(produto) && (
                                                                <span>
                                                                    R$ {typeof produto.preco === "number"
                                                                        ? produto.preco.toFixed(2).replace('.', ',')
                                                                        : parseFloat(produto.preco).toFixed(2).replace('.', ',')}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td style={{ alignItems: 'center' }}>
                                                            {this.produtoEstaNaListaDeDesconto(produto) && (
                                                                <div style={{ alignItems: 'center' }}>
                                                                    <BsArrowDown style={{ color: 'red', flexShrink: 0, marginRight: '5px' }} />
                                                                    <span style={{ color: 'red' }}>
                                                                        R$ {this.calcularSubTotal(produto.produto, produto.quantidade, produto.preco).toFixed(2).replace('.', ',')}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {!this.produtoEstaNaListaDeDesconto(produto) && (
                                                                <span>
                                                                    R$ {this.calcularSubTotal(produto.produto, produto.quantidade, produto.preco).toFixed(2).replace('.', ',')}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <Button variant="light" title="Editar produto" className="transparent-button" onClick={() => {
                                                                this.modalEditarProduto(produto)
                                                            }}>
                                                                <BsPencilSquare className="blue-icon" />
                                                            </Button>
                                                            <Button variant="light" title="Excluir produto" className="transparent-button" onClick={this.modalExcluirProduto}>
                                                                <IoTrash className="red-icon" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>

                                    <Modal show={modalEditarProduto} onHide={this.fecharModalEditarProduto} size="lg" centered>
                                        <Modal.Header closeButton className="">
                                            <Modal.Title>Editar</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ padding: '20px' }}>
                                            {produtoSelecionadoLista && (
                                                <div>
                                                    <Row className="row">
                                                        <Col className="col" xs={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="valorLista" className="texto-campos">Valor de lista</Form.Label>
                                                                <Form.Control type="number" id="valorLista" className="form-control no-spinners" name="valorLista" value={valorLista || ''} disabled />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="col" xs={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="quantidade" className="texto-campos">Quantidade</Form.Label>
                                                                <Form.Control type="number" id="quantidade" className="form-control no-spinners" name="quantidade" value={quantidadeLista || ''} onChange={this.atualizaQuantidadeLista} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="col" xs={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="descontoItem" className="texto-campos">Desconto item lista (%)</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    id="descontoItem"
                                                                    className="form-control no-spinners"
                                                                    name="descontoItem"
                                                                    placeholder="00,00"
                                                                    value={descontoItemLista === '0' ? '' : descontoItemLista}
                                                                    onChange={this.atualizaDescontoItem}
                                                                    onBlur={this.aplicaDescontoItem}
                                                                    disabled={opcaoDescontoLista === 'desliga' || this.produtoEstaNaListaDeDesconto(produtoSelecionadoLista)}
                                                                />
                                                                {!this.produtoEstaNaListaDeDesconto(produtoSelecionadoLista) && (
                                                                    <Form.Check
                                                                        type="switch"
                                                                        id="ligaSwitch"
                                                                        label={opcaoDescontoLista === 'liga' ? 'Habilitado' : 'Desabilitado'}
                                                                        checked={opcaoDescontoLista === 'liga'}
                                                                        onChange={(e) => this.setState({ opcaoDescontoLista: e.target.checked ? 'liga' : 'desliga' })}
                                                                    />
                                                                )}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="row align-items-center">
                                                        <Col className="col" xs={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="valorUnitario" className="texto-campos">Valor unitário</Form.Label>
                                                                <Form.Control type="number" id="valorUnitario" className="form-control no-spinners" name="valorUnitario" value={valorUnitarioLista || ''} onChange={this.atualizaValorUnitario} onBlur={this.formatarPrecoLista} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="col" xs={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="subTotalLista" className="texto-campos">Sub total</Form.Label>
                                                                <Form.Control type="number" id="subTotalLista" className="form-control no-spinners" name="subTotalLista" value={subTotalLista || ''} disabled />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )}
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="outline-secondary" className="mr-2" onClick={this.fecharModalEditarProduto} style={{ marginRight: '10px' }}>Cancelar</Button>
                                            <Button variant="secondary" className="mr-2" onClick={() => this.salvarProdutoLista()}>Salvar</Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <div>
                                        <h5>Totais</h5>
                                    </div>
                                    <Row className="row align-items-center">
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="subtotal" className="texto-campos">Sub total</Form.Label>
                                                <Form.Control type="text" id="subtotal" className="form-control" name="subtotal" placeholder="00,00" value={subTotal ? subTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).replace('.', ',') : ''} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="totaldavenda" className="texto-campos">Total da venda</Form.Label>
                                                <Form.Control type="text" id="totaldavenda" className="form-control" name="totaldavenda" placeholder="00,00" defaultValue={subTotalGeral ? subTotalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).replace('.', ',') : ''} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="desconto" className="texto-campos">Valor fora lista (Total)</Form.Label>
                                                <Form.Control type="text" className="form-control no-spinners" name="desconto" placeholder="00,00" value={this.calcularTotalLista().totalForaDesconto.toFixed(2).replace('.', ',')} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="desconto" className="texto-campos">Valor lista de desconto (Total)</Form.Label>
                                                <Form.Control type="text" className="form-control no-spinners" name="desconto" placeholder="00,00" value={this.calcularTotalLista().totalNaListaDesconto.toFixed(2).replace('.', ',')} disabled />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="grid-pdv-2">
                                    <div className="mb-3">
                                        <h5>Cliente</h5>
                                    </div>
                                    <div>
                                        <Row className="row align-items-center">
                                            <Col className="col" xs={12} md={5}>
                                                <div className="busca-cliente d-grid gap-2">
                                                    <Form.Group className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="nomePdvInfo">
                                                                    Histórico financeiro.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label htmlFor="cliente" className="texto-campos">
                                                                Cliente (Nome) <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <InputGroup>
                                                            <Form.Control required type="text" className="form-control" placeholder="Digite o nome do cliente" value={buscaContato || ''} onChange={this.atualizarBuscaContato}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault(); // Evita o comportamento padrão de submit do formulário
                                                                        if (buscaContato) {
                                                                            this.buscarContato(buscaContato, nome, cnpj); // Chame a função de busca aqui
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            <Button variant="secondary" onClick={() => { if (buscaContato) { this.buscarContato(buscaContato, nome, cnpj) } }}>
                                                                <FontAwesomeIcon icon={faSearch} />
                                                            </Button>
                                                        </InputGroup>
                                                        <Form.Control.Feedback type="invalid">Campo obrigatorio.</Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col className="col" xs={12} md={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="cpf" className="texto-campos">
                                                        {tipo === 'J' ? 'CNPJ' : 'CPF'}
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className={`form-control ${!cpfValido && cnpj.length === 11 && !cnpjValido ? 'is-invalid' : ''}`}
                                                        name="cpf"
                                                        value={cnpj || ''}
                                                        onChange={this.atualizaCpfCnpj}
                                                        onBlur={this.validarCpf}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col className="col" xs={12} md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="endereco" className="texto-campos">Endereço</Form.Label>
                                                    <Form.Control type="text" className="form-control" name="endereco" value={endereco || ''} onChange={this.atualizaEndereco} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        {contatos.map((contato) => (
                                            <ul key={contato.contato.id} className="lista-contatos">
                                                <li
                                                    onClick={() => this.selecionarContato(contato)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            this.selecionarContato(contato);
                                                        }
                                                    }}
                                                    tabIndex={0}
                                                >
                                                    Nome: {contato.contato.nome} - CPF/CNPJ: {contato.contato.cnpj}
                                                </li>
                                            </ul>
                                        ))}

                                        <Row>
                                            <Col className="col" xs={12} md={4}>
                                                <Button variant="secondary" onClick={this.modalCadastrarCliente} style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' }}>
                                                    <BsPersonAdd style={{ marginRight: '0.5rem' }} />
                                                    Cadastrar cliente
                                                </Button>
                                            </Col>
                                            <Col>
                                                {contatoNaoLocalizado && (
                                                    <Col xs={4}>
                                                        <Alert variant="danger" >
                                                            <p><BsXCircle style={{ marginRight: '0.5rem', marginBottom: '-1px' }} />
                                                                Cliente não localizado.</p>
                                                        </Alert>
                                                    </Col>
                                                )}
                                            </Col>
                                        </Row>

                                        <Modal show={modalCadastrarCliente} onHide={this.modalCadastrarCliente} size="xl" centered>
                                            <Modal.Header closeButton className="bg-secondary text-white">
                                                <BsPersonAdd className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                                                <Modal.Title>Cadastrar cliente</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body style={{ padding: '20px' }} >
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="nome" className="texto-campos">Nome</Form.Label>
                                                            <Form.Control type="text" id="nome" className="form-control" name="nome" value={nome || ''} onChange={this.atualizaNome} />
                                                        </Form.Group>
                                                    </Col>
                                                    {/* <Col className="col" xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="cpf" className="texto-campos">
                                                                {cnpj.replace(/[^\d]/g, '').length === 14 ? 'CNPJ' : 'CPF'}
                                                            </Form.Label>
                                                            <Form.Control type="text" id="cpf" className="form-control" name="cpf" value={cnpj || ''} onChange={this.atualizaCpfCnpj} />
                                                        </Form.Group>
                                                    </Col> */}
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="cpf" className="texto-campos">
                                                                {tipo === 'J' ? 'CNPJ' : 'CPF'}
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                className={`form-control ${!cpfValido && cnpj.length === 11 && !cnpjValido ? 'is-invalid' : ''}`}
                                                                name="cpf"
                                                                value={cnpj || ''}
                                                                onChange={this.atualizaCpfCnpj}
                                                                onBlur={this.validarCpf}
                                                                required={!cpfValido && !cnpjValido} // Define a propriedade required com base nos estados de cpfValido e cnpjValido
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="tipo" className="texto-campos">Tipo</Form.Label>
                                                            <Form.Select as="select" id="tipo" className="form-control" name="tipo" value={tipo || ''} onChange={this.atualizaTipoPessoa}>
                                                                <option value="F">Pessoa Física</option>
                                                                <option value="J">Pessoa Jurídica</option>
                                                                <option value="E">Estrangeiro</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="inscricaoEstadual" className="texto-campos">Inscrição estadual</Form.Label>
                                                            <Form.Control type="text" id="inscricaoEstadual" className="form-control" name="inscricaoEstadual" value={contribuinte === "2" ? "ISENTO" : ie_rg || ""} onChange={this.atualizaIe} disabled={contribuinte === "2"} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="contribuinte" className="texto-campos">Contribuinte</Form.Label>
                                                            <Form.Select as="select" id="contribuinte" className="form-control" name="contribuinte" value={contribuinte || ""} onChange={this.atualizaContribuinte} >
                                                                <option value="1">1 - Contribuinte ICMS</option>
                                                                <option value="2">2 - Contribuinte isento de Inscrição no Cadastro de Contribuintes</option>
                                                                <option value="9">9 - Não contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="rg" className="texto-campos">RG</Form.Label>
                                                            <Form.Control type="text" id="rg" className="form-control" name="rg" value={rg || ''} onChange={this.atualizaRg} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="cep" className="texto-campos">CEP</Form.Label>
                                                            <Form.Control type="text" id="cep" className="form-control" name="cep" value={cep || ''} onChange={this.atualizaCep} onBlur={this.buscarCep} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="cidade" className="texto-campos">Cidade</Form.Label>
                                                            <Form.Control type="text" id="cidade" className="form-control" name="cidade" value={cidade || ''} onChange={this.atualizaCidade} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="uf" className="texto-campos">UF</Form.Label>
                                                            <Form.Select as="select" id="uf" className="form-control" name="uf" value={uf} onChange={this.atualizaUf}>
                                                                <option value="">Selecione</option>
                                                                <option value="AC">Acre</option>
                                                                <option value="AL">Alagoas</option>
                                                                <option value="AP">Amapá</option>
                                                                <option value="AM">Amazonas</option>
                                                                <option value="BA">Bahia</option>
                                                                <option value="CE">Ceará</option>
                                                                <option value="DF">Distrito Federal</option>
                                                                <option value="ES">Espírito Santo</option>
                                                                <option value="GO">Goiás</option>
                                                                <option value="MA">Maranhão</option>
                                                                <option value="MT">Mato Grosso</option>
                                                                <option value="MS">Mato Grosso do Sul</option>
                                                                <option value="MG">Minas Gerais</option>
                                                                <option value="PA">Pará</option>
                                                                <option value="PB">Paraíba</option>
                                                                <option value="PR">Paraná</option>
                                                                <option value="PE">Pernambuco</option>
                                                                <option value="PI">Piauí</option>
                                                                <option value="RJ">Rio de Janeiro</option>
                                                                <option value="RN">Rio Grande do Norte</option>
                                                                <option value="RS">Rio Grande do Sul</option>
                                                                <option value="RO">Rondônia</option>
                                                                <option value="RR">Roraima</option>
                                                                <option value="SC">Santa Catarina</option>
                                                                <option value="SP">São Paulo</option>
                                                                <option value="SE">Sergipe</option>
                                                                <option value="TO">Tocantins</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={12} md={8}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="endereco" className="texto-campos">Endereço</Form.Label>
                                                            <Form.Control type="text" id="endereco" className="form-control" name="endereco" value={endereco || ''} onChange={this.atualizaEndereco} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="numero" className="texto-campos">Número</Form.Label>
                                                            <Form.Control type="text" id="numero" className="form-control" name="numero" value={numero || ''} onChange={this.atualizaNumero} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={12} md={8}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="complemento" className="texto-campos">Complemento</Form.Label>
                                                            <Form.Control type="text" id="complemento" className="form-control" name="complemento" value={complemento || ''} onChange={this.atualizaComplemento} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="bairro" className="texto-campos">Bairro</Form.Label>
                                                            <Form.Control type="text" id="bairro" className="form-control" name="bairro" value={bairro || ''} onChange={this.atualizaBairro} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="row align-items-center">
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="email" className="texto-campos">E-mail</Form.Label>
                                                            <Form.Control type="text" id="email" className="form-control" name="email" value={email || ''} onChange={this.atualizaEmail} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="fone" className="texto-campos">Fone</Form.Label>
                                                            <Form.Control type="text" id="fone" className="form-control" name="fone" value={fone || ''} onChange={this.atualizaFone} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="col" xs={12} md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label htmlFor="celular" className="texto-campos">Celular</Form.Label>
                                                            <Form.Control type="text" id="celular" className="form-control" name="celular" value={celular || ''} onChange={this.atualizaCelular} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="outline-secondary" onClick={this.modalCadastrarCliente}>Fechar</Button>
                                                <Button variant="secondary" onClick={this.modalCadastrarCliente}>Salvar</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    <div className="divisa"></div>
                                    <div className="mb-3">
                                        <h5>Outras informações</h5>
                                    </div>
                                    {/* <Col className="col">
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="depositolancamento" className="texto-campos">Depósito para lançamento</Form.Label>
                                                    <Form.Select className="" id="depositolancamento" name="depositolancamento" value={depositoSelecionado || ''} onChange={this.atualizaDepositoSelecionado} >
                                                        <option>Selecione o deposito</option>
                                                        {this.state.depositos.map((deposito) => (
                                                            <option key={deposito.deposito.id} value={deposito.deposito.id}>
                                                                {deposito.deposito.descricao}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                        </Col> */}
                                    <div>
                                        <Row className="row align-items-center">
                                            <Col className="col" xs={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="frete" className="texto-campos">Frete</Form.Label>
                                                    <Form.Control type="number" className="form-control no-spinners" name="frete" placeholder="00,00" value={frete || ''} onChange={this.atualizaTotalComFrete} onBlur={this.formatarFrete} />
                                                </Form.Group>
                                            </Col>
                                            <Col className="col" xs={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="desconto" className="texto-campos">Desconto (Total)</Form.Label>
                                                    <Form.Control type="number" className="form-control no-spinners" name="desconto" placeholder="00,00" value={valorDesconto || ''} onChange={this.atualizaDesconto} onBlur={this.formatarDesconto} step="0.01" />
                                                </Form.Group>
                                            </Col>
                                            {/* <Col className="col" xs={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="totaldavenda" className="texto-campos">Total da venda</Form.Label>
                                                    <Form.Control type="text" id="totaldavenda" className="form-control" name="totaldavenda" placeholder="00,00" defaultValue={subTotalGeral ? subTotalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).replace('.', ',') : ''} disabled />
                                                </Form.Group>
                                            </Col> */}
                                            <Col className="col" xs={3}>
                                                <Form.Group controlId="dataprevista" className="mb-3">
                                                    <Form.Label>Data prevista</Form.Label>
                                                    <Form.Control type="text" placeholder="Digite a data prevista" value={dataPrevista || ''} onChange={this.atualizaDataPrevista} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="row align-items-center">
                                            <Col className="col">
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="observacoes" className="texto-campos">Observações</Form.Label>
                                                    <textarea className="form-control" id="observacoes" rows="2" value={observacoes || ''} onChange={this.atualizaObservacoes} ></textarea>
                                                </Form.Group>
                                            </Col>
                                            <Col className="col">
                                                <Form.Group className="mb-3">
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        overlay={
                                                            <Tooltip id="informacaoInternaPdvInfo">
                                                                Informação de uso interno. Não será impressa.
                                                            </Tooltip>
                                                        }>
                                                        <Form.Label htmlFor="observacaointerna" className="texto-campos">
                                                            Observações internas <BsInfoCircle className="icon-info" />
                                                        </Form.Label>
                                                    </OverlayTrigger>
                                                    <textarea className="form-control" id="observacaointerna" rows="2" value={observacaointerna || ''} onChange={this.atualizaObservacaoInterna} ></textarea>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="divisa"></div>
                                    <div className="mb-3">
                                        <h5>Forma de pagamento</h5>
                                    </div>
                                    <Row className="row align-items-center">
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="totaldinheiro" className="texto-campos">Total em dinheiro</Form.Label>
                                                <Form.Control type="text" className="form-control" name="totaldinheiro" placeholder="00,00" value={dinheiroRecebido ? dinheiroRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).replace('.', ',') : ''} onChange={this.atualizaTroco} onBlur={this.formatarTroco} />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col" xs={3}>
                                            <Form.Group className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="trocoPdvInfo">
                                                            O valor do troco é calculado a partir das parcelas à vista e com forma de pagamento do tipo Dinheiro ou Cheque..
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label htmlFor="trocodinheiro" className="texto-campos">
                                                        Troco em dinheiro <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control type="text" id="trocodinheiro" className="form-control" name="trocodinheiro" placeholder="00,00" defaultValue={troco ? troco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).replace('.', ',') : ''} disabled />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="row align-items-center">
                                        {/* <Col className="col mb-3" xs={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Formas de pagamento</Form.Label>
                                                <Form.Select as="select" type="number" placeholder="Digite a condição" value={condicao || ''} onChange={this.handleChange} >
                                                    <option>Selecione a forma</option>
                                                    {this.state.formaspagamento.map((formapagamento) => (
                                                        <option key={formapagamento.formapagamento.id} value={formapagamento.formapagamento.id}>
                                                            {formapagamento.formapagamento.descricao}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col> */}
                                        <Col className="col mb-3" xs={3}>
                                            <Form.Group className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="condicaoPdvInfo">
                                                            Número de parcelas ou prazos. Exemplo 30, 60, 90, 120.
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label>
                                                        Condição <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
                                                    name="trocodinheiro"
                                                    value={prazo || ''}
                                                    onChange={this.handleChangePrazo}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            this.adicionarParcela();
                                                        }
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col className="col mb-3" >
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="gerarparcelas" className="texto-campos" style={{ marginRight: '20px' }}></Form.Label>
                                                <Button
                                                    variant="secondary"
                                                    className="form-control"
                                                    onClick={() => {
                                                        if (subTotalGeral === '0.00') {
                                                            this.modalInserirParcela();
                                                        } else {
                                                            this.adicionarParcela();
                                                        }
                                                    }}
                                                    style={{ width: "200px", marginTop: "33px" }}
                                                >
                                                    <BsClipboardCheck style={{ marginRight: '0.5rem', marginBottom: '4px' }} />
                                                    Gerar parcelas
                                                </Button>
                                            </Form.Group>
                                        </Col>
                                        <div className="table-container-produto">
                                            <Table bordered hover variant="secondary" responsive="xl" className="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Dias</th>
                                                        <th>Data</th>
                                                        <th>Valor</th>
                                                        <th>Forma</th>
                                                        <th>Observação</th>
                                                        <th>Ação</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {parcelas.map((parcela, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <Col>
                                                                    <Form.Control
                                                                        type="number"
                                                                        value={parcela.dias}
                                                                        onChange={(event) => this.handleChangeDias(index, event.target.value)}
                                                                        className="form-control text-center no-spinners"
                                                                    />
                                                                </Col>
                                                            </td>
                                                            <td>
                                                                <Col>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={this.calcularData(parcela.dias) || ''}
                                                                        disabled
                                                                        className=" form-control text-center"
                                                                    />
                                                                </Col>
                                                            </td>
                                                            <td>
                                                                <Col>
                                                                    <Form.Control
                                                                        placeholder="00,00"
                                                                        type="number"
                                                                        value={parcela.valor}
                                                                        onChange={(event) => this.handleValorChangeParcela(index, 'valor', event.target.value)}
                                                                        className="form-control text-center no-spinners" />
                                                                </Col>
                                                            </td>
                                                            <td>
                                                                <Form.Select
                                                                    as="select"
                                                                    value={`${parcela.forma || ''}-${parcela.descricaoForma || ''}`}
                                                                    onChange={(e) => {
                                                                        const [formaId, descricao] = e.target.value.split('-');
                                                                        this.handleFormaChange(index, { target: { value: formaId } });
                                                                        this.handleDescricaoChange(index, descricao);
                                                                    }}
                                                                >
                                                                    <option value="">Selecione pagamento</option>
                                                                    {this.state.formaspagamento.map((formapagamento) => (
                                                                        <option key={formapagamento.formapagamento.id} value={`${formapagamento.formapagamento.id}-${formapagamento.formapagamento.descricao}`}>
                                                                            {formapagamento.formapagamento.descricao}
                                                                        </option>
                                                                    ))}
                                                                </Form.Select>
                                                            </td>
                                                            <td>
                                                                <Col>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={parcela.observacao || ''}
                                                                        onChange={(e) => this.handleObservacaoChange(index, e) || ''}
                                                                        className="form-control text-center"
                                                                    />
                                                                </Col>
                                                            </td>
                                                            <td>
                                                                <Button variant="light" onClick={() => this.handleDeleteParcela(index)}>
                                                                    <IoTrash className="red-icon" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Row>
                                </div>
                            </Col>
                        </Row >
                        <div className="container-fluid">
                            <Row className="fixed-bottom align-items-center">
                                <Col>
                                    <div className="rodape">
                                        <div className="d-flex justify-content-between">
                                            <div className="botao-excluirvenda">
                                                <div>
                                                    <Button variant="dark" onClick={this.modalExcluirPedido}>Excluir pedido</Button>
                                                </div>
                                            </div>
                                            <div className="botao-finalizarvenda">
                                                <Button variant="success" type="submit">Finalizar Venda</Button>
                                            </div>
                                        </div>
                                        <div className="div_total_venda">
                                            <div>
                                                <span className="span-total">Total:</span>
                                                <span className="span-valor">{this.calcularSubTotalGeral().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Form>

                    {/* ---------------------------------------------------------- MODALS ---------------------------------------------------------- */}

                    <Modal show={modalFinalizarVendaSemItem} onHide={this.modalFinalizarVendaSemItem} centered>
                        <Modal.Header closeButton className="bg-warning text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Este pedido não possui itens ou cliente, insira-os para realizar essa operação.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalFinalizarVendaSemItem}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={modalFormaPagamento} onHide={this.modalFormaPagamento} centered>
                        <Modal.Header closeButton className="bg-warning text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Insira a forma de pagamento antes de finalizar a compra.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalFormaPagamento}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={modalExcluirPedido} onHide={this.modalExcluirPedido} centered>
                        <Modal.Header closeButton className="bg-warning text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            <div>Deseja excluir o pedido</div>
                            <div>Essa ação não poderá ser desfeita.</div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-secondary" onClick={this.modalExcluirPedido}>Não</Button>
                            <Button variant="secondary" onClick={this.excluirPedido}>Sim</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={modalPedidoExcluido} onHide={this.modalPedidoExcluido} centered>
                        <Modal.Body style={{ padding: '20px' }}>
                            <span style={{ display: 'block' }}><strong>Excluindo pedido...</strong></span>
                        </Modal.Body>
                    </Modal>

                    <Modal show={modalInserirProduto} onHide={this.modalInserirProduto} centered>
                        <Modal.Header closeButton className="bg-warning text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Nenhum produto selecionado!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botao-finalizarvenda" variant="secondary" onClick={this.modalInserirProduto}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={modalExcluirProduto} onHide={this.modalExcluirProduto} centered>
                        <Modal.Header closeButton className="bg-warning text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Deseja excluir o item? Essa ação não poderá ser desfeita.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botao-finalizarvenda" variant="outline-secondary" onClick={this.modalExcluirProduto}>Não</Button>
                            <Button variant="secondary" onClick={this.excluirProdutoSelecionado}>Sim</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={modalCpfValido} onHide={this.modalCpfValido} centered>
                        <Modal.Header closeButton className="bg-danger text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            CPF | CNPJ inválido. Corrija o campo antes de finalizar a venda.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botao-finalizarvenda" variant="secondary" onClick={this.modalCpfValido}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>

                    <Offcanvas show={canvasFinalizarPedido} onHide={this.canvasFinalizarPedido} size="lg" placement="end" style={{ width: '35%' }}>
                        <Offcanvas.Header closeButton className="bg-secondary text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Offcanvas.Title>Resumo do pedido</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ padding: '20px' }}>
                            <div className="d-flex flex-column  mb-4">
                                <h5 className="mb-3">
                                    <strong>
                                        Resumo do pedido:
                                    </strong>
                                </h5>
                                <div className="d-flex justify-content-between mb-2">
                                    <strong>
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" style={{ marginRight: '10px' }} />
                                        Data: {new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>
                                    <span>CPF/CNPJ: {cnpj}</span>
                                </div>
                                <span>Nome do Cliente: {nome}</span>
                                <span>Endereço: {endereco}, {numero}, {bairro}, {cidade} - {uf}</span>
                            </div>
                            <Table responsive="lg" className="table-responsive">
                                <thead>
                                    <tr>
                                        <th>Nome do produto</th>
                                        <th>Qtde.</th>
                                        <th>Preço un.</th>
                                        <th>Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produtosSelecionados.map((produto, index) => (
                                        <tr key={produto.produto.id}>
                                            <td>{produto.produto.codigo} - {produto.produto.descricao}</td>
                                            <td>{produto.quantidade}</td>
                                            <td>R$ {typeof produto.preco === "number"
                                                ? produto.preco.toFixed(2)
                                                : parseFloat(produto.preco).toFixed(2).replace(".", ",")}</td>
                                            <td>R$ {this.calcularSubTotal(produto.produto, produto.quantidade, produto.preco).toFixed(2).replace(".", ",")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" className="text-end">
                                            <strong>Quantidade total:</strong>
                                        </td>
                                        <td>
                                            <strong>{quantidadeTotal}</strong>
                                        </td>
                                    </tr>
                                    {desconto !== '' && desconto !== 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-end">
                                                <strong>Desconto:</strong>
                                            </td>
                                            <td>
                                                <strong>R$ {desconto}</strong>
                                            </td>
                                        </tr>
                                    )}
                                    {frete !== '' && frete !== 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-end">
                                                <strong>Frete:</strong>
                                            </td>
                                            <td>
                                                <strong>R$ {frete}</strong>
                                            </td>
                                        </tr>
                                    )}
                                    {dinheiroRecebido !== '' && dinheiroRecebido !== 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-end">
                                                <strong>Total dinheiro recebido:</strong>
                                            </td>
                                            <td>
                                                <strong>R$ {dinheiroRecebido}</strong>
                                            </td>
                                        </tr>
                                    )}
                                    {troco !== '' && troco !== 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-end">
                                                <strong>Troco:</strong>
                                            </td>
                                            <td>
                                                <strong>R$ {troco}</strong>
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td colSpan="3" className="text-end">
                                            <strong>Total:</strong>
                                        </td>
                                        <td>
                                            <strong>R$ {this.calcularSubTotalGeral().toFixed(2).replace('.', ',')}</strong>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                            <div className="divisa"></div>
                            <div className="d-flex flex-column  mb-4">
                                <h5 className="mb-3">
                                    <strong>
                                        O que fazer após fechar o pedido?
                                    </strong>
                                </h5>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button variant="outline-secondary" className="gerar-nota">Gerar NFC-e</Button>
                                <Button variant="outline-secondary" className="gerar-nota">Imprimir comprovante não fiscal</Button>
                            </div>
                            <div className="d-flex justify-content-end fixed-bottom mb-4" style={{ height: '40px' }}>
                                <Button variant="outline-secondary" className="mr-2" onClick={this.canvasFinalizarPedido} style={{ marginRight: '10px' }}>Cancelar</Button>
                                <Button variant="secondary" onClick={this.gerarXmlItensParaEnvio} style={{ marginRight: '10px' }}>Fechar pedido</Button>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>

                    <Modal show={modalInserirParcela} onHide={this.modalInserirParcela} centered>
                        <Modal.Header closeButton className="bg-warning text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Não foi possível gerar as parcelas, pois o valor faturado está zerado.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalInserirParcela}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={modalSalvarPedido} onHide={this.modalSalvarPedido} centered>
                        <Modal.Body>
                            <span style={{ display: 'block' }} ><strong>Pedido N.º: {ultimoPedido} </strong></span>
                            <span style={{ display: 'block' }}><strong>Salvo com sucesso!</strong></span>
                        </Modal.Body>
                    </Modal>

                    <Modal show={modalSelecionarLoja} onHide={this.modalSelecionarLoja} backdrop="static" size='lg' centered>
                        <Modal.Header closeButton className="bg-secondary text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Selecione uma loja </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            <div className="text-center" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#6c757d' }}>
                                Bem vindo ao frente de caixa!
                            </div>

                            {this.state.situacaoCaixa === "Aberto" && (
                                <Alert variant="success">
                                    <Alert.Heading>Caixa aberto.</Alert.Heading>
                                    <hr />
                                    O caixa para a loja <strong>{nomeLoja}</strong> já está aberto. Clique em OK para prosseguir.
                                </Alert>
                            )}

                            <Col className="col">

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="selecionaLoja" className="texto-campos">Selecione a loja</Form.Label>
                                    <Form.Select
                                        as="select"
                                        className="form-control"
                                        id="selecionaLoja"
                                        name="selecionaLoja"
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
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="trocoCaixa" className="texto-campos">Troco</Form.Label>
                                    <Form.Control type="text"
                                        className="form-control"
                                        id="trocoCaixa"
                                        name="trocoCaixa"
                                        value={this.state.trocoCaixa || '0,00'}
                                        onChange={this.atualizaTrocoCaixa}
                                        onBlur={this.formatarTrocoCaixa}
                                        disabled={this.state.situacaoCaixa === "Aberto"}
                                    />
                                </Form.Group>
                            </Col>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { this.submitCadastrar(); this.resetCaixa(); }}>Salvar</Button>
                        </Modal.Footer>
                    </Modal>
                </Container >
            );
        }
    }
}

export default FrenteCaixa;