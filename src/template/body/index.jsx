import React from 'react';
import imgCadastro from '../../assets/cadastro.jpeg'

import './index.css'

function Header() {
    return (
        <>
            <div className="div-body">

                <div className="div-body-txt">
                    <h1>Cadastro online.</h1>
                    <span>
                        Cadastramento de pessoa física 100% online, com
                        abertura de conta corrente junto a nossos bancos
                        parceiros em até 24h.
                </span>
                </div>

                <div className="div-body-img">
                    <img src={imgCadastro} alt="cadastro.jpeg" />
                </div>
            </div>
            <span className="div-body-info-title">Precisamos de algumas informações</span>
        </>
    );
}

export default Header;