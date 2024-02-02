import React from "react";
import '../css/Contato.css'

import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { BsInfoCircle } from 'react-icons/bs';
import { BsPersonAdd } from 'react-icons/bs';
import { BsShieldFillExclamation } from 'react-icons/bs';

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
            tipoContato: '',
            descricao: '',
            logradouro: '',
            localidade: '',
            obs: '',
            informacaoContato: '',
            emailNfe: '',
            cpfValido: '',
            cnpjValido: '',
            searchTerm: '',
            statusCode: '',
            carregando: true,
            ModalCpfValido: false,
            modalAberta: false,
            modalSalvarContato: false,
            modalErro: false,
            validated: false,
            selectedListId: null,
            showRenderTelaLista: false,
            dadosCarregados: false,
            dataNascimento: null,
            paginaAtual: 1,
            totalPaginas: '',
            selectedTiposContato: [],
            tiposContatoSelecionados: [], // Inicializa com os tiposContato passados ou um array vazio
            showModal: false,
            errorMessage: ''
        };

        this.numeroRef = React.createRef();

        // Ambiente Local
        // this.buscarContatoEndpoint = 'http://localhost:8080/api/v1/contatos'
        // this.atualizaContatoEndpoint = 'http://localhost:8080/api/v1/contato'
        // this.buscarTipoContatoEndpoint = 'http://localhost:8080/api/v1/selecionartipocontato'
        // this.cadastraContatoEndpoint = 'http://localhost:8080/api/v1/cadastrarcontato'
        // this.atualizarContatoEndpoint = 'http://localhost:8080/api/v1/atualizarcontato/'

        // Ambiente Desenvolvimento
        this.buscarContatoEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/contatos'
        this.atualizaContatoEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/contato'
        this.buscarTipoContatoEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/selecionartipocontato'
        this.cadastraContatoEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/cadastrarcontato'
        this.atualizarContatoEndpoint = 'http://okeaaerphost.ddns.net:8080/api/v1/atualizarcontato/'

        // Ambiente Produção
        // this.buscarContatoEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/contatos'
        // this.atualizaContatoEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/contato'
        // this.buscarTipoContatoEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/contatos'
        // this.cadastraContatoEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/cadastrarcontato'
        // this.atualizarContatoEndpoint = 'https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/atualizarcontato/'
    };

    async componentDidMount() {
        try {
            await this.buscarContato();
            await this.buscarTipoContato();
        } catch (error) {
            this.setState({ erro: `Erro ao conectar a API: ${error.message}` });
        }
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

    buscarContato = (pagina) => {
        // Se a página não for fornecida, utilize a página atual do estado
        const paginaRequisicao = pagina !== undefined ? pagina : this.state.paginaAtual;

        fetch(`${this.buscarContatoEndpoint}/page=${paginaRequisicao}`, {
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
                        paginaAtual: paginaRequisicao,  // Atualiza a página atual no estado
                        carregando: false,
                    });
                }
            })
            .catch(error => {
                // console.error('Erro ao buscar contatos:', error);
                this.setState({ carregando: true, showModal: true, errorMessage: 'Erro ao buscar contatos. Por favor, tente novamente mais tarde.' });
            });
    };

    handleSelecionaPagina = (pagina) => {
        this.setState({ carregando: false });
        this.buscarContato(pagina);
    };

    //GET - MÉTODO PARA CONSUMO DE UM CONTATO PELO ID
    atualizaContato = (id) => {
        this.setState({ carregando: true, dadosCarregados: false });

        fetch(`${this.atualizaContatoEndpoint}/${id}`, {
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

                    const tiposContatoCliente = contato.tiposContato.map(item => item.tipoContato.descricao);
                    this.setState({ tiposContatoSelecionados: tiposContatoCliente });

                    const converterDataFormato = (data) => {
                        const [ano, mes, dia] = data.split('-');
                        return `${dia}/${mes}/${ano}`;
                    };

                    const formatarDataHora = (dataHora) => {
                        const [data, hora] = dataHora.split(' ');
                        const [ano, mes, dia] = data.split('-');
                        const [horas, minutos, segundos] = hora.split(':');

                        return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
                    };

                    // console.log(tiposContato); // Adicione o console.log aqui
                    this.setState({
                        id: contato.id || '',
                        codigo: contato.codigo || '',
                        nome: contato.nome || '',
                        fantasia: contato.fantasia || '',
                        tipo: contato.tipo || '',
                        cnpj: contato.cnpj || '',
                        ie_rg: contato.ie_rg || '',
                        endereco: contato.endereco || '',
                        numero: contato.numero || '',
                        bairro: contato.bairro || '',
                        cep: contato.cep || '',
                        cidade: contato.cidade || '',
                        complemento: contato.complemento || '',
                        uf: contato.uf || '',
                        fone: contato.fone || '',
                        email: contato.email || '',
                        situacao: contato.situacao || '',
                        contribuinte: contato.contribuinte || '',
                        site: contato.site || '',
                        celular: contato.celular || '',
                        dataAlteracao: formatarDataHora(contato.dataAlteracao) || '',
                        dataInclusao: contato.dataInclusao || '',
                        sexo: contato.sexo || '',
                        clienteDesde: converterDataFormato(contato.clienteDesde) || '',
                        limiteCredito: parseFloat(contato.limiteCredito).toFixed(2) || '',
                        dataNascimento: converterDataFormato(contato.dataNascimento) || '',
                        tiposContato: tiposContato || '',
                        carregando: false,
                        dadosCarregados: true,
                    });
                }
            })
            .catch(error => {
                // console.error(error);
                this.setState({ carregando: true, showModal: true, dadosCarregados: false, errorMessage: 'Erro ao buscar contato. Por favor, tente novamente mais tarde.' });
            });
    };

    //GET - MÉTODO PARA CONSUMO DE TIPOS DE CONTATO DO BANCO DE DADOS.
    buscarTipoContato = () => {
        this.setState({ carregando: true });

        fetch(this.buscarTipoContatoEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const tiposContatoOptions = data.map(item => ({
                    descricao: item.descricao,
                    carregando: false,
                }));

                // console.log(tiposContatoOptions)

                // Adiciona todos os tipos de contato obtidos da API à lista de opções
                this.setState({ tiposContatoOptions: tiposContatoOptions });
            })
            .catch(error => {
                // console.error(error);
                this.setState({ carregando: true, showModal: true, errorMessage: 'Erro ao buscar os tipos de contato. Por favor, tente novamente mais tarde.' });
            });
    };


    //POST - MÉTODO PARA INSERIR UM NOVO CONTATO NA API CONTATOS
    cadastraContato = (xmlContato) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlContato, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);

        return fetch(this.cadastraContatoEndpoint, {

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

    //PUT - MÉTODO PARA ATUALIZAR UM CONTATO EXISTENTE NA API CONTATOS
    atualizarContato = (xmlContato) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlContato, 'text/xml');
        const stringXml = new XMLSerializer().serializeToString(xml);
        const id = xml.querySelector('id').textContent;

        return fetch(this.atualizarContatoEndpoint + id, {
            method: 'PUT',
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
                // console.log(data);
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
                    cpf_cnpj: cnpj,
                    cpfValido: false, // Define a flag de CPF válido como false
                    cnpjValido: false // Define a flag de CNPJ válido como false
                });
                return; // Retorna antecipadamente para evitar ações adicionais
            };

            const cpfFormatado = cpfCnpjSemPontuacao.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            this.setState({
                cnpj: cpfFormatado,
                cpf_cnpj: cpfFormatado,
                cpfValido: true, // Define a flag de CPF válido como true
                cnpjValido: false // Define a flag de CNPJ válido como false
            });
        }
        // Verifica se é um CNPJ válido
        else if (cpfCnpjSemPontuacao.length === 14) {
            if (!this.validarCNPJ(cpfCnpjSemPontuacao)) {
                this.setState({
                    cnpj: cnpj,
                    cpf_cnpj: cnpj,
                    cpfValido: false, // Define a flag de CPF válido como false
                    cnpjValido: false // Define a flag de CNPJ válido como false
                });
                return; // Retorna antecipadamente para evitar ações adicionais
            };

            const cnpjFormatado = cpfCnpjSemPontuacao.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            this.setState({
                cnpj: cnpjFormatado,
                cpf_cnpj: cnpjFormatado,
                cpfValido: false, // Define a flag de CPF válido como false
                cnpjValido: true // Define a flag de CNPJ válido como true
            });
        }
        // Caso contrário, mantém o valor original e define as flags de validação como false
        else {
            this.setState({
                cnpj: cnpj,
                cpf_cnpj: cnpj,
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

    atualizaDataNascimento = (event) => {
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
        this.setState({ dataNascimento: valorInput });
    };

    atualizaClienteDesde = (event) => {
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
        this.setState({ clienteDesde: valorInput });
    };

    // atualizaEmailNfe = (event) => {
    //     const emailNfe = event.target.value
    //     this.setState({
    //         emailNfe: emailNfe
    //     })
    // }

    // atualizaInformacaoContato = (event) => {
    //     const informacaoContato = event.target.value
    //     this.setState({
    //         informacaoContato: informacaoContato
    //     })
    // }

    // atualizaObs = (event) => {
    //     const obs = event.target.value
    //     this.setState({
    //         obs: obs
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

    //Ação para limpar os campos da tela após cadastrar um novo cliente.
    reset = (event) => {
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
                dataInclusao: '',
                sexo: '',
                clienteDesde: '',
                limiteCredito: '',
                dataNascimento: '',
                dataAlteracao: '',
                tipoContato: '',
                descricao: '',
                ModalCpfValido: false,
                informacaoContato: '',
                obs: '',
                emailNfe: '',
                tiposContato: [],
            });
    };

    //Ações do botão SUBMIT (Cadastrar).
    submit = (event) => {
        event.preventDefault();

        // Realiza a validação dos campos obrigatórios.
        const form = event.currentTarget;
        const isValid = form.checkValidity();

        if (!isValid) {
            event.stopPropagation();
            this.setState({ validated: true });
            return;
        }

        if (isValid === false) {
            event.preventDefault();
            event.stopPropagation(); // Se algum campo obrigatório não for preenchido, o modal é travado.
            this.setState({ validated: true });
        } else {
            // Verifica se o CPF é válido.
            if (this.validarCPF(this.state.cnpj) || this.validarCNPJ(this.state.cnpj)) {
                event.preventDefault();
                this.setState({ validated: false });

                const tiposContatos = this.state.tiposContatoSelecionados.map(descricao => ({
                    descricao
                }));

                const createXmlNodeIfNotEmpty = (nodeName, value) => {
                    if (value !== '' && value !== undefined) {
                        return `<${nodeName}>${value}</${nodeName}>`;
                    } else {
                        return '';
                    };
                };

                const xml = `<?xml version="1.0"?>
                <contato>
                    ${createXmlNodeIfNotEmpty('id', this.state.id)}
                    ${createXmlNodeIfNotEmpty('nome', this.state.nome)}
                    ${createXmlNodeIfNotEmpty('fantasia', this.state.fantasia)}
                    ${createXmlNodeIfNotEmpty('tipoPessoa', this.state.tipoPessoa)}
                    ${createXmlNodeIfNotEmpty('contribuinte', this.state.contribuinte)}
                    ${createXmlNodeIfNotEmpty('cpf_cnpj', this.state.cpf_cnpj)}
                    ${createXmlNodeIfNotEmpty('ie_rg', this.state.ie_rg)}
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
                    ${createXmlNodeIfNotEmpty('obs', this.state.obs)}
                    ${createXmlNodeIfNotEmpty('informacaoContato', this.state.informacaoContato)}
                    ${createXmlNodeIfNotEmpty('limiteCredito', this.state.limiteCredito)}
                    ${createXmlNodeIfNotEmpty('codigo', this.state.codigo)}
                    ${createXmlNodeIfNotEmpty('site', this.state.site)}
                    ${createXmlNodeIfNotEmpty('descricao', this.state.descricao)}
                    ${createXmlNodeIfNotEmpty('sexo', this.state.sexo)}
                    ${createXmlNodeIfNotEmpty('situacao', this.state.situacao)}
                    ${createXmlNodeIfNotEmpty('emailNfe', this.state.emailNfe)}
                    ${createXmlNodeIfNotEmpty('dataNascimento', this.state.dataNascimento)}
                    ${createXmlNodeIfNotEmpty('clienteDesde', this.state.clienteDesde)}
                    <tipos_contatos>
                        ${tiposContatos.map(tipo => `
                        <tipo_contato>
                            ${createXmlNodeIfNotEmpty('descricao', tipo.descricao)}
                        </tipo_contato>`).join('')}
                    </tipos_contatos>
                </contato>`;

                // console.log(xml);

                if (this.state.id === 0) {
                    this.cadastraContato(xml)
                        .then(responseData => {
                            if (responseData.data !== '') { // Verifique se a resposta não está vazia.
                                this.buscarContato();
                                this.modalSalvarContato();
                                setTimeout(() => {
                                    this.novaRenderizacao();
                                    this.reset();
                                }, 1000);
                            } else {
                                this.buscarContato();
                                this.modalErro();
                            }
                        })
                        .catch(error => {
                            console.error('Erro na chamada da API:', error);
                            this.modalErro();
                        });
                } else {
                    this.atualizarContato(xml)
                        .then(responseData => {
                            if (responseData.data !== '') { // Verifique se a resposta não está vazia.
                                this.buscarContato();
                                this.modalSalvarContato();
                                setTimeout(() => {
                                    this.novaRenderizacao();
                                    this.reset();
                                }, 1000);
                            } else {
                                this.buscarContato();
                                this.modalErro();
                            }
                        })
                        .catch(error => {
                            console.error('Erro na chamada da API:', error);
                            this.modalErro();
                        });
                }
            } else {
                this.ModalCpfValido();
            }
        }
    };


    //-----------------------------------------------------------------------------------------------------------------------|
    //--------------------------------------------- SCRIPT´S DE AÇÃO DOS MODALS. --------------------------------------------|
    //-----------------------------------------------------------------------------------------------------------------------|

    //Ação para fechar o modal de cadastro e atualização.
    // fecharModal = () => {
    //     this.setState({
    //         modalAberta: false,
    //         validated: false
    //     });
    // };

    // //Ação para abrir o modal de cadastro e atualização.
    // abrirModal = () => {
    //     this.setState({
    //         modalAberta: true
    //     });
    // };

    ModalCpfValido = () => {
        this.setState((prevState) => ({
            ModalCpfValido: !prevState.ModalCpfValido,
        }));
    };

    modalErro = () => {
        this.setState({
            modalErro: !this.state.modalErro,
        });
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

    closeModalErro = () => {
        this.setState({ showModal: false, errorMessage: '' });
    }

    campoBusca = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    novaRenderizacao = (contato) => {
        this.setState({
            selectedListId: contato,
            showRenderTelaLista: false
        });
    };

    abrirTelaRenderTelaLista = (contato) => {
        this.setState({ selectedListId: contato });
    };


    abrirRenderTelaLista = () => {
        this.setState({
            showRenderTelaLista: true
        });
    };

    render() {

        const { selectedListId, showRenderTelaLista, carregando, searchTerm, modalSalvarContato, contatos } = this.state
        const { paginaAtual, totalPaginas } = this.state;
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
                        <div className="text-loading text-white">Carregando contatos...</div>
                    </div>
                    <div>
                        {/* Modal de erro */}
                        <Modal className="modal-erro" show={showModal} onHide={this.closeModalErro}>
                            <Modal.Header closeButton className="bg-danger text-white">
                                <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
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
                <div className="grid-contato-table">
                    <Container fluid>
                        <Col className="col">
                            <div className="d-flex align-items-center mt-3 mb-3">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Cadastrar um novo contato:</span>
                                <span style={{ marginRight: '0.8rem' }}>&nbsp;</span>
                                <button onClick={() => {
                                    this.setState({ dadosCarregados: true });
                                    this.abrirRenderTelaLista();
                                    this.reset();
                                }}
                                    className="d-flex align-items-center botao-cadastro-contato">
                                    <BsPersonAdd style={{ marginRight: '0.6rem', fontSize: '1.3rem' }} />
                                    Incluir Cadastro
                                </button>
                                <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white', fontSize: '1.9rem', fontStyle: 'italic' }}>CLIENTES E FORNECEDORES</span>
                            </div>
                        </Col>
                        <Col className="col">
                            <div className="d-flex align-items-center mt-3 mb-3">
                                <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Buscar contato:</span>
                                <input type="text" placeholder="Digite o termo de busca..." value={searchTerm} onChange={this.campoBusca} className="form-control ml-2" />
                            </div>
                        </Col>
                    </Container>
                    <div className="table-container-contato">
                        <Container fluid className="pb-5">
                            <Table id="tabelaContatos" bordered hover variant="warning" responsive="xl">
                                <thead>
                                    <tr>
                                        <th title="Identificador">ID</th>
                                        <th title="Código">Código</th>
                                        <th title="Nome">Nome</th>
                                        <th title="CPF / CNPJ">CPF/CNPJ</th>
                                        <th title="Cidade">Cidade</th>
                                        <th title="Telefone">Telefone</th>
                                        {/* <th title="Opções">Opções</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {contatos.map((contatos) => {
                                        const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase());
                                        const normalizedDescription = removeAccents(contatos.contato.nome.toLowerCase());
                                        const normalizedCodigo = contatos.contato.codigo.toLowerCase();

                                        // Verifique se a situação é diferente de 'E' antes de renderizar a linha
                                        if (contatos.contato.situacao !== 'E' && contatos.contato.situacao !== 'I' && contatos.contato.situacao !== 'S' &&
                                            (normalizedDescription.includes(normalizedSearchTerm) || normalizedCodigo.includes(normalizedSearchTerm))) {
                                            return (
                                                <tr key={contatos.contato.id}
                                                    onClick={() => {
                                                        this.atualizaContato(contatos.contato.id);
                                                        this.novaRenderizacao(contatos.contato.id);
                                                        this.buscarTipoContato()
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
                                                    onMouseLeave={(e) => e.currentTarget.style.cursor = 'default'}>
                                                    <td>{contatos.contato.id}</td>
                                                    <td>{contatos.contato.codigo}</td>
                                                    <td>{contatos.contato.nome}</td>
                                                    <td>{contatos.contato.cnpj}</td>
                                                    <td>{contatos.contato.cidade}</td>
                                                    <td>{contatos.contato.fone}</td>
                                                    {/* <td>
                                                        <Button variant="warning" title="Editar contato" onClick={() => this.atualizaContato(contatos.contato.id)}>
                                                            <BsPencilSquare />
                                                        </Button>
                                                    </td> */}
                                                </tr>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                    {contatos.length === 0 && <tr><td colSpan="6">Nenhum contato cadastrado.</td></tr>}
                                </tbody>
                            </Table>
                        </Container>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                        <div>
                            <Pagination className="pagination-contato" >
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
                    <Modal show={modalSalvarContato} onHide={this.modalSalvarContato} centered>
                        <Modal.Body>
                            <span style={{ display: 'block' }}><strong>Salvando contato...</strong></span>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    };

    handleTipoContatoChange = (tipoContato) => {
        const { tiposContatoSelecionados } = this.state;
        let updatedTiposContatoSelecionados = [...tiposContatoSelecionados];

        if (updatedTiposContatoSelecionados.includes(tipoContato)) {
            updatedTiposContatoSelecionados = updatedTiposContatoSelecionados.filter(item => item !== tipoContato);
        } else {
            updatedTiposContatoSelecionados.push(tipoContato);
        }
        // console.log(updatedTiposContatoSelecionados)
        this.setState({ tiposContatoSelecionados: updatedTiposContatoSelecionados });
    };

    renderTelaLista = () => {

        const { validated, cpfValido, cnpjValido, tiposContato, ModalCpfValido, modalErro, modalSalvarContato, selectedTiposContato, tiposContatoSelecionados, tiposContatoOptions } = this.state;
        const { id, codigo, situacao, nome, fantasia, tipo, cnpj, ie_rg, sexo, contribuinte, limiteCredito, cep, endereco, numero, complemento, bairro, cidade, uf, fone, celular, email, site, dataAlteracao, dataNascimento, clienteDesde } = this.state;
        const { dadosCarregados, showModal, errorMessage } = this.state;


        if (!dadosCarregados) {
            return (
                <div className="spinner-container">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="custom-loader"></div>
                    </div>
                    <div >
                        <div className="text-loading text-white">Carregando contato...</div>
                    </div>
                    <div>
                        {/* Modal de erro */}
                        <Modal className="modal-erro" show={showModal} onHide={this.closeModalErro}>
                            <Modal.Header closeButton className="bg-danger text-white">
                                <BsShieldFillExclamation className="mr-2 fa-2x" style={{ marginRight: '10px' }} />
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
                        <div className="grid-cadastro-contato">
                            <Row>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="mb-3" style={{ fontWeight: 'bold', color: 'gray', fontSize: '1.6rem', fontStyle: 'italic' }}>CLIENTES E FORNECEDORES</span>
                                    <Form.Group controlId="buttonSalvar" className="mb-3">
                                        <div className="button-container d-flex">
                                            <button
                                                type="submit"
                                                className="botao-salvar-contato"
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    this.novaRenderizacao();
                                                    this.reset();
                                                }}
                                                className="botao-cancelar-contato"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </Form.Group>
                                </div>
                            </Row>
                            <div className="mb-4">
                                <div>
                                    {Boolean(id) && (
                                        <h5 style={{ fontSize: '15px' }}>Data alteração: {dataAlteracao}</h5>
                                    )}
                                    <h5>Dados Cadastrais</h5>
                                </div>
                            </div>
                            <Row>
                                <Col xs={2} md={2}>
                                    <Form.Group controlId="id" className="mb-3 form-row" as={Col}>
                                        <Form.Label type="text">ID</Form.Label>
                                        <Form.Control type="text" value={id || ''} readOnly disabled />
                                    </Form.Group>
                                </Col>
                                <Col xs={2} md={2}>
                                    <Form.Group controlId="codigo" className="mb-3">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id="codigoContatoInfo">
                                                    Opcional.
                                                </Tooltip>
                                            }>
                                            <Form.Label>
                                                Código <BsInfoCircle className="icon-info" />
                                            </Form.Label>
                                        </OverlayTrigger>
                                        <Form.Control type="text" placeholder="Digite o código" value={codigo || ''} onChange={this.atualizaCodigo} />
                                    </Form.Group>
                                </Col>
                                <Col xs={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }}>
                                    <Form.Group controlId="dataNascimento" className="mb-3">
                                        <Form.Label>Cliente desde</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="dd/mm/yyyy"
                                            value={clienteDesde || new Date().toLocaleDateString()}
                                            onChange={this.atualizaClienteDesde}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={{ span: 4 }}>
                                    <Form.Group controlId="situacao" className="mb-3">
                                        <Form.Label>Situação do cadastro</Form.Label>
                                        <Form.Select type="select" placeholder="Situação" value={situacao || ''} onChange={this.atualizaSituacao}>
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
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id="nomeContatoInfo">
                                                    Nome completo do contato.
                                                </Tooltip>
                                            }>
                                            <Form.Label>
                                                Nome <BsInfoCircle className="icon-info" />
                                            </Form.Label>
                                        </OverlayTrigger>
                                        <Form.Control type="text" placeholder="Digite o nome" value={nome || ''} onChange={this.atualizaNome} required />
                                        <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="fantasia" className="mb-3">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id="fantasiaContatoInfo">
                                                    Nome de fantasia ou apelido.
                                                </Tooltip>
                                            }>
                                            <Form.Label>
                                                Fantasia <BsInfoCircle className="icon-info" />
                                            </Form.Label>
                                        </OverlayTrigger>
                                        <Form.Control type="text" placeholder="Digite a fantasia" value={fantasia || ''} onChange={this.atualizaFantasia} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={3}>
                                    <Form.Group controlId="tipo" className="mb-3">
                                        <Form.Label>Tipo Pessoa</Form.Label>
                                        <Form.Select type="select" placeholder="Selecione o tipo de contato" value={tipo || ''} onChange={this.atualizaTipoPessoa} required>
                                            <option value="">Selecione o tipo de pessoa</option>
                                            <option value="J">Pessoa Jurídica</option>
                                            <option value="F">Pessoa Física</option>
                                            {/* <option value="E">Estrangeiro</option> */}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group controlId="cnpj" className="mb-3">
                                        <Form.Label>
                                            {tipo === 'J' ? 'CNPJ' : 'CPF'}
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            className={`form-control ${!cpfValido && cnpj.length === 11 && !cnpjValido ? 'is-invalid' : ''}`}
                                            placeholder="Digite o CPF / CNPJ"
                                            value={cnpj || ''}
                                            onChange={this.atualizaCpfCnpj}
                                            onBlur={this.validarCpf}
                                            required />
                                        <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group controlId="ie_rg" className="mb-3">
                                        <Form.Label>
                                            {tipo === 'J' ? 'Inscrição Estadual' : 'RG'}
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Digite IE / RG" value={ie_rg || ''} onChange={this.atualizaIe_Rg} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group controlId="sexo" className="mb-3">
                                        <Form.Label>Sexo</Form.Label>
                                        <Form.Select type="sexo" placeholder="Selecione o sexo" value={sexo || ''} onChange={this.atualizaSexo} >
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
                                        <Form.Select as="select" placeholder="Selecione o tipo de contribuinte" value={contribuinte || ''} onChange={this.atualizaContribuinte} required>
                                            <option value="">Selecione o tipo de contribuinte</option>
                                            <option value="1">1 - Contribuinte ICMS</option>
                                            <option value="2">2 - Contribuinte isento de Inscrição no Cadastro de Contribuintes</option>
                                            <option value="9">9 - Não contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={4} md={3}>
                                    <Form.Group controlId="limiteCredito" className="mb-3">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id="limiteCreditoContatoInfo">
                                                    Para não limitar o crédito do cliente, deixe este campo zerado
                                                </Tooltip>
                                            }>
                                            <Form.Label>
                                                Limite Crédito <BsInfoCircle className="icon-info" />
                                            </Form.Label>
                                        </OverlayTrigger>
                                        <Form.Control type="text" placeholder="Digite o limite de crédito" value={limiteCredito || ''} onChange={this.atualizaLimiteCredito} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="mb-4">
                                <h5>Endereço</h5>
                            </div>
                            <Row>
                                <Col xs={4} md={3}>
                                    <Form.Group controlId="cep" className="mb-3">
                                        <Form.Label>CEP</Form.Label>
                                        <Form.Control type="text" placeholder="Digite o CEP" value={cep || ''} onChange={this.atualizaCep} onBlur={this.checkCEP} />
                                    </Form.Group>
                                </Col>
                                <Col xs={5} md={4}>
                                    <Form.Group controlId="endereco" className="mb-3">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id="enderecoContatoInfo">
                                                    Endereço Geral (Exemplo: Rua Assis Brasil)
                                                </Tooltip>
                                            }>
                                            <Form.Label>
                                                Endereço <BsInfoCircle className="icon-info" />
                                            </Form.Label>
                                        </OverlayTrigger>
                                        <Form.Control type="text" placeholder="Digite o endereço" value={endereco || ''} onChange={this.atualizaEndereco} />
                                    </Form.Group>
                                </Col>
                                <Col xs={2} md={2}>
                                    <Form.Group controlId="numero" className="mb-3">
                                        <Form.Label>Número</Form.Label>
                                        <Form.Control type="text" placeholder="Digite o número" value={numero || ''} onChange={this.atualizaNumero} ref={this.numeroRef} />
                                    </Form.Group>
                                </Col>
                                <Col xs={4} md={3}>
                                    <Form.Group controlId="complemento" className="mb-3">
                                        <Form.Label>Complemento</Form.Label>
                                        <Form.Control type="text" placeholder="Digite o complemento" value={complemento || ''} onChange={this.atualizaComplemento} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Form.Group controlId="bairro" className="mb-3">
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control type="text" placeholder="Digite o bairro" value={bairro || ''} onChange={this.atualizaBairro} />
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Form.Group controlId="cidade" className="mb-3">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control type="text" placeholder="Digite a cidade" value={cidade || ''} onChange={this.atualizaCidade} />
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Form.Group controlId="uf" className="mb-3">
                                        <Form.Label>UF</Form.Label>
                                        <Form.Select as="select" placeholder="Selecione o UF" value={uf || ''} onChange={this.atualizaUf} >
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
                                        <Form.Control type="text" placeholder="Digite o numero do telefone" value={fone || ''} onChange={this.atualizaFone} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Group controlId="celular" className="mb-3">
                                        <Form.Label>Celular</Form.Label>
                                        <Form.Control type="text" placeholder="Digite o numero do celular" value={celular || ''} onChange={this.atualizaCelular} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Group controlId="email" className="mb-3">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id="emailContatoInfo">
                                                    Para informar mais do que um e-mail utilize o separador ';' (ponto e vírgula) ou ',' (vírgula). Comprimento máximo de 60 caracteres para a NF-e e NFC-e e para a NFS-e de 80 caracteres.
                                                </Tooltip>
                                            }>
                                            <Form.Label>
                                                Email <BsInfoCircle className="icon-info" />
                                            </Form.Label>
                                        </OverlayTrigger>
                                        <Form.Control type="email" placeholder="Digite o e-mail" value={email || ''} onChange={this.atualizaEmail} />
                                    </Form.Group>
                                </Col>
                                <div className="mb-4">
                                    <h5>Dados adicionais</h5>
                                </div>
                                {/* <Col xs={12} md={4}>
                                <Form.Group controlId="informacaoContato" className="mb-3">
                                    <Form.Label>Informação Contato</Form.Label>
                                    <Form.Control type="text" placeholder="Digite a informação do contato" value={informacaoContato || ''} onChange={this.atualizaInformacaoContato} />
                                </Form.Group>
                            </Col> */}
                                <Col xs={4} md={3}>
                                    <Form.Group controlId="dataNascimento" className="mb-3">
                                        <Form.Label>Data de Nascimento</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Digite a data de nascimento"
                                            value={dataNascimento}
                                            onChange={this.atualizaDataNascimento}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={4}>
                                    <Form.Group controlId="site" className="mb-3">
                                        <Form.Label>Site</Form.Label>
                                        <Form.Control type="site" placeholder="Digite o site" value={site || ''} onChange={this.atualizaSite} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Group controlId="tiposContato" className="mb-3 tiposcontato">
                                        <Form.Label>
                                            Tipos de contato <BsInfoCircle className="icon-info" />
                                        </Form.Label>
                                        <div>
                                            {tiposContatoOptions.map(option => (
                                                <Form.Check
                                                    key={option.id}
                                                    type="checkbox"
                                                    id={`tipoContato-${option.id}`}
                                                    label={option.descricao}
                                                    checked={tiposContatoSelecionados.includes(option.descricao)}
                                                    onChange={() => this.handleTipoContatoChange(option.descricao)}
                                                />
                                            ))}
                                        </div>
                                    </Form.Group>
                                </Col>
                                {/* <Col xs={12} md={12}>
                                <Form.Group controlId="Observações" className="mb-3">
                                    <Form.Label>Observações</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={obs || ''} onChange={this.atualizaObs} />
                                </Form.Group>
                            </Col> */}
                                {/* <Col xs={12} md={4}>
                                        <Form.Group controlId="emailNfe" className="mb-3">
                                            <Form.Label>Email NFE</Form.Label>
                                            <Form.Control type="email" placeholder="Digite o e-mail NFE" value={this.state.emailNfe || ''} onChange={this.atualizaEmailNfe} required />
                                            <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col> */}
                            </Row>

                            {/* <Row className="text-center">
                            <Col>
                                <Form.Group controlId="buttonSalvar" className="mb-3">
                                    <div className="button-container d-flex justify-content-center">
                                        <button type="submit" className="botao-cadastro-contato">
                                            Salvar
                                        </button>
                                        <button type="button" onClick={() => this.novaRenderizacao()}
                                            className="botao-cancelar-contato">
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

                            <Modal show={ModalCpfValido} onHide={this.ModalCpfValido} centered>
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

                            <Modal show={modalSalvarContato} onHide={this.modalSalvarContato} centered>
                                <Modal.Body>
                                    <span style={{ display: 'block' }}><strong>Salvando contato...</strong></span>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </Form>
                </Container >
            )
        }
    }
}

export default Contato;

