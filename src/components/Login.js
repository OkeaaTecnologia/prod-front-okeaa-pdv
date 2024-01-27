import React from 'react';
import '../css/Login.css';

import Form from "react-bootstrap/Form";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: ''
        });
    };

    handleLogin = () => {
        const { username, password } = this.state;

        // Verificar as credenciais
        if (username === 'Administrador' && password === 'Teste2024') {
            // Salvar a informação de autenticação no Local Storage
            localStorage.setItem('isLoggedIn', 'true');

            // Chame a função onLogin passada via props para notificar o componente pai
            this.props.onLogin();
        } else {
            this.setState({
                error: 'Credenciais inválidas'
            });
        }
    };

    handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            // Tecla Enter pressionada, chamar a função handleLogin
            this.handleLogin();
        }
    };

    componentDidMount() {
        document.body.classList.add('login-body');
    }

    componentWillUnmount() {
        document.body.classList.remove('login-body');
    }


    render() {
        return (
            <div>
                <img src="/assets/logo.png" alt="Logo" className="login-logo" />
                <div className="text">
                    ERP
                </div>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    this.handleLogin();
                }}>
                    <div className="field">
                        <div className="fas fa-envelope"></div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Usuário"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            className="login-input" // Adicione a classe aqui
                        />
                    </div>
                    <div className="field">
                        <div className="fas fa-lock"></div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            onKeyUp={this.handleKeyPress}
                            className="login-input" // Adicione a classe aqui
                        />
                    </div>
                    <button className="button-entrar" onClick={this.handleLogin}>Entrar</button>
                </Form>
                {this.state.error && <p className="error-message">{this.state.error}</p>}
            </div>

        );
    }
}

export default Login;
