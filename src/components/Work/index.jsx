import React, { useContext, useEffect, useState } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { WorkContext } from '../../contexts/Work';
import { ClientInfoContext } from '../../contexts/ClientInfoContexts';

import './index.css'

export default function Work(props) {
    const [errorCNPJ, setErrorCNPJ] = useState(false)

    const { languagePT } = useContext(FormContext)
    const { setinstitutionName, setprofession, setoccupation, setcorporateTaxpayerRegistry,
        institutionName, profession, occupation, corporateTaxpayerRegistry, setIsRequired } = useContext(WorkContext)
    const {professionalOccupationId} = useContext(ClientInfoContext)

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
        cnpjTitle: languagePT ? 'Digite um cnpj valido, sem caracteres especiais (xxxxxxxxxxxxxx)' : 'Enter a valid cnpj, without special characters (xxxxxxxxxxxxxx)',
    }
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj == '') return false;
        if (cnpj.length != 14)
            return false;
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;
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
                if (value.length < 14) setErrorCNPJ(false)
                else {
                    if (validarCNPJ(value)) {
                        setErrorCNPJ(false)
                        setcorporateTaxpayerRegistry(value)
                    }
                    else {
                        setcorporateTaxpayerRegistry(`${value.substring(0, value.length - 1)}`)
                        setErrorCNPJ(true)
                    }
                }
                break;
            default:
                break;
        }
    }

    return (
        <div className={required ? "divWork" : "d-none"}>
            <span className="inputDescriptionTitle">{Labels.componentTitle}</span>
            <div className="d-flex">
                <input required={required} value={institutionName} type="text" name="institutionName" id="institutionName" placeholder={Labels.institutionName}
                    pattern="(^[A-Za-z0-9 á-úÁ-Ú]+$)" title={Labels.onlyLettersAndNumbersTitle} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>
            <div className="d-flex">
                <input required={required} value={profession} type="text" name="profession" id="profession" placeholder={Labels.profession}
                    pattern="(^[A-Za-z0-9 á-úÁ-Ú]+$)" title={Labels.onlyLettersAndNumbersTitle} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>
            <div className="d-flex">
                <input required={required} value={occupation} type="text" name="occupation" id="occupation" placeholder={Labels.occupation}
                    pattern="(^[A-Za-z0-9 á-úÁ-Ú]+$)" title={Labels.onlyLettersAndNumbersTitle} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>
            <div>
                <div className="d-flex">
                    <input required={required} value={corporateTaxpayerRegistry} type="text" name="corporateTaxpayerRegistry" id="corporateTaxpayerRegistry" placeholder={Labels.corporateTaxpayerRegistry}
                        pattern="([\d]{14})" title={Labels.cnpjTitle} onChange={e => OnChangeField(e)} maxLength="14" />
                    <p className="required">*</p>
                </div>
                <p className={errorCNPJ ? 'errorCNPJ' : 'd-none'}>{Labels.cnpjTitle}</p>
            </div>
        </div>
    )
}
