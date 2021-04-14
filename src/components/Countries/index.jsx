import axios from "axios";

import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from "../../contexts/FormContexts";

import config from '../../config'

import './index.css'
import { AttorneyContext } from "../../contexts/AttorneyContexts";

export default function Countries(props) {
    const [countries, setCountries] = useState([])
    const { languagePT } = useContext(FormContext)
    const Atctx = useContext(AttorneyContext)


    const Labels = {
        Select: languagePT ? 'Selecionar País' : 'Select Country',
        SelectError: languagePT ? 'Erro ao consultar países' : 'Error querying countries'
    }

    let required
    if (props.Attorney) {
        if (Atctx.isAcceptedOrderAttorney) required = true
        else if (!Atctx.isAcceptedOrderAttorney) required = false
    }
    else if (props.ClientAdress) required = true

    useEffect(() => {
        getCountries()
    }, [])

    function getCountries() {
        axios.get(config._urlCountries)
            .then(res => { if (res.data) setCountries(res.data) })
            .catch(err => console.log(Labels.SelectError))
    }
    function RenderCountries() {
        return (
            countries.map(c => {
                return (
                    <option key={c.countryId} value={c.countryId}>{c.name}</option>
                )
            })
        )
    }
    return (
        <select required={required} name="countries" id="countries" onChange={props.onSelectCountry}>
            <option defaultValue value="">{Labels.Select}</option>
            {RenderCountries()}
        </select>
    )
}
