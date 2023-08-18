import React from "react";
import '../css/Contato.css'

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from "react-bootstrap";
import { FaSync } from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner';
import { parse } from 'js2xmlparser';
import { BsPersonAdd } from 'react-icons/bs';



class Contato extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contatos: [],
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
            tiposContato: [],
            tipoContato: '',
            descricao: '',
            logradouro: '',
            localidade: '',
            carregando: true,
            modalAberta: false,
            validated: false
        }

        this.numeroRef = React.createRef();
    }

    componentDidMount() {
        this.buscarContato();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.logradouro !== this.state.logradouro) {
            this.atualizaEndereco({ target: { value: this.state.logradouro } });
        }
        if (prevState.localidade !== this.state.localidade) {
            this.atualizaCidade({ target: { value: this.state.localidade } });
        }
        if (prevState.cnpj !== this.state.cnpj) {
            this.atualizaCpfCnpj({ target: { value: this.state.cnpj } });
        }
        if (prevState.tipo !== this.state.tipo) {
            this.atualizaTipoPessoa({ target: { value: this.state.tipo } });
        }
    }

    componentWillUnmount() {

    }

    /**
     *  -------------------- CHAMADAS E CONSUMO DA API DE CONTATOS. -------------------- 
     */

    //GET - MÉTODO PARA CONSUMO DA API CONTATOS
    buscarContato = () => {
        fetch(`https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/contatos`)
            .then(resposta => resposta.json())
            .then(dados => {
                if (dados.retorno.contatos) {
                    this.setState({
                        contatos: dados.retorno.contatos,
                    })
                } else {
                    this.setState({ contatos: [] })
                }
                this.setState({ carregando: false })
            })
    }

    //GET - MÉTODO PARA CONSUMO DA API CONTATOS
    atualizaContato = (id) => {
        console.log("--------------------------------")

        // const cnpjSemPontuacao = cnpj.replace(/[^\d]+/g, '')  // Remove "." e "/" do CNPJ.

        fetch(`https://prod-api-okeaa-pdv.azurewebsites.net/api/v1/contato/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resposta => resposta.json())
            .then(dados => {
                console.log("Linha 80", dados)
                if (dados.retorno.contatos) {
                    this.setState({
                        id: dados.retorno.contatos[0].contato.id,
                        codigo: dados.retorno.contatos[0].contato.codigo,
                        nome: dados.retorno.contatos[0].contato.nome,
                        fantasia: dados.retorno.contatos[0].contato.fantasia,
                        tipo: dados.retorno.contatos[0].contato.tipo,
                        cnpj: dados.retorno.contatos[0].contato.cnpj,
                        ie_rg: dados.retorno.contatos[0].contato.ie_rg,
                        endereco: dados.retorno.contatos[0].contato.endereco,
                        numero: dados.retorno.contatos[0].contato.numero,
                        bairro: dados.retorno.contatos[0].contato.bairro,
                        cep: dados.retorno.contatos[0].contato.cep,
                        cidade: dados.retorno.contatos[0].contato.cidade,
                        complemento: dados.retorno.contatos[0].contato.complemento,
                        uf: dados.retorno.contatos[0].contato.uf,
                        fone: dados.retorno.contatos[0].contato.fone,
                        email: dados.retorno.contatos[0].contato.email,
                        situacao: dados.retorno.contatos[0].contato.situacao,
                        contribuinte: dados.retorno.contatos[0].contato.contribuinte,
                        site: dados.retorno.contatos[0].contato.site,
                        celular: dados.retorno.contatos[0].contato.celular,
                        dataAlteracao: dados.retorno.contatos[0].contato.dataAlteracao,
                        dataInclusao: dados.retorno.contatos[0].contato.dataInclusao,
                        sexo: dados.retorno.contatos[0].contato.sexo,
                        clienteDesde: dados.retorno.contatos[0].contato.clienteDesde,
                        limiteCredito: dados.retorno.contatos[0].contato.limiteCredito,
                        dataNascimento: dados.retorno.contatos[0].contato.dataNascimento,
                        tiposContato: [],
                        tipoContato: dados.retorno.contatos[0].contato.tipoContato,
                        descricao: dados.retorno.contatos[0].contato.descricao
                    })
                } else {
                    this.setState({ contatos: [] })
                }
                this.setState({ carregando: false });
                this.abrirModal();
            })
            .catch(error => console.error(error));
    }

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
        })
    }

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
        })
    }

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
                })
                console.log(data);
                this.numeroRef.current.focus();
            })
    }

    /**
     *  -------------------- SCRIPT´S DE AÇÕES PARA CADA UM DOS CAMPOS DE CADASTRO E ATUALIZAÇÃO. -------------------- 
     */

    atualizaCodigo = (event) => {
        const codigo = event.target.value;
        this.setState({
            codigo: codigo
        })
    }

    atualizaNome = (event) => {
        const nome = event.target.value
        this.setState({
            nome: nome
        })
    }

    atualizaFantasia = (event) => {
        const fantasia = event.target.value
        this.setState({
            fantasia: fantasia
        })
    }

    atualizaTipoPessoa = (event) => {
        console.log("Entrei em atualizarTipoPessoa")
        this.setState({
            tipo: event.target.value,
            tipoPessoa: event.target.value
        })
    }

    atualizaContribuinte = (event) => {
        const contribuinte = event.target.value
        this.setState({
            contribuinte: contribuinte
        })
    }

    atualizaCpfCnpj = (event) => {
        console.log("Entrei em atualizarCpfCnpj")
        this.setState({
            cnpj: event.target.value,
            cpf_cnpj: event.target.value
        })
    }

    atualizaIe_Rg = (event) => {
        const ie_rg = event.target.value
        this.setState({
            ie_rg: ie_rg
        })
    }

    atualizaEndereco = (event) => {
        console.log("Entrei em atualizarEndereco")
        this.setState({
            logradouro: event.target.value,
            endereco: event.target.value
        });
    };

    atualizaNumero = (event) => {
        const numero = event.target.value
        this.setState({
            numero: numero
        })
    }

    atualizaComplemento = (event) => {
        const complemento = event.target.value
        this.setState({
            complemento: complemento
        })
    }

    atualizaBairro = (event) => {
        const bairro = event.target.value
        this.setState({
            bairro: bairro
        })
    }

    atualizaCep = (event) => {
        const cep = event.target.value;
        const cepSemPontuacao = cep.replace(/[^\d]/g, "");
        const cepFormatado = cepSemPontuacao.replace(/(\d{5})(\d{3})/, "$1-$2");
        this.setState({
            cep: cepFormatado
        });
    }

    atualizaCidade = (event) => {
        console.log("Entrei em atualizarCidade")
        this.setState({
            localidade: event.target.value,
            cidade: event.target.value
        })
    }

    atualizaUf = (event) => {
        const uf = event.target.value
        this.setState({
            uf: uf
        })
    }

    atualizaFone = (event) => {
        const fone = event.target.value;
        const foneSemPontuacao = fone.replace(/[^\d]/g, "");
        const foneFormatado = foneSemPontuacao.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        this.setState({
            fone: foneFormatado
        });
    }

    atualizaCelular = (event) => {
        const celular = event.target.value;
        const celularSemPontuacao = celular.replace(/[^\d]/g, "");
        const celularFormatado = celularSemPontuacao.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        this.setState({
            celular: celularFormatado
        });
    }

    atualizaEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    // atualizaEmailNfe = (event) => {
    //     console.log(event.target.value); // Verifica se o valor do campo está sendo capturado corretamente

    //     this.setState({
    //         emailNfe: event.target.value
    //     })
    // }

    atualizaInformacaoContato = (event) => {
        this.setState({
            informacaoContato: event.target.value
        })
    }

    atualizaLimiteCredito = (event) => {
        this.setState({
            limiteCredito: event.target.value
        })
    }

    atualizaDescricao = (event) => {
        this.setState({
            descricao: event.target.value
        })
    }

    /**
     * -------------------- SCRIPT´S De AÇÃO PARA OS BOTÕES DA TELA CONTATO. -------------------- 
     */

    //Ações do botão SUBMIT (Cadastrar).
    submit = (event) => {
        event.preventDefault();
        console.log("logradouro: ", this.state.logradouro);
        console.log("endereco: ", this.state.endereco);
        console.log("-----------------------------------");
        console.log("localidade: ", this.state.localidade);
        console.log("cidade: ", this.state.cidade);
        console.log("-----------------------------------");
        console.log("tipo: ", this.state.tipo);
        console.log("tipoPessoa: ", this.state.tipoPessoa);
        console.log("-----------------------------------");
        console.log("cnpj: ", this.state.cnpj);
        console.log("cpf_cnpj: ", this.state.cpf_cnpj);

        if (this.state.id === 0) {
            const contato = {
                nome: this.state.nome,
                fantasia: this.state.fantasia,
                tipoPessoa: this.state.tipoPessoa,
                contribuinte: this.state.contribuinte,
                cpf_cnpj: this.state.cpf_cnpj,
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
            }
            const xmlContato = parse('contato', contato);
            this.cadastraContato(xmlContato);
        } else {
            const contato = {
                id: this.state.id,
                nome: this.state.nome,
                fantasia: this.state.fantasia,
                tipoPessoa: this.state.tipoPessoa,
                contribuinte: this.state.contribuinte,
                cpf_cnpj: this.state.cpf_cnpj,
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
            }
            const xmlContato = parse('contato', contato);
            this.atualizarContato(xmlContato);
        }

        //Realiza a validação dos campos obrigatorios.
        const form = event.currentTarget

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation(); // se algum campo obrigatorio nãao for preenchidos o modal é travado
            this.setState({ validated: true }); // atribui true na validação
        } else {
            event.preventDefault();
            this.setState({ validated: false }); // atribui true na validação
            this.fecharModal(); // se todos os campos estiverem preenchidos o modal é fechado
            this.buscarContato(); // atualiza a lista de produtos após a exclusão
        }
    }

    //Ação para limpar o campos do modal para cadastrar um novo cliente.
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
                descricao: ''
            })

        this.abrirModal();
    }

    //Ação para fechar o modal de cadastro e atualização.
    fecharModal = () => {
        this.setState({
            modalAberta: false
        });

        this.buscarContato()
    }

    //Ação para abrir o modal de cadastro e atualização.
    abrirModal = () => {
        this.setState({
            modalAberta: true
        });
    }

    /**
     *  -------------------- TABELA DE CLIENTES. -------------------- 
     */
    render() {
        if (this.state.carregando) {
            return (
                <div className="spinner-container">
                    <div className="d-flex align-items-center justify-content-center">
                        <div class="custom-loader"></div>
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
                        <div className="d-flex align-items-center mt-3 mb-3">
                            <span style={{ marginLeft: '0.8rem', fontWeight: 'bold', color: 'white' }}>Cadastrar um novo contato:</span>
                            <span style={{ marginRight: '0.8rem' }}>&nbsp;</span>
                            <button onClick={this.reset} className="d-flex align-items-center botao-cadastro-contato">
                                <BsPersonAdd style={{ marginRight: '0.6rem', fontSize: '1.3rem' }} />
                                Incluir Cadastro
                            </button>
                            <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white', fontSize: '2.5rem', fontStyle: 'italic', fontFamily: 'apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif' }}>Cadastro de contato e fornecedor</span>
                        </div>
                    </Container>


                    <Container fluid className="pb-5">
                        <Table striped bordered hover responsive="xl" >
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
                                {
                                    this.state.contatos.map((contatos) =>
                                        <tr key={contatos.contato.id}>
                                            <td>{contatos.contato.id}</td>
                                            <td>{contatos.contato.codigo}</td>
                                            <td>{contatos.contato.nome}</td>
                                            <td>{contatos.contato.cnpj}</td>
                                            <td>{contatos.contato.cidade}</td>
                                            <td>{contatos.contato.fone}</td>
                                            <td>
                                                <Button variant="warning" onClick={() => this.atualizaContato(contatos.contato.id)}>
                                                    <FaSync />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                }
                                {this.state.contatos.length === 0 && <tr><td colSpan="6">Nenhum contato cadastrado.</td></tr>}
                            </tbody>
                        </Table>
                    </Container>

                    <Modal show={this.state.modalAberta} onHide={this.fecharModal} size="xl" backdrop="static">
                        <Modal.Header closeButton className="modal-contato-header">
                            <Modal.Title>Cadastro/Atualização de Cliente e Fornecedor</Modal.Title>
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
                                    <Col xs={4} md={3}>
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
                                    <Col xs={4} md={3}>
                                        <Form.Group controlId="cnpj" className="mb-3">
                                            <Form.Label>CPF/CNPJ</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o CPF / CNPJ" value={this.state.cnpj || ''} onChange={this.atualizaCpfCnpj} required />
                                            <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4} md={3}>
                                        <Form.Group controlId="ie_rg" className="mb-3">
                                            <Form.Label>IE/RG</Form.Label>
                                            <Form.Control type="text" placeholder="Digite IE / RG" value={this.state.ie_rg || ''} onChange={this.atualizaIe_Rg} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4} md={3}>
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
                                    </Col>
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
                                    {/* <Col xs={12} md={4}>
                                        <Form.Group controlId="emailNfe" className="mb-3">
                                            <Form.Label>Email NFE</Form.Label>
                                            <Form.Control type="email" placeholder="Insira o e-mail NFE" value={this.state.emailNfe || ''} onChange={this.atualizaEmailNfe} required />
                                            <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col> */}
                                </Row>
                                <Form.Group controlId="informacaoContato" className="mb-3">
                                    <Form.Label>Informação Contato</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Insira a informação do contato" value={this.state.informacaoContato || ''} onChange={this.atualizaInformacaoContato} />
                                </Form.Group>
                                <Row className="text-center">
                                    <Col>
                                        <Form.Group controlId="buttonSalvar" className="mb-3">
                                            <div className="button-container d-flex justify-content-center">
                                                <button type="submit" className="botao-cadastro-contato">
                                                    Salvar
                                                </button>
                                                <button onClick={this.fecharModal} className="botao-cancelar-contato">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    }

}

export default Contato;

