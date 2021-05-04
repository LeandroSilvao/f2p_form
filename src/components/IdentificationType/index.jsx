import React, { useContext } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { IdentificationTypeContext } from '../../contexts/IdentificationTypeContexts';

import './index.css'

export default function IdentificationType(props) {
    const { languagePT } = useContext(FormContext)
    const { identificationTypes, identificationTypeId, setidentificationTypeId, states, 
        setstateId,setemissionInssuer, setnumber, setemission, emission } = useContext(IdentificationTypeContext)
    const Labels = {
        componentTitle: languagePT ? 'Identificação' : 'Identification',
        Select: languagePT ? 'Selecionar Tipo de Identificação' : 'Select Identification Type',
        States: languagePT ? 'UF do documento' : 'Document UF',
        emission: languagePT ? 'Data de emissão' : 'Issue date',
        emissionInssuer: languagePT ? 'Orgão Emissor' : 'Emission Inssuer',
        documentNumber: languagePT ? 'Número do documento' : 'Document Number',
    }
    const Max = new Date().toISOString().split('T')[0]
    const Min = new Date(Max.split('-')[0] - 200, '00', '01').toISOString().split('T')[0]

    function OnChangeField(e) {
        const {value, id} = e.target 
        switch (id) {
            case 'identificationType':
                setidentificationTypeId(value)
                break;
            case 'IdtypeStateId':
                setstateId(value)
                break;
            case 'identificationTypeemissionInssuer':
                setemissionInssuer(value)
                break;
            case 'identificationTypedocument':
                setnumber(value)
                break;
            case 'identificationTypeemission':
                setemission(value)
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
        <div className="divIdentificationTypeSelect">

            <div className="componentTitle">
                <span>{Labels.componentTitle}</span>
                <hr />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.Select}</p>
                </div>
                <select required
                    name="identificationType" id="identificationType" onChange={e => OnChangeField(e)}>
                    <option defaultValue value=""></option>
                    {RenderIdentificationTypes()}
                </select>
            </div>

            <div className={identificationTypeId === "40" ? "d-none" : "d-flex-input d-flexdc"}>
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.documentNumber}</p>
                </div>
                <input required={identificationTypeId !== "40"} type="text" name="identificationTypedocument" id="identificationTypedocument" onChange={e => OnChangeField(e)}
                />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.States}</p>
                </div>
                <select required name="IdtypeStateId" id="IdtypeStateId" onChange={e => OnChangeField(e)}>
                    <option defaultValue value=""></option>
                    {RenderStates()}
                </select>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.emission}</p>
                </div>
                <input value={emission} required type="date" name="identificationTypeemission" id="identificationTypeemission" onChange={e => OnChangeField(e)}
                    min={Min} max={Max}/>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.emissionInssuer}</p>
                </div>
                <input required type="text" name="identificationTypeemissionInssuer" id="identificationTypeemissionInssuer" onChange={e => OnChangeField(e)}
                />
            </div>


        </div>
    )
}
