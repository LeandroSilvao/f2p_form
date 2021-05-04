import React, { useContext, useEffect, useState } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { ClientInfoContext } from '../../contexts/ClientInfoContexts';
import { LegalRepresentativeContext } from '../../contexts/LegalRepresentativeContexts';

import './index.css'
import { ValidCPF } from '../../utils'

import InputMask from 'react-input-mask'

export default function Work(props) {
    const [errorCpf, setErrorCpf] = useState(false)

    const { languagePT } = useContext(FormContext)
    const { age } = useContext(ClientInfoContext)
    const { name, taxpayerRegistry, relationshipTypesId,
        setname, settaxpayerRegistry, setRelationshipTypeId, setIsRequired } = useContext(LegalRepresentativeContext)

    let required = age >= 0 && age < 18 ? true : false

    const Labels = {
        legalRepresentativeName: languagePT ? 'Nome ao representante legal do cliente' : '',
        legalRepresentativeTaxpayerRegistry: languagePT ? 'CPF ao representante legal do cliente' : '',
        relationshipTypeId: languagePT ? 'Tipo do relacionamento ao representante legal' : '',
        cpfTitle: languagePT ? 'Digite um cpf valido' : '',
        onlyLettersTitle: languagePT ? 'Somente letras' : 'Only letters',
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
                const cpf = value.replace(/[^\d]+/g, '');
                settaxpayerRegistry(value)
                if (cpf.length < 11) setErrorCpf(false)
                else if (cpf.length === 11) {
                    if (ValidCPF(cpf)) {
                        setErrorCpf(false)
                        settaxpayerRegistry(value)
                    }
                    else {
                        settaxpayerRegistry(`${value.substring(0, value.length - 1)}`)
                        setErrorCpf(true)
                    }
                }
                else if (cpf.length > 11) {
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
            <div className="componentTitle">
                <span>Representates legais</span>
                <hr />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.legalRepresentativeName}</p>
                </div>
                <input required={required} value={name} type="text" name="legalRepresentativeName" id="legalRepresentativeName"
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeField(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.legalRepresentativeTaxpayerRegistry}</p>
                </div>
                <InputMask value={taxpayerRegistry} required={required} type="text" name="legalRepresentativeTaxpayerRegistry" id="legalRepresentativeTaxpayerRegistry"
                    mask="999.999.999-99" title={Labels.cpfTitle} onChange={e => OnChangeField(e)} />
                <p className={errorCpf ? 'errorCpf' : 'd-none'}>{Labels.cpfTitle}</p>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.relationshipTypeId}</p>
                </div>
                <select required={required}
                    name="relationshipTypeId" id="relationshipTypeId" onChange={e => OnChangeField(e)}>
                    <option defaultValue value=""></option>
                    {RenderRelationshipTypes()}
                </select>
            </div>

        </div>
    )
}
