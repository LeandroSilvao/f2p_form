import React, { useContext, useEffect, useState } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { ClientInfoContext } from '../../contexts/ClientInfoContexts';
import { LegalRepresentativeContext } from '../../contexts/LegalRepresentativeContexts';

import './index.css'

export default function Work(props) {
    const [errorCpf, setErrorCpf] = useState(false)

    const { languagePT } = useContext(FormContext)
    const { age } = useContext(ClientInfoContext)
    const { name, taxpayerRegistry, relationshipTypeId, relationshipTypesId,
        setname, settaxpayerRegistry, setRelationshipTypeId, setIsRequired } = useContext(LegalRepresentativeContext)

    let required = age > 0 && age < 18 ? true : false

    const Labels = {
        legalRepresentativeName: languagePT ? 'Nome ao representante legal do cliente' : '',
        legalRepresentativeTaxpayerRegistry: languagePT ? 'CPF ao representante legal do cliente' : '',
        relationshipTypeId: languagePT ? 'Tipo do relacionamento ao representante legal' : '',
        cpfTitle: languagePT ? 'Digite um cpf valido' : '',
        onlyLettersTitle: languagePT ? 'Somente letras' : 'Only letters',
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
        const { value, id } = e.target
        switch (id) {
            case 'legalRepresentativeName':
                setname(value)
                break;
            case 'relationshipTypeId':
                setRelationshipTypeId(value)
                break;
            case 'legalRepresentativeTaxpayerRegistry':
                settaxpayerRegistry(value)
                if (value.length < 11) setErrorCpf(false)
                else if (value.length === 11) {
                    if (ValidCPF(value)) {
                        setErrorCpf(false)
                        settaxpayerRegistry(value)
                    }
                    else {
                        settaxpayerRegistry(`${value.substring(0, value.length - 1)}`)
                        setErrorCpf(true)
                    }
                }
                else if (value.length > 11) {
                    setErrorCpf(true)
                }
                break;
            default:
                break;
        }
    }
    function RenderRelationshipTypes() {
        return (
            relationshipTypesId.map(reltid => {
                return (
                    <option key={reltid.relationshipTypeId} value={reltid.relationshipTypeId}>{reltid.description}</option>
                )
            })
        )
    }

    useEffect(() => {
        setIsRequired(required)
    }, [])
    useEffect(() => {
        setIsRequired(required)
        if (required) {
            setname('')
            setRelationshipTypeId('')
            settaxpayerRegistry('')
        }
    }, [age])

    return (
        <div className={required ? "divLegalRepresentative" : "d-none"}>
            <span className="inputDescriptionTitle">Representates legais</span>


            <div className="d-flex">
                <input required={required} value={name} type="text" name="legalRepresentativeName" id="legalRepresentativeName" placeholder={Labels.legalRepresentativeName}
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>

            <div>
                <div className="d-flex">
                    <input value={taxpayerRegistry} required={required} type="text" name="legalRepresentativeTaxpayerRegistry" id="legalRepresentativeTaxpayerRegistry" placeholder={Labels.legalRepresentativeTaxpayerRegistry}
                        pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" title={Labels.cpfTitle} onChange={e => OnChangeField(e)} />
                    <p className="required">*</p>
                </div>
                <p className={errorCpf ? 'errorCpf' : 'd-none'}>{Labels.cpfTitle}</p>
            </div>

            <div className="d-flex">
                <select required={required}
                    name="relationshipTypeId" id="relationshipTypeId" onChange={e => OnChangeField(e)}>
                    <option defaultValue value="">{Labels.relationshipTypeId}</option>
                    {RenderRelationshipTypes()}
                </select>
                <p className="required">*</p>
            </div>
        </div>
    )
}
