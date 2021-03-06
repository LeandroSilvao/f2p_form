import React, { useContext, useState } from 'react'


import Spouse from '../Spouse'
import Work from '../Work'
import LegalRepresentative from '../LegalRepresentative'

import { LegalRepresentativeProvider } from '../../contexts/LegalRepresentativeContexts';
import { SpouseProvider } from '../../contexts/Spouse';
import { WorkProvider } from '../../contexts/Work';


import { ClientInfoContext } from '../../contexts/ClientInfoContexts'
import { FormContext } from '../../contexts/FormContexts'

import { ValidCPF } from '../../utils'

import Switch from "react-switch";
import InputMask from "react-input-mask";

import './index.css'

export default function ClientInfo() {
    const { languagePT } = useContext(FormContext)
    const {
        // States
        name, shortName, birthDate, fatherName, motherName, taxPayerRegistry, genderId, gendersIds, maritalStatusId, nationality,
        countriesBirthId, stateBirthId, statesBirth, professionalOccupationId, professionalOccupationsId,
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
        componentTitle: languagePT ? 'Informa????es do cliente' : 'Customer information',
        onlyLettersTitle: languagePT ? 'Somente letras' : 'Only letters',
        dateInvalid: languagePT ? 'Selecione uma data valida' : 'Select a valid date',
        cpfTitle: languagePT ? 'Digite um cpf valido' : 'Please enter a valid cpf',
        name: languagePT ? 'Nome Completo' : 'Name',
        shortName: languagePT ? 'Apelido' : 'ShortName',
        birthDate: languagePT ? 'Data de Nascimento' : 'BirthDate',
        fatherName: languagePT ? 'Nome do Pai' : 'Father Name',
        motherName: languagePT ? 'Nome da M??e' : 'Mother Name',
        taxPayerRegistry: languagePT ? 'CPF' : 'Tax Payer Registry',
        genderId: languagePT ? 'Genero' : 'Gender',
        maritalStatusId: languagePT ? 'Estado civil' : 'Marital Status',
        maritalAgreementId: languagePT ? 'Regime do estado civil' : 'Marital Agreement',
        nationality: languagePT ? 'Nacionalidade' : 'Nationality',
        countryBirthId: languagePT ? 'Pa??s de nascimento' : 'Country Birth',
        stateBirthId: languagePT ? 'UF de nascimento do cliente' : 'State Birth',
        stateBirthName: languagePT ? 'Nome UF de nascimento' : 'State Birth Name',
        professionalOccupationId: languagePT ? 'Natureza da ocupa????o' : 'Professional Occupation',
        residenceInOtherCountryId: languagePT ? 'Pa??s ao cliente que possui residencia em outros pa??ses' : 'Residence in Other Country',
        otherTaxResidenceCountryId: languagePT ? 'Pa??s ao cliente que possui domic??lio fiscal al??m do declarado' : 'Other Tax Residence Country',
        residenceInOtherCountryIdSelect: languagePT ? 'Selecione o pa??s' : '',
        otherTaxResidenceCountryIdSelect: languagePT ? 'Selecione o pa??s' : '',
        educationLevelId: languagePT ? 'Escolaridade' : 'Education Level',
        ppeOccupation: languagePT ? 'Cargo PPE do cliente, se o mesmo consta como Pessoa Politicamente Exposta.' : 'PPE Ocupation, whether he is listed as a Politically Exposed Person.',
        usPerson: languagePT ? 'Cliente considerado como USPerson' : 'Considered as USPerson',
        isAssociatedPerson: languagePT ? 'Pessoa Vinculada' : 'Associated Person',
        isAdministratorInAnotherAccount: languagePT ? 'Cliente realiza opera????es por conta de terceiros' : 'Customer performs operations on behalf of third parties',
        urlCallback: languagePT ? '' : '',
        isAcceptedOrderAttorney: languagePT ? 'Autoriza a transmiss??o de ordens por procurador' : 'Authorizes the transmission of orders by proxy',
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
                const cpf = value.replace(/[^\d]+/g, '');
                settaxPayerRegistry(value)
                if (cpf.length < 11) setErrorCpf(false)
                else if (cpf.length === 11) {
                    if (ValidCPF(cpf)) {
                        setErrorCpf(false)
                        settaxPayerRegistry(value)
                    }
                    else {
                        settaxPayerRegistry(`${value.substring(0, value.length - 1)}`)
                        setErrorCpf(true)
                    }
                }
                else if (cpf.length > 11) {
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

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.name}</p>
                </div>
                <input value={name} required type="text" name="name" id="name"
                    pattern="(^[A-Za-z ??-????-??]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.shortName}</p>
                </div>
                <input value={shortName} required type="text" name="shortName" id="shortName"
                    pattern="(^[A-Za-z ??-????-??]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.birthDate}</p>
                </div>
                <input value={birthDate} required type="date" name="birthDate" id="birthDate" onChange={e => OnChangeFields(e)}
                    min={Min} max={Max} title={Labels.onlyLettersTitle} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.fatherName}</p>
                </div>
                <input value={fatherName} required type="text" name="fatherName" id="fatherName"
                    pattern="(^[A-Za-z ??-????-??]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.motherName}</p>
                </div>
                <input value={motherName} required type="text" name="motherName" id="motherName"
                    pattern="(^[A-Za-z ??-????-??]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.taxPayerRegistry}</p>
                </div>
                <InputMask value={taxPayerRegistry} required type="text" name="taxPayerRegistry" id="taxPayerRegistry"
                    mask="999.999.999-99" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" title={Labels.cpfTitle} onChange={e => OnChangeFields(e)} />
                <p className={errorCpf ? 'errorCpf' : 'd-none'}>{Labels.cpfTitle}</p>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.genderId}</p>
                </div>
                <select value={genderId} required className="clSelect" name="gender" id="gender" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value=""></option>
                    {RenderGenders()}
                </select>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.maritalStatusId}</p>
                </div>
                <select value={maritalStatusId} required className="clSelect" name="maritalStatusId" id="maritalStatusId" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value=""></option>
                    {RenderMaritalStatus()}
                </select>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.nationality}</p>
                </div>
                <input value={nationality} required type="text" name="nationality" id="nationality"
                    pattern="(^[A-Za-z ??-????-??]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.countryBirthId}</p>
                </div>
                <select required className="clSelect" name="countryBirthId" id="countryBirthId" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value=""></option>
                    {RenderCountriesBirth()}
                </select>
            </div>


            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.stateBirthName}</p>
                </div>
                <select value={stateBirthId} required className="clSelect" name="statesBirth" id="statesBirth" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value=""></option>
                    {RenderStates()}
                </select>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.professionalOccupationId}</p>
                </div>
                <select value={professionalOccupationId} required className="clSelect" name="professionalOccupationId" id="professionalOccupationId" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value=""></option>
                    {RenderProfessionalOccupations()}
                </select>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.educationLevelId}</p>
                </div>
                <select value={educationLevelId} required className="clSelect" name="educationLevel" id="educationLevel" onChange={e => OnChangeFields(e)}>
                    <option defaultValue value=""></option>
                    {RenderEducationLevel()}
                </select>
            </div>

            <LegalRepresentativeProvider>
                <LegalRepresentative />
            </LegalRepresentativeProvider>

            <SpouseProvider>
                <Spouse hide={maritalStatusId === '2' ? false : true} required={maritalStatusId === '2' ? true : false}>
                    <div className={maritalStatusId === '2' ? "d-flex-input d-flexdc" : "d-none"}>
                        <div className="d-flex">
                            <p className="required">*</p>
                            <p className="inputDescription">{Labels.maritalAgreementId}</p>
                        </div>
                        <select value={maritalAgreementId} required={maritalStatusId === '2'} className="clSelect" name="maritalAgreementId" id="maritalAgreementId" onChange={e => OnChangeFields(e)}>
                            <option defaultValue value=""></option>
                            {RenderMaritalAgreementId()}
                        </select>
                    </div>
                </Spouse>
            </SpouseProvider>

            <WorkProvider>
                <Work />
            </WorkProvider>
        </div>
    )
}
