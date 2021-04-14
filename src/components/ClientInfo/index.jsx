import React, { useContext, useEffect, useState } from 'react'

import Switch from "react-switch";

import Spouse from '../Spouse'
import LegalRepresentative from '../LegalRepresentative'

import { LegalRepresentativeProvider } from '../../contexts/LegalRepresentativeContexts';
import { SpouseProvider } from '../../contexts/Spouse';

import { ClientInfoContext } from '../../contexts/ClientInfoContexts'
import { FormContext } from '../../contexts/FormContexts'


import './index.css'

export default function ClientInfo() {
    const { languagePT } = useContext(FormContext)
    const {
        // States
        name, shortName, age, birthDate, fatherName, motherName, taxPayerRegistry, genderId, gendersIds, maritalStatusId, nationality,
        countryBirthId, countriesBirthId, stateBirthId, stateBirthName, statesBirth, professionalOccupationId, professionalOccupationsId,
        residenceInOtherCountryId, residencesInOtherCountryId, otherTaxResidencesCountryId, otherTaxResidenceCountryId,
        educationLevelId, educationsLevelId, ppeOccupation, usPerson, isAssociatedPerson, isAdministratorInAnotherAccount,
        maritalStatus, maritalAgreements, maritalAgreementId,
        // Sets
        setname, setshortName, setbirthDate, setAge, setfatherName, setmotherName, settaxPayerRegistry, setgenderId, setmaritalStatusId, setmaritalAgreementId,
        setnationality, setcountryBirthId, setstateBirthId, setstateBirthName, setprofessionalOccupationId, setresidenceInOtherCountryId,
        setotherTaxResidenceCountryId, seteducationLevelId, setppeOccupation, setusPerson, setisAssociatedPerson, setisAdministratorInAnotherAccount
    } = useContext(ClientInfoContext)
    const [errorCpf, setErrorCpf] = useState(false)

    const Max = new Date().toISOString().split('T')[0]
    const Min = new Date(Max.split('-')[0] - 200, '00', '01').toISOString().split('T')[0]

    const Labels = {
        componentTitle: languagePT ? 'Informações do cliente' : 'Customer information',
        onlyLettersTitle: languagePT ? 'Somente letras' : 'Only letters',
        dateInvalid: languagePT ? 'Selecione uma data valida' : 'Only letters',
        cpfTitle: languagePT ? 'Digite um cpf valido' : 'Only letters',
        name: languagePT ? 'Nome' : 'Name',
        shortName: languagePT ? 'Apelido' : 'ShortName',
        birthDate: languagePT ? 'Data de Nascimento' : 'BirthDate',
        fatherName: languagePT ? 'Nome do Pai' : 'Father Name',
        motherName: languagePT ? 'Nome da Mãe' : 'Mother Name',
        taxPayerRegistry: languagePT ? 'CPF' : 'Tax Payer Registry',
        genderId: languagePT ? 'Genero' : 'Gender',
        maritalStatusId: languagePT ? 'Estado civil' : 'Marital Status',
        maritalAgreementId: languagePT ? 'Regime do estado civil' : 'Marital Agreement',
        nationality: languagePT ? 'Nacionalidade' : 'Nationality',
        countryBirthId: languagePT ? 'País de nascimento' : 'Country Birth',
        stateBirthId: languagePT ? 'UF de nascimento do cliente' : 'State Birth',
        stateBirthName: languagePT ? 'Nome UF de nascimento' : 'State Birth Name',
        professionalOccupationId: languagePT ? 'Natureza da ocupação' : 'Professional Occupation',
        residenceInOtherCountryId: languagePT ? 'País ao cliente que possui residencia em outros países' : 'Residence in Other Country',
        otherTaxResidenceCountryId: languagePT ? 'País ao cliente que possui domicílio fiscal além do declarado' : 'Other Tax Residence Country',
        residenceInOtherCountryIdSelect: languagePT ? 'Selecione o país' : '',
        otherTaxResidenceCountryIdSelect: languagePT ? 'Selecione o país' : '',
        educationLevelId: languagePT ? 'Escolaridade' : 'Education Level',
        ppeOccupation: languagePT ? 'Cargo PPE do cliente, se o mesmo consta como Pessoa Politicamente Exposta.' : 'PPE Ocupation, whether he is listed as a Politically Exposed Person.',
        usPerson: languagePT ? 'Cliente considerado como USPerson' : 'Considered as USPerson',
        isAssociatedPerson: languagePT ? 'Pessoa Vinculada' : 'Associated Person',
        isAdministratorInAnotherAccount: languagePT ? 'Cliente realiza operações por conta de terceiros' : 'Customer performs operations on behalf of third parties',
        urlCallback: languagePT ? '' : '',
        isAcceptedOrderAttorney: languagePT ? 'Autoriza a transmissão de ordens por procurador' : 'Authorizes the transmission of orders by proxy',
    }

    function ValidCPF(cpf) {
        var Soma;
        var Resto;
        Soma = 0;
        if (cpf === "00000000000") return false;
        if (cpf === "11111111111") return false;
        if (cpf === "22222222222") return false;
        if (cpf === "33333333333") return false;
        if (cpf === "44444444444") return false;
        if (cpf === "55555555555") return false;
        if (cpf === "66666666666") return false;
        if (cpf === "77777777777") return false;
        if (cpf === "88888888888") return false;

        if (cpf.includes('.')) cpf = cpf.replace(/\./g, '')
        if (cpf.includes('-')) cpf = cpf.replace(/-/g, '')
        // if (cpf.includes('-')) cpf = cpf.replace(/\-/g, '')

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(cpf.substring(9, 10))) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }
    function OnChangeFields(e) {
        const { id, value, selectedIndex, options } = e.target
        switch (id) {
            case 'name':
                setname(value)
                break;
            case 'shortName':
                setshortName(value)
                break;
            case 'birthDate':
                setAge('')

                const d = new Date()
                const ano_atual = d.getFullYear()
                const mes_atual = d.getMonth() + 1
                const dia_atual = d.getDate()

                const ano_aniversario = parseInt(value.split("-")[0])
                const mes_aniversario = parseInt(value.split("-")[1])
                const dia_aniversario = parseInt(value.split("-")[2])

                if (ano_aniversario >= parseInt(Min.split("-")[0])) {
                    let Qtd_Anos = ano_atual - ano_aniversario
                    if (mes_atual < mes_aniversario || mes_atual === mes_aniversario && dia_atual < dia_aniversario) {
                        Qtd_Anos--
                    }
                    setAge(Qtd_Anos)
                }
                setbirthDate(value)
                break;
            case 'fatherName':
                setfatherName(value)
                break;
            case 'motherName':
                setmotherName(value)
                break;
            case 'taxPayerRegistry':
                settaxPayerRegistry(value)
                if (value.length < 11) setErrorCpf(false)
                else if (value.length === 11) {
                    if (ValidCPF(value)) {
                        setErrorCpf(false)
                        settaxPayerRegistry(value)
                    }
                    else {
                        settaxPayerRegistry(`${value.substring(0, value.length - 1)}`)
                        setErrorCpf(true)
                    }
                }
                else if (value.length > 11) {
                    setErrorCpf(true)
                }
                break;
            case 'gender':
                setgenderId(value)
                break;
            case 'maritalStatusId':
                setmaritalStatusId(value)
                if (value !== '2') setmaritalAgreementId('')
                break;
            case 'maritalAgreementId':
                setmaritalAgreementId(value)
                break;
            case 'nationality':
                setnationality(value)
                break;
            case 'countryBirthId':
                setcountryBirthId(value)
                break;
            case 'statesBirth':
                const stateNameBirth = options[selectedIndex].getAttribute('statename')
                // console.log(stateNameBirth)
                setstateBirthId(value)
                setstateBirthName(stateNameBirth)
                break;
            case 'professionalOccupationId':
                setprofessionalOccupationId(value)
                break;
            case 'residenceInOtherCountryId':
                setresidenceInOtherCountryId(value)
                break;
            case 'otherTaxResidenceCountryId':
                setotherTaxResidenceCountryId(value)
                break;
            case 'educationLevel':
                seteducationLevelId(value)
                break;
            case 'ppeOccupation':
                setppeOccupation(value)
                break;
            default:
                break;
        }
    }
    function RenderGenders() {
        return (
            gendersIds.map(g => {
                return (
                    <option key={g.genderId} value={g.genderId}>{g.description}</option>
                )
            })
        )
    }
    function RenderMaritalStatus() {
        return (
            maritalStatus.map(m => {
                return (
                    <option key={m.maritalStatusId} value={m.maritalStatusId}>{m.description}</option>
                )
            })
        )
    }
    function RenderMaritalAgreementId() {
        return (
            maritalAgreements.map(m => {
                return (
                    <option key={m.maritalAgreementId} value={m.maritalAgreementId}>{m.description}</option>
                )
            })
        )
    }
    function RenderCountriesBirth() {
        return (
            countriesBirthId.map(c => {
                return (
                    <option key={c.countryId} value={c.countryId}>{c.name}</option>
                )
            })
        )
    }
    function RenderStates() {
        return (
            statesBirth.map(s => {
                return (
                    <option key={s.stateId} value={s.stateId} statename={s.name}>{s.name}</option>
                )
            })
        )
    }
    function RenderProfessionalOccupations() {
        return (
            professionalOccupationsId.map(pot => {
                return (
                    <option key={pot.professionalOccupationId} value={pot.professionalOccupationId}>{pot.description}</option>
                )
            })
        )
    }
    function RenderResidencesInOtherCountry() {
        return (
            residencesInOtherCountryId.map(roc => {
                return (
                    <option key={roc.countryId} value={roc.countryId}>{roc.name}</option>
                )
            })
        )
    }
    function RenderOtherTaxResidencesCountry() {
        return (
            otherTaxResidencesCountryId.map(otrc => {
                return (
                    <option key={otrc.countryId} value={otrc.countryId}>{otrc.name}</option>
                )
            })
        )
    }
    function RenderEducationLevel() {
        return (
            educationsLevelId.map(ed => {
                return (
                    <option key={ed.educationLevelId} value={ed.educationLevelId}>{ed.description}</option>
                )
            })
        )
    }

    return (
        <div className="clientInfo">
            <span className="inputDescriptionTitle">{Labels.componentTitle}</span>
            <div className="d-flex">
                <input value={name} required type="text" name="name" id="name" placeholder={Labels.name}
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
                <p className="required">*</p>
            </div>

            <div className="d-flex">
                <input value={shortName} required type="text" name="shortName" id="shortName" placeholder={Labels.shortName}
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
                <p className="required">*</p>
            </div>

            <p className="inputDescription">{Labels.birthDate}</p>
            <div className="d-flex">
                <input value={birthDate} required type="date" name="birthDate" id="birthDate" onChange={e => OnChangeFields(e)}
                    min={Min} max={Max} title={Labels.onlyLettersTitle} />
                <p className="required">*</p>
            </div>

            <LegalRepresentativeProvider>
                <LegalRepresentative />
            </LegalRepresentativeProvider>

            <div className="d-flex">
                <input value={fatherName} required type="text" name="fatherName" id="fatherName" placeholder={Labels.fatherName}
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
                <p className="required">*</p>
            </div>

            <div className="d-flex">
                <input value={motherName} required type="text" name="motherName" id="motherName" placeholder={Labels.motherName}
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
                <p className="required">*</p>
            </div>

            <div>
                <div className="d-flex">
                    <input value={taxPayerRegistry} required type="text" name="taxPayerRegistry" id="taxPayerRegistry" placeholder={Labels.taxPayerRegistry}
                        pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" title={Labels.cpfTitle} onChange={e => OnChangeFields(e)} />
                    <p className="required">*</p>
                </div>
                <p className={errorCpf ? 'errorCpf' : 'd-none'}>{Labels.cpfTitle}</p>
            </div>

            <div className="d-flex">
                <select value={genderId} required className="clSelect" name="gender" id="gender" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value="">{Labels.genderId}</option>
                    {RenderGenders()}
                </select>
                <p className="required">*</p>
            </div>


            <div className="d-flex">
                <select value={maritalStatusId} required className="clSelect" name="maritalStatusId" id="maritalStatusId" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value="">{Labels.maritalStatusId}</option>
                    {RenderMaritalStatus()}
                </select>
                <p className="required">*</p>
            </div>

            <SpouseProvider>
                <Spouse hide={maritalStatusId === '2' ? false : true} required={maritalStatusId === '2' ? true : false}>

                    <div className={maritalStatusId === '2' ? "d-flex" : "d-none"}>
                        <select value={maritalAgreementId} required={maritalStatusId === '2'} className="clSelect" name="maritalAgreementId" id="maritalAgreementId" onChange={e => OnChangeFields(e)}>
                            <option defaultValue value="">{Labels.maritalAgreementId}</option>
                            {RenderMaritalAgreementId()}
                        </select>
                        <p className="required">*</p>
                    </div>
                </Spouse>
            </SpouseProvider>


            <div className="d-flex">
                <input value={nationality} required type="text" name="nationality" id="nationality" placeholder={Labels.nationality}
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
                <p className="required">*</p>
            </div>

            <div className="d-flex">
                <select required className="clSelect" name="countryBirthId" id="countryBirthId" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value="">{Labels.countryBirthId}</option>
                    {RenderCountriesBirth()}
                </select>
                <p className="required">*</p>
            </div>

            <div className="d-flex">
                <select value={stateBirthId} required className="clSelect" name="statesBirth" id="statesBirth" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value="">{Labels.stateBirthName}</option>
                    {RenderStates()}
                </select>
                <p className="required">*</p>
            </div>


            <div className="d-flex">
                <select value={professionalOccupationId} required className="clSelect" name="professionalOccupationId" id="professionalOccupationId" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value="">{Labels.professionalOccupationId}</option>
                    {RenderProfessionalOccupations()}
                </select>
                <p className="required">*</p>
            </div>

            <div className="d-flex">
                <select value={educationLevelId} required className="clSelect" name="educationLevel" id="educationLevel" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value="">{Labels.educationLevelId}</option>
                    {RenderEducationLevel()}
                </select>
                <p className="required">*</p>
            </div>

            <p className="inputDescription">{Labels.residenceInOtherCountryId}</p>
            <select value={residenceInOtherCountryId} className="clSelect" name="residenceInOtherCountryId" id="residenceInOtherCountryId" onChange={e => OnChangeFields(e)}>
                <option defaultValue value="">{Labels.residenceInOtherCountryIdSelect}</option>
                {RenderResidencesInOtherCountry()}
            </select>

            <p className="inputDescription">{Labels.otherTaxResidenceCountryId}</p>
            <select value={otherTaxResidenceCountryId} className="clSelect" name="otherTaxResidenceCountryId" id="otherTaxResidenceCountryId" onChange={e => OnChangeFields(e)}>
                <option defaultValue value="">{Labels.otherTaxResidenceCountryIdSelect}</option>
                {RenderOtherTaxResidencesCountry()}
            </select>



            <div>
                <p className="inputDescription">{Labels.ppeOccupation}</p>
                <input value={ppeOccupation} type="text" name="ppeOccupation" id="ppeOccupation"
                    pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
            </div>


            <div className="d-flex df-jcspb d-flexdc">

                <div className="d-flex d-flexdc df-alc">
                    <p className="inputDescription">{Labels.usPerson} ?</p>
                    <Switch
                        onColor="#4B4B4B"
                        offColor="#bdbbbb"
                        onHandleColor="#bdbbbb"
                        offHandleColor="#4B4B4B"
                        checked={usPerson}
                        onChange={cheked => setusPerson(cheked)}
                        handleDiameter={30}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={50}
                        className="react-switch"
                        id="material-switch"
                    />
                </div>

                <div className="d-flex d-flexdc df-alc">
                    <p className="inputDescription">{Labels.isAssociatedPerson} ?</p>
                    <Switch
                        onColor="#4B4B4B"
                        offColor="#bdbbbb"
                        onHandleColor="#bdbbbb"
                        offHandleColor="#4B4B4B"
                        checked={isAssociatedPerson}
                        onChange={cheked => setisAssociatedPerson(cheked)}
                        handleDiameter={30}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={50}
                        className="react-switch"
                        id="material-switch"
                    />
                </div>

                <div className="d-flex d-flexdc df-alc">
                    <p className="inputDescription">{Labels.isAdministratorInAnotherAccount} ?</p>
                    <Switch
                        onColor="#4B4B4B"
                        offColor="#bdbbbb"
                        onHandleColor="#bdbbbb"
                        offHandleColor="#4B4B4B"
                        checked={isAdministratorInAnotherAccount}
                        onChange={cheked => setisAdministratorInAnotherAccount(cheked)}
                        handleDiameter={30}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={50}
                        className="react-switch"
                        id="material-switch"
                    />
                </div>

            </div>

        </div>
    )
}
