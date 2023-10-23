import React from "react";
import '../css/Contato.css'

import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Container } from "react-bootstrap";

import { BsPersonAdd } from 'react-icons/bs';
import { BsShieldFillExclamation } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import { parse } from 'js2xmlparser';


class Contato extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contatos: [],
            tiposContato: [],
            itensSelecionados: [],
            id: 0,
            codigo: '',
            nome: '',
            fantasia: '',
            tipo: '',
            cnpj: '',
            ie_rg: '',
            endereco: '',
            numero: '',
            bairro: '',
            cep: '',
            cidade: '',
            complemento: '',
            uf: '',
            fone: '',
            email: '',
            situacao: '',
            contribuinte: '',
            site: '',
            celular: '',
            dataAlteracao: '',
            dataInclusao: '',
            sexo: '',
            clienteDesde: '',
            limiteCredito: '',
            dataNascimento: '',
            tipoContato: '',
            descricao: '',
            logradouro: '',
            localidade: '',
            cpfValido: '',
            searchTerm: '', // Estado para o termo de busca
            carregando: true,
            modalAberta: false,
            modalSalvarContato: false,
            validated: false,
        };

        this.numeroRef = React.createRef();
    };

    componentDidMount() {
        this.buscarContato();
        this.buscarTipoContato();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.logradouro !== this.state.logradouro) {
            this.atualizaEndereco({ target: { value: this.state.logradouro } });
        };
        if (prevState.localidade !== this.state.localidade) {
            this.atualizaCidade({ target: { value: this.state.localidade } });
        };
        if (prevState.cnpj !== this.state.cnpj) {
            this.atualizaCpfCnpj({ target: { value: this.state.cnpj } });
        };
        if (prevState.tipo !== this.state.tipo) {
            this.atualizaTipoPessoa({ target: { value: this.state.tipo } });
        };
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    //--------------------------------------- CHAMADAS E CONSUMO DA API DE CONTATOS. ----------------------------------------|  
    //-----------------------------------------------------------------------------------------------------------------------|

    //GET - MÉTODO PARA CONSUMO DA API CONTATOS
    buscarContato = () => {
        fetch(`https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/contatos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resposta => resposta.json())
            .then(dados => {
                if (dados.retorno.contatos) {
                    this.setState({
                        contatos: dados.retorno.contatos,
                    });
                } else {
                    this.setState({ contatos: [] })
                };
                this.setState({ carregando: false })
            });
    };

    //GET - MÉTODO PARA CONSUMO DE UM CONTATO PELO ID
    atualizaContato = (id) => {
        fetch(`https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/contato/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resposta => resposta.json())
            .then(dados => {
                // console.log("Linha 80", dados)
                if (dados.retorno.contatos) {

                    const contato = dados.retorno.contatos[0].contato;
                    const tiposContato = contato.tiposContato.map(item => ({
                        tipoContato: item.tipoContato,
                        descricao: item.tipoContato.descricao
                    }));

                    // console.log(tiposContato); // Adicione o console.log aqui
                    this.setState({
                        id: contato.id,
                        codigo: contato.codigo,
                        nome: contato.nome,
                        fantasia: contato.fantasia,
                        tipo: contato.tipo,
                        cnpj: contato.cnpj,
                        ie_rg: contato.ie_rg,
                        endereco: contato.endereco,
                        numero: contato.numero,
                        bairro: contato.bairro,
                        cep: contato.cep,
                        cidade: contato.cidade,
                        complemento: contato.complemento,
                        uf: contato.uf,
                        fone: contato.fone,
                        email: contato.email,
                        situacao: contato.situacao,
                        contribuinte: contato.contribuinte,
                        site: contato.site,
                        celular: contato.celular,
                        dataAlteracao: contato.dataAlteracao,
                        dataInclusao: contato.dataInclusao,
                        sexo: contato.sexo,
                        clienteDesde: contato.clienteDesde,
                        limiteCredito: contato.limiteCredito,
                        dataNascimento: contato.dataNascimento,
                        tiposContato: tiposContato,
                    })
                } else {
                    this.setState({ contatos: [] })
                }
                this.setState({ carregando: false });

                this.abrirModal();
            })
            .catch(error => console.error(error));
    };

    //GET - MÉTODO PARA CONSUMO DE TIPOS DE CONTATO DO BANCO DE DADOS.
    buscarTipoContato = () => {
        // fetch(`https://dev-api-okeaa-pdv.azurewebsites.net/api/v1/contatos`, {
        fetch("http://localhost:8080/api/v1/selecionartipocontato", {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ tiposDeContato: data });
                console.log(data); // Adicione o console.log aqui
            })
            .catch(error => {
                console.error('Erro ao buscar as lojas:', error);
            });
    };

    //POST - MÉTODO PARA INSERIR UM NOVO CONTATO NA API CONTATOS
    cadastraContato = (xmlContato) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlContato, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);

        fetch('https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/cadastrarcontato', {
            method: 'POST',
            body: stringXml,
            headers: {
                'Content-Type': 'application/xml'
            }
        });
    };

    //PUT - MÉTODO PARA ATUALIZAR UM CONTATO EXISTENTE NA API CONTATOS
    atualizarContato = (xmlContato) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlContato, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);
        const id = xml.querySelector('id').textContent;

        fetch('https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/atualizarcontato/' + id, {
            method: 'PUT',
            body: stringXml,
            headers: {
                'Content-Type': 'application/xml'
            }
        });
    };

    //GET - MÉTODO DO VIACEP PARA PREENCHER OS CAMPOS DE ENDEREÇO, BAIRRO, CIDADE.
    checkCEP = (event) => {
        const cep = event.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    endereco: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    uf: data.uf,
                });
                console.log(data);
                this.numeroRef.current.focus();
            });
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    //---------------------- SCRIPT´S DE AÇÕES PARA CADA UM DOS CAMPOS DE CADASTRO E ATUALIZAÇÃO. ---------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    atualizaCodigo = (event) => {
        const codigo = event.target.value;
        this.setState({
            codigo: codigo
        });
    };

    atualizaNome = (event) => {
        const nome = event.target.value
        this.setState({
            nome: nome
        });
    };

    atualizaFantasia = (event) => {
        const fantasia = event.target.value
        this.setState({
            fantasia: fantasia
        });
    };

    atualizaTipoPessoa = (event) => {
        const tipo = event.target.value
        this.setState({
            tipo: tipo,
            tipoPessoa: tipo
        });
    };

    atualizaContribuinte = (event) => {
        const contribuinte = event.target.value
        this.setState({
            contribuinte: contribuinte
        });
    };

    atualizaCpfCnpj = (event) => {
        const cnpj = event.target.value;
        const cpfCnpjSemPontuacao = cnpj.replace(/[^\d]/g, "");

        // Verifica se é um CPF válido
        if (cpfCnpjSemPontuacao.length === 11) {
            if (!this.validarCPF(cpfCnpjSemPontuacao)) {
                this.setState({
                    cnpj: cnpj,
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
                    cnpj: cnpj,
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
                cnpj: cnpj,
                cpfValido: false,
                cnpjValido: false
            });
        };
    };

    validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false; // CPF inválido se não tiver 11 dígitos ou se todos os dígitos forem iguais
        }

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(9, 10))) {
            return false; // CPF inválido se o dígito verificador não bater
        }

        soma = 0;

        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false; // CPF inválido se o dígito verificador não bater
        }

        return true; // CPF válido
    };

    validarCNPJ(cnpj) {

        if (!cnpj) {
            return true; // Retorna true se o CPF estiver vazio
        }

        cnpj = cnpj.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

        if (cnpj.length !== 14) {
            return false; // CNPJ inválido se não tiver 14 dígitos
        }

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (resultado !== parseInt(digitos.charAt(0), 10)) {
            return false; // CNPJ inválido se o primeiro dígito verificador não bater
        }

        tamanho += 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        if (resultado !== parseInt(digitos.charAt(1), 10)) {
            return false; // CNPJ inválido se o segundo dígito verificador não bater
        }

        return true; // CNPJ válido
    };

    atualizaIe_Rg = (event) => {
        const ie_rg = event.target.value;
        const formattedValue = this.formatIeRg(ie_rg, this.state.tipo);
        this.setState({
            ie_rg: formattedValue
        });
    };

    formatIeRg = (value, tipo) => {
        // console.log("tipo: ", tipo)
        if (tipo === 'J') {
            // Formatação para Inscrição Estadual
            const match = value.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return `${match[1]}.${match[2]}.${match[3]}.${match[4]}`;
            }
        } else if (value.length === 9) {
            // Formatação para RG
            const match = value.match(/^(\d{2})(\d{3})(\d{3})(\d{1})$/);
            if (match) {
                return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
            }
        };

        return value;
    };

    atualizaSexo = (event) => {
        const sexo = event.target.value
        this.setState({
            sexo: sexo
        });
    };

    atualizaEndereco = (event) => {
        const endereco = event.target.value
        this.setState({
            logradouro: endereco,
            endereco: endereco
        });
    };

    atualizaNumero = (event) => {
        const numero = event.target.value
        this.setState({
            numero: numero
        });
    };

    atualizaComplemento = (event) => {
        const complemento = event.target.value
        this.setState({
            complemento: complemento
        });
    };

    atualizaBairro = (event) => {
        const bairro = event.target.value
        this.setState({
            bairro: bairro
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

    atualizaCidade = (event) => {
        const cidade = event.target.value
        this.setState({
            localidade: cidade,
            cidade: cidade
        });
    };

    atualizaUf = (event) => {
        const uf = event.target.value
        this.setState({
            uf: uf
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

    atualizaCelular = (event) => {
        const celular = event.target.value;
        const celularSemPontuacao = celular.replace(/[^\d]/g, "");
        const celularFormatado = celularSemPontuacao.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        this.setState({
            celular: celularFormatado
        });
    };

    atualizaEmail = (event) => {
        const email = event.target.value
        this.setState({
            email: email
        });
    };

    atualizaSite = (event) => {
        const site = event.target.value
        this.setState({
            site: site
        });
    };

    atualizaSituacao = (event) => {
        const situacao = event.target.value
        this.setState({
            situacao: situacao
        });
    };

    atualizaLimiteCredito = (event) => {
        const limiteCredito = event.target.value
        const limiteCreditoFormatado = limiteCredito.replace(',', '.');
        this.setState({
            limiteCredito: limiteCreditoFormatado
        });
    };

    atualizaDescricao = (event) => {
        const descricao = event.target.value
        this.setState({
            descricao: descricao
        });
    };

    // atualizaEmailNfe = (event) => {
    //     console.log(event.target.value); // Verifica se o valor do campo está sendo capturado corretamente

    //     this.setState({
    //         emailNfe: event.target.value
    //     })
    // }

    // atualizaInformacaoContato = (event) => {
    //     const informacaoContato = event.target.value
    //     this.setState({
    //         informacaoContato: informacaoContato
    //     })
    // }

    // handleSelectChange = (event) => {
    //     const selectedItem = event.target.value;

    //     if (selectedItem) {
    //         // Verifique se o item já está na lista de itens selecionados
    //         if (!this.state.itensSelecionados.includes(selectedItem)) {
    //             // Adicione o item selecionado ao estado itensSelecionados
    //             this.setState((prevState) => ({
    //                 itensSelecionados: [...prevState.itensSelecionados, selectedItem],
    //             }));
    //         } else {
    //             // Remova o item se já estiver selecionado
    //             this.setState((prevState) => ({
    //                 itensSelecionados: prevState.itensSelecionados.filter(
    //                     (item) => item !== selectedItem
    //                 ),
    //             }));
    //         };

    //         // Limpe a seleção no <select>
    //         event.target.value = '';
    //     };
    // };

    // handleChange = (e) => {
    //     const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    //     this.setState({ tiposSelecionados: selectedOptions });
    // };


    //-----------------------------------------------------------------------------------------------------------------------|
    //---------------- SCRIPT´S DE AÇÃO PARA OS BOTÕES DA TELA PRODUTO E GERAÇÃO DO XML DE ENVIO PARA O BLING. --------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    //Ação para limpar os campos do modal após cadastrar um novo cliente.
    reset = (event) => {
        event.preventDefault();
        this.setState(
            {
                id: 0,
                codigo: '',
                nome: '',
                fantasia: '',
                tipo: '',
                cnpj: '',
                ie_rg: '',
                endereco: '',
                numero: '',
                bairro: '',
                cep: '',
                cidade: '',
                complemento: '',
                uf: '',
                fone: '',
                email: '',
                situacao: '',
                contribuinte: '',
                site: '',
                celular: '',
                dataAlteracao: '',
                dataInclusao: '',
                sexo: '',
                clienteDesde: '',
                limiteCredito: '',
                dataNascimento: '',
                tipoContato: '',
                descricao: '',
                ModalCpfValido: false,
                informacaoContato: '',
            });

        this.abrirModal();
    };

    //Ações do botão SUBMIT (Cadastrar).
    submit = (event) => {
        event.preventDefault();
        if (this.state.id === 0) {  // ------------------------------------ Ação de Cadastrar um contato novo.

            const contato = {
                nome: this.state.nome,
                fantasia: this.state.fantasia,
                tipoPessoa: this.state.tipoPessoa,
                contribuinte: this.state.contribuinte,
                cpf_cnpj: this.state.cnpj,
                ie_rg: this.state.ie_rg,
                endereco: this.state.endereco,
                numero: this.state.numero,
                complemento: this.state.complemento,
                bairro: this.state.bairro,
                cep: this.state.cep,
                cidade: this.state.cidade,
                uf: this.state.uf,
                fone: this.state.fone,
                celular: this.state.celular,
                email: this.state.email,
                // emailNfe: this.state.emailNfe,
                informacaoContato: this.state.informacaoContato,
                limiteCredito: this.state.limiteCredito,
                codigo: this.state.codigo,
                site: this.state.site,
                obs: this.state.obs,
                descricao: this.state.descricao,
                sexo: this.state.sexo,
                situacao: this.state.situacao
            };
            const xmlContato = parse('contato', contato);
            // console.log(xmlContato);
            this.modalSalvarContato();
            this.cadastraContato(xmlContato);
        } else {                    // ------------------------------------ Ação de atualizar um contato existente.
            const contato = {
                id: this.state.id,
                nome: this.state.nome,
                fantasia: this.state.fantasia,
                tipoPessoa: this.state.tipoPessoa,
                contribuinte: this.state.contribuinte,
                cpf_cnpj: this.state.cnpj,
                ie_rg: this.state.ie_rg,
                endereco: this.state.endereco,
                numero: this.state.numero,
                complemento: this.state.complemento,
                bairro: this.state.bairro,
                cep: this.state.cep,
                cidade: this.state.cidade,
                uf: this.state.uf,
                fone: this.state.fone,
                celular: this.state.celular,
                email: this.state.email,
                // emailNfe: this.state.emailNfe,
                informacaoContato: this.state.informacaoContato,
                limiteCredito: this.state.limiteCredito,
                codigo: this.state.codigo,
                site: this.state.site,
                obs: this.state.obs,
                descricao: this.state.descricao,
                sexo: this.state.sexo,
                situacao: this.state.situacao
            };
            const xmlContato = parse('contato', contato);
            console.log(xmlContato);
            this.modalSalvarContato();
            this.atualizarContato(xmlContato);
        };

        //Realiza a validação dos campos obrigatorios.
        const form = event.currentTarget

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation(); // se algum campo obrigatorio nãao for preenchidos o modal é travado
            this.setState({ validated: true }); // atribui true na validação
        } else {
            // Verifica se o CPF é válido
            if (this.validarCPF(this.state.cnpj) || this.validarCNPJ(this.state.cnpj)) {
                event.preventDefault();
                this.setState({ validated: false }); // atribui true na validação
                this.buscarContato(); // atualiza a lista de produtos após a exclusão
                this.fecharModal(); // se todos os campos estiverem preenchidos o modal é fechado
            } else {
                this.ModalCpfValido();
            };
        };
    };

    //-----------------------------------------------------------------------------------------------------------------------|
    //--------------------------------------------- SCRIPT´S DE AÇÃO DOS MODALS. --------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    //Ação para fechar o modal de cadastro e atualização.
    fecharModal = () => {
        this.setState({
            modalAberta: false
        });
        this.buscarContato()
    };

    //Ação para abrir o modal de cadastro e atualização.
    abrirModal = () => {
        this.setState({
            modalAberta: true
        });
    };

    ModalCpfValido = () => {
        this.setState((prevState) => ({
            ModalCpfValido: !prevState.ModalCpfValido,
        }));
    };

    modalSalvarContato = () => {
        this.setState({
            modalSalvarContato: !this.state.modalSalvarContato
        }, () => {
            setTimeout(() => {
                this.setState({
                    modalSalvarContato: false
                })
            }, 1000);
        });
    };

    campoBusca = (event) => {
        this.setState({ searchTerm: event.target.value });
    };


    render() {

        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        if (this.state.carregando) {
            return (
                <div className="spinner-container">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="custom-loader"></div>
                    </div>
                    <div >
                        <div className="text-loading text-white">Carregando contatos...</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="grid-contato">
                    <Container fluid>
                        <Col className="col">
                            <div className="d-flex align-items-center mt-3 mb-3">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Cadastrar um novo contato:</span>
                                <span style={{ marginRight: '0.8rem' }}>&nbsp;</span>
                                <button onClick={this.reset} className="d-flex align-items-center botao-cadastro-contato">
                                    <BsPersonAdd style={{ marginRight: '0.6rem', fontSize: '1.3rem' }} />
                                    Incluir Cadastro
                                </button>
                                <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white', fontSize: '1.9rem', fontStyle: 'italic' }}>CLIENTES E FORNECEDORES</span>
                            </div>
                        </Col>

                        <Col className="col">
                            <div className="d-flex align-items-center mt-3 mb-3">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Buscar contato:</span>
                                <input type="text" placeholder="Digite o termo de busca..." value={this.state.searchTerm} onChange={this.campoBusca} className="form-control ml-2" />
                            </div>
                        </Col>
                    </Container>
                    <div className="table-container-contato">
                        <Container fluid className="pb-5">
                            <Table striped bordered hover responsive="xl">
                                <thead>
                                    <tr>
                                        <th title="Identificador">ID</th>
                                        <th title="Código">Código</th>
                                        <th title="Nome">Nome</th>
                                        <th title="CPF / CNPJ">CPF/CNPJ</th>
                                        <th title="Cidade">Cidade</th>
                                        <th title="Telefone">Telefone</th>
                                        <th title="Opções">Opções</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.contatos.map((contatos) => {
                                        const normalizedSearchTerm = removeAccents(this.state.searchTerm.toLowerCase());
                                        const normalizedDescription = removeAccents(contatos.contato.nome.toLowerCase());
                                        const normalizedCodigo = contatos.contato.codigo.toLowerCase();

                                        // Verifique se a situação é diferente de 'E' antes de renderizar a linha
                                        if (contatos.contato.situacao !== 'E' && contatos.contato.situacao !== 'I' && contatos.contato.situacao !== 'S' &&
                                            (normalizedDescription.includes(normalizedSearchTerm) || normalizedCodigo.includes(normalizedSearchTerm))) {
                                            return (
                                                <tr key={contatos.contato.id}
                                                    onClick={() => this.atualizaContato(contatos.contato.id)}
                                                    onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
                                                    onMouseLeave={(e) => e.currentTarget.style.cursor = 'default'}>
                                                    <td>{contatos.contato.id}</td>
                                                    <td>{contatos.contato.codigo}</td>
                                                    <td>{contatos.contato.nome}</td>
                                                    <td>{contatos.contato.cnpj}</td>
                                                    <td>{contatos.contato.cidade}</td>
                                                    <td>{contatos.contato.fone}</td>
                                                    <td>
                                                        <Button variant="warning" title="Editar contato" onClick={() => this.atualizaContato(contatos.contato.id)}>
                                                            <BsPencilSquare />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                    {this.state.contatos.length === 0 && <tr><td colSpan="6">Nenhum contato cadastrado.</td></tr>}
                                </tbody>
                            </Table>
                        </Container>
                    </div>

                    {/* ---------------------------------------------------------- MODALS ---------------------------------------------------------- */}

                    <Modal show={this.state.modalAberta} onHide={this.fecharModal} size="xl" backdrop="static">
                        <Modal.Header closeButton className="modal-contato-header">
                            <Modal.Title>Cliente ou Fornecedor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-contato-body">
                            <Form noValidate validated={this.state.validated} onSubmit={this.submit}>
                                <Row>
                                    <Col xs={2} md={2}>
                                        <Form.Group controlId="id" className="mb-3 form-row" as={Col}>
                                            <Form.Label type="text">ID</Form.Label>
                                            <Form.Control type="text" value={this.state.id || ''} readOnly disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        <Form.Group controlId="codigo" className="mb-3">
                                            <Form.Label>Código</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o código" value={this.state.codigo || ''} onChange={this.atualizaCodigo} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={{ span: 3, offset: 5 }} md={{ span: 3, offset: 5 }}>
                                        <Form.Group controlId="situacao" className="mb-3">
                                            <Form.Label>Situação do cadastro</Form.Label>
                                            <Form.Select type="select" placeholder="Situação" value={this.state.situacao || ''} onChange={this.atualizaSituacao}>
                                                <option value="A">Ativo</option>
                                                <option value="E">Excluído</option>
                                                <option value="S">Sem movimento</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="nome" className="mb-3">
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o nome" value={this.state.nome || ''} onChange={this.atualizaNome} required />
                                            <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="fantasia" className="mb-3">
                                            <Form.Label>Fantasia</Form.Label>
                                            <Form.Control type="text" placeholder="Insira a fantasia" value={this.state.fantasia || ''} onChange={this.atualizaFantasia} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <Form.Group controlId="tipo" className="mb-3">
                                            <Form.Label>Tipo Pessoa</Form.Label>
                                            <Form.Select type="select" placeholder="Selecione o tipo de contato" value={this.state.tipo || ''} onChange={this.atualizaTipoPessoa} required>
                                                <option value="">Selecione o tipo de pessoa</option>
                                                <option value="J">Pessoa Jurídica</option>
                                                <option value="F">Pessoa Física</option>
                                                <option value="E">Estrangeiro</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <Form.Group controlId="cnpj" className="mb-3">
                                            <Form.Label>
                                                {this.state.tipo === 'J' ? 'CNPJ' : 'CPF'}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                className={`form-control ${!this.state.cpfValido && this.state.cnpj.length === 11 && !this.state.cnpjValido ? 'is-invalid' : ''}`}
                                                placeholder="Insira o CPF / CNPJ"
                                                value={this.state.cnpj || ''}
                                                onChange={this.atualizaCpfCnpj}
                                                onBlur={this.validarCpf}
                                                required />
                                            <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <Form.Group controlId="ie_rg" className="mb-3">
                                            <Form.Label>
                                                {this.state.tipo === 'J' ? 'Inscrição Estadual' : 'RG'}
                                            </Form.Label>
                                            <Form.Control type="text" placeholder="Digite IE / RG" value={this.state.ie_rg || ''} onChange={this.atualizaIe_Rg} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <Form.Group controlId="sexo" className="mb-3">
                                            <Form.Label>Sexo</Form.Label>
                                            <Form.Select type="sexo" placeholder="Selecione o sexo" value={this.state.sexo || ''} onChange={this.atualizaSexo} >
                                                <option value="">Selecione</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="feminino">Feminino</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    {/* <Col xs={4} md={3}>
                                        <Form.Group controlId="descricao" className="mb-3">
                                            <Form.Label>Tipo Contato</Form.Label>
                                            <Form.Select as="select" placeholder="Selecione o tipo de contato" value={this.state.descricao || ''} onChange={this.atualizaDescricao} >
                                                <option value="">Selecione o tipo de contato</option>
                                                <option value="Cliente">Cliente</option>
                                                <option value="Fornecedor">Fornecedor</option>
                                                <option value="Tecnico">Tecnico</option>
                                                <option value="Transportador">Transportador</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col xs={4} md={9}>
                                        <Form.Group controlId="contribuinte" className="mb-3">
                                            <Form.Label>Contribuinte</Form.Label>
                                            <Form.Select as="select" placeholder="Selecione o tipo de pessoa" value={this.state.contribuinte || ''} onChange={this.atualizaContribuinte} required>
                                                <option value="">Selecione o tipo de pessoa</option>
                                                <option value="1">1 - Contribuinte ICMS</option>
                                                <option value="2">2 - Contribuinte isento de Inscrição no Cadastro de Contribuintes</option>
                                                <option value="9">9 - Não contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4} md={3}>
                                        <Form.Group controlId="limiteCredito" className="mb-3">
                                            <Form.Label>Limite Crédito</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o limite de crédito" value={this.state.limiteCredito || ''} onChange={this.atualizaLimiteCredito} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} md={3}>
                                        <Form.Group controlId="cep" className="mb-3">
                                            <Form.Label>CEP</Form.Label>
                                            <Form.Control type="text" placeholder="Digite o CEP" value={this.state.cep || ''} onChange={this.atualizaCep} onBlur={this.checkCEP} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={5} md={4}>
                                        <Form.Group controlId="endereco" className="mb-3">
                                            <Form.Label>Endereço</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o endereço" value={this.state.endereco || ''} onChange={this.atualizaEndereco} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        <Form.Group controlId="numero" className="mb-3">
                                            <Form.Label>Número</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o número" value={this.state.numero || ''} onChange={this.atualizaNumero} ref={this.numeroRef} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4} md={3}>
                                        <Form.Group controlId="complemento" className="mb-3">
                                            <Form.Label>Complemento</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o complemento" value={this.state.complemento || ''} onChange={this.atualizaComplemento} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Form.Group controlId="bairro" className="mb-3">
                                            <Form.Label>Bairro</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o bairro" value={this.state.bairro || ''} onChange={this.atualizaBairro} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Group controlId="cidade" className="mb-3">
                                            <Form.Label>Cidade</Form.Label>
                                            <Form.Control type="text" placeholder="Insira a cidade" value={this.state.cidade || ''} onChange={this.atualizaCidade} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Form.Group controlId="uf" className="mb-3">
                                            <Form.Label>UF</Form.Label>
                                            <Form.Select as="select" placeholder="Selecione o UF" value={this.state.uf || ''} onChange={this.atualizaUf} >
                                                <option value="">Selecione UF</option>
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
                                                <option value="EX">Estrangeiro</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={4}>
                                        <Form.Group controlId="fone" className="mb-3">
                                            <Form.Label>Fone</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o numero do telefone" value={this.state.fone || ''} onChange={this.atualizaFone} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <Form.Group controlId="celular" className="mb-3">
                                            <Form.Label>Celular</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o numero do celular" value={this.state.celular || ''} onChange={this.atualizaCelular} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <Form.Group controlId="email" className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Insira o e-mail" value={this.state.email || ''} onChange={this.atualizaEmail} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <Form.Group controlId="site" className="mb-3">
                                            <Form.Label>Site</Form.Label>
                                            <Form.Control type="site" placeholder="Insira o site" value={this.state.site || ''} onChange={this.atualizaSite} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <Form.Group controlId="tiposContato" className="mb-3 tiposcontato">
                                            <Form.Label>Tipos de contato</Form.Label>
                                            <Form.Control as="input" type="text" value={this.state.tiposContato.map(item => item.descricao).join(', ')} disabled />
                                        </Form.Group>
                                    </Col>
                                    {/* <Col xs={12} md={4}>
                                        <Form.Group controlId="emailNfe" className="mb-3">
                                            <Form.Label>Email NFE</Form.Label>
                                            <Form.Control type="email" placeholder="Insira o e-mail NFE" value={this.state.emailNfe || ''} onChange={this.atualizaEmailNfe} required />
                                            <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col> */}
                                </Row>
                                {/* <Form.Group controlId="informacaoContato" className="mb-3">
                                    <Form.Label>Informação Contato</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Insira a informação do contato" value={this.state.informacaoContato || ''} onChange={this.atualizaInformacaoContato} />
                                </Form.Group> */}
                                <Row className="text-center">
                                    <Col>
                                        <Form.Group controlId="buttonSalvar" className="mb-3">
                                            <div className="button-container d-flex justify-content-center">
                                                <button type="submit" className="botao-cadastro-contato">
                                                    Salvar
                                                </button>
                                                <button type="button" onClick={this.fecharModal} className="botao-cancelar-contato">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.ModalCpfValido} onHide={this.ModalCpfValido} centered>
                        <Modal.Header closeButton className="bg-danger text-white">
                            <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
                            <Modal.Title>Atenção</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '20px' }}>
                            CPF | CNPJ inválido. Corrija o campo antes de finalizar o cadastro.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botao-finalizarvenda" variant="secondary" onClick={this.ModalCpfValido}>Fechar</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.modalSalvarContato} onHide={this.modalSalvarContato} centered>
                        <Modal.Body>
                            <span style={{ display: 'block' }}><strong>Salvando contato...</strong></span>
                        </Modal.Body>
                    </Modal>

                </div>
            )
        }
    }
}

export default Contato;

