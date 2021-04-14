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
        birthDate, isPEP, setisPEP, actionDescription,setactionDescription, setname, settaxpayerRegistry, setbirthDate } = useContext(AttorneyContext)

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
            case 'birthDate':
                const birthDate = `${value}T00:00:00`
                console.log(birthDate)
                setbirthDate(birthDate)
                break;
            case 'taxpayerRegistry':
                settaxpayerRegistry(value)
                if (value.length < 11) setErrorCpf(false)
                else if (value.length === 11) {
                    if (ValidCPF(value)) {
                        setErrorCpf(false)
                        settaxpayerRegistry(value)
                    }
                    else {
                        settaxpayerRegistry(`${value.substring(0, value.length - 1)}`)
                        setErrorCpf(true)
                    }
                }
                else if (value.length > 11) {
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
                        <input value={taxpayerRegistry} required={isAcceptedOrderAttorney} type="text" name="taxpayerRegistry" id="taxpayerRegistry" placeholder={Labels.taxPayerRegistry}
                            pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" title={Labels.cpfTitle} onChange={e => OnChangeFields(e)} />
                        <p className="required">*</p>
                    </div>
                    <p className={errorCpf ? 'errorCpf' : 'd-none'}>{Labels.cpfTitle}</p>
                </div>
                <div className="d-flex">
                    <input required={isAcceptedOrderAttorney} type="date" name="birthDate" id="birthDate" onChange={e => OnChangeFields(e)}
                        min={Min} max={Max}/>
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
                    <Countries onSelectCountry={onSelectCountry} ClientAdress={false} Attorney={true}/>
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
                    <AdressType onSelectTypeAddress={onSelectTypeAddress} ClientAdress={false} Attorney={true}/>
                    <p className="required">*</p>
                </div>
                <AdressUtils ClientAdress={false} Attorney={true}>
                    <div className="d-flex">
                        <CEP onCollectCep={onCollectCep} ClientAdress={false} Attorney={true}/>
                        <p className="required">*</p>
                    </div>
                </AdressUtils>
            </div>

        </div>
    )
}
