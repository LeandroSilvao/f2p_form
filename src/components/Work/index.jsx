import React, { useContext, useEffect, useState } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { WorkContext } from '../../contexts/Work';
import { ClientInfoContext } from '../../contexts/ClientInfoContexts';

import { validarCNPJ } from '../../utils'
import InputMask from "react-input-mask";

import './index.css'

export default function Work(props) {
    const [errorCNPJ, setErrorCNPJ] = useState(false)

    const { languagePT } = useContext(FormContext)
    const { setinstitutionName, setprofession, setoccupation, setcorporateTaxpayerRegistry,
        institutionName, profession, occupation, corporateTaxpayerRegistry, setIsRequired } = useContext(WorkContext)
    const { professionalOccupationId } = useContext(ClientInfoContext)

    const required = professionalOccupationId === "3" || professionalOccupationId === "6" ||
        professionalOccupationId === "8" || professionalOccupationId === "9" || professionalOccupationId === "" ? false : true

    useEffect(() => {
        setIsRequired(required)
    }, [required])

    const Labels = {
        componentTitle: languagePT ? 'Informações Instituição de Trabalho' : 'Work Institution Information',
        institutionName: languagePT ? 'Nome da instituição' : 'Institution Name',
        onlyLettersAndNumbersTitle: languagePT ? 'Somente letras e numeros' : 'Only letters and numbers',
        profession: languagePT ? 'Profissão' : 'Profession',
        occupation: languagePT ? 'Cargo na instituição de trabalho' : 'Position in the work institution',
        corporateTaxpayerRegistry: languagePT ? 'CNPJ da instituição de trabalho' : 'CNPJ of the work institution',
        cnpjTitle: languagePT ? 'Digite um cnpj valido' : 'Enter a valid cnpj',
    }

    function OnChangeField(e) {
        const { value, id } = e.target
        switch (id) {
            case 'institutionName':
                setinstitutionName(value)
                break;
            case 'profession':
                setprofession(value)
                break;
            case 'occupation':
                setoccupation(value)
                break;
            case 'corporateTaxpayerRegistry':
                setcorporateTaxpayerRegistry(value)
                const cnpj = value.replace(/[^\d]+/g, '');

                if (cnpj.length < 14) setErrorCNPJ(false)
                else if (cnpj.length === 14) {
                    if (validarCNPJ(cnpj)) {
                        setErrorCNPJ(false)
                        setcorporateTaxpayerRegistry(value)
                    }
                    else {
                        setcorporateTaxpayerRegistry(`${value.substring(0, value.length - 1)}`)
                        setErrorCNPJ(true)
                    }
                }
                else if (cnpj.length > 14) {
                    setErrorCNPJ(true)
                }
                break;
            default:
                break;
        }
    }

    return (
        <div className={required ? "divWork" : "d-none"}>
            <div className="componentTitle">
                <span>{Labels.componentTitle}</span>
                <hr />
            </div>


            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.institutionName}</p>
                </div>
                <input required={required} value={institutionName} type="text" name="institutionName" id="institutionName"
                    pattern="(^[A-Za-z0-9 á-úÁ-Ú]+$)" title={Labels.onlyLettersAndNumbersTitle} onChange={e => OnChangeField(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.profession}</p>
                </div>
                <input required={required} value={profession} type="text" name="profession" id="profession"
                    pattern="(^[A-Za-z0-9 á-úÁ-Ú]+$)" title={Labels.onlyLettersAndNumbersTitle} onChange={e => OnChangeField(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.occupation}</p>
                </div>
                <input required={required} value={occupation} type="text" name="occupation" id="occupation"
                    pattern="(^[A-Za-z0-9 á-úÁ-Ú]+$)" title={Labels.onlyLettersAndNumbersTitle} onChange={e => OnChangeField(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.corporateTaxpayerRegistry}</p>
                </div>
                <InputMask required={required} value={corporateTaxpayerRegistry} type="text" name="corporateTaxpayerRegistry" id="corporateTaxpayerRegistry"
                    pattern="^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$" mask="99.999.999/9999-99" title={Labels.cnpjTitle}
                    onChange={e => OnChangeField(e)} />
                <p className={errorCNPJ ? 'errorCNPJ' : 'd-none'}>{Labels.cnpjTitle}</p>
            </div>


        </div>
    )
}
