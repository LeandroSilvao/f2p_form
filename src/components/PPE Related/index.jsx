import React, { useContext, useState } from 'react'

import { PPERelatedsContext } from '../../contexts/PPERelatedsContext';
import { FormContext } from "../../contexts/FormContexts";
import Switch from "react-switch";


import './index.css'

export default function PPERelateds(props) {
    const { languagePT } = useContext(FormContext)
    const { name, nationality, occupation, setname, setnationality,
        setoccupation, settaxPayerRegistry, taxPayerRegistry } = useContext(PPERelatedsContext)
    const [errorCpf, setErrorCpf] = useState(false)


    const [PPERelated, setPPERelated] = useState(false)

    const Labels = {
        PPERelated: languagePT ? 'Cliente têm relacionamento com uma Pessoa Politicamente Exposta ?' : 'Customer has a relationship with a Politically Exposed Person ?',
        cpfTitle: languagePT ? 'Digite um cpf valido' : 'Please enter a valid cpf',
        name: languagePT ? 'Nome da Pessoa Politicamente Exposta' : 'Politically Exposed Person\'s Name',
        onlyLettersTitle: languagePT ? 'Somente letras' : 'Only letters',
        occupation: languagePT ? 'Cargo na instituição de trabalho' : 'Position in the work institution',
        nationality: languagePT ? 'Nacionalidade' : 'Nationality',
        taxPayerRegistry: languagePT ? 'CPF' : 'TaxPayerRegistry',

    }

    function ValidCPF(cpf) {
        var Soma;
        var Resto;
        Soma = 0;
        if (cpf === "00000000000") return false;
        if (cpf === "11111111111") return false;
        if (cpf === "22222222222") return false;
        if (cpf === "33333333333") return false;
        if (cpf === "44444444444") return false;
        if (cpf === "55555555555") return false;
        if (cpf === "66666666666") return false;
        if (cpf === "77777777777") return false;
        if (cpf === "88888888888") return false;

        if (cpf.includes('.')) cpf = cpf.replace(/\./g, '')
        if (cpf.includes('-')) cpf = cpf.replace(/-/g, '')
        // if (cpf.includes('-')) cpf = cpf.replace(/\-/g, '')

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(cpf.substring(9, 10))) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    function OnChangeField(e) {
        const { id, value } = e.target

        switch (id) {
            case 'name':
                setname(value)
                break;
            case 'taxPayerRegistry':
                settaxPayerRegistry(value)
                if (value.length < 11) setErrorCpf(false)
                else if (value.length === 11) {
                    if (ValidCPF(value)) {
                        setErrorCpf(false)
                        settaxPayerRegistry(value)
                    }
                    else {
                        settaxPayerRegistry(`${value.substring(0, value.length - 1)}`)
                        setErrorCpf(true)
                    }
                }
                else if (value.length > 11) {
                    setErrorCpf(true)
                }
                break;
            case 'occupation':
                setoccupation(value)
                break;
            case 'nationality':
                setnationality(value)
                break;
            default:
                break;
        }
    }

    

    return (
        <div>

            <div className="d-flex d-flexdc df-alc">
                <p className="inputDescription">{Labels.PPERelated} ?</p>
                <Switch
                    onColor="#4B4B4B"
                    offColor="#bdbbbb"
                    onHandleColor="#bdbbbb"
                    offHandleColor="#4B4B4B"
                    checked={PPERelated}
                    onChange={cheked => setPPERelated(cheked)}
                    handleDiameter={30}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={50}
                    className="react-switch"
                    id="material-switch"
                />
            </div>

            <div className={PPERelated ? "d-flex" : "d-none"}>
                <input value={name} required={PPERelated} type="text" name="name" id="name" placeholder={Labels.name}
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>

            <div className={PPERelated ? "d-flex" : "d-none"}>
                <input className={PPERelated ? "" : "d-none"} value={nationality} required={PPERelated} type="text" 
                name="nationality" id="nationality" placeholder={Labels.nationality}
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>

            <div className={PPERelated ? "" : "d-none"}>
                <div className="d-flex">
                    <input className={PPERelated ? "" : "d-none"} value={taxPayerRegistry} required={PPERelated} 
                    type="text" name="taxPayerRegistry" id="taxPayerRegistry" placeholder={Labels.taxPayerRegistry}
                        pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" title={Labels.cpfTitle} onChange={e => OnChangeField(e)} />
                    <p className="required">*</p>
                </div>
                <p className={errorCpf ? 'errorCpf' : 'd-none'}>{Labels.cpfTitle}</p>
            </div>

            <div className={PPERelated ? "d-flex" : "d-none"}>
                <input className={PPERelated ? "" : "d-none"} required={PPERelated} value={occupation} type="text" name="occupation" id="occupation" placeholder={Labels.occupation}
                    pattern="(^[A-Za-z0-9 á-úÁ-Ú]+$)" title={Labels.onlyLettersAndNumbersTitle} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>
        </div>


    )
}
