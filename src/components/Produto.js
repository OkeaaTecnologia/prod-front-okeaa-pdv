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
            descricaoCategoria: '',
            idCategoria: '',
            id: 0,
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
            carregando: true,
            modalAberta: false,

            codigoItem: '',
            un: '',
            vlr_unit: '',
            preco_custo: '',
            peso_bruto: '',
            peso_liq: '',
            largura: '',
            altura: '',
            profundidade: '',

            // alias: [],
            // deposito: [],
            // id: '',
            // estoque: '',
            // deposito: [],
            // idDeposito: '',
            // estoqueDeposito: '',

            // variacoes: [],
            // nome: '',
            // codigo: '',
            // vlr_unit: '',
            // clonarDadosPai: '',
            // estoque: '',

            // variacoes: [],
            // nomeVariacao: '',
            // codigoVariacao: '',
            // vlr_unitVariacao: '',
            // clonarDadosPaiVariacao: '',
            // estoqueVariacao: '',


            // imagens: '',
            url: '',
            imagens: [],
            urlImagens: '',

            // estrutura: [],
            // tipoEstoque: '',
            // lancarEstoque: '',
            estrutura: [],
            tipoEstoqueEstrutura: '',
            lancarEstoque: '',

            // componente: [],
            // nome: '',
            // codigo: '',
            // quantidade: '',
            componente: [],
            nomeComponente: '',
            codigoComponente: '',
            quantidadeComponente: '',
            situacao: 'Ativo', // Valor padrão
            ModalExcluirProduto: false,
            searchTerm: '', // Estado para o termo de busca
        };
    }

    componentDidMount() {
        this.buscarProdutos();
        this.buscarCategorias();
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.idCategoria !== this.state.idCategoria) {
            this.atualizaCategoria({ target: { value: this.state.idCategoria } });
        }
        if (prevState.preco !== this.state.preco) {
            this.atualizaPreco({ target: { value: this.state.preco } });
        }
        if (prevState.pesoLiq !== this.state.pesoLiq) {
            this.atualizaPesoLiq({ target: { value: this.state.pesoLiq } });
        }
    }

    componentWillUnmount() {

    }

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
            })
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
                        id: produto.id,
                        codigo: produto.codigo,
                        descricao: produto.descricao,
                        tipo: produto.tipo,
                        situacao: produto.situacao,
                        unidade: produto.unidade,
                        preco: produto.preco,
                        precoCusto: produto.precoCusto,
                        descricaoCurta: produto.descricaoCurta,
                        descricaoComplementar: produto.descricaoComplementar,
                        dataInclusao: produto.dataInclusao,
                        dataAlteracao: produto.dataAlteracao,
                        imageThumbnail: produto.imageThumbnail,
                        urlVideo: produto.urlVideo,
                        nomeFornecedor: produto.nomeFornecedor,
                        codigoFabricante: produto.codigoFabricante,
                        marca: produto.marca,
                        class_fiscal: produto.class_fiscal,
                        cest: produto.cest,
                        origem: produto.origem,
                        idGrupoProduto: produto.idGrupoProduto,
                        linkExterno: produto.linkExterno,
                        observacoes: produto.observacoes,
                        grupoProduto: produto.grupoProduto,
                        garantia: produto.garantia,
                        descricaoFornecedor: produto.descricaoFornecedor,
                        idFabricante: produto.idFabricante,
                        pesoLiq: produto.pesoLiq,
                        pesoBruto: produto.pesoBruto,
                        estoqueMinimo: produto.estoqueMinimo,
                        estoqueMaximo: produto.estoqueMaximo,
                        gtin: produto.gtin,
                        gtinEmbalagem: produto.gtinEmbalagem,
                        larguraProduto: produto.larguraProduto,
                        alturaProduto: produto.alturaProduto,
                        profundidadeProduto: produto.profundidadeProduto,
                        unidadeMedida: produto.unidadeMedida,
                        itensPorCaixa: produto.itensPorCaixa,
                        volumes: produto.volumes,
                        localizacao: produto.localizacao,
                        crossdocking: produto.crossdocking,
                        condicao: produto.condicao,
                        freteGratis: produto.freteGratis,
                        producao: produto.producao,
                        dataValidade: produto.dataValidade,
                        spedTipoItem: produto.spedTipoItem,
                        descricaoCategoria: categoria ? categoria.descricao : "",
                        idCategoria: categoria ? categoria.id : ""
                    });
                } else {
                    this.setState({ produtos: [] });
                }
                this.setState({ carregando: false });
                this.abrirModal();
            })
            .catch(error => console.error(error));
    }

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
                console.log(erro);
                this.setState({ carregando: false });
            });
    };

    //DELETE - MÉTODO PARA DELETAR UM PRODUTO
    excluirProduto(codigo) {
        fetch(`https://prod-api-okeaa-produto.azurewebsites.net/api/v1/produto/${codigo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resposta => resposta.json())
            .then(dados => {
                console.log(dados);
                this.buscarProdutos(); // atualiza a lista de produtos após a exclusão
            })
            .catch(erro => console.error(erro));
    }

    //POST - MÉTODO PARA INSERIR UM NOVO PRODUTO
    cadastraProduto = (xmlProduto) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlProduto, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);

        fetch('https://prod-api-okeaa-produto.azurewebsites.net/api/v1/cadastrarproduto', {
            method: 'POST',
            body: stringXml,
            headers: {
                'Content-Type': 'application/xml'
            }
        })
    }

    //PUT - MÉTODO PARA ATUALIZAR UM PRODUTO EXISTENTE
    atualizarProduto = (xmlProduto) => {
        console.log(xmlProduto)
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlProduto, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);
        const codigo = xml.querySelector('codigo').textContent;

        fetch('https://prod-api-okeaa-produto.azurewebsites.net/api/v1/atualizarproduto/' + codigo, {
            method: 'POST',
            body: stringXml,
            headers: {
                'Content-Type': 'application/xml'
            }
        })
    }


    atualizaCodigo = (event) => {
        const codigo = event.target.value
        this.setState({
            codigo: codigo
        })
    }

    atualizaDescricao = (event) => {
        const descricao = event.target.value;
        this.setState({
            descricao: descricao
        });
    }

    atualizaTipo = (event) => {
        const tipo = event.target.value;
        this.setState({
            tipo: tipo
        });
    }

    atualizaSituacao = (event) => {
        const situacao = event.target.value;
        this.setState({
            situacao: situacao
        });
    }

    atualizaUnidade = (event) => {
        const unidade = event.target.value
        this.setState({
            unidade: unidade,
            un: unidade
        })
    }

    atualizaAlturaProduto = (event) => {
        const alturaProduto = event.target.value;
        this.setState({
            altura: alturaProduto,
            alturaProduto: alturaProduto
        })
    }

    atualizaPreco = (event) => {
        const preco = event.target.value;
        this.setState({
            preco: preco,
            vlr_unit: preco
        })
    }

    atualizaDescricaoCurta = (event) => {
        const descricaoCurta = event.target.value;
        this.setState({
            descricaoCurta: descricaoCurta
        });
    }

    atualizaDescricaoComplementar = (event) => {
        const descricaoComplementar = event.target.value;
        this.setState({
            descricaoComplementar: descricaoComplementar
        });
    }

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
    }

    atualizaPesoLiq = (event) => {
        const pesoLiq = event.target.value
        this.setState({
            pesoLiq: pesoLiq,
            peso_liq: pesoLiq
        })
    }

    atualizaPesoBruto = (event) => {
        const pesoBruto = event.target.value
        this.setState({
            pesoBruto: pesoBruto,
            peso_bruto: pesoBruto
        })
    }

    atualizaLarguraProduto = (event) => {
        const larguraProduto = event.target.value
        this.setState({
            larguraProduto: larguraProduto,
            largura: larguraProduto
        })
    }

    atualizaProfundidadeProduto = (event) => {
        const profundidadeProduto = event.target.value
        this.setState({
            profundidadeProduto: profundidadeProduto,
            profundidade: profundidadeProduto
        })
    }

    atualizaLinkExterno = (event) => {
        const linkExterno = event.target.value;
        this.setState({
            linkExterno: linkExterno
        });
    }

    atualizaObservacoes = (event) => {
        const observacoes = event.target.value;
        this.setState({
            observacoes: observacoes
        });
    }

    atualizaEstoqueMinimo = (event) => {
        const estoqueMinimo = event.target.value;
        this.setState({
            estoqueMinimo: estoqueMinimo
        });
    }

    atualizaEstoqueMaximo = (event) => {
        const estoqueMaximo = event.target.value;
        this.setState({
            estoqueMaximo: estoqueMaximo
        });
    }

    atualizaCondicao = (event) => {
        const condicao = event.target.value;
        this.setState({
            condicao: condicao
        });
    }

    atualizaProducao = (event) => {
        const producao = event.target.value;
        this.setState({
            producao: producao
        });
    }

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
    }

    atualizaVolumes = (event) => {
        const value = event.target.value;
        if (value.length <= 2) {
            this.setState({
                volumes: value
            });
        }
    }

    atualizaItensPorCaixa = (event) => {
        const itensPorCaixa = event.target.value;
        this.setState({
            itensPorCaixa: itensPorCaixa
        });
    }

    atualizaUnidadeMedida = (event) => {
        const unidadeMedida = event.target.value;
        this.setState({
            unidadeMedida: unidadeMedida
        });
    }

    atualizaGtin = (event) => {
        const gtin = event.target.value;
        this.setState({
            gtin: gtin
        });
    }

    atualizaGtinEmbalagem = (event) => {
        const gtinEmbalagem = event.target.value;
        this.setState({
            gtinEmbalagem: gtinEmbalagem
        });
    }

    atualizaCrossdocking = (event) => {
        const crossdocking = event.target.value
        this.setState({
            crossdocking: crossdocking
        })
    }

    atualizaLocalizacao = (event) => {
        const localizacao = event.target.value
        this.setState({
            localizacao: localizacao
        })
    }

    atualizaCategoria = (event) => {
        const idCategoria = event.target.value
        this.setState({
            idCategoria: idCategoria
        });
    };

    atualizaMarca = (event) => {
        const marca = event.target.value;
        this.setState({
            marca: marca
        });
    }

    atualizaCodigoItem = (event) => {
        const codigoItem = event.target.value;
        this.setState({
            codigoItem: codigoItem
        });
    }




    //Ações do botão SUBMIT (Cadastrar).
    submit = (event) => {

        event.preventDefault(); // Prevenir o comportamento padrão do formulário

        let categoria = {};

        if (this.state.idCategoria !== '') {
            categoria = {
                idCategoria: this.state.idCategoria,
                descricaoCategoria: this.state.descricaoCategoria
            };
        }

        if (this.state.id === 0) {
            const produto = {
                descricao: this.state.descricao,
                situacao: this.state.situacao,
                codigo: this.state.codigo,
                tipo: this.state.tipo,
                vlr_unit: this.state.vlr_unit,
                un: this.state.un,
                condicao: this.state.condicao,

                // Caracteristica
                marca: this.state.marca,
                producao: this.state.producao,
                dataValidade: this.state.dataValidade,
                freteGratis: this.state.freteGratis,
                peso_liq: this.state.peso_liq,
                peso_bruto: this.state.peso_bruto,
                largura: this.state.largura,
                altura: this.state.altura,
                profundidade: this.state.profundidade,
                volumes: this.state.volumes,
                itensPorCaixa: this.state.itensPorCaixa,
                unidadeMedida: this.state.unidadeMedida,
                gtin: this.state.gtin,
                gtinEmbalagem: this.state.gtinEmbalagem,
                descricaoCurta: this.state.descricaoCurta,
                descricaoComplementar: this.state.descricaoComplementar,
                linkExterno: this.state.linkExterno,
                urlVideo: this.state.urlVideo,
                observacoes: this.state.observacoes,
                ...categoria,

                // Imagem
                imagens: [{
                    url: this.state.url
                }],

                // Estoque
                estoqueMinimo: this.state.estoqueMinimo,
                estoqueMaximo: this.state.estoqueMaximo,
                crossdocking: this.state.crossdocking,
                localizacao: this.state.localizacao,

                // Fornecedores
                codigoFabricante: this.state.codigoFabricante,
                idFabricante: this.state.idFabricante,
                nomeFornecedor: '',
                descricaoFornecedor: this.state.descricaoFornecedor,
                codigoItem: this.state.codigoItem,
                preco_custo: this.state.preco_custo,
                garantia: this.state.garantia,

                // INFORMACOES NAO TELA
                spedTipoItem: this.state.spedTipoItem,

                // FISCAL
                class_fiscal: this.state.class_fiscal,
                cest: this.state.cest,
                origem: this.state.origem,
                idGrupoProduto: this.state.idGrupoProduto,
                grupoProduto: '',

                // ---------------------------------------------------

                // deposito: [],
                // idDeposito: this.state.idDeposito,
                // estoqueDeposito: this.state.estoqueDeposito,

                // variacoes: [],
                // nomeVariacao: this.state.nomeVariacao,
                // codigoVariacao: this.state.codigoVariacao,
                // vlr_unitVariacao: this.state.vlr_unitVariacao,
                // clonarDadosPaiVariacao: this.state.clonarDadosPaiVariacao,
                // estoqueVariacao: this.state.estoqueVariacao,

                // alias: [],

                // estrutura: [],
                // tipoEstoqueEstrutura: this.state.tipoEstoqueEstrutura,
                // lancarEstoque: this.state.lancarEstoque,

                // componente: [],
                // nomeComponente: this.state.nomeComponente,
                // codigoComponente: this.state.codigoComponente,
                // quantidadeComponente: this.state.quantidadeComponente,
            };

            const xmlProduto = parse('produto', produto);
            this.cadastraProduto(xmlProduto);
        } else {
            const produto = {
                id: this.state.id,
                descricao: this.state.descricao,
                situacao: this.state.situacao,
                codigo: this.state.codigo,
                tipo: this.state.tipo,
                vlr_unit: this.state.vlr_unit,
                un: this.state.un,
                condicao: this.state.condicao,

                // Caracteristica
                marca: this.state.marca,
                producao: this.state.producao,
                dataValidade: this.state.dataValidade,
                freteGratis: this.state.freteGratis,
                peso_liq: this.state.peso_liq,
                peso_bruto: this.state.peso_bruto,
                largura: this.state.largura,
                altura: this.state.altura,
                profundidade: this.state.profundidade,
                volumes: this.state.volumes,
                itensPorCaixa: this.state.itensPorCaixa,
                unidadeMedida: this.state.unidadeMedida,
                gtin: this.state.gtin,
                gtinEmbalagem: this.state.gtinEmbalagem,
                descricaoCurta: this.state.descricaoCurta,
                descricaoComplementar: this.state.descricaoComplementar,
                linkExterno: this.state.linkExterno,
                urlVideo: this.state.urlVideo,
                observacoes: this.state.observacoes,
                ...categoria,

                // Imagem
                imagens: [{
                    url: this.state.url
                }],

                // Estoque
                estoqueMinimo: this.state.estoqueMinimo,
                estoqueMaximo: this.state.estoqueMaximo,
                crossdocking: this.state.crossdocking,
                localizacao: this.state.localizacao,

                // Fornecedores
                codigoFabricante: this.state.codigoFabricante,
                idFabricante: this.state.idFabricante,
                nomeFornecedor: '',
                descricaoFornecedor: this.state.descricaoFornecedor,
                codigoItem: this.state.codigoItem,
                preco_custo: this.state.preco_custo,
                garantia: this.state.garantia,

                // INFORMACOES NAO TELA
                spedTipoItem: this.state.spedTipoItem,

                // FISCAL
                class_fiscal: this.state.class_fiscal,
                cest: this.state.cest,
                origem: this.state.origem,
                idGrupoProduto: this.state.idGrupoProduto,
                grupoProduto: '',

                // ---------------------------------------------------

                // deposito: [],
                // idDeposito: this.state.idDeposito,
                // estoqueDeposito: this.state.estoqueDeposito,

                // variacoes: [],
                // nomeVariacao: this.state.nomeVariacao,
                // codigoVariacao: this.state.codigoVariacao,
                // vlr_unitVariacao: this.state.vlr_unitVariacao,
                // clonarDadosPaiVariacao: this.state.clonarDadosPaiVariacao,
                // estoqueVariacao: this.state.estoqueVariacao,


                // alias: [],

                // estrutura: [],
                // tipoEstoqueEstrutura: this.state.tipoEstoqueEstrutura,
                // lancarEstoque: this.state.lancarEstoque,

                // componente: [],
                // nomeComponente: this.state.nomeComponente,
                // codigoComponente: this.state.codigoComponente,
                // quantidadeComponente: this.state.quantidadeComponente,
            }
            const xmlProduto = parse('produto', produto);
            this.atualizarProduto(xmlProduto);
        }

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation(); // se algum campo obrigatorio nãao for preenchidos o modal é travado
            this.setState({ validated: true }); // atribui true na validação
        } else {
            event.preventDefault();
            this.setState({ validated: false }); // atribui true na validação
            setTimeout(() => {
                this.reset();// atualiza a lista de produtos após a exclusão
            }, 500); // 500 milissegundos equivalem a 1 segundo
            setTimeout(() => {
                this.fecharModal(); // se todos os campos estiverem preenchidos o modal é fechado
            }, 500); // 500 milissegundos equivalem a 1 segundo
            setTimeout(() => {
                this.buscarProdutos(); // atualiza a lista de produtos após a exclusão
            }, 500); // 500 milissegundos equivalem a 1 segundo
        }
    }

    //Ação para limpar o campos do modal para cadastrar um novo cliente.
    reset = () => {
        this.setState({

            id: 0,
            descricao: '',
            situacao: 'Ativo',
            codigo: '',
            tipo: '',
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
            preco_custo: '',
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
    }

    handleSituacaoChange = () => {
        this.setState((prevState) => ({
            situacao: prevState.situacao === 'Ativo' ? 'Inativo' : 'Ativo'
        }));
    };

    //Ação para fechar o modal de cadastro e atualização.
    fecharModal = () => {
        this.setState({
            modalAberta: false,
            validated: false
        });
    }

    //Ação para abrir o modal de cadastro e atualização.
    abrirModal = () => {
        this.setState({
            modalAberta: true
        });
    }

    modalExcluirProduto = () => {
        this.setState({
            ModalExcluirProduto: !this.state.ModalExcluirProduto,
        });
    };

    handleSearchChange = (event) => {
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
                                <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white', fontSize: '1.9rem', fontStyle: 'italic' }}>PRODUTO</span>
                            </div>
                        </Col>

                        <Col className="col">
                            <div className="d-flex align-items-center justify-content-start mt-3 mb-3 flex-row">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Buscar produto:</span>
                                <input type="text" placeholder="Digite o termo de busca..." value={this.state.searchTerm} onChange={this.handleSearchChange} className="form-control ml-2" />
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
                                        <th title="Estoque">Estoque</th>
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
                                                    onClick={() => this.carregarProdutos(produtos.produto.codigo)}
                                                    onMouseEnter={(e) => (e.currentTarget.style.cursor = 'pointer')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.cursor = 'default')}
                                                >
                                                    <td>{produtos.produto.id}</td>
                                                    <td>{produtos.produto.descricao}</td>
                                                    <td>{produtos.produto.codigo}</td>
                                                    <td>{produtos.produto.unidade}</td>
                                                    <td>{parseFloat(produtos.produto.preco).toFixed(2)}</td>
                                                    <td>{produtos.produto.estoqueMaximo}</td>
                                                    <td>
                                                        <div className="button-container-table">
                                                            <Button variant="warning" title="Editar produto" onClick={() => this.carregarProdutos(produtos.produto.codigo)}>
                                                                <BsPencilSquare />
                                                            </Button>
                                                            <Button variant="danger" title="Excluir produto" onClick={() => this.excluirProduto(produtos.produto.codigo)}>
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
                                    {this.state.produtos.length === 0 && <tr><td colSpan="6">Nenhum produto cadastrado.</td></tr>}
                                </tbody>
                            </Table>
                        </Container>
                    </div>

                    {/* Modal */}
                    <Modal show={this.state.modalAberta} onHide={this.fecharModal} size="xl" fullscreen="xxl-down" backdrop="static" >
                        <Modal.Header closeButton className="modal-produto-header">
                            <Modal.Title>Cadastro/Atualização de Produto</Modal.Title>
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
                                                <Form.Label>Código (SKU)</Form.Label>
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
                                                <Form.Label>Preço venda</Form.Label>
                                                <Form.Control type="text" placeholder="Digite o preço de venda" value={this.state.preco || ''} onChange={this.atualizaPreco} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={2} md={4}>
                                            <Form.Group controlId="nome" className="mb-3">
                                                <Form.Label>Unidade</Form.Label>
                                                <Form.Control type="text" placeholder="Digite a unidade (pc, un, cx)" value={this.state.unidade || ''} onChange={this.atualizaUnidade} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={2} md={4}>
                                            <Form.Group controlId="Formato" className="mb-3">
                                                <Form.Label>Condição</Form.Label>
                                                <Form.Select as="select" value={this.state.condicao || ''} onChange={this.atualizaCondicao} >
                                                    <option value="">Não Evspecificado</option>
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
                                                                <Form.Label>Marca</Form.Label>
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
                                                <Form.Control type="date" placeholder="Digite o nome" value={this.state.dataValidade || ''} onChange={this.atualizaDataValidade} />
                                                <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
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
                                                                <Form.Label>Peso Líquido </Form.Label>
                                                                <Form.Control type="text" placeholder="Insira o peso liquido" value={this.state.pesoLiq || ''} onChange={this.atualizaPesoLiq} />
                                                                <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="pesobruto" className="mb-3">
                                                                <Form.Label>Peso Bruto</Form.Label>
                                                                <Form.Control type="text" placeholder="Insira o peso bruto" value={this.state.pesoBruto || ''} onChange={this.atualizaPesoBruto} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="largura" className="mb-3">
                                                                <Form.Label>Largura</Form.Label>
                                                                <Form.Control type="text" placeholder="Insira a largura" value={this.state.larguraProduto || ''} onChange={this.atualizaLarguraProduto} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="altura" className="mb-3">
                                                                <Form.Label>Altura</Form.Label>
                                                                <Form.Control type="text" placeholder="Insira a altura" value={this.state.alturaProduto || ''} onChange={this.atualizaAlturaProduto} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="profundidade" className="mb-3">
                                                                <Form.Label>Profundidade</Form.Label>
                                                                <Form.Control type="text" placeholder="Insira a profundidade" value={this.state.profundidadeProduto || ''} onChange={this.atualizaProfundidadeProduto} />
                                                                <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="pesobruto" className="mb-3">
                                                                <Form.Label>Volumes</Form.Label>
                                                                <Form.Control type="text" placeholder="Insira o volume" value={this.state.volumes || ''} onChange={this.atualizaVolumes} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="itenscaixa" className="mb-3">
                                                                <Form.Label>Itens p/ caixa</Form.Label>
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
                                                                <Form.Label>GTIN/EAN </Form.Label>
                                                                <Form.Control type="text" placeholder="GTIN/EAN" value={this.state.gtin || ''} onChange={this.atualizaGtin} />
                                                                <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="gtintributario" className="mb-3">
                                                                <Form.Label>GTIN/EAN tributário</Form.Label>
                                                                <Form.Control type="text" placeholder="GTIN/EAN tributário" value={this.state.gtinEmbalagem || ''} onChange={this.atualizaGtinEmbalagem} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )}
                                            <Row>
                                                <Col xs={2} md={12}>
                                                    <Form.Group controlId="descricaocurta" className="mb-3">
                                                        <Form.Label>Descrição Curta (Descrição Principal) </Form.Label>
                                                        <Form.Control as="textarea" rows={3} placeholder="Insira a descrição curta" value={this.state.descricaoCurta || ''} onChange={this.atualizaDescricaoCurta} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={12}>
                                                    <Form.Group controlId="descricaocurta" className="mb-3">
                                                        <Form.Label>Descrição Complementar</Form.Label>
                                                        <Form.Control as="textarea" rows={3} placeholder="Insira a descrição complementar" value={this.state.descricaoComplementar || ''} onChange={this.atualizaDescricaoComplementar} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={12}>
                                                    <Form.Group controlId="linkexterno" className="mb-3">
                                                        <Form.Label>Link Externo</Form.Label>
                                                        <Form.Control type="text" placeholder="insira o link externo" value={this.state.linkExterno || ''} onChange={this.atualizaLinkExterno} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={12}>
                                                    <Form.Group controlId="video" className="mb-3">
                                                        <Form.Label>Video</Form.Label>
                                                        <Form.Control type="text" placeholder="insira o link do video" value={this.state.urlVideo || ''} onChange={this.atualizaUrlVideo} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={2} md={12}>
                                                    <Form.Group controlId="observacoes" className="mb-3">
                                                        <Form.Label>Observações</Form.Label>
                                                        <Form.Control tas="textarea" rows={3} placeholder="insira as observações" value={this.state.observacoes || ''} onChange={this.atualizaObservacoes} />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2} md={12}>
                                                    <Form.Group controlId="categoria" className="mb-3">
                                                        <Form.Label>Categoria</Form.Label>
                                                        <Form.Control as="select" placeholder="insira as observações" value={this.state.idCategoria || ''} onChange={(event) => this.atualizaCategoria(event)} >
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
                                                                <Form.Label>Minimo</Form.Label>
                                                                <Form.Control tas="text" placeholder="insira o minimo" value={this.state.estoqueMinimo || ''} onChange={this.atualizaEstoqueMinimo} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="maximo" className="mb-3">
                                                                <Form.Label>Máximo</Form.Label>
                                                                <Form.Control tas="text" placeholder="insira o maximo" value={this.state.estoqueMaximo || ''} onChange={this.atualizaEstoqueMaximo} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="crossdocking" className="mb-3">
                                                                <Form.Label>Crossdocking</Form.Label>
                                                                <Form.Control tas="text" placeholder="insira o crossdocking" value={this.state.crossdocking || ''} onChange={this.atualizaCrossdocking} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={2} md={3}>
                                                            <Form.Group controlId="localizacao" className="mb-3">
                                                                <Form.Label>Localização</Form.Label>
                                                                <Form.Control tas="text" placeholder="insira a localização" value={this.state.localizacao || ''} onChange={this.atualizaLocalizacao} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )}
                                        </Tab>
                                        <Tab eventKey="fornecedores" title="Fornecedores">


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


                    <Modal show={this.state.ModalExcluirProduto} onHide={this.modalExcluirProduto} centered>
                        <Modal.Header closeButton className="bg-warning text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            Deseja excluir o item? Essa ação não poderá ser desfeita.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="botao-finalizarvenda" variant="outline-secondary" onClick={this.modalExcluirProduto}>Não</Button>
                            <Button type="button" variant="secondary" onClick={() => this.excluirProduto(this.state.codigo)}>Sim</Button>
                        </Modal.Footer>
                    </Modal>
                </div >
            )
        }
    }
}

export default Produto;