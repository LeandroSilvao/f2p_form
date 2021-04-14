import { createContext, useContext, useEffect, useState } from "react"
import { FormContext } from "./FormContexts";


const InitialState = {
    taxPayerRegistry: '',
    name: '',
    nationality: '',
    occupation: '',
    settaxPayerRegistry: () => { },
    setname: () => { },
    setnationality: () => { },
    setoccupation: () => { }
}

export const PPERelatedsContext = createContext(InitialState);

export const PPERelatedsProvider = (props) => {
    const { _Json_PPERelateds } = useContext(FormContext)

    const [taxPayerRegistry, settaxPayerRegistry] = useState('')
    const [name, setname] = useState('')
    const [nationality, setnationality] = useState('')
    const [occupation, setoccupation] = useState('')

    const reqJson = {
        taxPayerRegistry: taxPayerRegistry,
        name: name,
        nationality: nationality,
        occupation: occupation
    }

    useEffect(() => {
        if(name && taxPayerRegistry && occupation && nationality) _Json_PPERelateds(reqJson)
    }, [name,taxPayerRegistry,occupation,nationality])

    return (
        <PPERelatedsContext.Provider
            value={{
                taxPayerRegistry,
                name,
                nationality,
                occupation,
                settaxPayerRegistry,
                setname,
                setnationality,
                setoccupation
            }}
        >
            {props.children}
        </PPERelatedsContext.Provider>
    );
};
