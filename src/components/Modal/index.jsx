import { useContext } from "react";
import { FormContext } from "../../contexts/FormContexts";

import "./index.css";

export default function Modal() {
  const { Redirect, agency, account, digit } = useContext(FormContext)

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          <p>Conta cadastrada com sucesso!</p>
        </div>

        <div className="modal-body">
          <p><strong>Agência:</strong> {agency}</p>
          <p><strong>Número da conta:</strong> {account}</p>
          <p><strong>Digito:</strong> {digit}</p>
        </div>

        <div className="modal-footer">
          <button type="button" onClick={Redirect}>
            Voltar a página inicial
        </button>
        </div>

      </div>
    </div>
  );
}