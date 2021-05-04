import axios from "axios";

import React, { useContext, useEffect, useState } from 'react'
import { AdressesContext } from '../../contexts/AdressesContexts'
import { FormContext } from "../../contexts/FormContexts";
import { AttorneyContext } from "../../contexts/AttorneyContexts";

import config from '../../config'

import './index.css'

export default function Cities(props) {
    const Adctx = useContext(AdressesContext)
    const Atctx = useContext(AttorneyContext)

    const { languagePT } = useContext(FormContext)

    const [cities, setCities] = useState([])
    const Labels = {
        Select: languagePT ? 'Selecionar Cidade' : 'Select City',
    }

    let required
    if (props.Attorney) {
        if (Atctx.isAcceptedOrderAttorney) required = true
        else if (!Atctx.isAcceptedOrderAttorney) required = false
    }
    else if (props.ClientAdress) required = true

    useEffect(() => {
        if (props.ClientAdress) {
            if (Adctx.stateId.length !== 0) getCities()
            else setCities([])
        }
        else if (props.Attorney) {
            if (Atctx.stateId.length !== 0) getCities()
            else setCities([])
        }
    }, [Atctx.stateId, Adctx.stateId])

    function getCities() {
        const _stateId = props.ClientAdress ? Adctx.stateId : Atctx.stateId
        axios.get(`${config._urlCities}${_stateId}`)
            .then(res => { if (res.data) { setCities(res.data) } })
            .catch(err => { console.log(err) })
    }
    function RenderCities() {
        return (
            cities.map(c => {
                return (
                    <option key={c.cityId} value={c.cityId} cityname={c.name}>{c.name}</option>
                )
            })
        )
    }
    return (
        <div className="divCitiesSelect">
            <select required={required} name="cities" id="cities" onChange={props.onSelectCity}>
                <option defaultValue value=""></option>
                {RenderCities()}
            </select>
        </div>
    )
}
