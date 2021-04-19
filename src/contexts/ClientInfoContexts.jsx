import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import config from "../config";
import { FormContext } from "./FormContexts";

const InitialState = {
    name: String,
    setname: () => { },
    shortName: String,
    setshortName: () => { },
    taxPayerRegistry: String,
    settaxPayerRegistry: () => { },
    birthDate: String,
    setbirthDate: () => { },
    age: String,
    setAge: () => { },
    fatherName: String,
    setfatherName: () => { },
    genderId: String,
    setgenderId: () => { },
    gendersIds: [],
    maritalStatusId: String,
    setmaritalStatusId: () => { },
    maritalStatus: [],
    maritalAgreementId: String,
    maritalAgreements: [],
    motherName: String,
    setmotherName: () => { },
    nationality: String,
    countryBirthId: String,
    getCountriesBirthId: () => { },
    stateBirthId: String,
    stateBirthName: String,
    professionalOccupationId: String,
    residenceInOtherCountryId: String,
    otherTaxResidenceCountryId: String,
    educationLevelId: String,
    ppeOccupation: String,
    setppeOccupation: () => { },
    usPerson: String,
    setusPerson: () => { },
    isAssociatedPerson: String,
    setisAssociatedPerson: () => { },
    urlCallback: String,
    isAcceptedOrderAttorney: String,
    isAdministratorInAnotherAccount: String,
    setisAdministratorInAnotherAccount: () => { }
}
export const ClientInfoContext = createContext(InitialState);

export const ClientInfoProvider = (props) => {
    const {_Json_ClientInfo, _Json_Spouse} = useContext(FormContext)

    //#region States

    const [clientId, setclientId] = useState(0)
    const [name, setname] = useState('')
    const [shortName, setshortName] = useState('')
    const [taxPayerRegistry, settaxPayerRegistry] = useState('')
    const [birthDate, setbirthDate] = useState('')
    const [age, setAge] = useState('')
    const [fatherName, setfatherName] = useState('')
    const [motherName, setmotherName] = useState('')
    const [nationality, setnationality] = useState('')
    //! Gender variables
    const [genderId, setgenderId] = useState('')
    const [gendersIds, setgendersIds] = useState([])
    //! Marital variables
    const [maritalStatusId, setmaritalStatusId] = useState('')
    const [maritalStatus, setMaritalStatus] = useState([])
    const [maritalAgreementId, setmaritalAgreementId] = useState('')
    const [maritalAgreements, setmaritalAgreements] = useState([])
    //! Country and state birth variables
    const [countryBirthId, setcountryBirthId] = useState('')
    const [countriesBirthId, setcountriesBirthId] = useState([])
    const [stateBirthId, setstateBirthId] = useState('')
    const [stateBirthName, setstateBirthName] = useState('')
    const [statesBirth, setstatesBirth] = useState([])
    //! Professional ocupation variables
    const [professionalOccupationId, setprofessionalOccupationId] = useState('')
    const [professionalOccupationsId, setprofessionalOccupationsId] = useState([])
    //! Residence in other country variables
    const [residenceInOtherCountryId, setresidenceInOtherCountryId] = useState('')
    const [residencesInOtherCountryId, setresidencesInOtherCountryId] = useState([])
    //! Other tax residence in other country variables
    const [otherTaxResidenceCountryId, setotherTaxResidenceCountryId] = useState('')
    const [otherTaxResidencesCountryId, setotherTaxResidencesCountryId] = useState([])
    //! Education level variables
    const [educationLevelId, seteducationLevelId] = useState('')
    const [educationsLevelId, seteducationsLevelId] = useState([])
    const [ppeOccupation, setppeOccupation] = useState('')
    const [usPerson, setusPerson] = useState(false)
    const [isAssociatedPerson, setisAssociatedPerson] = useState(false)
    const [isAdministratorInAnotherAccount, setisAdministratorInAnotherAccount] = useState(false)

    //#endregion

    const reqJSON = {
        clientId: clientId,
        name: name,
        shortName: shortName,
        taxPayerRegistry: taxPayerRegistry.replace(/[^\d]+/g, ''),
        birthDate: `${birthDate}T00:00:00`,
        fatherName: fatherName,
        genderId: parseInt(genderId),
        maritalStatusId: parseInt(maritalStatusId),
        maritalAgreementId: maritalAgreementId ? parseInt(maritalAgreementId) : 0,
        motherName: motherName,
        nationality: nationality,
        countryBirthId: parseInt(countryBirthId),
        stateBirthId: parseInt(stateBirthId),
        stateBirthName: stateBirthName,
        professionalOccupationId: parseInt(professionalOccupationId),
        residenceInOtherCountryId: parseInt(residenceInOtherCountryId),
        otherTaxResidenceCountryId: parseInt(otherTaxResidenceCountryId),
        educationLevelId: parseInt(educationLevelId),
        ppeOccupation: ppeOccupation,
        usPerson: usPerson,
        isAssociatedPerson: isAssociatedPerson,
        isAdministratorInAnotherAccount: isAdministratorInAnotherAccount,
    }
    useEffect(() => {
        if(maritalStatusId !== "2") _Json_Spouse({})
    }, [maritalStatusId])

    // Campos não obrigatórios
    useEffect(() => {
        _Json_ClientInfo(reqJSON)
    }, [usPerson, isAssociatedPerson,ppeOccupation, maritalAgreementId, otherTaxResidenceCountryId,residenceInOtherCountryId,isAdministratorInAnotherAccount])

    // Campos obrigatórios
    useEffect(() => {
        if (name && shortName && birthDate && fatherName && motherName && taxPayerRegistry && genderId && maritalStatusId && nationality && countryBirthId &&
            stateBirthId && stateBirthName && professionalOccupationId  && educationLevelId) {
            _Json_ClientInfo(reqJSON)
        }
    }, [name, shortName, birthDate, fatherName, motherName, taxPayerRegistry, genderId, maritalStatusId, nationality, countryBirthId,
        stateBirthId, stateBirthName, professionalOccupationId, educationLevelId])


    useEffect(() => {
            getGendersIds()
            getMaritalStatus()
            getMaritalAgreements()
            getCountries()
            getProfessionalOccupations()
            getEducation()
    }, [])

    useEffect(() => {
        if(countryBirthId === '') setstatesBirth([])
        else getStatesBirth() 
    }, [countryBirthId])


    function getGendersIds() {
        axios.get(config._urlGenders)
            .then(res => setgendersIds(res.data))
            .catch(err => console.log(err))
    }
    function getMaritalStatus() {
        axios.get(config._urlMaritalStatus)
            .then(res => setMaritalStatus(res.data))
            .catch(err => console.log(err))
    }
    function getMaritalAgreements() {
        axios.get(config._urlMaritalAgreement)
            .then(res => setmaritalAgreements(res.data))
            .catch(err => console.log(err))
    }
    function getCountries() {
        axios.get(config._urlCountries)
            .then(res => {
                setcountriesBirthId(res.data)
                setresidencesInOtherCountryId(res.data)
                setotherTaxResidencesCountryId(res.data)
            })
            .catch(err => console.log(err))
    }
    function getStatesBirth() {
        axios.get(`${config._urlStates}${countryBirthId}`)
            .then(res => setstatesBirth(res.data))
            .catch(err => console.log(err))
    }
    function getProfessionalOccupations() {
        axios.get(config._urlProfessionalOccupation)
            .then(res => setprofessionalOccupationsId(res.data))
            .catch(err => console.log(err))
    }
    function getEducation() {
        axios.get(config._urlEducation)
            .then(res => seteducationsLevelId(res.data))
            .catch(err => console.log(err))
    }

    return (
        <ClientInfoContext.Provider
            value={{
                name, setname,
                shortName, setshortName,
                taxPayerRegistry, settaxPayerRegistry,
                birthDate, setbirthDate, age, setAge,
                fatherName, setfatherName,
                motherName, setmotherName,
                genderId, setgenderId, gendersIds,
                maritalStatusId, setmaritalStatusId, maritalStatus,
                maritalAgreements, setmaritalAgreementId,
                nationality, setnationality,
                setcountryBirthId, countriesBirthId,
                setstateBirthId, setstateBirthName, statesBirth,
                setprofessionalOccupationId, professionalOccupationsId,professionalOccupationId,
                residencesInOtherCountryId, setresidenceInOtherCountryId,
                otherTaxResidencesCountryId, setotherTaxResidenceCountryId,
                seteducationLevelId, educationsLevelId,
                ppeOccupation,setppeOccupation,
                usPerson, setusPerson,
                isAssociatedPerson, setisAssociatedPerson,
                isAdministratorInAnotherAccount, setisAdministratorInAnotherAccount
            }}
        >
            {props.children}
        </ClientInfoContext.Provider>
    );
};
