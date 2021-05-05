import React, { useContext } from 'react'
import { AdressesContext } from '../../contexts/AdressesContexts';
import { AttorneyContext } from '../../contexts/AttorneyContexts';
import { FormContext } from "../../contexts/FormContexts";

import './index.css'

export default function AdressUtils(props) {
    const { languagePT } = useContext(FormContext)
    const { setComplement, setDescription, setNeighborhood, setNumber } = useContext(AdressesContext)
    const { setcomplement, setdescription, setneighborhood, setnumber, isAcceptedOrderAttorney } = useContext(AttorneyContext)
    const Labels = {
        neighborhood: languagePT ? 'Bairro' : 'Neighborhood',
        description: languagePT ? 'Rua' : 'Street',
        number: languagePT ? 'Número' : 'Number',
        complement: languagePT ? 'Complemento' : 'Complement',
    }
    let required
    if (props.Attorney) {
        if(isAcceptedOrderAttorney) required = true
        else if(!isAcceptedOrderAttorney) required = false
    }
    else if (props.ClientAdress) required = true
    

    function setInput(e) {
        const { value, id } = e.target
        switch (id) {
            case 'AduNeighborhood':
                if (props.Attorney) setneighborhood(value)
                else if (props.ClientAdress) setNeighborhood(value)
                break;
            case 'AduDescription':
                if (props.Attorney) setdescription(value)
                else if (props.ClientAdress) setDescription(value)
                break;
            case 'AduNumber':
                if (props.Attorney) setnumber(value)
                else if (props.ClientAdress) setNumber(value)
                break;
            case 'AduComplement':
                if (props.Attorney) setcomplement(value)
                else if (props.ClientAdress) setComplement(value)
                break;
            default:
                break;
        }
    }

    return (
        // <div className="divCollectUtilsAdress">
            <>
            {props.children}
            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.neighborhood}</p>
                </div>
                <input required={required} onChange={e => setInput(e)} type="text" name="neighborhood" id="AduNeighborhood"/>
            </div>


            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.description}</p>
                </div>
                <input required={required} onChange={e => setInput(e)} type="text" name="description" id="AduDescription"/>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.number}</p>
                </div>
                <input required={required} onChange={e => setInput(e)} type="text" maxLength="20" name="number" id="AduNumber"/>
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.complement}</p>
                </div>
                <input required={required} onChange={e => setInput(e)} type="text" name="complement" id="AduComplement"/>
            </div>
        </>
        /* </div> */
    )
}
