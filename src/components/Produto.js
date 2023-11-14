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
            modalAberta: false,
            modalExcluirProduto: false,
            modalExcluindoProduto: false,
            modalSalvarProduto: false,
            modalErro: false,
            modalListaProduto: false,
            codigoProdutoParaExcluir: null,
            statusCode: '',
        };
    };

    componentDidMount() {
        this.buscarProdutos();
        this.buscarCategorias();
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
    buscarProdutos = () => {
        fetch("https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produtos", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resposta) => resposta.json())
            .then((dados) => {
                if (dados.retorno.produtos) {
                    this.setState({
                        produtos: dados.retorno.produtos
                    });
                } else {
                    this.setState({ produtos: [] }); // Corrigido para incluir carregando: false
                }

                this.setState({ carregando: false })
            });
    };

    //GET - MÉTODO PARA CONSUMO DE UM PRODUTO PELO ID
    carregarProdutos = (codigo) => {
        fetch(`https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produto/${codigo}`, {
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
                        dataAlteracao: produto.dataAlteracao || '',
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
                        dataValidade: produto.dataValidade || '',
                        spedTipoItem: produto.spedTipoItem || '',
                        descricaoCategoria: categoria ? categoria.descricao : '' || '',
                        idCategoria: categoria ? categoria.id : '' || '',
                        idProdutoCarregado: produto.id || '',

                    });

                } else {
                    this.setState({ produtos: [] });
                }
                this.setState({ carregando: false });
                this.abrirModal();
            })
            .catch(error => console.error(error));
    };

    carregarProdutoFornecedor = (idProduto) => {
        fetch(`http://localhost:8081/api/v1/produtosfornecedores`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resposta) => resposta.json())
            .then((dados) => {
                console.log("Resposta da API de Produtos Fornecedores: ", dados);

                if (dados.retorno.produtosfornecedores && dados.retorno.produtosfornecedores.length > 0) {
                    const produtoFornecedorEncontrado = dados.retorno.produtosfornecedores.find(
                        (fornecedor) => fornecedor.produtofornecedores.idProduto === idProduto
                    );

                    if (produtoFornecedorEncontrado) {
                        console.log("Produto Fornecedor Encontrado: ", produtoFornecedorEncontrado);

                        const listaProdutosFornecedores = produtoFornecedorEncontrado.produtofornecedores.fornecedores;

                        this.setState({
                            produtosFornecedores: listaProdutosFornecedores,
                            idProdutoSelecionado: idProduto,
                        });
                    } else {
                        console.log("Nenhum produto do fornecedor encontrado.");
                        this.setState({ produtosFornecedores: [], idProdutoSelecionado: null });
                    }
                } else {
                    console.log("Nenhum produto do fornecedor encontrado.");
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
        fetch("https://prod-api-okeaa-produto.azurewebsites.net/api/v1/categorias", {
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
            })
            .catch((erro) => {
                console.error(erro);
                this.setState({ carregando: false });
            });
    };

    //DELETE - MÉTODO PARA DELETAR UM PRODUTO
    excluirProduto(codigo) {
        const statusCode = fetch(`https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produto/${codigo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.status; // Retorna o código de status HTTP
            });
        console.log(statusCode)
        return statusCode;
    };

    //POST - MÉTODO PARA INSERIR UM NOVO PRODUTO
    cadastraProduto = (xmlProduto) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlProduto, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);

        return fetch('https://prod-api-okeaa-produto.azurewebsites.net/api/v1/cadastrarproduto', {
            // fetch('https://dev-api-okeaa-produto.azurewebsites.net/api/v1/cadastrarproduto', {
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
                console.log('Status da API externa:', statusCode);
                console.log('Dados da resposta:', data);

                // Retorna a resposta, incluindo o status da API externa
                return responseData;
            });
    };

    cadastraProdutoFornecedor = (xmlProdutoFornecedor) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlProdutoFornecedor, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);

        return fetch('http://localhost:8081/api/v1/cadastrarprodutofornecedor', {
            // fetch('https://dev-api-okeaa-produto.azurewebsites.net/api/v1/cadastrarprodutofornecedor', {
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
                console.log('Status da API externa:', statusCode);
                console.log('Dados da resposta:', data);

                // Retorna a resposta, incluindo o status da API externa
                return responseData;
            });
    };

    //PUT - MÉTODO PARA ATUALIZAR UM PRODUTO EXISTENTE
    atualizarProduto = (xmlProduto) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlProduto, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);
        const codigo = xml.querySelector('codigo').textContent;

        return fetch('https://prod-api-okeaa-produto.azurewebsites.net/api/v1/atualizarproduto/' + codigo, {
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

                // Retorna a resposta, incluindo o status da API externa
                return responseData;
            });
    };

    atualizarProdutoFornecedor = (xmlProdutoFornecedor) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlProdutoFornecedor, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);
        const idProdutoFornecedor = xml.querySelector('idProdutoFornecedor').textContent;

        return fetch('https://prod-api-okeaa-produto.azurewebsites.net/api/v1/atualizarprodutofornecedor/' + idProdutoFornecedor, {
            //return fetch('https://dev-api-okeaa-produto.azurewebsites.net/api/v1/atualizarprodutofornecedor/' + idProdutoFornecedor, {

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

                // Retorna a resposta, incluindo o status da API externa
                return responseData;
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
        const dataValidade = event.target.value;
        this.setState({
            dataValidade: dataValidade
        });
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
            dataInclusao: '',
            dataAlteracao: '',
            spedTipoItem: '',

            // FISCAL
            class_fiscal: '',
            cest: '',
            origem: '',
            idGrupoProduto: '',
            grupoProduto: '',
        });

        this.abrirModal();
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
                        this.reset();
                        this.fecharModal();
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
                        this.reset();
                        this.fecharModal();
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
    //--------------------------------------------- SCRIPT´S DE AÇÃO DOS MODALS. --------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    //Ação para fechar o modal de cadastro e atualização.
    fecharModal = () => {
        this.setState({
            modalAberta: false,
            validated: false
        });
    };

    //Ação para abrir o modal de cadastro e atualização.
    abrirModal = () => {
        this.setState({
            modalAberta: true
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

    modalListaProduto = () => {
        this.setState({
            modalListaProduto: !this.state.modalListaProduto,
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

    handleSituacaoChange = () => {
        this.setState((prevState) => ({
            situacao: prevState.situacao === 'Ativo' ? 'Inativo' : 'Ativo'
        }));
    };

    campoBusca = (event) => {
        this.setState({ searchTerm: event.target.value });
    };


    render() {
        const { tipo } = this.state;

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
                        <div className="text-loading text-white">Carregando produtos...</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="grid-produto">
                    <Container fluid>
                        <Col className="col">
                            <div className="d-flex align-items-center mt-3 mb-3">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Cadastrar um novo produto:</span>
                                <span style={{ marginRight: '0.8rem' }}>&nbsp;</span>
                                <button onClick={this.reset} className="d-flex align-items-center botao-cadastro-produto">
                                    <BsPersonAdd style={{ marginRight: '0.6rem', fontSize: '1.3rem' }} />
                                    Incluir Cadastro
                                </button>
                                <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white', fontSize: '1.9rem', fontStyle: 'italic' }}>PRODUTOS</span>
                            </div>
                        </Col>

                        <Col className="col">
                            <div className="d-flex align-items-center justify-content-start mt-3 mb-3 flex-row">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Buscar produto:</span>
                                <input type="text" placeholder="Digite o termo de busca..." value={this.state.searchTerm} onChange={this.campoBusca} className="form-control ml-2" />
                            </div>
                        </Col>
                    </Container >
                    <div className="table-container-produto">
                        <Container fluid className="pb-5">
                            <Table striped bordered hover responsive="xl">
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
                                    {this.state.produtos.map((produtos) => {
                                        const normalizedSearchTerm = removeAccents(this.state.searchTerm.toLowerCase());
                                        const normalizedDescription = removeAccents(produtos.produto.descricao.toLowerCase());
                                        const normalizedCodigo = produtos.produto.codigo.toLowerCase();

                                        if (
                                            normalizedDescription.includes(normalizedSearchTerm) ||
                                            normalizedCodigo.includes(normalizedSearchTerm)
                                        ) {
                                            return (
                                                <tr
                                                    key={produtos.produto.id}
                                                    onClick={() => {
                                                        this.carregarProdutos(produtos.produto.codigo);
                                                        this.carregarProdutoFornecedor(produtos.produto.id);
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
                                                            <Button variant="warning" title="Editar produto" onClick={(e) => {
                                                                e.stopPropagation();
                                                                this.carregarProdutos(produtos.produto.codigo);
                                                                this.carregarProdutoFornecedor(produtos.produto.id);
                                                            }}>
                                                                <BsPencilSquare />
                                                            </Button>
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
                                    {this.state.produtos.length === 0 && <tr><td colSpan="6">Nenhum produto cadastrado.</td>
                                        <td>
                                            <div className="button-container-table">
                                                <Button variant="warning" title="Editar produto" onClick={() => this.carregarProdutos(this.state.produtos.produto.codigo)} disabled>
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

                    {/* ---------------------------------------------------------- MODALS ---------------------------------------------------------- */}

                    <Modal show={this.state.modalAberta} onHide={this.fecharModal} size="xl" fullscreen="xxl-down" backdrop="static" dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title" >
                        <Modal.Header closeButton className="modal-produto-header">
                            <Modal.Title>Produtos</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-produto-body">
                            <Container>
                                <Form noValidate validated={this.state.validated} onSubmit={this.submit}>
                                    <Row>
                                        <Col xs={2} md={2}>
                                            <Form.Group controlId="id" className="mb-3 form-row" as={Col}>
                                                <Form.Label type="text">ID</Form.Label>
                                                <Form.Control type="text" value={this.state.id || ''} readOnly disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6} md={10}>
                                            <Form.Group controlId="nome" className="mb-3">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control type="text" placeholder="Digite o nome" value={this.state.descricao || ''} onChange={this.atualizaDescricao} required />
                                                <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} md={3}>
                                            <Form.Group className="mb-3">
                                                <Row>
                                                    <Col>
                                                        {this.state.imageThumbnail ? (
                                                            <Image src={this.state.imageThumbnail} className="imagem-preview" style={{ width: '170px', height: '180px' }} rounded />
                                                        ) : (
                                                            <Image src="https://www.bling.com.br/images/imagePdv.svg" className="imagem-preview" style={{ width: '171px', height: '180px' }} rounded />
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={3}>
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
                                                <Form.Control type="text" placeholder="Digite o código" value={this.state.codigo || ''} onChange={this.atualizaCodigo} />
                                                <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        {/* <Col xs={2} md={4}>
                                    <Form.Group controlId="Formato" className="mb-3">
                                        <Form.Label>Formato</Form.Label>
                                        <Form.Select as="select" placeholder="Tipo de formato" value={''} onChange={this.atualizaDescricao} >
                                            <option value="">Simples</option>
                                            <option value="">Com variação</option>
                                            <option value="">Com composição</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col> */}
                                        <Col xs={2} md={4}>
                                            <Form.Group controlId="Formato" className="mb-3">
                                                <Form.Label>Tipo</Form.Label>
                                                <Form.Select as="select" placeholder="Selecione o tipo" value={this.state.tipo || ''} onChange={this.atualizaTipo} >
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
                                                        checked={this.state.situacao === 'Ativo'}
                                                        onChange={this.handleSituacaoChange}
                                                    />
                                                    <label className="flipswitch-label" htmlFor="fs">
                                                        <div className="flipswitch-inner"></div>
                                                        <div className="flipswitch-switch"></div>
                                                    </label>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={2} md={4}>
                                            <Form.Group controlId="nome" className="mb-3">
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
                                                <Form.Control type="text" placeholder="Digite o preço de venda" value={this.state.preco || ''} onChange={this.atualizaPreco} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={2} md={4}>
                                            <Form.Group controlId="nome" className="mb-3">
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
                                                <Form.Control type="text" placeholder="Digite a unidade (pc, un, cx)" value={this.state.unidade || ''} onChange={this.atualizaUnidade} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={2} md={4}>
                                            <Form.Group controlId="Formato" className="mb-3">
                                                <Form.Label>Condição</Form.Label>
                                                <Form.Select as="select" value={this.state.condicao || ''} onChange={this.atualizaCondicao} >
                                                    <option value="NÃO ESPECIFICADO">Não Especificado</option>
                                                    <option value="NOVO">Novo</option>
                                                    <option value="USADO">Usado</option>
                                                    <option value="RECONDICIONADO">Recondicionado</option>
                                                </Form.Select>
                                            </Form.Group>
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
                                                                <Form.Control type="text" placeholder="Digite o nome" value={this.state.marca || ''} onChange={this.atualizaMarca} />
                                                                <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="produção" className="mb-3">
                                                                <Form.Label>Produção</Form.Label>
                                                                <Form.Select as="select" placeholder="Tipo de contato" value={this.state.producao || ''} onChange={this.atualizaProducao} >
                                                                    <option value="P">Própria</option>
                                                                    <option value="T">Terceiros</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        {/* <Col xs={2} md={3}>
                                                            <Form.Group controlId="datavalidade" className="mb-3">
                                                                <Form.Label>Data de validade</Form.Label>
                                                                <Form.Control type="text" placeholder="Digite a data de validade" value={this.state.dataValidade || ''} onChange={this.atualizaDataValidade} />
                                                            </Form.Group>
                                                        </Col> */}
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="frete" className="mb-3">
                                                                <Form.Label>Frete Grátis</Form.Label>
                                                                <Form.Select as="select" placeholder="Selecione o frete" value={this.state.freteGratis || ''} onChange={this.atualizaFreteGratis} >
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
                                                                <Form.Control type="text" placeholder="Insira o peso liquido" value={this.state.pesoLiq || ''} onChange={this.atualizaPesoLiq} />
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
                                                                <Form.Control type="text" placeholder="Insira o peso bruto" value={this.state.pesoBruto || ''} onChange={this.atualizaPesoBruto} />
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
                                                                <Form.Control type="text" placeholder="Insira a largura" value={this.state.larguraProduto || ''} onChange={this.atualizaLarguraProduto} />
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
                                                                <Form.Control type="text" placeholder="Insira a altura" value={this.state.alturaProduto || ''} onChange={this.atualizaAlturaProduto} />
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
                                                                <Form.Control type="text" placeholder="Insira a profundidade" value={this.state.profundidadeProduto || ''} onChange={this.atualizaProfundidadeProduto} />
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
                                                                <Form.Control type="text" placeholder="Insira o volume" value={this.state.volumes || ''} onChange={this.atualizaVolumes} />
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
                                                                <Form.Control type="text" placeholder="Digite o volume" value={this.state.itensPorCaixa || ''} onChange={this.atualizaItensPorCaixa} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="unidade" className="mb-3">
                                                                <Form.Label>Unidade de medida</Form.Label>
                                                                <Form.Select as="select" placeholder="Selecione o frete" value={this.state.unidadeMedida || ''} onChange={this.atualizaUnidadeMedida} >
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
                                                                <Form.Control type="text" placeholder="GTIN/EAN" value={this.state.gtin || ''} onChange={this.atualizaGtin} />
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
                                                                <Form.Control type="text" placeholder="GTIN/EAN tributário" value={this.state.gtinEmbalagem || ''} onChange={this.atualizaGtinEmbalagem} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )}
                                            <Row>
                                                <Col xs={2} md={12}>
                                                    <Form.Group controlId="observacoes" className="mb-3">
                                                        <Form.Label>Listas de preço</Form.Label>
                                                        <div className="label-with-button">
                                                            <Button variant="dark" onClick={this.modalListaProduto}>
                                                                Incluir uma lista de desconto
                                                            </Button>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={12}>
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
                                                        <Form.Control as="textarea" rows={3} placeholder="Insira a descrição curta" value={this.state.descricaoCurta || ''} onChange={this.atualizaDescricaoCurta} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={12}>
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
                                                        <Form.Control as="textarea" rows={3} placeholder="Insira a descrição complementar" value={this.state.descricaoComplementar || ''} onChange={this.atualizaDescricaoComplementar} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={12}>
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
                                                        <Form.Control type="text" placeholder="insira o link externo" value={this.state.linkExterno || ''} onChange={this.atualizaLinkExterno} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={12}>
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
                                                        <Form.Control type="text" placeholder="insira o link do video" value={this.state.urlVideo || ''} onChange={this.atualizaUrlVideo} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={12}>
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
                                                        <Form.Control tas="textarea" rows={3} placeholder="insira as observações" value={this.state.observacoes || ''} onChange={this.atualizaObservacoes} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={12}>
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
                                                        <Form.Control as="select" placeholder="insira as observações" value={this.state.idCategoria || ''} onChange={this.atualizaCategoria} >
                                                            <option value="">Sem categoria</option>
                                                            {this.state.categorias.map((categoria) => (
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
                                                        <Form.Control tas="textarea" rows={3} placeholder="insira as observações" value={this.state.imageThumbnail} onChange={this.atualizaImagem} />
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
                                                                <Form.Control tas="text" placeholder="insira o minimo" value={this.state.estoqueMinimo || ''} onChange={this.atualizaEstoqueMinimo} />
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
                                                                <Form.Control tas="text" placeholder="insira o maximo" value={this.state.estoqueMaximo || ''} onChange={this.atualizaEstoqueMaximo} />
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
                                                                <Form.Control tas="text" placeholder="insira o crossdocking" value={this.state.crossdocking || ''} onChange={this.atualizaCrossdocking} />
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
                                                                <Form.Control tas="text" placeholder="insira a localização" value={this.state.localizacao || ''} onChange={this.atualizaLocalizacao} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )}
                                        </Tab>
                                        <Tab eventKey="fornecedores" title="Fornecedores">
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
                                                    {this.state.produtosFornecedores.map((produto) => (
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
                                        </Tab>

                                    </Tabs>
                                    <Row className="text-center">
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
                                    </Row>
                                </Form>
                            </Container>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.modalSalvarProduto} onHide={this.modalSalvarProduto} centered>
                        <Modal.Body>
                            <span style={{ display: 'block' }}><strong>Salvando produto...</strong></span>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.modalExcluirProduto} onHide={this.modalExcluirProduto} centered>
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
                                this.delete(this.state.codigoProdutoParaExcluir);
                            }}>
                                Sim
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.modalErro} onHide={this.modalErro} centered>
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
                                this.fecharModal()
                            }}>
                                Sair
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.modalExcluindoProduto} onHide={this.modalExcluindoProduto} centered>
                        <Modal.Body>
                            <span style={{ display: 'block' }}><strong>Excluindo produto...</strong></span>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.modalListaProduto} onHide={this.modalListaProduto} centered>
                        <Modal.Header closeButton className="bg-danger text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Deseja excluir o produto? Essa ação não poderá ser desfeita.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="botao-finalizarvenda" variant="outline-secondary">
                                Não
                            </Button>
                            <Button type="button" variant="secondary">
                                Sim
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div >
            )
        }
    }
}

export default Produto;