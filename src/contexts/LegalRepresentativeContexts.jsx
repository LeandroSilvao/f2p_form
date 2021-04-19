import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { FormContext } from "./FormContexts";

import config from "../config";

const InitialState = {
    name: '',
    taxpayerRegistry: '',
    relationshipTypeId: '',
    relationshipTypesId: [],
    setname: () => { },
    settaxpayerRegistry: () => { },
    setRelationshipTypeId: () => { },
    setIsRequired: () => { }
}
export const LegalRepresentativeContext = createContext(InitialState);

export const LegalRepresentativeProvider = (props) => {
    const [name, setname] = useState('')
    const [taxpayerRegistry, settaxpayerRegistry] = useState('')
    const [relationshipTypeId, setRelationshipTypeId] = useState('')

    const [relationshipTypesId, setRelationshipTypesId] = useState([])

    const [isRequired, setIsRequired] = useState(false)

    const { _Json_LegalRepresentative, errorOnApi } = useContext(FormContext)

    const legalRepresentatives = {
        name: name,
        taxpayerRegistry: taxpayerRegistry,
        relationshipTypeId: relationshipTypeId
    }

    useEffect(() => {
        if(!isRequired) _Json_LegalRepresentative([])
        else if (name && taxpayerRegistry && relationshipTypeId) _Json_LegalRepresentative([legalRepresentatives])
    }, [isRequired, name, taxpayerRegistry, relationshipTypeId])

    useEffect(() => {
            GetRelationsShipType()
    }, [])

    function GetRelationsShipType() {
        axios.get(config._urlRelationshipType)
            .then(res => { if (res.data) setRelationshipTypesId(res.data) })
            .catch(err => console.log(err))
    }

    return (
        <LegalRepresentativeContext.Provider
            value={{
                name, taxpayerRegistry, relationshipTypeId,
                setname, settaxpayerRegistry, setRelationshipTypeId,
                relationshipTypesId, setIsRequired
            }}
        >
            {props.children}
        </LegalRepresentativeContext.Provider>
    );
};
