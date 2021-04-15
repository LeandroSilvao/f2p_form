import { createContext, useContext, useEffect, useState } from "react";
import { FormContext } from "./FormContexts";

const InitialState = {
    isAcceptedOrderAttorney: false,
    name: '',
    setname: () => { },
    taxpayerRegistry: '',
    settaxpayerRegistry: () => { },
    birthDate: '',
    setbirthDate: () => { },
    isPEP: false,
    setisPEP: () => { },
    actionDescription: '',
    setactionDescription: () => { },
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
    setneighborhood: () => { },
    description: '',
    setdescription: () => { },
    zipCode: '',
    setZipCode: () => { },
    number: '',
    setnumber: () => { },
    complement: '',
    setcomplement: () => { },
    typeAddressId: '',
    setTypeAddressId: () => { },
}
export const AttorneyContext = createContext(InitialState);

export const AttorneyProvider = (props) => {
    const [isAcceptedOrderAttorney, setisAcceptedOrderAttorney] = useState(false)
    const [name, setname] = useState('')
    const [taxpayerRegistry, settaxpayerRegistry] = useState('')
    const [birthDate, setbirthDate] = useState('')
    const [isPEP, setisPEP] = useState(false)
    const [actionDescription, setactionDescription] = useState('')
    const [countryId, setCountryId] = useState('')
    const [stateId, setStateId] = useState('')
    const [stateName, setStateName] = useState('')
    const [cityId, setCityId] = useState('')
    const [cityName, setCityName] = useState('')
    const [neighborhood, setneighborhood] = useState('')
    const [description, setdescription] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [number, setnumber] = useState('')
    const [complement, setcomplement] = useState('')
    const [typeAddressId, setTypeAddressId] = useState('')

    const { _Json_AttorneyInfo } = useContext(FormContext)

    const attorneys = {
        name: name,
        taxpayerRegistry: taxpayerRegistry.replace(/[^\d]+/g, ''),
        birthDate: birthDate,
        isPEP: isPEP,
        actionDescription: actionDescription,
        address: {
            countryId: countryId,
            stateId: stateId,
            stateName: stateName,
            cityId: cityId,
            cityName: cityName,
            neighborhood: neighborhood,
            description: description,
            zipCode: zipCode,
            number: number,
            complement: complement,
            typeAddressId: typeAddressId
        }
    }


    useEffect(() => {
        if(!isAcceptedOrderAttorney) _Json_AttorneyInfo([])
        else if (isAcceptedOrderAttorney && name && taxpayerRegistry && birthDate && actionDescription && countryId && stateId && stateName && cityId && cityName &&
            neighborhood && description && zipCode && number && complement && typeAddressId) {
            _Json_AttorneyInfo([attorneys])
        }
    }, [isAcceptedOrderAttorney, name, taxpayerRegistry, birthDate, isPEP, actionDescription, countryId, stateId, stateName, cityId, cityName,
        neighborhood, description, zipCode, number, complement, typeAddressId])

    return (
        <AttorneyContext.Provider
            value={{
                name, taxpayerRegistry, birthDate, isPEP, actionDescription,
                countryId, isAcceptedOrderAttorney, stateId,
                setisAcceptedOrderAttorney, setname, settaxpayerRegistry,
                setbirthDate, setisPEP, setactionDescription,
                setCountryId, setStateId, setStateName, setCityId, setneighborhood,
                setCityName, setTypeAddressId, setZipCode, setdescription, setnumber, setcomplement
            }}
        >
            {props.children}
        </AttorneyContext.Provider>
    );
};
