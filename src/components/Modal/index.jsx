import { useContext } from "react";
import { FormContext } from "../../contexts/FormContexts";

import closeSvg from "../../assets/close.svg"

import "./index.css";

export default function Modal(props) {
  const { Redirect, agency, account, digit } = useContext(FormContext)

  return (
    <div className="overlay">
      <div className="container">
        <strong>Suas informações</strong>
        <p>Agência: {agency}</p>
        <p>Número da conta: {account}</p>
        <p>Digito: {digit}</p>
        <button type="button" onClick={Redirect}>
          <img src={closeSvg} alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
}