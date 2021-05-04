import React, { useContext } from 'react';
import Switch from 'react-switch';

import { ClientInfoContext } from '../../contexts/ClientInfoContexts';
import { FormContext } from '../../contexts/FormContexts';

import './index.css'


function AdditionalInformations() {
    const { languagePT } = useContext(FormContext)
    const {
        // States
        residenceInOtherCountryId, otherTaxResidenceCountryId, ppeOccupation,
        usPerson, isAssociatedPerson, isAdministratorInAnotherAccount, residencesInOtherCountryId, otherTaxResidencesCountryId,
        // Sets
        setusPerson, setisAssociatedPerson, setisAdministratorInAnotherAccount, setresidenceInOtherCountryId,
        setotherTaxResidenceCountryId, setppeOccupation
    } = useContext(ClientInfoContext)

    const Labels = {
        residenceInOtherCountryId: languagePT ? 'Possui residência em outro país?' : 'Residence in Other Country',
        otherTaxResidenceCountryId: languagePT ? 'País se possui domicílio fiscal além do declarado' : 'Other Tax Residence Country',
        residenceInOtherCountryIdSelect: languagePT ? 'Selecione o país' : '',
        otherTaxResidenceCountryIdSelect: languagePT ? 'Selecione o país' : '',
        educationLevelId: languagePT ? 'Escolaridade' : 'Education Level',
        ppeOccupation: languagePT ? 'Cargo PPE do cliente, se o mesmo consta como Pessoa Politicamente Exposta.' : 'PPE Ocupation, whether he is listed as a Politically Exposed Person.',
        usPerson: languagePT ? 'Cliente considerado como USPerson ?' : 'Considered as USPerson',
        isAssociatedPerson: languagePT ? 'Pessoa Vinculada' : 'Associated Person',
        isAdministratorInAnotherAccount: languagePT ? 'Cliente realiza operações por conta de terceiros' : 'Customer performs operations on behalf of third parties',
        urlCallback: languagePT ? '' : '',
        isAcceptedOrderAttorney: languagePT ? 'Autoriza a transmissão de ordens por procurador' : 'Authorizes the transmission of orders by proxy',
    }

    function OnChangeFields(e) {
        const { id, value } = e.target
        switch (id) {
            case 'residenceInOtherCountryId':
                setresidenceInOtherCountryId(value)
                break;
            case 'otherTaxResidenceCountryId':
                setotherTaxResidenceCountryId(value)
                break;
            case 'ppeOccupation':
                setppeOccupation(value)
                break;
            default:
                break;
        }
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

    return (
        <>
            <div className="componentTitle">
                <span>Informações adicionais</span>
                <hr />
            </div>

            <div className="AdditionalInformations-info">
                <div className="d-flex-input d-flexdc">
                    <div className="d-flex">
                        <p className="inputDescription">{Labels.residenceInOtherCountryId}</p>
                    </div>
                    <select value={residenceInOtherCountryId} className="clSelect" name="residenceInOtherCountryId" id="residenceInOtherCountryId" onChange={e => OnChangeFields(e)}>
                        <option defaultValue value="">{Labels.residenceInOtherCountryIdSelect}</option>
                        {RenderResidencesInOtherCountry()}
                    </select>
                </div>


                <div className="d-flex-input d-flexdc">
                    <div className="d-flex">
                        <p className="inputDescription">{Labels.otherTaxResidenceCountryId}</p>
                    </div>
                    <select value={otherTaxResidenceCountryId} className="clSelect" name="otherTaxResidenceCountryId" id="otherTaxResidenceCountryId" onChange={e => OnChangeFields(e)}>
                        <option defaultValue value="">{Labels.otherTaxResidenceCountryIdSelect}</option>
                        {RenderOtherTaxResidencesCountry()}
                    </select>
                </div>


                <div className="d-flex-input d-flexdc">
                    <div className="d-flex">
                        <p className="inputDescription">{Labels.ppeOccupation}</p>
                    </div>
                    <input value={ppeOccupation} type="text" name="ppeOccupation" id="ppeOccupation"
                        pattern="(^[A-Za-z á-úÁ-Ú]+$)" title={Labels.onlyLettersTitle} onChange={e => OnChangeFields(e)} />
                </div>
            </div>



            <div className="AdditionalInformations">
                <Switch
                    onColor="#071223"
                    onHandleColor="#F49925"
                    offColor="#071223"
                    offHandleColor="#F49925"
                    checked={usPerson}
                    onChange={cheked => setusPerson(cheked)}
                    handleDiameter={30}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={35}
                    width={70}
                    className="react-switch"
                    id="material-switch"
                />
                <p className="inputDescription">{Labels.usPerson}</p>
            </div>


            <div className="AdditionalInformations">
                <Switch
                    onColor="#071223"
                    onHandleColor="#F49925"
                    offColor="#071223"
                    offHandleColor="#F49925"
                    checked={isAssociatedPerson}
                    onChange={cheked => setisAssociatedPerson(cheked)}
                    handleDiameter={30}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={35}
                    width={70}
                    className="react-switch"
                    id="material-switch"
                />
                <p className="inputDescription">{Labels.isAssociatedPerson} ?</p>
            </div>

            <div className="AdditionalInformations">
                <Switch
                    onColor="#071223"
                    onHandleColor="#F49925"
                    offColor="#071223"
                    offHandleColor="#F49925"
                    checked={isAdministratorInAnotherAccount}
                    onChange={cheked => setisAdministratorInAnotherAccount(cheked)}
                    handleDiameter={30}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={35}
                    width={70}
                    className="react-switch"
                    id="material-switch"
                />
                <p className="inputDescription">{Labels.isAdministratorInAnotherAccount} ?</p>
            </div>
        </>
    );
}

export default AdditionalInformations