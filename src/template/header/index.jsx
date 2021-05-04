import React from 'react';
import imgHeader from '../../assets/header.png'

import './index.css'

function Header() {
    return (
        <header>
            <div className="header-image">
                <a href="https://flow2pay.com.br/">
                    <img src={imgHeader} alt="FLOW2PAY-Logo-Padrao.png" loading="lazy" />
                </a>
            </div>

            <div className="div-empty">
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
                        <a href="">
                            <span>Cadastre-se</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://flow2pay.com.br/en">
                            <span>EN-US</span>
                        </a>
                    </li>
                </ul>
            </div>

        </header>
    );
}

export default Header;