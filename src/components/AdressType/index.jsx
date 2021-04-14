import axios from "axios";

import React, { useContext, useEffect, useState } from 'react'
import config from "../../config";
import { AttorneyContext } from "../../contexts/AttorneyContexts";
import { FormContext } from "../../contexts/FormContexts";

import './index.css'

export default function AdressType(props) {
    const [adressType, setAdressType] = useState([])
    const { languagePT, errorOnApi } = useContext(FormContext)
    const Atctx = useContext(AttorneyContext)
    const [error, setError] = useState(false)
    const Labels = {
        Select: languagePT ? 'Selecionar Tipo de Endereço' : 'Select Address Type',
        SelectError: languagePT ? 'Erro ao consultar Tipos de Endereço' : 'Error querying Address Type'
    }

    let required
    if (props.Attorney) {
        if (Atctx.isAcceptedOrderAttorney) required = true
        else if (!Atctx.isAcceptedOrderAttorney) required = false
    }
    else if (props.ClientAdress) required = true

    useEffect(() => {
            getAdressType()
    }, [])

    function getAdressType() {
        axios.get(config._urlAdressType)
            .then(res => {
                if (res.data) {
                    setAdressType(res.data)
                    setError(false)
                }
                else {
                    console.log(Labels.SelectError)
                    setError(true)
                }
            })
            .catch(err => {
                console.log(Labels.SelectError)
                setError(true)

            })
    }
    function RenderAdressType() {
        return (
            adressType.map(adt => {
                return (
                    <option key={adt.addressTypeId} value={adt.addressTypeId}>{adt.description}</option>
                )
            })
        )
    }
    return (
        <div className="divAddressTypeSelect">
            <select required={required} name="addressType" id="addressType" onChange={props.onSelectTypeAddress}>
                <option defaultValue value="">{Labels.Select}</option>
                {RenderAdressType()}
            </select>
        </div>
    )
}
