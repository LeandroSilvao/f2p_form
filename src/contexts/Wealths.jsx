import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'

import { FormContext } from './FormContexts'
import config from '../config'

const InitialState = {
    typeWealthId: '',
    value: '',
    description: '',
    typesWealthId: [],
    settypeWealthId: () => { },
    setvalue: () => { },
    setdescription: () => { },
}

export const WealthsTypeContext = createContext(InitialState);

export const WealthsTypeProvider = (props) => {

    const [typeWealthId, settypeWealthId] = useState('')
    const [value, setvalue] = useState('')
    const [description, setdescription] = useState('')

    const [typesWealthId, settypesWealthId] = useState([])

    useEffect(() => {
            GetWealthTypes()
    }, [])

    function GetWealthTypes() {
        axios.get(config._urlWealthType)
            .then(res => { if (res.data) settypesWealthId(res.data) })
            .catch(err => console.log(err))
    }


    return (
        <WealthsTypeContext.Provider
            value={{
                typeWealthId, value, description,
                settypeWealthId, setvalue, setdescription,
                typesWealthId,
            }}
        >
            {props.children}
        </WealthsTypeContext.Provider>
    );
};
