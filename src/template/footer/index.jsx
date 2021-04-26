import React from 'react';
import imgFooter from '../../assets/footer.png'

import './index.css'

function Footer() {
    return (
        <footer>
            <div className="footer">
                <div className="footer-img">
                    <div className="div-footer-img">
                        <img src={imgFooter} alt="footer.png" />
                        <span>contato@flow2pay.com.br</span>
                        <span>Av. Brigadeiro Faria Lima, 1811 – Conj. 918 a 922 – Jardins São Paulo – SP, 01452-001</span>
                    </div>
                </div>

                <div className="footer-vantagens">
                    <div className="div-vantagens">
                        <a className="footer-title" href="https://flow2pay.com.br/#Vantagens">Vantagens</a>
                        <span>Atendimento</span>
                        <span>Taxa</span>
                        <span>Liquidações</span>
                        <span>Cadastramento</span>
                    </div>
                </div>

                <div className="footer-servicos">
                    <div className="div-servicos">
                        <a className="footer-title" href="https://flow2pay.com.br/#servico1">Serviços</a>
                        <span>Remessas internacionais</span>
                        <span>Pagamentos internacionais (+ de 180 países)</span>
                        <span>Importação e Exportação</span>
                        <span>Investimentos e compra de imóveis no exterior</span>
                        <span>Assessoria para abertura de Empresa e conta corrente nos EUA</span>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="div-links">
                        <h3 className="footer-title">Links</h3>
                        <ul>
                            <li>
                                <a href="https://flow2pay.com.br/#quemsomos">
                                    <span>Quem somos</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://flow2pay.com.br/#servico1">
                                    <span>Serviços</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://flow2pay.com.br/en">
                                    <span>EN-US</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://flow2pay.com.br/politica-de-privacidade/">
                                    <span>Política de privacidade</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-end">Flow2pay® 2021 - Todos os direitos reservados</div>
        </footer>

    );
}

export default Footer;