import { createContext, useContext, useEffect, useState } from "react"

import { FormContext } from './FormContexts'

const InitialState = {
    institutionName: '',
    occupation: '',
    profession: '',
    corporateTaxpayerRegistry: '',
    setinstitutionName: () => { },
    setoccupation: () => { },
    setprofession: () => { },
    setcorporateTaxpayerRegistry: () => { },
    setIsRequired: () => { }
}

export const WorkContext = createContext(InitialState);

export const WorkProvider = (props) => {

    const { _Json_Work } = useContext(FormContext)

    const [institutionName, setinstitutionName] = useState('')
    const [occupation, setoccupation] = useState('')
    const [profession, setprofession] = useState('')
    const [corporateTaxpayerRegistry, setcorporateTaxpayerRegistry] = useState('')
    
    const [isRequired, setIsRequired] = useState(false)

    let reqJSON = {
        institutionName: institutionName,
        occupation: occupation,
        profession: profession,
        corporateTaxpayerRegistry: corporateTaxpayerRegistry.replace(/[^\d]+/g, '')
    }

    useEffect(() => {
        if(!isRequired) _Json_Work({})
        else if (institutionName && occupation && profession && corporateTaxpayerRegistry){
            _Json_Work(reqJSON)
        }
    }, [isRequired,institutionName, occupation, profession, corporateTaxpayerRegistry])


    return (
        <WorkContext.Provider
            value={{
                institutionName, setinstitutionName,
                occupation, setoccupation,
                profession, setprofession,
                corporateTaxpayerRegistry, setcorporateTaxpayerRegistry,
                setIsRequired
            }}
        >
            {props.children}
        </WorkContext.Provider>
    );
};
