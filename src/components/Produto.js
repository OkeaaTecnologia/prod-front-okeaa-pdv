import React from "react";
import '../css/Produto.css';

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Pagination } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Image } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';

import { FaTrash } from 'react-icons/fa';
import { parse } from 'js2xmlparser';
import { BsPersonAdd } from 'react-icons/bs';
import { BsShieldFillExclamation } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';


class Produto extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            produtos: [],
            categorias: [],
            imagens: [],
            componente: [],
            estrutura: [],
            produtosFornecedores: [],
            produtosFornecedoresGet: [],
            id: 0,
            descricaoCategoria: '',
            idCategoria: '',
            codigo: '',
            descricao: '',
            tipo: '',
            unidade: '',
            preco: '',
            precoCusto: '',
            descricaoCurta: '',
            descricaoComplementar: '',
            dataInclusao: '',
            dataAlteracao: '',
            imageThumbnail: '',
            urlVideo: '',
            nomeFornecedor: '',
            codigoFabricante: '',
            marca: '',
            class_fiscal: '',
            cest: '',
            origem: '',
            idGrupoProduto: '',
            linkExterno: '',
            observacoes: '',
            grupoProduto: '',
            garantia: '',
            descricaoFornecedor: '',
            idFabricante: '',
            pesoLiq: '',
            pesoBruto: '',
            estoqueMinimo: '',
            estoqueMaximo: '',
            gtin: '',
            gtinEmbalagem: '',
            larguraProduto: '',
            alturaProduto: '',
            profundidadeProduto: '',
            unidadeMedida: '',
            itensPorCaixa: '',
            volumes: '',
            localizacao: '',
            crossdocking: '',
            condicao: '',
            freteGratis: '',
            producao: '',
            dataValidade: '',
            spedTipoItem: '',
            codigoItem: '',
            un: '',
            vlr_unit: '',
            peso_bruto: '',
            peso_liq: '',
            largura: '',
            altura: '',
            profundidade: '',
            url: '',
            urlImagens: '',
            tipoEstoqueEstrutura: '',
            lancarEstoque: '',
            nomeComponente: '',
            codigoComponente: '',
            quantidadeComponente: '',
            searchTerm: '',
            situacao: 'Ativo',
            carregando: true,
            modalExcluirProduto: false,
            modalExcluindoProduto: false,
            modalSalvarProduto: false,
            modalErro: false,
            codigoProdutoParaExcluir: null,
            statusCode: '',
            selectedListId: null,
            showRenderTelaLista: false,
            validated: false,
            modalCadastrarLista: false,
            idLista: '',
            precoLista: '',
            produtosSelecionados: [],
            dadosCarregados: false,
            paginaAtual: 1,
            totalPaginas: '',
            showModal: false,
            errorMessage: ''
        };

        // Ambiente Local
        // this.buscarProdutosEndpoint = 'http://localhost:8081/api/v1/produtos'
        // this.carregarProdutosEndpoint = 'http://localhost:8081/api/v1/produto'
        // this.carregarProdutoFornecedorEndpoint = 'http://localhost:8081/api/v1/produtosfornecedores'
        // this.buscarCategoriasEndpoint = 'http://localhost:8081/api/v1/categorias'
        // this.excluirProdutoEndpoint = 'http://localhost:8081/api/v1/produto'
        // this.cadastraProdutoEndpoint = 'http://localhost:8081/api/v1/cadastrarproduto'
        // this.cadastrarListaEndpoint = 'http://localhost:8081/api/v1/adicionarLista'
        // this.cadastraProdutoFornecedorEndpoint = 'http://localhost:8081/api/v1/cadastrarprodutofornecedor'
        // this.atualizarProdutoEndpoint = 'http://localhost:8081/api/v1/atualizarproduto/'
        // this.atualizarProdutoFornecedorEndpoint = 'http://localhost:8081/api/v1/atualizarprodutofornecedor/'

        // Ambiente Desenvolvimento
        this.buscarProdutosEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/produtos'
        this.carregarProdutosEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/produto'
        this.carregarProdutoFornecedorEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/produtosfornecedores'
        this.buscarCategoriasEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/categorias'
        this.excluirProdutoEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/produto'
        this.cadastraProdutoEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/cadastrarproduto'
        this.cadastrarListaEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/adicionarLista'
        this.cadastraProdutoFornecedorEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/cadastrarprodutofornecedor'
        this.atualizarProdutoEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/atualizarproduto/'
        this.atualizarProdutoFornecedorEndpoint = 'http://okeaaerphost.ddns.net:8081/api/v1/atualizarprodutofornecedor/'

        // Ambiente Produção
        //   this.buscarProdutosEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produtos'
        // this.carregarProdutosEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produto'
        // this.carregarProdutoFornecedorEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produtosfornecedores'
        // this.buscarCategoriasEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/categorias'
        // this.excluirProdutoEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produto'
        // this.cadastraProdutoEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/cadastrarproduto'
        // this.cadastrarListaEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/adicionarLista'
        // this.cadastraProdutoFornecedorEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/cadastrarprodutofornecedor'
        // this.atualizarProdutoEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/atualizarproduto/'
        // this.atualizarProdutoFornecedorEndpoint = 'https://prod-api-okeaa-produto.azurewebsites.net/api/v1/atualizarprodutofornecedor/' 
    };

    async componentDidMount() {
        try {
            await this.buscarProdutos();
            this.buscarCategorias();
        } catch (error) {
            this.setState({ erro: `Erro ao conectar a API: ${error.message}` });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.idCategoria !== this.state.idCategoria) {
            this.atualizaCategoria({ target: { value: this.state.idCategoria } });
        };
        if (prevState.preco !== this.state.preco) {
            this.atualizaPreco({ target: { value: this.state.preco } });
        };
        if (prevState.pesoLiq !== this.state.pesoLiq) {
            this.atualizaPesoLiq({ target: { value: this.state.pesoLiq } });
        };
        if (prevState.tipo !== this.state.tipo) {
            this.atualizaTipo({ target: { value: this.state.tipo } });
        };
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    //--------------------------------------- CHAMADAS E CONSUMO DA API DE CONTATOS. ----------------------------------------|  
    //-----------------------------------------------------------------------------------------------------------------------|

    //GET - MÉTODO PARA CONSUMO DE PRODUTOS
    buscarProdutos = (pagina) => {
        return new Promise((resolve, reject) => {
            // Se a página não for fornecida, utilize a página atual do estado
            const paginaRequisicao = pagina !== undefined ? pagina : this.state.paginaAtual;

            fetch(`${this.buscarProdutosEndpoint}/page=${paginaRequisicao}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((resposta) => resposta.json())
                .then((dados) => {
                    // console.log(dados)
                    if (dados.retorno.produtos) {
                        this.setState({
                            produtos: dados.retorno.produtos,
                            paginaAtual: paginaRequisicao,  // Atualiza a página atual no estado
                            carregando: false,
                        });
                    }
                    resolve();
                })
                .catch(error => {
                    // console.error('Erro ao buscar contatos:', error);
                    this.setState({ carregando: true, showModal: true, errorMessage: 'Erro ao buscar produtos. Por favor, tente novamente mais tarde.' });
                    reject('API produtos fora do ar');
                });
        })

    };

    handleSelecionaPagina = (pagina) => {
        this.setState({ carregando: false });
        this.buscarProdutos(pagina);
    };

    //GET - MÉTODO PARA CONSUMO DE UM PRODUTO PELO ID
    carregarProdutos = (codigo) => {
        return new Promise((resolve, reject) => {

            this.setState({ carregando: true, dadosCarregados: false });

            fetch(`${this.carregarProdutosEndpoint}/${codigo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resposta => resposta.json())
                .then(dados => {
                    // console.log("produto: ", dados);
                    if (dados.retorno.produtos) {

                        const produto = dados.retorno.produtos[0].produto;
                        const categoria = produto.categoria;

                        const converterDataFormato = (data) => {
                            const [ano, mes, dia] = data.split('-');
                            return `${dia}/${mes}/${ano}`;
                        };

                        this.setState({
                            id: produto.id || '',
                            codigo: produto.codigo || '',
                            descricao: produto.descricao || '',
                            tipo: produto.tipo || '',
                            situacao: produto.situacao || '',
                            unidade: produto.unidade || '',
                            un: produto.unidade || '',
                            preco: parseFloat(produto.preco).toFixed(2) || '',
                            precoCusto: parseFloat(produto.precoCusto).toFixed(2) || '',
                            preco_custo: produto.precoCusto || '',
                            descricaoCurta: produto.descricaoCurta || '',
                            descricaoComplementar: produto.descricaoComplementar || '',
                            dataInclusao: produto.dataInclusao || '',
                            dataAlteracao: converterDataFormato(produto.dataAlteracao) || '',
                            imageThumbnail: produto.imageThumbnail || '',
                            urlVideo: produto.urlVideo || '',
                            nomeFornecedor: produto.nomeFornecedor || '',
                            codigoFabricante: produto.codigoFabricante || '',
                            marca: produto.marca || '',
                            class_fiscal: produto.class_fiscal || '',
                            cest: produto.cest || '',
                            origem: produto.origem || '',
                            idGrupoProduto: produto.idGrupoProduto || '',
                            linkExterno: produto.linkExterno || '',
                            observacoes: produto.observacoes || '',
                            grupoProduto: produto.grupoProduto || '',
                            garantia: produto.garantia || '',
                            descricaoFornecedor: produto.descricaoFornecedor || '',
                            idFabricante: produto.idFabricante || '',
                            pesoLiq: parseFloat(produto.pesoLiq).toFixed(2) || '',
                            peso_liq: produto.pesoLiq || '',
                            pesoBruto: parseFloat(produto.pesoBruto).toFixed(2) || '',
                            peso_bruto: produto.pesoBruto || '',
                            estoqueMinimo: parseFloat(produto.estoqueMinimo).toFixed(2) || '',
                            estoqueMaximo: parseFloat(produto.estoqueMaximo).toFixed(2) || '',
                            gtin: produto.gtin || '',
                            gtinEmbalagem: produto.gtinEmbalagem || '',
                            larguraProduto: produto.larguraProduto || '',
                            largura: produto.larguraProduto || '',
                            alturaProduto: produto.alturaProduto || '',
                            altura: produto.alturaProduto || '',
                            profundidadeProduto: produto.profundidadeProduto || '',
                            profundidade: produto.profundidadeProduto || '',
                            unidadeMedida: produto.unidadeMedida || '',
                            itensPorCaixa: produto.itensPorCaixa || '',
                            volumes: produto.volumes || '',
                            localizacao: produto.localizacao || '',
                            crossdocking: produto.crossdocking || '',
                            condicao: produto.condicao || '',
                            freteGratis: produto.freteGratis || '',
                            producao: produto.producao || '',
                            dataValidade: converterDataFormato(produto.dataValidade) || '',
                            spedTipoItem: produto.spedTipoItem || '',
                            descricaoCategoria: categoria ? categoria.descricao : '' || '',
                            idCategoria: categoria ? categoria.id : '' || '',
                            idProdutoCarregado: produto.id || '',
                            carregando: false,
                            dadosCarregados: true,
                        });
                    }
                    resolve();
                })
                .catch(error => {
                    // console.error(error);
                    this.setState({ carregando: true, dadosCarregados: false, showModal: true, errorMessage: 'Erro ao buscar contatos. Por favor, tente novamente mais tarde.' });
                    reject('API lista preço fora do ar');
                });
        })
    };

    carregarProdutoFornecedor = (idProduto) => {
        fetch(this.carregarProdutoFornecedorEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resposta) => resposta.json())
            .then((dados) => {
                // console.log("Resposta da API de Produtos Fornecedores: ", dados);

                if (dados.retorno.produtosfornecedores && dados.retorno.produtosfornecedores.length > 0) {
                    const produtoFornecedorEncontrado = dados.retorno.produtosfornecedores.find(
                        (fornecedor) => fornecedor.produtofornecedores.idProduto === idProduto
                    );

                    if (produtoFornecedorEncontrado) {
                        // console.log("Produto Fornecedor Encontrado: ", produtoFornecedorEncontrado);

                        const listaProdutosFornecedores = produtoFornecedorEncontrado.produtofornecedores.fornecedores;

                        this.setState({
                            produtosFornecedores: listaProdutosFornecedores,
                            idProdutoSelecionado: idProduto,
                        });
                    } else {
                        // console.log("Nenhum produto do fornecedor encontrado.");
                        this.setState({ produtosFornecedores: [], idProdutoSelecionado: null });
                    }
                } else {
                    // console.log("Nenhum produto do fornecedor encontrado.");
                    this.setState({ produtosFornecedores: [], idProdutoSelecionado: null });
                }
            })
            .catch(error => console.error(error));
    };

    handleChange = (campo, valor) => {
        // Atualiza o estado conforme o campo editado
        this.setState((prevState) => ({
            produtosFornecedores: prevState.produtosFornecedores.map((produto) => {
                if (produto.idProdutoFornecedor === prevState.idProdutoSelecionado) {
                    return {
                        ...produto,
                        produtoFornecedor: {
                            ...produto.produtoFornecedor,
                            [campo]: valor,
                        },
                    };
                }
                return produto;
            }),
        }));
    };

    // carregarProdutoFornecedor = (idProduto) => {
    //     fetch(`http://localhost:8081/api/v1/produtosfornecedores`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(resposta => resposta.json())
    //         .then(dados => {
    //             console.log("Resposta da API de Produtos Fornecedores: ", dados);

    //             if (dados.retorno.produtosfornecedores && dados.retorno.produtosfornecedores.length > 0) {
    //                 const produtoFornecedorEncontrado = dados.retorno.produtosfornecedores.find(
    //                     fornecedor => fornecedor.produtofornecedores.idProduto === idProduto
    //                 );

    //                 if (produtoFornecedorEncontrado) {
    //                     console.log("Produto Fornecedor Encontrado: ", produtoFornecedorEncontrado);

    //                     const listaProdutosFornecedores = produtoFornecedorEncontrado.produtofornecedores.fornecedores;

    //                     listaProdutosFornecedores.forEach(fornecedor => {
    //                         const produtoFornecedor = fornecedor.produtoFornecedor;

    //                         const idProdutoFornecedor = produtoFornecedor.idProdutoFornecedor || '';
    //                         const idFornecedor = produtoFornecedor.idFornecedor || '';
    //                         const produtoDescricao = produtoFornecedor.produtoDescricao || '';
    //                         const produtoCodigo = produtoFornecedor.produtoCodigo || '';
    //                         const precoCompra = produtoFornecedor.precoCompra || '';
    //                         const precoCusto = produtoFornecedor.precoCusto || '';
    //                         const produtoGarantia = produtoFornecedor.produtoGarantia || '';
    //                         const padrao = produtoFornecedor.padrao || '';

    //                         // Agora, você pode fazer o que quiser com esses valores
    //                         console.log("ID do Produto Fornecedor:", idProdutoFornecedor);
    //                         console.log("ID do Fornecedor:", idFornecedor);
    //                         console.log("Descrição do Produto Fornecedor:", produtoDescricao);
    //                         console.log("Código do Produto:", produtoCodigo);
    //                         console.log("Preço de Compra:", precoCompra);
    //                         console.log("Preço de Custo:", precoCusto);
    //                         console.log("Garantia do Produto:", produtoGarantia);
    //                         console.log("Padrão:", padrao);

    //                         // Continue com o processamento dos dados conforme necessário
    //                     });
    //                 } else {
    //                     console.log("Nenhum produto do fornecedor encontrado.");
    //                     this.setState({ produtosFornecedores: [] });
    //                 }
    //             } else {
    //                 console.log("Nenhum produto do fornecedor encontrado.");
    //                 this.setState({ produtosFornecedores: [] });
    //             }
    //             // Continue com qualquer outra lógica que você precisa após carregar os dados do fornecedor
    //         })
    //         .catch(error => console.error(error));
    // };

    //GET - MÉTODO PARA CONSUMO DE CATEGORIAS
    buscarCategorias = () => {
        this.setState({ carregando: true })
        return new Promise((resolve, reject) => {
            fetch(this.buscarCategoriasEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((resposta) => resposta.json())
                .then((dados) => {
                    // console.log("Categoria: ", dados);
                    const categorias = dados.retorno.categorias || [];
                    this.setState({ categorias, carregando: false });
                    resolve();
                })
                .catch(error => {
                    // console.error('Erro ao buscar contatos:', error);
                    this.setState({ carregando: true, showModal: true, errorMessage: 'Erro ao buscar categorias. Por favor, tente novamente mais tarde.' });
                    reject('API categorias fora do ar');
                });
        })
    };

    //DELETE - MÉTODO PARA DELETAR UM PRODUTO
    excluirProduto(codigo) {
        return new Promise((resolve, reject) => {
            fetch(`${this.excluirProdutoEndpoint}/${codigo}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    const statusCode = response.status; // Obtém o status da resposta

                    // Verifica se a exclusão foi bem-sucedida com base no código de status HTTP
                    if (statusCode === 200 || statusCode === 204) {
                        // Resolve a Promise com o código de status
                        resolve(statusCode);
                    } else {
                        // Rejeita a Promise com uma mensagem de erro caso a exclusão tenha falhado
                        reject(new Error(`Erro ao excluir produto. Código de status: ${statusCode}`));
                    }
                })
                .catch(error => {
                    // Rejeita a Promise com o erro ocorrido durante a requisição
                    reject(error);
                });
        });
    };

    //POST - MÉTODO PARA INSERIR UM NOVO PRODUTO
    cadastraProduto = (xmlProduto) => {
        return new Promise((resolve, reject) => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlProduto, 'text/xml');
            const stringXml = new XMLSerializer().serializeToString(xml);

            fetch(this.cadastraProdutoEndpoint, {
                method: 'POST',
                body: stringXml,
                headers: {
                    'Content-Type': 'application/xml'
                }
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

                    // Resolve a Promise com os dados da resposta, incluindo o status da API externa
                    resolve(responseData);
                })
                .catch(error => {
                    // Em caso de erro, rejeita a Promise com o erro
                    reject(error);
                });
        });
    };

    cadastrarLista = (listaPrecoResponse) => {
        return new Promise((resolve, reject) => {
            fetch(this.cadastrarListaEndpoint, {
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

                    // Resolve a Promise com os dados da resposta, incluindo o status da API externa
                    resolve(responseData);
                })
                .catch(error => {
                    // Em caso de erro, rejeita a Promise com o erro
                    reject(error);
                });
        });
    };

    // cadastraProdutoFornecedor = (xmlProdutoFornecedor) => {
    //     const parser = new DOMParser();
    //     const xml = parser.parseFromString(xmlProdutoFornecedor, 'text/xml');
    //     const stringXml = new XMLSerializer().serializeToString(xml);

    //     return fetch(this.cadastraProdutoFornecedorEndpoint, {
    //         method: 'POST',
    //         body: stringXml,
    //         headers: {
    //             'Content-Type': 'application/xml'
    //         }
    //     })
    //         .then(async response => {
    //             const statusCode = response.status; // Obtém o status da API externa
    //             const data = await response.text(); // Obtém os dados da resposta

    //             // Crie um objeto que inclui o status e os dados da API externa
    //             const responseData = {
    //                 statusCode,
    //                 data,
    //             };

    //             // Registre o status e os dados no console
    //             // console.log('Status da API externa:', statusCode);
    //             // console.log('Dados da resposta:', data);

    //             // Retorna a resposta, incluindo o status da API externa
    //             return responseData;
    //         });
    // };

    //PUT - MÉTODO PARA ATUALIZAR UM PRODUTO EXISTENTE
    atualizarProduto = (xmlProduto) => {
        return new Promise((resolve, reject) => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlProduto, 'text/xml');
            const stringXml = new XMLSerializer().serializeToString(xml);
            const codigo = xml.querySelector('codigo').textContent;

            fetch(this.atualizarProdutoEndpoint + codigo, {
                method: 'POST',
                body: stringXml,
                headers: {
                    'Content-Type': 'application/xml'
                }
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

                    // Resolve a Promise com os dados da resposta, incluindo o status da API externa
                    resolve(responseData);
                })
                .catch(error => {
                    // Em caso de erro, rejeita a Promise com o erro
                    reject(error);
                });
        });
    };

    atualizarProdutoFornecedor = (xmlProdutoFornecedor) => {
        return new Promise((resolve, reject) => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlProdutoFornecedor, 'text/xml');
            const stringXml = new XMLSerializer().serializeToString(xml);
            const idProdutoFornecedor = xml.querySelector('idProdutoFornecedor').textContent;

            fetch(this.atualizarProdutoFornecedorEndpoint + idProdutoFornecedor, {
                method: 'POST',
                body: stringXml,
                headers: {
                    'Content-Type': 'application/xml'
                }
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

                    // Resolve a Promise com os dados da resposta, incluindo o status da API externa
                    resolve(responseData);
                })
                .catch(error => {
                    // Em caso de erro, rejeita a Promise com o erro
                    reject(error);
                });
        });
    };


    //-----------------------------------------------------------------------------------------------------------------------|
    //---------------------- SCRIPT´S DE AÇÕES PARA CADA UM DOS CAMPOS DE CADASTRO E ATUALIZAÇÃO. ---------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    atualizaCodigo = (event) => {
        const codigo = event.target.value
        this.setState({
            codigo: codigo
        });
    };

    atualizaDescricao = (event) => {
        const descricao = event.target.value;
        this.setState({
            descricao: descricao
        });
    };

    atualizaTipo = (event) => {
        const tipo = event.target.value;
        this.setState({
            tipo: tipo
        });
    };

    atualizaSituacao = (event) => {
        const situacao = event.target.value;
        this.setState({
            situacao: situacao
        });
    };

    atualizaUnidade = (event) => {
        const unidade = event.target.value
        this.setState({
            unidade: unidade,
            un: unidade
        });
    };

    atualizaAlturaProduto = (event) => {
        const alturaProduto = event.target.value;
        this.setState({
            alturaProduto: alturaProduto,
            altura: alturaProduto
        });
    };

    atualizaPreco = (event) => {
        const preco = event.target.value;
        const precoFormatado = preco.replace(',', '.');
        this.setState({
            preco: preco,        // Mantém a formatação com vírgula para exibição
            vlr_unit: precoFormatado  // Usa a formatação com ponto para o envio
        });
    };

    atualizaDescricaoCurta = (event) => {
        const descricaoCurta = event.target.value;
        this.setState({
            descricaoCurta: descricaoCurta
        });
    };

    atualizaDescricaoComplementar = (event) => {
        const descricaoComplementar = event.target.value;
        this.setState({
            descricaoComplementar: descricaoComplementar
        });
    };

    atualizaImagem = (event) => {
        const imageThumbnail = event.target.value
        this.setState({
            imageThumbnail: imageThumbnail,
            url: imageThumbnail
        });
    };

    atualizaUrlVideo = (event) => {
        const urlVideo = event.target.value;
        this.setState({
            urlVideo: urlVideo
        });
    };

    atualizaPesoLiq = (event) => {
        const pesoLiq = event.target.value
        const pesoLiqFormatado = pesoLiq.replace(',', '.');
        this.setState({
            pesoLiq: pesoLiqFormatado,
            peso_liq: pesoLiqFormatado
        });
    };

    atualizaPesoBruto = (event) => {
        const pesoBruto = event.target.value
        const pesoBrutoFormatado = pesoBruto.replace(',', '.');
        this.setState({
            pesoBruto: pesoBruto,
            peso_bruto: pesoBrutoFormatado
        });
    };

    atualizaLarguraProduto = (event) => {
        const larguraProduto = event.target.value
        const larguraProdutoFormatado = larguraProduto.replace(',', '.');
        this.setState({
            larguraProduto: larguraProduto,
            largura: larguraProdutoFormatado
        });
    };

    atualizaProfundidadeProduto = (event) => {
        const profundidadeProduto = event.target.value
        const profundidadeProdutoFormatado = profundidadeProduto.replace(',', '.');
        this.setState({
            profundidadeProduto: profundidadeProduto,
            profundidade: profundidadeProdutoFormatado
        });
    };

    atualizaLinkExterno = (event) => {
        const linkExterno = event.target.value;
        this.setState({
            linkExterno: linkExterno
        });
    };

    atualizaObservacoes = (event) => {
        const observacoes = event.target.value;
        this.setState({
            observacoes: observacoes
        });
    };

    atualizaEstoqueMinimo = (event) => {
        const estoqueMinimo = event.target.value;
        this.setState({
            estoqueMinimo: estoqueMinimo
        });
    };

    atualizaEstoqueMaximo = (event) => {
        const estoqueMaximo = event.target.value;
        this.setState({
            estoqueMaximo: estoqueMaximo
        });
    };

    atualizaCondicao = (event) => {
        const condicao = event.target.value;
        this.setState({
            condicao: condicao
        });
    };

    atualizaProducao = (event) => {
        const producao = event.target.value;
        this.setState({
            producao: producao
        });
    };

    atualizaDataValidade = (event) => {
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
        this.setState({ dataValidade: valorInput });
    }

    atualizaFreteGratis = (event) => {
        const freteGratis = event.target.value;
        this.setState({
            freteGratis: freteGratis
        });
    };

    atualizaVolumes = (event) => {
        const value = event.target.value;
        if (value.length <= 2) {
            this.setState({
                volumes: value
            });
        };
    };

    atualizaItensPorCaixa = (event) => {
        const itensPorCaixa = event.target.value;
        this.setState({
            itensPorCaixa: itensPorCaixa
        });
    };

    atualizaUnidadeMedida = (event) => {
        const unidadeMedida = event.target.value;
        this.setState({
            unidadeMedida: unidadeMedida
        });
    };

    atualizaGtin = (event) => {
        const gtin = event.target.value;
        this.setState({
            gtin: gtin
        });
    };

    atualizaGtinEmbalagem = (event) => {
        const gtinEmbalagem = event.target.value;
        this.setState({
            gtinEmbalagem: gtinEmbalagem
        });
    };

    atualizaCrossdocking = (event) => {
        const crossdocking = event.target.value
        this.setState({
            crossdocking: crossdocking
        });
    };

    atualizaLocalizacao = (event) => {
        const localizacao = event.target.value
        this.setState({
            localizacao: localizacao
        });
    };

    atualizaCategoria = (event) => {
        const idCategoria = event.target.value
        // console.log(idCategoria)
        this.setState({
            idCategoria: idCategoria
        });
    };

    atualizaMarca = (event) => {
        const marca = event.target.value;
        this.setState({
            marca: marca
        });
    };

    atualizaCodigoItem = (event) => {
        const codigoItem = event.target.value;
        this.setState({
            codigoItem: codigoItem
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    //---------------- SCRIPT´S DE AÇÃO PARA OS BOTÕES DA TELA PRODUTO E GERAÇÃO DO XML DE ENVIO PARA O BLING. --------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    //Ação para limpar o campos do modal para cadastrar um novo cliente.
    reset = () => {
        this.setState({
            id: 0,
            descricao: '',
            situacao: 'Ativo',
            codigo: '',
            tipo: 'P',
            preco: '',
            vlr_unit: '',
            unidade: '',
            un: '',
            condicao: '',

            // Caracteristica
            marca: '',
            producao: '',
            dataValidade: '',
            freteGratis: '',
            pesoLiq: '',
            peso_liq: '',
            pesoBruto: '',
            peso_bruto: '',
            larguraProduto: '',
            largura: '',
            altura: '',
            alturaProduto: '',
            profundidadeProduto: '',
            profundidade: '',
            volumes: '',
            itensPorCaixa: '',
            unidadeMedida: '',
            gtin: '',
            gtinEmbalagem: '',
            descricaoCurta: '',
            descricaoComplementar: '',
            linkExterno: '',
            urlVideo: '',
            observacoes: '',
            descricaoCategoria: '',

            // Imagem
            imageThumbnail: '',
            url: '',

            // Estoque
            estoqueMinimo: '',
            estoqueMaximo: '',
            crossdocking: '',
            localizacao: '',

            // Fornecedores
            codigoFabricante: '',
            idFabricante: '',
            nomeFornecedor: '',
            descricaoFornecedor: '',
            codigoItem: '',
            precoCusto: '',
            garantia: '',

            // INFORMACOES NAO TELA
            spedTipoItem: '',

            // FISCAL
            class_fiscal: '',
            cest: '',
            origem: '',
            idGrupoProduto: '',
            grupoProduto: '',
        });
    };

    submit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const isValid = form.checkValidity();

        if (!isValid) {
            event.stopPropagation();
            this.setState({ validated: true });
            return;
        };

        const produto = {};
        const campos = [
            'id',
            'descricao',
            'situacao',
            'codigo',
            'tipo',
            'vlr_unit',
            'un',
            'condicao',
            'marca',
            'producao',
            'dataValidade',
            'freteGratis',
            'peso_liq',
            'peso_bruto',
            'largura',
            'altura',
            'profundidade',
            'volumes',
            'itensPorCaixa',
            'unidadeMedida',
            'gtin',
            'gtinEmbalagem',
            'descricaoCurta',
            'descricaoComplementar',
            'linkExterno',
            'urlVideo',
            'url',
            'observacoes',
            'estoqueMinimo',
            'estoqueMaximo',
            'crossdocking',
            'localizacao',
            'codigoFabricante',
            'idFabricante',
            'descricaoFornecedor',
            'codigoItem',
            'precoCusto',
            'garantia',
            'spedTipoItem',
            'class_fiscal',
            'cest',
            'origem',
            'idGrupoProduto',
            'grupoProduto',
            'idCategoria'
        ];

        campos.forEach(campo => {
            if (this.state[campo] !== null && this.state[campo] !== '' && this.state[campo] !== undefined) {
                produto[campo] = this.state[campo];
            };
        });

        if (this.state.url !== '') {
            produto.imagens = {
                url: this.state.url
            };
        };

        const xmlProduto = parse('produto', produto);
        // console.log(xmlProduto);
        if (this.state.id === 0) {
            this.cadastraProduto(xmlProduto)
                .then(responseData => {
                    if (responseData.data !== '') { // Verifique se a resposta não está vazia
                        this.buscarProdutos();
                        this.modalSalvarProduto();
                        setTimeout(() => {
                            this.novaRenderizacao();
                            this.reset();
                        }, 1000);
                    } else {
                        this.modalErro();
                    }
                })
                .catch(error => {
                    console.error('Erro na chamada da API:', error);
                    this.modalErro();
                });
        } else {
            this.atualizarProduto(xmlProduto)
                .then(responseData => {
                    if (responseData.data !== '') { // Verifique se a resposta não está vazia
                        this.buscarProdutos();
                        this.modalSalvarProduto();
                        setTimeout(() => {
                            this.novaRenderizacao();
                            this.reset();
                        }, 1000);
                    } else {
                        this.modalErro();
                    }
                })
                .catch(error => {
                    console.error('Erro na chamada da API:', error);
                    this.modalErro();
                });
        }

        this.setState({ validated: false });
    };

    delete = () => {
        this.modalExcluirProduto()
        this.excluirProduto(this.state.codigoProdutoParaExcluir)
            .then(statusCode => {
                if (statusCode === 200) {
                    this.modalExcluindoProduto()
                    this.buscarProdutos();
                } else {
                    this.modalErro();
                }
            })
            .catch(error => {
                console.error('Erro na chamada da API:', error);
                this.modalErro();
            });
    }

    //-----------------------------------------------------------------------------------------------------------------------|
    //-------------------------- SCRIPT´S DE AÇÕES PARA ADICIONAR PRODUTO A LISTA DE DESCONTO . -----------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    submitListaDesconto = async () => {
        // Chama a função calcularPreco para atualizar o preçoLista no estado
        await this.calcularPreco();

        const idLista = this.state.idLista;

        // Obtém o valor de precoLista atualizado após chamar calcularPreco
        const precoLista = this.state.precoLista;

        const produtoLista = [{
            id: this.state.id,
            codigo: this.state.codigo,
            descricao: this.state.ddescricao,
            preco: this.state.preco,
            gtin: this.state.gtin,
            precoLista: precoLista
        }];

        const lista = {
            idLista: idLista,
            nomeLista: this.state.nomeLista,
            fatorAplicado: this.state.fatorAplicado,
            baseado: this.state.baseado,
            regraLista: this.state.regraLista,
            dataValidade: '-',
            horarioVigencia: '-',
            produtoLista: produtoLista
        };

        const listaPrecoResponse = JSON.stringify(lista);

        // console.log(listaPrecoResponse);

        if (idLista === '') {
            // 1. Cadastrar a lista de preços
            this.cadastrarLista(listaPrecoResponse);
            this.modalCadastrarLista();
            this.resetModalLista();
        } else {
            this.modalErro();
        }
    };

    calcularPreco = async () => {
        return new Promise(resolve => {
            const { regraLista, baseado, fatorAplicado } = this.state;
            const preco = parseFloat(this.state.preco).toFixed(2);

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
            }

            // Atualiza o precoLista no estado
            this.setState({
                precoLista: parseFloat(novoPrecoLista).toFixed(2)
            }, resolve);
        });
    };

    resetModalLista = () => {
        this.setState({
            idLista: '',
            nomeLista: '',
            regraLista: '',
            baseado: '',
            fatorAplicado: '',
            tipoLista: '',
        });
    };

    atualizanomeLista = (event) => {
        const nomeLista = event.target.value;
        this.setState({
            nomeLista: nomeLista
        });
    };

    atualizafatorAplicado = (event) => {
        const fatorAplicado = event.target.value;
        this.setState({
            fatorAplicado: fatorAplicado
        });
    };

    atualizaBaseado = (event) => {
        const baseado = event.target.value;
        this.setState({
            baseado: baseado
        });
    };

    atualizaRegraLista = (event) => {
        const regraLista = event.target.value;
        this.setState({
            regraLista: regraLista
        });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    //--------------------------------------------- SCRIPT´S DE AÇÃO DOS MODALS. --------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    modalCadastrarLista = () => {
        this.setState({
            modalCadastrarLista: !this.state.modalCadastrarLista
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

    modalSalvarProduto = () => {
        this.setState({
            modalSalvarProduto: !this.state.modalSalvarProduto
        }, () => {
            setTimeout(() => {
                this.setState({
                    modalSalvarProduto: false
                })
            }, 1000);
        });
    };

    modalExcluindoProduto = () => {
        this.setState({
            modalExcluindoProduto: !this.state.modalExcluindoProduto,
        }, () => {
            setTimeout(() => {
                this.setState({
                    modalExcluindoProduto: false
                })
            }, 1000);
        });
    };

    closeModalErro = () => {
        this.setState({ showModal: false, errorMessage: '' });
    }

    handleSituacaoChange = () => {
        this.setState((prevState) => ({
            situacao: prevState.situacao === 'Ativo' ? 'Inativo' : 'Ativo'
        }));
    };

    campoBusca = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    novaRenderizacao = (produto) => {
        this.setState({
            selectedListId: produto,
            showRenderTelaLista: false
        });
    };

    abrirTelaRenderTelaLista = (produto) => {
        this.setState({
            selectedListId: produto
        });
    };

    abrirRenderTelaLista = () => {
        this.setState({
            showRenderTelaLista: true
        });
    };

    render() {

        const { selectedListId, showRenderTelaLista, carregando, searchTerm, produtos, modalSalvarProduto, modalExcluirProduto, codigoProdutoParaExcluir, modalExcluindoProduto, paginaAtual, totalPaginas } = this.state
        const { showModal, errorMessage } = this.state;

        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        if (showRenderTelaLista) {
            return this.renderTelaLista();
        }

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
                        <div className="text-loading text-white">Carregando produtos...</div>
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
                <div className="grid-produto-table">
                    <Container fluid>
                        <Col className="col">
                            <div className="d-flex align-items-center mt-3 mb-3">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Cadastrar um novo produto:</span>
                                <span style={{ marginRight: '0.8rem' }}>&nbsp;</span>
                                <button onClick={() => {
                                    this.setState({ dadosCarregados: true });
                                    this.abrirRenderTelaLista();
                                    this.reset();
                                }}
                                    className="d-flex align-items-center botao-cadastro-produto">
                                    <BsPersonAdd style={{ marginRight: '0.6rem', fontSize: '1.3rem' }} />
                                    Incluir Cadastro
                                </button>
                                <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white', fontSize: '1.9rem', fontStyle: 'italic' }}>PRODUTOS</span>
                            </div>
                        </Col>

                        <Col className="col">
                            <div className="d-flex align-items-center justify-content-start mt-3 mb-3 flex-row">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Buscar produto:</span>
                                <input type="text" placeholder="Digite o termo de busca..." value={searchTerm} onChange={this.campoBusca} className="form-control ml-2" />
                            </div>
                        </Col>
                    </Container >
                    <div className="table-container-produto">
                        <Container fluid className="pb-5">
                            <Table bordered hover variant="warning" responsive="xl">
                                <thead>
                                    <tr>
                                        <th title="Identificador">ID</th>
                                        <th title="Descrição">Descrição</th>
                                        <th title="Código">Código</th>
                                        <th title="Unidade">Unidade</th>
                                        <th title="Preço">Preço</th>
                                        {/* <th title="Estoque">Estoque</th> */}
                                        <th title="Opções">Opções</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produtos.map((produtos) => {
                                        const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase());
                                        const normalizedDescription = removeAccents(produtos.produto.descricao.toLowerCase());
                                        const normalizedCodigo = produtos.produto.codigo.toLowerCase();

                                        if (
                                            normalizedDescription.includes(normalizedSearchTerm) ||
                                            normalizedCodigo.includes(normalizedSearchTerm)
                                        ) {
                                            return (
                                                <tr
                                                    key={produtos.produto.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        this.carregarProdutos(produtos.produto.codigo);
                                                        this.carregarProdutoFornecedor(produtos.produto.id);
                                                        this.novaRenderizacao(produtos.produto.codigo)
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.cursor = 'pointer')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.cursor = 'default')}
                                                >
                                                    <td>{produtos.produto.id}</td>
                                                    <td>{produtos.produto.descricao}</td>
                                                    <td>{produtos.produto.codigo}</td>
                                                    <td>{produtos.produto.unidade}</td>
                                                    <td>{parseFloat(produtos.produto.preco).toFixed(2).replace('.', ',')}</td>
                                                    {/* <td>{produtos.produto.estoqueMaximo}</td> */}
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
                                                                        codigoProdutoParaExcluir: produtos.produto.codigo,
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
                                        } else {
                                            return null;
                                        }
                                    })}
                                    {produtos.length === 0 && <tr><td colSpan="6">Nenhum produto cadastrado.</td>
                                        <td>
                                            <div className="button-container-table">
                                                <Button variant="warning" title="Editar produto" onClick={() => this.carregarProdutos(produtos.produto.codigo)} disabled>
                                                    <BsPencilSquare />
                                                </Button>
                                                <Button variant="danger" title="Excluir produto" onClick={() => this.modalExcluirProduto} disabled>
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </td></tr>}
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                        <div>
                            <Pagination className="pagination-produto" >
                                <Pagination.Prev
                                    className="pagination-prev"
                                    onClick={() => {
                                        this.handleSelecionaPagina(paginaAtual - 1);
                                    }}
                                    disabled={paginaAtual === 1}
                                />
                                {[...Array(totalPaginas)].map((_, index) => (
                                    <Pagination.Item
                                        className="pagination-item"
                                        key={index + 1}
                                        onClick={() => {
                                            this.handleSelecionaPagina(index + 1);
                                        }}
                                    >
                                        {"voltar | avançar"}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    className="pagination-next"
                                    onClick={() => {
                                        this.handleSelecionaPagina(paginaAtual + 1);
                                    }}
                                    disabled={paginaAtual === totalPaginas}
                                />
                            </Pagination>
                        </div>
                    </div>

                    <Modal show={modalSalvarProduto} onHide={this.modalSalvarProduto} centered>
                        <Modal.Body>
                            <span style={{ display: 'block' }}><strong>Salvando produto...</strong></span>
                        </Modal.Body>
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
                                this.delete(codigoProdutoParaExcluir);
                            }}>
                                Sim
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={modalExcluindoProduto} onHide={this.modalExcluindoProduto} centered>
                        <Modal.Body>
                            <span style={{ display: 'block' }}><strong>Excluindo produto...</strong></span>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    }

    renderTelaLista = () => {

        const { validated, modalErro, dadosCarregados, regraLista, nomeLista, fatorAplicado, modalSalvarProduto } = this.state;
        const { id, descricao, imageThumbnail, codigo, tipo, situacao, preco, unidade, condicao, marca, producao, dataValidade, freteGratis, pesoLiq, pesoBruto, larguraProduto, alturaProduto, profundidadeProduto,
            volumes, itensPorCaixa, unidadeMedida, gtin, gtinEmbalagem, descricaoCurta, descricaoComplementar, linkExterno, urlVideo, observacoes, idCategoria, categorias, estoqueMinimo, estoqueMaximo,
            crossdocking, localizacao, dataAlteracao, baseado } = this.state;
        const { showModal, errorMessage } = this.state;


        if (!dadosCarregados) {
            return (
                <div className="spinner-container">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="custom-loader"></div>
                    </div>
                    <div >
                        <div className="text-loading text-white">Carregando produto...</div>
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
                    <Form noValidate validated={validated} onSubmit={this.submit}>
                        <div className="grid-cadastro-produto">
                            <Row>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="mb-3" style={{ fontWeight: 'bold', color: 'gray', fontSize: '1.6rem', fontStyle: 'italic' }}>{descricao}</span>
                                    <Form.Group controlId="buttonSalvar" className="mb-3">
                                        <div className="button-container d-flex">
                                            <button
                                                type="submit"
                                                className="botao-salvar-produto"
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                type="button"
                                                className="botao-cancelar-produtoe"
                                                onClick={() => {
                                                    this.novaRenderizacao();
                                                    this.reset();
                                                }}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </Form.Group>
                                </div>
                            </Row>
                            <div className="mb-4">
                                {Boolean(id) && (
                                    <h5 style={{ fontSize: '15px' }}>Data alteração: {dataAlteracao}</h5>
                                )}
                            </div>
                            <Row>
                                <Col xs={12} md={2}>
                                    <Form.Group controlId="id" className="mb-3 form-row" as={Col}>
                                        <Form.Label type="text">ID</Form.Label>
                                        <Form.Control type="text" value={id || ''} readOnly disabled />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={10}>
                                    <Form.Group controlId="nome" className="mb-3">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" placeholder="Digite o nome" value={descricao || ''} onChange={this.atualizaDescricao} required />
                                        <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                {/* Primeira Coluna */}
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Col>
                                                {imageThumbnail ? (
                                                    <Image src={imageThumbnail} className="imagem-preview" style={{ width: '170px', height: '180px' }} rounded />
                                                ) : (
                                                    <Image src="https://www.bling.com.br/images/imagePdv.svg" className="imagem-preview" style={{ width: '171px', height: '180px' }} rounded />
                                                )}
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={9}>
                                    <Row>
                                        {/* Código e Tipo */}
                                        <Col xs={12} md={4}>
                                            <Form.Group controlId="codigo" className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="codigoProdutoInfo">
                                                            Referência ou código SKU do produto
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label>
                                                        Código (SKU) <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control type="text" placeholder="Digite o código" value={codigo || ''} onChange={this.atualizaCodigo} />
                                                <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Group controlId="Formato" className="mb-3">
                                                <Form.Label>Formato</Form.Label>
                                                <Form.Select as="select" placeholder="Tipo de formato" value={''} onChange={this.atualizaDescricao} disabled >
                                                    <option value="">Simples</option>
                                                    <option value="">Com variação</option>
                                                    <option value="">Com composição</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Group controlId="Formato" className="mb-3">
                                                <Form.Label>Tipo</Form.Label>
                                                <Form.Select as="select" placeholder="Selecione o tipo" value={tipo || ''} onChange={this.atualizaTipo} >
                                                    <option value="P">Produto</option>
                                                    <option value="S">Serviço</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            <Form.Group controlId="Situacao" className="mb-3">
                                                <Form.Label>Situação</Form.Label>
                                                <div className="flipswitch">
                                                    <input
                                                        type="checkbox"
                                                        name="flipswitch"
                                                        className="flipswitch-cb"
                                                        id="fs"
                                                        checked={situacao === 'Ativo'}
                                                        onChange={this.handleSituacaoChange}
                                                    />
                                                    <label className="flipswitch-label" htmlFor="fs">
                                                        <div className="flipswitch-inner"></div>
                                                        <div className="flipswitch-switch"></div>
                                                    </label>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            <Form.Group controlId="preco" className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="precoVendaIndo">
                                                            Produto simples ou que possua variações de características (Ex: "Cor" ou "Tamanho")
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label>
                                                        Preço venda <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control type="text" placeholder="Digite o preço de venda" value={preco || ''} onChange={this.atualizaPreco} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Group controlId="unidade" className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="unidadeProdutoInfo">
                                                            Exemplo: Un, Pç, Kg
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label>
                                                        Unidade <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control type="text" placeholder="Digite a unidade (pc, un, cx)" value={unidade || ''} onChange={this.atualizaUnidade} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Group controlId="Formato" className="mb-5">
                                                <Form.Label>Condição</Form.Label>
                                                <Form.Select as="select" value={condicao || ''} onChange={this.atualizaCondicao} >
                                                    <option value="NÃO ESPECIFICADO">Não Especificado</option>
                                                    <option value="NOVO">Novo</option>
                                                    <option value="USADO">Usado</option>
                                                    <option value="RECONDICIONADO">Recondicionado</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Tabs defaultActiveKey="caracteristica" id="fill-tab-example" className="mb-3" fill>
                                <Tab eventKey="caracteristica" title="Caracteristica">
                                    {tipo === 'P' && (
                                        <div>
                                            <Row>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="marca" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="marcaProdutoInfo">
                                                                    Especifique a marca do produto. Pode ser própria.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Marca <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control type="text" placeholder="Digite o nome" value={marca || ''} onChange={this.atualizaMarca} />
                                                        <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="produção" className="mb-3">
                                                        <Form.Label>Produção</Form.Label>
                                                        <Form.Select as="select" placeholder="Tipo de contato" value={producao || ''} onChange={this.atualizaProducao} >
                                                            <option value="P">Própria</option>
                                                            <option value="T">Terceiros</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="datavalidade" className="mb-3">
                                                        <Form.Label>Data de validade</Form.Label>
                                                        <Form.Control type="text" placeholder="Digite a data de validade" value={dataValidade || ''} onChange={this.atualizaDataValidade} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="frete" className="mb-3">
                                                        <Form.Label>Frete Grátis</Form.Label>
                                                        <Form.Select as="select" placeholder="Selecione o frete" value={freteGratis || ''} onChange={this.atualizaFreteGratis} >
                                                            <option value="N">Não</option>
                                                            <option value="S">Sim</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="pesoliquido" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="pesoLiqProdutoInfo">
                                                                    Em Kg.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Peso Líquido <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control type="text" placeholder="Digite o peso liquido" value={pesoLiq || ''} onChange={this.atualizaPesoLiq} />
                                                        <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="pesobruto" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="pesoBrutoProdutoInfo">
                                                                    Em Kg.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Peso Bruto <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control type="text" placeholder="Digite o peso bruto" value={pesoBruto || ''} onChange={this.atualizaPesoBruto} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="largura" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="pesoBrutoProdutoInfo">
                                                                    Medida lateral de um objeto perpendicular a sua longitude. Ex.: 80 cm.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Largura <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control type="text" placeholder="Digite a largura" value={larguraProduto || ''} onChange={this.atualizaLarguraProduto} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="altura" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="alturaProdutoInfo">
                                                                    Dimensão vertical do produto na sua posição normal. Ex.: 65 cm.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Altura <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control type="text" placeholder="Digite a altura" value={alturaProduto || ''} onChange={this.atualizaAlturaProduto} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="profundidade" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="profundidadeProdutoInfo">
                                                                    Medida da longitude desde a parte da frente até a parte de trás do produto.                                                                        </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Profundidade <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control type="text" placeholder="Digite a profundidade" value={profundidadeProduto || ''} onChange={this.atualizaProfundidadeProduto} />
                                                        <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="pesobruto" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="volumesProdutoInfo">
                                                                    Quantidade total de volumes que o produto precisa ser dividido para entrega.                                                                      </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Volumes <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control type="text" placeholder="Digite o volume" value={volumes || ''} onChange={this.atualizaVolumes} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="itenscaixa" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="quantidadeItensProdutoInfo">
                                                                    Quantidade de itens por caixa/embalagem.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Itens p/ caixa <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control type="text" placeholder="Digite o volume" value={itensPorCaixa || ''} onChange={this.atualizaItensPorCaixa} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="unidade" className="mb-3">
                                                        <Form.Label>Unidade de medida</Form.Label>
                                                        <Form.Select as="select" placeholder="Selecione o frete" value={unidadeMedida || ''} onChange={this.atualizaUnidadeMedida} >
                                                            <option value="Metros">Metros</option>
                                                            <option value="Centímetro">Centimetro</option>
                                                            <option value="Milímetro">Milímetro</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="gtin" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="gtinEanProdutoInfo">
                                                                    Código GTIN (GTIN-8, GTIN-12, GTIN-13 ou GTIN-14) do produto que está sendo comercializado.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                GTIN/EAN <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control type="text" placeholder="GTIN/EAN" value={gtin || ''} onChange={this.atualizaGtin} />
                                                        <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="gtintributario" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="gtinEanTribProdutoInfo">
                                                                    Código GTIN (GTIN-8, GTIN-12 ou GTIN-13) da menor unidade comercializada no varejo.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                GTIN/EAN tributário <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control type="text" placeholder="GTIN/EAN tributário" value={gtinEmbalagem || ''} onChange={this.atualizaGtinEmbalagem} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                    <Row>
                                        <Col xs={2} md={12}>
                                            <div className="mb-4">
                                                <h5>Lista de preço</h5>
                                            </div>
                                        </Col>
                                        <Col xs={2} md={12}>
                                            <Form.Group className="mb-4">
                                                <div className="label-with-button">
                                                    <Button variant="dark" title="Editar produto" onClick={(e) => {
                                                        e.stopPropagation();
                                                        this.modalCadastrarLista()
                                                    }}>Incluir uma lista de Preço
                                                    </Button>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="descricaocurta" className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="descricaoCurtaProdutoInfo">
                                                            Descrição do produto, utilizado na exportação do produto para lojas virtuais.
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label>
                                                        Descrição Curta (Descrição Principal) <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control as="textarea" rows={3} placeholder="Digite a descrição curta" value={descricaoCurta || ''} onChange={this.atualizaDescricaoCurta} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="descricaocurta" className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="descricaoCompleProdutoInfo">
                                                            Campo exibido em propostas comerciais, pedidos de venda e pedidos de compra.
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label>
                                                        Descrição Complementar <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control as="textarea" rows={3} placeholder="Digite a descrição complementar" value={descricaoComplementar || ''} onChange={this.atualizaDescricaoComplementar} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="linkexterno" className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="linkExternoProdutoInfo">
                                                            Link do produto na loja virtual, marketplace, catálogo ....
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label>
                                                        Link Externo <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control type="text" placeholder="Digite o link externo" value={linkExterno || ''} onChange={this.atualizaLinkExterno} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="video" className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="videoProdutoInfo">
                                                            Vídeo do produto, utilizado na exportação do produto para lojas virtuais.
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label>
                                                        Video <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control type="text" placeholder="Digite o link do video" value={urlVideo || ''} onChange={this.atualizaUrlVideo} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="observacoes" className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="observacoesProdutoInfo">
                                                            Observações gerais sobre o produto.
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label>
                                                        Observações <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control tas="textarea" rows={3} placeholder="Digite as observações" value={observacoes || ''} onChange={this.atualizaObservacoes} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="categoria" className="mb-3">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="categoriaProdutoInfo">
                                                            Categoria referente aos campos customizados, sem vínculo com as integrações multiloja.
                                                        </Tooltip>
                                                    }>
                                                    <Form.Label>
                                                        Categoria <BsInfoCircle className="icon-info" />
                                                    </Form.Label>
                                                </OverlayTrigger>
                                                <Form.Control as="select" placeholder="Digite as observações" value={idCategoria || ''} onChange={this.atualizaCategoria} >
                                                    <option value="">Sem categoria</option>
                                                    {categorias.map((categoria) => (
                                                        <option key={categoria.categoria.id} value={categoria.categoria.id}>
                                                            {categoria.categoria.descricao}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="imagens" title="Imagens">
                                    <Row>
                                        <Col xs={2} md={12}>
                                            <Form.Group controlId="observacoes" className="mb-3">
                                                <Form.Label>Imagens</Form.Label>
                                                <Form.Control tas="textarea" rows={3} placeholder="Digite as observações" value={imageThumbnail} onChange={this.atualizaImagem} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="estoque" title="Estoque">
                                    {tipo === 'P' && (
                                        <div>
                                            <Row>
                                                <Col xs={1} md={3}>
                                                    <Form.Group controlId="minimo" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="minimoProdutoInfo">
                                                                    Qtd mínima do produto no estoque.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Minimo <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control tas="text" placeholder="Digite o minimo" value={estoqueMinimo || ''} onChange={this.atualizaEstoqueMinimo} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="maximo" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="maximoProdutoInfo">
                                                                    Qtd máxima do produto no estoque.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Máximo <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control tas="text" placeholder="Digite o maximo" value={estoqueMaximo || ''} onChange={this.atualizaEstoqueMaximo} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="crossdocking" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="crossdockingProdutoInfo">
                                                                    Quantidade de dias para o processo de distribuição em que a mercadoria recebida é redirecionada ao consumidor final sem uma armazenagem prévia.                                                                        </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Crossdocking <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control tas="text" placeholder="Digite o crossdocking" value={crossdocking || ''} onChange={this.atualizaCrossdocking} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={3}>
                                                    <Form.Group controlId="localizacao" className="mb-3">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip id="localizacaoProdutoInfo">
                                                                    Localização do produto no estoque. Ex: Corredor 4, seção 2A.
                                                                </Tooltip>
                                                            }>
                                                            <Form.Label>
                                                                Localização <BsInfoCircle className="icon-info" />
                                                            </Form.Label>
                                                        </OverlayTrigger>
                                                        <Form.Control tas="text" placeholder="Digite a localização" value={localizacao || ''} onChange={this.atualizaLocalizacao} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                </Tab>
                                {/* <Tab eventKey="fornecedores" title="Fornecedores">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>ID do Fornecedor</th>
                                                <th>Descrição do Produto</th>
                                                <th>Código do Produto</th>
                                                <th>Preço de Compra</th>
                                                <th>Preço de Custo</th>
                                                <th>Garantia do Produto</th>
                                                <th>Padrão</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {produtosFornecedores.map((produto) => (
                                                <tr key={produto.produtoFornecedor.idProdutoFornecedor}>
                                                    <td>
                                                        <Form.Control
                                                            value={produto.produtoFornecedor.idFornecedor}
                                                            onChange={(e) => this.handleChange('idFornecedor', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            value={produto.produtoFornecedor.produtoDescricao}
                                                            onChange={(e) => this.handleChange('produtoDescricao', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            value={produto.produtoFornecedor.produtoCodigo}
                                                            onChange={(e) => this.handleChange('produtoCodigo', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            value={produto.produtoFornecedor.precoCompra}
                                                            onChange={(e) => this.handleChange('precoCompra', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            value={produto.produtoFornecedor.precoCusto}
                                                            onChange={(e) => this.handleChange('precoCusto', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            value={produto.produtoFornecedor.produtoGarantia}
                                                            onChange={(e) => this.handleChange('produtoGarantia', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            value={produto.produtoFornecedor.padrao}
                                                            onChange={(e) => this.handleChange('padrao', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => this.salvarAlteracoes()}>Salvar</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Tab> */}
                            </Tabs>
                            {/* <Row className="text-center">
                            <Col>
                                <Form.Group controlId="buttonSalvar" className="mb-3">
                                    <div className="button-container d-flex justify-content-center">
                                        <button type="submit" className="botao-cadastro-produto">
                                            Salvar
                                        </button>
                                        <button type="button" onClick={this.fecharModal} className="botao-cancelar-produto">
                                            Cancelar
                                        </button>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row> */}

                            <Modal show={modalErro} onHide={this.modalErro} centered>
                                <Modal.Header closeButton className="bg-danger text-white">
                                    <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                                    <Modal.Title>Atenção </Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ padding: '20px' }}>
                                    Não foi possível salvar o produto na plataforma Bling. Estamos agora salvando o produto no banco de dados para posteriormente realizar o cadastro automaticamente no Bling.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type="button" className="botao-finalizarvenda" variant="outline-secondary" onClick={() => {
                                        this.modalErro();
                                        this.novaRenderizacao()
                                    }}>
                                        Sair
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={modalSalvarProduto} onHide={this.modalSalvarProduto} centered>
                                <Modal.Body>
                                    <span style={{ display: 'block' }}><strong>Salvando produto...</strong></span>
                                </Modal.Body>
                            </Modal>

                            <Modal show={this.state.modalCadastrarLista} onHide={this.modalCadastrarLista} size="xl" fullscreen="xxl-down" backdrop="static" dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" >
                                <Modal.Header closeButton className="modal-produto-header">
                                    <Modal.Title>Lista de preços</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="modal-produto-body">
                                    {/* <div className="d-flex flex-column  mb-4">
                                <h5 className="mb-3">
                                    <strong>
                                        Qual categoria se aplicaria a lista?
                                    </strong>
                                </h5>
                            </div> */}
                                    <Form>
                                        <Row>
                                            <Col xs={2} md={8}>
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
                                            <Col xs={2} md={12}>
                                                <Form.Group controlId="nome" className="mb-3">
                                                    <Form.Label>A lista de preços será de desconto ou acréscimo?</Form.Label>
                                                    <div>
                                                        <Form.Check
                                                            style={{ display: 'inline-block', marginRight: '10px' }}
                                                            type="radio"
                                                            id="acrescimo"
                                                            label="Acrescimo"
                                                            name="regraLista"
                                                            value="Acrescimo"
                                                            checked={regraLista === 'Acrescimo'}
                                                            onChange={this.atualizaRegraLista}
                                                        />
                                                        <Form.Check
                                                            style={{ display: 'inline-block' }}
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
                                                    <button type="submit" className="botao-cadastro-produto" onClick={this.submitListaDesconto}>
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
                        </div >
                    </Form >
                </Container >
            );
        }
    }
}

export default Produto;