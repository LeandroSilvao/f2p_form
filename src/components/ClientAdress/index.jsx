import React, { useContext } from 'react'
import { AdressesContext } from '../../contexts/AdressesContexts'
import Countries from '../Countries'
import States from '../State'
import Cities from '../City'
import AdressType from '../AdressType'
import CEP from '../Cep'
import AdressUtils from '../AdressUtils'

import './index.css'
import { FormContext } from '../../contexts/FormContexts'

export default function Adresses(props) {

    const { setCountryId, setStateId, setStateName, setCityId, setCityName, setTypeAddressId, setZipCode } = useContext(AdressesContext)
    const {languagePT} = useContext(FormContext)

    const Labels = {
        componentTitle: languagePT ? 'Endereço' : 'Address',
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
        <div className="clientAdress">
            <span className="inputDescriptionTitle">{Labels.componentTitle}</span>
            <div className="d-flex">
                <Countries onSelectCountry={onSelectCountry} ClientAdress={true} Attorney={false}/>
                <p className="required">*</p>
            </div>
            <div className="d-flex">
                <States onSelectState={onSelectState} ClientAdress={true} Attorney={false}/>
                <p className="required">*</p>
            </div>
            <div className="d-flex">
                <Cities onSelectCity={onSelectCity} ClientAdress={true} Attorney={false}/>
                <p className="required">*</p>
            </div>
            <div className="d-flex">
                <AdressType onSelectTypeAddress={onSelectTypeAddress} ClientAdress={true} Attorney={false}/>
                <p className="required">*</p>
            </div>
            <AdressUtils ClientAdress={true} Attorney={false}>
                <div className="d-flex">
                    <CEP onCollectCep={onCollectCep} ClientAdress={true} Attorney={false}/>
                    <p className="required">*</p>
                </div>
            </AdressUtils>
        </div>
    )
}
