import React, { useContext } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { PhonesContext } from "../../contexts/PhonesContexts";

import InputMask from "react-input-mask";


import { EmailProvider } from '../../contexts/EmailContexts';
import EmailType from '../Email'

import './index.css'

export default function PhoneType(props) {
    const { languagePT } = useContext(FormContext)
    const { phoneTypes, setPhoneTypeId, phoneTypeId, setCountryCode, setNumber, setStateCode } = useContext(PhonesContext)
    const Labels = {
        Select: languagePT ? 'Selecione o tipo de telefone' : 'Select Phone Type',
        SelectError: languagePT ? 'Erro ao consultar Tipos de Telefone' : 'Error querying Phone Type',
        Celnumber: languagePT ? 'Formato exigido: +DDI (DDD) 9XXXX-XXXX' : '',
        Resnumber: languagePT ? 'Formato exigido: +DDI (DDD) XXXX-XXXX' : '',
        Comnumber: languagePT ? 'Formato exigido: +DDI (DDD) XXXX-XXXX' : ''
    }

    function SelectTypePhone(e) {
        const { value } = e.target
        setPhoneTypeId(value)
    }

    function SetPhoneNumber(e) {
        const { value } = e.target
        if (value.length >= 18) {
            const CountryCode = value.split(" ")[0].replace("+", "")
            const StateCode = value.split(" ")[1].replace("(", "").replace(")", "")
            const _Number = value.split(" ")[2].replace("-", "")
            setCountryCode(CountryCode)
            setStateCode(StateCode)
            setNumber(_Number)
        }
    }

    function RenderPhoneType() {
        return (
            phoneTypes.map(ph => {
                return (
                    <option key={ph.phoneTypeId} value={ph.phoneTypeId}>{ph.description}</option>
                )
            })
        )
    }
    return (
        <div className="divPhoneTypeSelect">

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.Select}</p>
                </div>
                <select required
                    name="phoneType" id="phoneType" onChange={e => SelectTypePhone(e)}>
                    <option defaultValue value=""></option>
                    {RenderPhoneType()}
                </select>
            </div>

            <div className={phoneTypeId === '1' ? 'd-flex-input d-flexdc' : 'd-none'}>
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">Telefone</p>
                </div>
                <InputMask name="ResidencialNumber" onChange={e => SetPhoneNumber(e)} required={phoneTypeId === '1'} maskChar="" title={Labels.Resnumber}
                    mask="+99 (99) 9999-9999" pattern="[+]\d{0,4} [(]\d{0,4}[)] \d{4}[-]\d{4}" />
            </div>

            <div className={phoneTypeId === '2' ? 'd-flex-input d-flexdc' : 'd-none'}>
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">Telefone</p>
                </div>
                <InputMask name="ComercialNumber" onChange={e => SetPhoneNumber(e)} required={phoneTypeId === '2'} maskChar="" title={Labels.Comnumber}
                    className={phoneTypeId === '2' ? '' : 'd-none'} mask="+99 (99) 9999-9999" pattern="[+]\d{0,4} [(]\d{0,4}[)] \d{4}[-]\d{4}" />
            </div>

            <div className={phoneTypeId === '3' ? 'd-flex-input d-flexdc' : 'd-none'}>
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">Telefone</p>
                </div>
                <InputMask name="CelNumber" onChange={e => SetPhoneNumber(e)} required={phoneTypeId === '3'} maskChar="" title={Labels.Celnumber}
                    className={phoneTypeId === '3' ? '' : 'd-none'} mask="+99 (99) 99999-9999" pattern="[+]\d{0,4} [(]\d{0,4}[)] \d{5}[-]\d{4}" />
            </div>


            <EmailProvider>
                <EmailType />
            </EmailProvider>
        </div>
    )
}
