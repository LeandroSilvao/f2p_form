import { createContext, useContext, useEffect, useState } from "react"

import axios from 'axios'
import config from '../config'

import { FormContext } from './FormContexts'

const InitialState = {
    taxPayerRegistry: '',
    identificationTypeId: '',
    number: '',
    emissionInssuer: '',
    emission: '',
    stateId: '',
    identificationTypes: [],
    setname: () => { },
    setidentificationTypeId: () => { },
    setnumber: () => { },
    setemissionInssuer: () => { },
    setemission: () => { },
    setstateId: () => { },
    setHide: () => { }
}

export const SpouseContext = createContext(InitialState);

export const SpouseProvider = (props) => {

    const { _Json_Spouse } = useContext(FormContext)

    const [spouseId, setspouseId] = useState(0)
    const [name, setname] = useState('')
    const [taxPayerRegistry, settaxPayerRegistry] = useState('')
    const [identificationTypeId, setidentificationTypeId] = useState('')
    const [number, setnumber] = useState('')
    const [emissionInssuer, setemissionInssuer] = useState('')
    const [emission, setemission] = useState('')
    const [stateId, setstateId] = useState('')
    
    const [identificationTypes, setIdentificationTypes] = useState([])
    const [states, setStates] = useState([])

    const [hide, setHide] = useState(false)

    let reqJSON = {
        spouseId: spouseId,
        name: name,
        taxPayerRegistry: taxPayerRegistry.replace(/[^\d]+/g, ''),
        document: {
            identificationTypeId: identificationTypeId,
            number: number,
            emissionInssuer: emissionInssuer,
            emission: emission,
            stateId: stateId
        }
    }

    useEffect(() => {
        if (identificationTypeId === "40") {
            if (name && taxPayerRegistry && identificationTypeId && emissionInssuer && emission && stateId) {
                const cpf = `${taxPayerRegistry.substring(0, 3)}.${taxPayerRegistry.substring(3, 6)}.${taxPayerRegistry.substring(6, 9)}-${taxPayerRegistry.substring(9, 11)}`
                reqJSON.document.number = identificationTypeId === "40" ? cpf : number
                reqJSON.taxPayerRegistry = cpf
                _Json_Spouse(reqJSON)
            }
        }
        else if (name && taxPayerRegistry && identificationTypeId && number && emissionInssuer && emission && stateId) {
            const cpf = `${taxPayerRegistry.substring(0, 3)}.${taxPayerRegistry.substring(3, 6)}.${taxPayerRegistry.substring(6, 9)}-${taxPayerRegistry.substring(9, 11)}`
            reqJSON.taxPayerRegistry = cpf
            _Json_Spouse(reqJSON)
        }

    }, [hide, name, taxPayerRegistry, identificationTypeId, number, emissionInssuer, emission, stateId])

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
        <SpouseContext.Provider
            value={{
                identificationTypes, setidentificationTypeId, identificationTypeId,
                settaxPayerRegistry, taxPayerRegistry,
                setnumber, setname, name,
                number,
                setemissionInssuer,
                setemission,
                setstateId,
                states,
                setHide
            }}
        >
            {props.children}
        </SpouseContext.Provider>
    );
};
