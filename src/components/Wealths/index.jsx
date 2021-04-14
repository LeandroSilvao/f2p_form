import React, { useContext, useEffect, useState } from 'react'
import { ClientInfoContext } from '../../contexts/ClientInfoContexts';

import { FormContext } from "../../contexts/FormContexts";
import { WealthsTypeContext } from '../../contexts/Wealths';

import { FaTrash, FaPlusSquare } from "react-icons/fa";
import './index.css'

export default function Wealths(props) {
    const { languagePT, _Json_Wealths } = useContext(FormContext)

    const { typeWealthId, value, description, settypeWealthId, setvalue, setdescription, typesWealthId } = useContext(WealthsTypeContext)
    const { professionalOccupationId } = useContext(ClientInfoContext)
    const [error, setError] = useState(false)

    const [clientWealths, setClientWealths] = useState([])

    const Labels = {
        SelectWealthTypeId: languagePT ? 'Selecione tipo de bens/finanças para cadastro' : 'Select type of wealth/finances to register',
        inputDescriptionTitle: languagePT ? 'Informações de bens/finanças para cadastro' : 'Wealths/Finances information for registration',
        description: languagePT ? 'Descrição do bem/finança' : 'Wealths/Finances Description',
        value: languagePT ? 'Valor do bem/finança' : 'Wealths/Finances Value',
        addButtonDescription: languagePT ? 'CLIQUE PARA ADICIONAR O BEM/FINANÇA' : 'CLICK TO ADD A WEALTH/FINANCE'
    }

    const required = professionalOccupationId === "8" || professionalOccupationId === "9" ||
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
                setvalue(value)
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
                        <div className="d-flex d-flexdc">
                            <span className="inputDescription">Descrição: {cw.description}</span>
                            <span className="inputDescription">Valor: {cw.value}</span>
                        </div>
                        <button type="button" onClick={() => removeClientWealth(index)}>
                            <FaTrash />
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
            let wealth = {
                typeWealthId: parseInt(typeWealthId),
                value: parseInt(value),
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
        _Json_Wealths(clientWealths)
    }, [clientWealths])

    return (
        <div className={required ? "divWealthTypes" : "d-none"}>
            <span className="inputDescriptionTitle">{Labels.inputDescriptionTitle}</span>

            <div className="d-flex">
                <select required={required && clientWealths.length === 0} name="wealthTypeId" id="wealthTypeId" onChange={e => OnChangeField(e)}>
                    <option defaultValue value="">{Labels.SelectWealthTypeId}</option>
                    {RenderWealthTypes()}
                </select>
                <p className="required">*</p>
            </div>

            <div className="d-flex">
                <input required={required && clientWealths.length === 0} value={description} type="text" name="wealthDescription" id="wealthDescription" placeholder={Labels.description}
                    onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>

            <div className="d-flex">
                <input required={required && clientWealths.length === 0} value={value} type="text" name="wealthValue" id="wealthValue" placeholder={Labels.value}
                    onChange={e => OnChangeField(e)} pattern="^[0-9\.\,]+$" />
                <p className="required">*</p>
            </div>

            <div className="wealths">
            {RenderClientWealths()}
            </div>
            <div className="addButton">
                <button type="button" onClick={() => addClientWealth()}>
                    {Labels.addButtonDescription}
                </button>
                <p className={error ? "msgError" : "d-none"}>Selecione um item da lista e Preencha os campos</p>
            </div>
        </div>
    )
}

