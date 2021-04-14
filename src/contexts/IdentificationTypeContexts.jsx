import { createContext, useContext, useEffect, useState } from "react"

import axios from 'axios'
import config from '../config'

import { FormContext } from '../contexts/FormContexts'
import { ClientInfoContext } from "./ClientInfoContexts"

const InitialState = {
    identificationTypeId: '',
    number: '',
    emissionInssuer: '',
    emission: '',
    stateId: '',
    identificationTypes: [],
    setidentificationTypeId: () => { },
    setnumber: () => { },
    setemissionInssuer: () => { },
    setemission: () => { },
    setstateId: () => { },
}

export const IdentificationTypeContext = createContext(InitialState);

export const IdentificationTypeProvider = (props) => {

    const { _Json_ClientIdentification, errorOnApi } = useContext(FormContext)
    const { taxPayerRegistry } = useContext(ClientInfoContext)

    const [identificationTypeId, setidentificationTypeId] = useState('')
    const [number, setnumber] = useState('')
    const [emissionInssuer, setemissionInssuer] = useState('')
    const [emission, setemission] = useState('')
    const [stateId, setstateId] = useState('')
    const [identificationTypes, setIdentificationTypes] = useState([])
    const [states, setStates] = useState([])

    let reqJSON = {
        identificationTypeId: parseInt(identificationTypeId),
        number: number,
        emissionInssuer: emissionInssuer,
        emission: `${emission}T00:00:00`,
        stateId: parseInt(stateId),
    }

    useEffect(() => {
        if (identificationTypeId && emissionInssuer && emission && stateId) {
            if (identificationTypeId === "40") {
                setnumber(taxPayerRegistry)
                _Json_ClientIdentification(reqJSON)
            }
            else if (number) _Json_ClientIdentification(reqJSON)
        }
    }, [identificationTypeId, number, emissionInssuer, emission, stateId,taxPayerRegistry])

    useEffect(() => {
            getIdentificationType()
            getStates()
    }, [])


    function getIdentificationType() {
        axios.get(config._urlIdentificationType)
            .then(res => { if (res.data) setIdentificationTypes(res.data) })
            .catch(err => console.log(`${err}`))
    }

    function getStates() {
        axios.get(`${config._urlStates}26`)
            .then(res => { if (res.data) setStates(res.data) })
            .catch(err => console.log(err))
    }

    return (
        <IdentificationTypeContext.Provider
            value={{
                identificationTypes, setidentificationTypeId, identificationTypeId,
                setnumber,
                number,
                setemissionInssuer,
                setemission,
                setstateId,
                states
            }}
        >
            {props.children}
        </IdentificationTypeContext.Provider>
    );
};
