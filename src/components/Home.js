import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

import '../css/Home.css';

function Home() {

    const navigate = useNavigate(); // Inicialize useNavigate

    const handleRedirect = (path) => {
        navigate(path); // Função para redirecionar
    };

    return (
        <div className="cards-container">
            <Card border="sucess" className="custom-card">
                <Card.Img variant="top" src="/assets/carrinho.png" />
                <Card.Body>
                    <Card.Title>Frente de Caixa</Card.Title>
                    <Card.Text>
                        Explore nossa frente de caixa: transações ágeis e eficazes. Clique para acessar.
                    </Card.Text>
                </Card.Body>
                <Button variant="secondary" onClick={() => handleRedirect('/FrenteCaixa')}>Acessar</Button>
            </Card>

            <Card border="sucess" className="custom-card">
                <Card.Img variant="top" src="/assets/cadastro.png" />
                <Card.Body>
                    <Card.Title>Cadastro de cliente e fornecedor</Card.Title>
                    <Card.Text>
                        Melhore suas relações comerciais. Acesse o cadastro de clientes e fornecedores aqui.
                    </Card.Text>
                </Card.Body>
                <Button variant="secondary" onClick={() => handleRedirect('/Contato')}>Acessar</Button>
            </Card>

            <Card border="sucess" className="custom-card">
                <Card.Img variant="top" src="/assets/cadastro.png" />
                <Card.Body>
                    <Card.Title>Cadastro de produto</Card.Title>
                    <Card.Text>
                        Aperfeiçoe seu controle de estoque. Acesse o cadastro de produtos aqui.
                    </Card.Text>
                </Card.Body>
                <Button variant="secondary" onClick={() => handleRedirect('/Produto')}>Acessar</Button>
            </Card>

            <Card border="success" className="custom-card">
                <Card.Img variant="top" src="/assets/cadastro.png" />
                <Card.Body>
                    <Card.Title>Cadastro de Listas de Preços</Card.Title>
                    <Card.Text>
                        Aprimore o controle das suas listas de preços. Acesse agora o cadastro e otimize a gestão de produtos.
                    </Card.Text>
                </Card.Body>
                <Button variant="secondary" onClick={() => handleRedirect('/ListaPrecos')}>Acessar</Button>
            </Card>


            <Card border="sucess" className="custom-card">
                <Card.Img variant="top" src="/assets/cadastro.png" />
                <Card.Body>
                    <Card.Title>Cadastro de loja</Card.Title>
                    <Card.Text>
                        Expanda seus negócios. Acesse o cadastro de loja e mantenha suas informações atualizadas.
                    </Card.Text>

                </Card.Body>
                <Button variant="secondary" onClick={() => handleRedirect('/Loja')}>Acessar</Button>
            </Card>

            <Card border="sucess" className="custom-card">
                <Card.Img variant="top" src="/assets/cadastro.png" />
                <Card.Body>
                    <Card.Title>Controle de caixa</Card.Title>
                    <Card.Text>
                        Mantenha um registro detalhado das transações financeiras da sua empresa com o controle de caixa.
                    </Card.Text>
                </Card.Body>
                <Button variant="secondary" onClick={() => handleRedirect('/ControleCaixa')}>Acessar</Button>
            </Card>
        </div>
    );
}

export default Home;

