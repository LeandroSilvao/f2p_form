import React, { useContext, useEffect, useState } from 'react'
import { ClientInfoContext } from '../../contexts/ClientInfoContexts';

import { FormContext } from "../../contexts/FormContexts";
import { WealthsTypeContext } from '../../contexts/Wealths';

import { FaTrash } from "react-icons/fa";

import './index.css'

export default function Wealths(props) {
    const { languagePT, _Json_Wealths } = useContext(FormContext)

    const { typeWealthId, value, description, settypeWealthId, setvalue, setdescription, typesWealthId } = useContext(WealthsTypeContext)
    const { professionalOccupationId } = useContext(ClientInfoContext)
    const [error, setError] = useState(false)

    const [clientWealths, setClientWealths] = useState([])

    const Labels = {
        SelectWealthTypeId: languagePT ? 'Selecione tipo de bens/finanças' : 'Select type of wealth/finances to register',
        inputDescriptionTitle: languagePT ? 'Informações de bens/finanças' : 'Wealths/Finances information for registration',
        description: languagePT ? 'Descrição do bem/finança' : 'Wealths/Finances Description',
        value: languagePT ? 'Valor do bem/finança' : 'Wealths/Finances Value',
        addButtonDescription: languagePT ? 'Adicionar bem ou finança' : 'CLICK TO ADD A WEALTH/FINANCE'
    }

    let required = professionalOccupationId === "8" || professionalOccupationId === "9" ||
        professionalOccupationId === "" ? false : true

    function OnChangeField(e) {
        const { value, id } = e.target
        switch (id) {
            case 'wealthTypeId':
                settypeWealthId(value)
                break;
            case 'wealthDescription':
                setdescription(value)
                break;
            case 'wealthValue':
                let valor = value + '';
                valor = parseInt(valor.replace(/[\D]+/g, ''));
                valor = valor + '';
                valor = valor.replace(/([0-9]{2})$/g, ".$1");
                setvalue(valor)
                if (valor == 'NaN') setvalue('') 
                break;
            default:
                break;
        }
    }
    function RenderWealthTypes() {
        return (
            typesWealthId.map(tw => {
                return (
                    <option key={tw.wealthTypeId} value={tw.wealthTypeId}>{tw.description}</option>
                )
            })
        )
    }
    function RenderClientWealths() {
        return (
            clientWealths.map((cw, index) => {
                return (
                    <div className="wealth" key={`${cw.description}${index}`}>
                        <div className="wealth-spans">
                            <span>Descrição: {cw.description}</span>
                            <span>Valor: {cw.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</span>
                        </div>
                        <button type="button" onClick={() => removeClientWealth(index)}>
                            Apagar bem/finança
                        </button>
                    </div>
                )
            })
        )
    }
    function addClientWealth() {
        if (!typeWealthId || !description || !value) {
            setError(true)
        }
        else {
            setError(false)
            console.log(parseFloat(value))
            console.log(typeof parseFloat(value))
            let wealth = {
                typeWealthId: parseInt(typeWealthId),
                value: parseFloat(value),
                description: description
            }
            setClientWealths([...clientWealths, wealth])
            setdescription('')
            setvalue('')
        }
    }
    function removeClientWealth(i) {
        setClientWealths(clientWealths.filter((c, index) => index !== i))
    }

    useEffect(() => {
        required = professionalOccupationId === "8" || professionalOccupationId === "9" ||
        professionalOccupationId === "" ? false : true
        if(!required) _Json_Wealths([])
    }, [professionalOccupationId])
    useEffect(() => {
        _Json_Wealths(clientWealths)
    }, [clientWealths])

    return (
        <div className={required ? "divWealthTypes" : "d-none"}>
            <div className="componentTitle">
                <span>{Labels.inputDescriptionTitle}</span>
                <hr />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.SelectWealthTypeId}</p>
                </div>
                <select required={required && clientWealths.length === 0} name="wealthTypeId" id="wealthTypeId" onChange={e => OnChangeField(e)}>
                    <option defaultValue value=""></option>
                    {RenderWealthTypes()}
                </select>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.description}</p>
                </div>
                <input required={required && clientWealths.length === 0} value={description} type="text" 
                name="wealthDescription" id="wealthDescription"
                    onChange={e => OnChangeField(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.value}</p>
                </div>
                <input type="text" value={value} required={required && clientWealths.length === 0} name="wealthValue" id="wealthValue"
                    placeholder="$0" onChange={e => OnChangeField(e)} />
            </div>


            <div className="wealths">
                {RenderClientWealths()}
            </div>

            <div className="addButton">
                <button type="button" onClick={() => addClientWealth()}>
                    {Labels.addButtonDescription}
                </button>
                <p className={error ? "msgError" : "d-none"}>Selecione um item de cada lista e preencha os campos</p>
            </div>
        </div>
    )
}

