import React, { useContext, useState } from 'react'
import { AttorneyContext } from '../../contexts/AttorneyContexts';
import { FormContext } from "../../contexts/FormContexts";

import './index.css'

export default function CEP(props) {
    const { languagePT } = useContext(FormContext)
    const Atctx = useContext(AttorneyContext)
    const [error, setError] = useState(false)
    const Labels = {
        CollectCep: languagePT ? 'Digite seu cep' : 'Type your ZIP Code',
        Error: languagePT ? 'CEP Invalido' : 'Invalid ZIP Code'
    }
    let required
    if (props.Attorney) {
        if (Atctx.isAcceptedOrderAttorney) required = true
        else if (!Atctx.isAcceptedOrderAttorney) required = false
    }
    else if (props.ClientAdress) required = true

    function ValidateCEP(e) {
        const Cep = e.target.value
        if (Cep.length === 0) {
            setError(false)
            props.onCollectCep('')
        }
        const validacep = /^[0-9]{5,8}$/;
        if (validacep.test(Cep)) {
            setError(false)
            props.onCollectCep(Cep)
        }
        else {
            props.onCollectCep('')
            setError(true)
        }
    }

    return (
        <div className="divCollectCep">
            <input required={required} type="text" name="cep" id="cep"
                maxLength="8" onChange={e => ValidateCEP(e)} />
            <p className={error ? "cepError" : "d-none"}>{Labels.Error}</p>
        </div>
    )
}
