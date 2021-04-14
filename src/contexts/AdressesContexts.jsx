import { createContext, useContext, useEffect, useState } from "react";
import { FormContext } from "./FormContexts";

const InitialState = {
    countryId: '',
    setCountryId: () => { },
    stateId: '',
    setStateId: () => { },
    stateName: '',
    setStateName: () => { },
    cityId: '',
    setCityId: () => { },
    cityName: '',
    setCityName: () => { },
    neighborhood: '',
    setNeighborhood: () => { },
    description: '',
    setDescription: () => { },
    zipcode: '',
    setZipCode: () => { },
    number: '',
    setNumber: () => { },
    complement: '',
    setComplement: () => { },
    typeAddressId: '',
    setTypeAddressId: () => { }
}
export const AdressesContext = createContext(InitialState);

export const AdressesProvider = (props) => {
    const [countryId, setCountryId] = useState('')
    const [stateId, setStateId] = useState('')
    const [cityId, setCityId] = useState('')
    const [zipcode, setZipCode] = useState('')
    const [stateName, setStateName] = useState('')
    const [cityName, setCityName] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [description, setDescription] = useState('')
    const [number, setNumber] = useState('')
    const [complement, setComplement] = useState('')
    const [typeAddressId, setTypeAddressId] = useState('')

    const { _Json_ClientAddresses } = useContext(FormContext)

    const AdressJson = {
        "countryId": countryId,
        "stateId": stateId,
        "stateName": stateName,
        "cityId": cityId,
        "cityName": cityName,
        "neighborhood": neighborhood,
        "description": description,
        "zipCode": zipcode,
        "number": number,
        "complement": complement,
        "typeAddressId": typeAddressId
    }

    useEffect(() => {
        if (cityId && cityName && complement && countryId && description && neighborhood && number && stateId && stateName && typeAddressId && zipcode) {
            _Json_ClientAddresses(AdressJson)
        }
    }, [cityId, cityName, complement, countryId, description, neighborhood, number, stateId, stateName, typeAddressId, zipcode])

    return (
        <AdressesContext.Provider
            value={{
                countryId,
                setCountryId,
                stateId,
                setStateId,
                setStateName,
                cityId,
                setCityId,
                setCityName,
                zipcode,
                setZipCode,
                stateName,
                cityName,
                neighborhood,
                setNeighborhood,
                description,
                setDescription,
                number,
                setNumber,
                complement,
                setComplement,
                typeAddressId,
                setTypeAddressId
            }}
        >
            {props.children}
        </AdressesContext.Provider>
    );
};
