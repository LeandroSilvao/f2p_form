import { createContext, useContext, useEffect, useState } from "react"

import axios from 'axios'
import config from '../config'
import { FormContext } from "./FormContexts";

const InitialState = {
    mail: '',
    type: '',
    isCorrespondency: true,
    emailTypes: [],
    setMail: () => { },
    setType: () => { },
    setIsCorrespondency: () => { },
}

export const EmailContext = createContext(InitialState);

export const EmailProvider = (props) => {
    const { _Json_EmailInfo } = useContext(FormContext)
    const [mail, setMail] = useState('')
    const [type, setType] = useState('')
    const [isCorrespondency, setIsCorrespondency] = useState(true)
    const [emailTypes, setEmailTypes] = useState([])

    let reqJSON = {
        mail: mail,
        type: parseInt(type),
        isCorrespondency: true
    }

    useEffect(() => {
        if (mail && type) _Json_EmailInfo(reqJSON)
    }, [mail, type])

    useEffect(() => {
            getEmailTypes()
    }, [])


    function getEmailTypes() {
        axios.get(config._urlEmailType)
            .then(res => {
                if (res.data) setEmailTypes(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <EmailContext.Provider
            value={{
                emailTypes,
                setIsCorrespondency, isCorrespondency,
                setType, setMail
            }}
        >
            {props.children}
        </EmailContext.Provider>
    );
};
