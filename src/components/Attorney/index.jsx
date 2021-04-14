import React, { useContext, useState } from 'react'
import Countries from '../Countries'
import States from '../State'
import Cities from '../City'
import AdressType from '../AdressType'
import CEP from '../Cep'
import AdressUtils from '../AdressUtils'

import './index.css'
import { AttorneyContext } from '../../contexts/AttorneyContexts'
import { FormContext } from '../../contexts/FormContexts'

import Switch from "react-switch";
import InputMask from "react-input-mask";

import {ValidCPF} from '../../utils'


export default function Attorney() {
    const { languagePT } = useContext(FormContext)
    const [errorCpf, setErrorCpf] = useState(false)
    const Max = new Date().toISOString().split('T')[0]
    const Min = new Date(Max.split('-')[0] - 200, '00', '01').toISOString().split('T')[0]

    const Labels = {
        componentTitle: languagePT ? 'Dados do procurador' : 'Attorney information',
        onlyLettersTitle: languagePT ? 'Somente letras' : 'Only letters',
        isAcceptedOrderAttorney: languagePT ? 'Autoriza a transmissão de ordens por procurador ?' : 'Do you authorize the transmission of orders by a Attorney?',
        name: languagePT ? 'Nome' : 'Name',
        birthDate: languagePT ? 'Nascimento' : 'BirthDate',
        taxPayerRegistry: languagePT ? 'CPF' : 'Tax Payer Registry',
        cpfTitle: languagePT ? 'Digite um cpf valido' : 'Please enter a valid cpf',
        actionDescription: languagePT ? 'Descrição dos poderes' : 'Description of powers',
        isPEP: languagePT ? 'O mesmo consta como Pessoa Politicamente Exposta.' : 'PPE Ocupation, whether he is listed as a Politically Exposed Person.',
    }

    const { setCountryId, setStateId, setStateName, setCityId, setCityName, setTypeAddressId, setZipCode,
        isAcceptedOrderAttorney, setisAcceptedOrderAttorney, name, taxpayerRegistry,
        isPEP, setisPEP, actionDescription, setactionDescription, setname, settaxpayerRegistry, setbirthDate } = useContext(AttorneyContext)

    function OnChangeFields(e) {
        const { id, value } = e.target
        switch (id) {
            case 'name':
                setname(value)
                break;
            case 'birthDate':
                const birthDate = `${value}T00:00:00`
                console.log(birthDate)
                setbirthDate(birthDate)
                break;
            case 'taxpayerRegistry':
                const cpf = value.replace(/[^\d]+/g, '');
                settaxpayerRegistry(value)
                if (cpf.length < 11) setErrorCpf(false)
                else if (cpf.length === 11) {
                    if (ValidCPF(cpf)) {
                        setErrorCpf(false)
                        settaxpayerRegistry(value)
                    }
                    else {
                        settaxpayerRegistry(`${value.substring(0, value.length - 1)}`)
                        setErrorCpf(true)
                    }
                }
                else if (cpf.length > 11) {
                    setErrorCpf(true)
                }
                break;
            case 'actionDescription':
                setactionDescription(value)
                break;
            default:
                break;
        }
    }
    function onSelectCountry(e) {
        setCountryId(parseInt(e.target.value))
    }
    function onSelectState(e) {
        const { selectedIndex, value, options } = e.target
        const statename = options[selectedIndex].getAttribute('statename')
        setStateName(statename)
        setStateId(parseInt(value))
    }
    function onSelectCity(e) {
        const { selectedIndex, value, options } = e.target
        const cityName = options[selectedIndex].getAttribute('cityname')
        setCityId(parseInt(value))
        setCityName(cityName)
    }
    function onSelectTypeAddress(e) {
        setTypeAddressId(parseInt(e.target.value))
    }
    function onCollectCep(cep) {
        setZipCode(cep)
    }

    return (
        <div className="Attorney">

            <div className="d-flex d-flexdc df-alc">
                <p className="inputDescription">{Labels.isAcceptedOrderAttorney} ?</p>
                <Switch
                    onColor="#4B4B4B"
                    offColor="#bdbbbb"
                    onHandleColor="#bdbbbb"
                    offHandleColor="#4B4B4B"
                    checked={isAcceptedOrderAttorney}
                    onChange={cheked => setisAcceptedOrderAttorney(cheked)}
                    handleDiameter={30}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={50}
                    className="react-switch"
                    id="material-switch"
                />
            </div>

            <div className={isAcceptedOrderAttorney ? "d-flex d-flexdc" : "d-none"}>
                <span className="inputDescriptionTitle">{Labels.componentTitle}</span>

                <div className="d-flex">
                    <input value={name} required={isAcceptedOrderAttorney} type="text" name="name" id="name" placeholder={Labels.name}
                        pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
                    <p className="required">*</p>
                </div>
                <div>
                    <div className="d-flex">
                        <InputMask value={taxpayerRegistry} required={isAcceptedOrderAttorney} type="text" name="taxpayerRegistry" id="taxpayerRegistry" 
                        placeholder={Labels.taxPayerRegistry} mask="999.999.999-99" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" title={Labels.cpfTitle} 
                        onChange={e => OnChangeFields(e)} />
                        <p className="required">*</p>
                    </div>
                    <p className={errorCpf ? 'errorCpf' : 'd-none'}>{Labels.cpfTitle}</p>
                </div>
                <div className="d-flex">
                    <input required={isAcceptedOrderAttorney} type="date" name="birthDate" id="birthDate" onChange={e => OnChangeFields(e)}
                        min={Min} max={Max} />
                    <p className="required">*</p>
                </div>
                <div className="d-flex d-flexdc df-alc">
                    <p className="inputDescription">{Labels.isPEP} ?</p>
                    <Switch
                        onColor="#4B4B4B"
                        offColor="#bdbbbb"
                        onHandleColor="#bdbbbb"
                        offHandleColor="#4B4B4B"
                        checked={isPEP}
                        onChange={cheked => setisPEP(cheked)}
                        handleDiameter={30}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={50}
                        className="react-switch"
                        id="material-switch"
                    />
                </div>
                <div>
                    <div className="d-flex">
                        <input required={isAcceptedOrderAttorney} value={actionDescription} type="text" name="actionDescription" id="actionDescription"
                            pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} placeholder={Labels.actionDescription} />
                        <p className="required">*</p>
                    </div>
                </div>


                <div className="d-flex">
                    <Countries onSelectCountry={onSelectCountry} ClientAdress={false} Attorney={true} />
                    <p className="required">*</p>
                </div>
                <div className="d-flex">
                    <States onSelectState={onSelectState} ClientAdress={false} Attorney={true} />
                    <p className="required">*</p>
                </div>
                <div className="d-flex">
                    <Cities onSelectCity={onSelectCity} ClientAdress={false} Attorney={true} />
                    <p className="required">*</p>
                </div>
                <div className="d-flex">
                    <AdressType onSelectTypeAddress={onSelectTypeAddress} ClientAdress={false} Attorney={true} />
                    <p className="required">*</p>
                </div>
                <AdressUtils ClientAdress={false} Attorney={true}>
                    <div className="d-flex">
                        <CEP onCollectCep={onCollectCep} ClientAdress={false} Attorney={true} />
                        <p className="required">*</p>
                    </div>
                </AdressUtils>
            </div>

        </div>
    )
}
