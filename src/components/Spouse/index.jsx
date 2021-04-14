import React, { useContext, useEffect, useState } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { SpouseContext } from '../../contexts/Spouse';

import InputMask from "react-input-mask";

import {ValidCPF} from '../../utils'
import './index.css'

export default function Spouse(props) {
    const [errorCpf, setErrorCpf] = useState(false)
    const { languagePT } = useContext(FormContext)
    const { identificationTypes, identificationTypeId, setidentificationTypeId, states, setHide,
        setstateId, setemissionInssuer, setnumber, setemission, number, taxPayerRegistry, settaxPayerRegistry, setname, name } = useContext(SpouseContext)
    const Labels = {
        name: languagePT ? 'Nome' : 'Name',
        Select: languagePT ? 'Selecionar Tipo de Identificação' : 'Select Identification Type',
        States: languagePT ? 'UF do documento' : 'Select State',
        emission: languagePT ? 'Data de emissão' : 'Select State',
        emissionInssuer: languagePT ? 'Orgão Emissor' : 'Emission Inssuer',
        documentNumber: languagePT ? 'Número do documento' : 'Document Number',
        cpfTitle: languagePT ? 'Digite um cpf valido' : 'Only letters',
        taxPayerRegistry: languagePT ? 'CPF' : 'Tax Payer Registry',
        onlyLettersTitle: languagePT ? 'Somente letras' : 'Only letters',
    }
    const Max = new Date().toISOString().split('T')[0]
    const Min = new Date(Max.split('-')[0] - 200, '00', '01').toISOString().split('T')[0]

    useEffect(() => {
        setHide(props.hide)
    }, [])

    function OnChangeField(e) {
        const { value, id } = e.target
        switch (id) {
            case 'spousename':
                setname(value)
                break;
            case 'spouseidentificationType':
                setnumber('')
                setidentificationTypeId(value)
                break;
            case 'spouseIdtypeStateId':
                setstateId(value)
                break;
            case 'spouseemissionInssuer':
                setemissionInssuer(value)
                break;
            case 'spousedocument':
                setnumber(value)
                break;
            case 'spouseemission':
                const emissionDoc = `${value}T00:00:00`
                setemission(emissionDoc)
                break;
            case 'spousedocumentcpf':
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
                break;
            default:
                break;
        }
    }
    function RenderIdentificationTypes() {
        return (
            identificationTypes.map(idt => {
                return (
                    <option key={idt.identifycationTypeId} value={idt.identifycationTypeId}>{idt.description}</option>
                )
            })
        )
    }
    function RenderStates() {
        return (
            states.map(s => {
                return (
                    <option key={s.stateId} value={s.stateId} statename={s.name}>{s.name}</option>
                )
            })
        )
    }
    return (
        <div className={props.hide ? "d-none" : "divSpouse"}>
            <span className="inputDescriptionTitle">Informações Conjuge</span>

            <div className="d-flex">
                <input value={name} required={props.required} type="text" name="spousename" id="spousename" placeholder={Labels.name}
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>

            <div className="d-flex">
                <select required={props.required}
                    name="spouseidentificationType" id="spouseidentificationType" onChange={e => OnChangeField(e)}>
                    <option defaultValue value="">{Labels.Select}</option>
                    {RenderIdentificationTypes()}
                </select>
                <p className="required">*</p>
            </div>

            <div className={identificationTypeId === "40" ? "d-none" : "d-flex"}>
                <input value={number} required={identificationTypeId !== "40" && props.required} type="text" name="spousedocument" id="spousedocument" onChange={e => OnChangeField(e)}
                    placeholder={Labels.documentNumber} />
                <p className="required">*</p>
            </div>

            <div>
                <div className="d-flex">
                    <InputMask value={taxPayerRegistry} required={props.required} type="text" name="spousedocumentcpf" id="spousedocumentcpf"
                        placeholder={Labels.taxPayerRegistry} mask="999.999.999-99" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" title={Labels.cpfTitle} onChange={e => OnChangeField(e)} />
                    <p className="required">*</p>
                </div>
                <p className={errorCpf ? 'errorCpf' : 'd-none'}>{Labels.cpfTitle}</p>
            </div>

            <div className="d-flex">
                <select required={props.required} name="spouseIdtypeStateId" id="spouseIdtypeStateId" onChange={e => OnChangeField(e)}>
                    <option defaultValue value="">{Labels.States}</option>
                    {RenderStates()}
                </select>
                <p className="required">*</p>
            </div>

            <p className="inputDescription">{Labels.emission}</p>
            <div className="d-flex">
                <input required={props.required} type="date" name="spouseemission" id="spouseemission" onChange={e => OnChangeField(e)}
                    min={Min} max={Max} />
                <p className="required">*</p>
            </div>

            <div className="d-flex">
                <input required={props.required} type="text" name="spouseemissionInssuer" id="spouseemissionInssuer" onChange={e => OnChangeField(e)}
                    placeholder={Labels.emissionInssuer} />
                <p className="required">*</p>
            </div>

            {props.children}
        </div>
    )
}
