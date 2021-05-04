import React, { useContext, useEffect, useState } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { SpouseContext } from '../../contexts/Spouse';

import InputMask from "react-input-mask";

import { ValidCPF } from '../../utils'
import './index.css'

export default function Spouse(props) {
    const [errorCpf, setErrorCpf] = useState(false)
    const { languagePT } = useContext(FormContext)
    const { identificationTypes, identificationTypeId, setidentificationTypeId, states, setHide,
        setstateId, setemissionInssuer, setnumber, setemission, number, taxPayerRegistry, settaxPayerRegistry, setname, name } = useContext(SpouseContext)
    const Labels = {
        name: languagePT ? 'Nome Completo' : 'Name',
        Select: languagePT ? 'Selecionar Tipo de Identificação' : 'Select Identification Type',
        States: languagePT ? 'UF do documento' : 'Document UF',
        emission: languagePT ? 'Data de emissão' : 'Issue date',
        emissionInssuer: languagePT ? 'Orgão Emissor' : 'Emission Inssuer',
        documentNumber: languagePT ? 'Número do documento' : 'Document Number',
        cpfTitle: languagePT ? 'Digite um cpf valido' : 'Please enter a valid cpf',
        taxPayerRegistry: languagePT ? 'CPF' : 'Tax Payer Registry',
        onlyLettersTitle: languagePT ? 'Somente letras' : 'Only letters',
    }
    const Max = new Date().toISOString().split('T')[0]
    const Min = new Date(Max.split('-')[0] - 200, '00', '01').toISOString().split('T')[0]

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
                const cpf = value.replace(/[^\d]+/g, '');
                settaxPayerRegistry(value)
                if (cpf.length < 11) setErrorCpf(false)
                else if (cpf.length === 11) {
                    if (ValidCPF(cpf)) {
                        setErrorCpf(false)
                        settaxPayerRegistry(value)
                    }
                    else {
                        settaxPayerRegistry(`${value.substring(0, value.length - 1)}`)
                        setErrorCpf(true)
                    }
                }
                else if (cpf.length > 11) {
                    setErrorCpf(true)
                }
                break;
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
            <div className="componentTitle">
                <span>Informações da cônjuge</span>
                <hr />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.name}</p>
                </div>
                <input value={name} required={props.required} type="text" name="spousename" id="spousename"
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeField(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.Select}</p>
                </div>
                <select required={props.required}
                    name="spouseidentificationType" id="spouseidentificationType" onChange={e => OnChangeField(e)}>
                    <option defaultValue value=""></option>
                    {RenderIdentificationTypes()}
                </select>
            </div>

            <div className={identificationTypeId === "40" ? "d-none" : "d-flex-input d-flexdc"}>
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.documentNumber}</p>
                </div>
                <input value={number} required={identificationTypeId !== "40" && props.required} type="text" name="spousedocument" id="spousedocument" onChange={e => OnChangeField(e)}
                />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.taxPayerRegistry}</p>
                </div>
                <InputMask value={taxPayerRegistry} required={props.required} type="text" name="spousedocumentcpf" id="spousedocumentcpf"
                    mask="999.999.999-99" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                    title={Labels.cpfTitle} onChange={e => OnChangeField(e)} />
                <p className={errorCpf ? 'errorCpf' : 'd-none'}>{Labels.cpfTitle}</p>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.States}</p>
                </div>
                <select required={props.required} name="spouseIdtypeStateId" id="spouseIdtypeStateId" onChange={e => OnChangeField(e)}>
                    <option defaultValue value=""></option>
                    {RenderStates()}
                </select>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.emission}</p>
                </div>
                <input required={props.required} type="date" name="spouseemission" id="spouseemission" onChange={e => OnChangeField(e)}
                    min={Min} max={Max} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.emissionInssuer}</p>
                </div>
                <input required={props.required} type="text" name="spouseemissionInssuer" id="spouseemissionInssuer" onChange={e => OnChangeField(e)}
                />
            </div>


            {props.children}
        </div>
    )
}
