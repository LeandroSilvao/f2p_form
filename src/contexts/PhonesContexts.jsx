import { createContext, useContext, useEffect, useState } from "react"

import axios from 'axios'
import config from '../config'
import { FormContext } from "./FormContexts";

const InitialState = {
    phoneTypes: [],
    phoneTypeId: '',
    countryCode: '',
    stateCode: '',
    number: '',
    setPhoneTypeId: () => { },
    setCountryCode: () => { },
    setStateCode: () => { },
    setNumber: () => { },
}



export const PhonesContext = createContext(InitialState);

export const PhonesProvider = (props) => {
    const { _Json_PhoneInfo } = useContext(FormContext)
    const [phoneTypeId, setPhoneTypeId] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [stateCode, setStateCode] = useState('')
    const [number, setNumber] = useState('')
    const [phoneTypes, setPhoneTypes] = useState([])

    let reqJSON = {
        countryCode: countryCode,
        stateCode: stateCode,
        number: number,
        type: parseInt(phoneTypeId)
    }

    useEffect(() => {
        if (countryCode && stateCode && number && phoneTypeId) _Json_PhoneInfo(reqJSON)
    }, [countryCode, stateCode, number, phoneTypeId])

    useEffect(() => {
            getPhoneTypes()
    }, [])


    function getPhoneTypes() {
        axios.get(config._urlPhoneType)
            .then(res => {
                if (res.data) setPhoneTypes(res.data)
            })
            .catch(err => console.log(`${err}`))
    }

    return (
        <PhonesContext.Provider
            value={{
                phoneTypes, setPhoneTypeId, phoneTypeId,
                countryCode, setCountryCode,
                stateCode, setStateCode,
                number, setNumber
            }}
        >
            {props.children}
        </PhonesContext.Provider>
    );
};
