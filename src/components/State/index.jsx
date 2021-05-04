import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { AttorneyContext } from "../../contexts/AttorneyContexts";
import { AdressesContext } from "../../contexts/AdressesContexts";
import config from '../../config'

import './index.css'

export default function States(props) {
    const { languagePT } = useContext(FormContext)

    const Atctx = useContext(AttorneyContext)
    const Adctx = useContext(AdressesContext)

    const [states, setStates] = useState([])
    const Labels = {
        Select: languagePT ? 'Selecionar Estado' : 'Select State',
        SelectError: languagePT ? 'Erro ao consultar estados' : 'Error querying states'
    }


    let required
    if (props.Attorney) {
        if(Atctx.isAcceptedOrderAttorney) required = true
        else if(!Atctx.isAcceptedOrderAttorney) required = false
    }
    else if (props.ClientAdress) required = true


    useEffect(() => {
        if(props.ClientAdress) {
            if (Adctx.countryId.length !== 0) getStates()
            else setStates([])
        }
        else if (props.Attorney){
            if (Atctx.countryId.length !== 0) getStates()
            else setStates([])
        }
    }, [Atctx.countryId, Adctx.countryId])

    function getStates() {
        const _countryId = props.ClientAdress ? Adctx.countryId : Atctx.countryId
        axios.get(`${config._urlStates}${_countryId}`)
            .then(res => {
                if (res.data) {
                    setStates(res.data)
                }
                else {
                    console.log(Labels.SelectError)
                }
            })
            .catch(err => {
                console.log(Labels.SelectError)
            })
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
        <select required={required} name="states" id="states" onChange={props.onSelectState}>
            <option defaultValue value=""></option>
            {RenderStates()}
        </select>
    )
}
