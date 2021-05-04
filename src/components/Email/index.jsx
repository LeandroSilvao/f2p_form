import React, { useContext } from 'react'

import { FormContext } from "../../contexts/FormContexts";
import { EmailContext } from '../../contexts/EmailContexts';

import './index.css'

export default function EmailType(props) {
    const { languagePT } = useContext(FormContext)
    const { emailTypes, setType, setMail } = useContext(EmailContext)
    const Labels = {
        Select: languagePT ? 'Selecionar Tipo de Email' : 'Select Email Type',
        Email: languagePT ? 'Formato aceitado: example@domain.com' : 'Format accepted: example@domain.com'
    }

    function SelectTypeEmail(e) {
        const { value } = e.target
        setType(value)
    }
    function SetMail(e) {
        const { value } = e.target
        setMail(value)
    }
    function RenderEmailType() {
        return (
            emailTypes.map(em => {
                return (
                    <option key={em.emailTypeId} value={em.emailTypeId}>{em.description}</option>
                )
            })
        )
    }
    return (
        <>
            {/* <div className="divEmailTypeSelect"> */}

                <div className="d-flex-input d-flexdc">
                    <div className="d-flex">
                        <p className="required">*</p>
                        <p className="inputDescription">{Labels.Select}</p>
                    </div>
                    <select required
                        name="emailType" id="emailType" onChange={e => SelectTypeEmail(e)}>
                        <option defaultValue value=""></option>
                        {RenderEmailType()}
                    </select>
                </div>

                <div className="d-flex-input d-flexdc">
                    <div className="d-flex">
                        <p className="required">*</p>
                        <p className="inputDescription">E-mail</p>
                    </div>
                    <input required type="email" placeholder="example@domain.com"
                        pattern="^[\w._\-]+@\w+.com(.br)?" title={Labels.Email} onChange={e => SetMail(e)} />
                </div>
            {/* </div> */}
        </>
    )
}
