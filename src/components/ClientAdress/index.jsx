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
    const { languagePT } = useContext(FormContext)

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
            <div className="componentTitle">
                <span>Contato e endereço</span>
                <hr />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">País</p>
                </div>
                <Countries onSelectCountry={onSelectCountry} ClientAdress={true} Attorney={false} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">Estado</p>
                </div>
                <States onSelectState={onSelectState} ClientAdress={true} Attorney={false} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">Cidade</p>
                </div>
                <Cities onSelectCity={onSelectCity} ClientAdress={true} Attorney={false} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">Selecione o tipo do endereço</p>
                </div>
                <AdressType onSelectTypeAddress={onSelectTypeAddress} ClientAdress={true} Attorney={false} />
            </div>


            <AdressUtils ClientAdress={true} Attorney={false}>
                <div className="d-flex-input d-flexdc">
                    <div className="d-flex">
                        <p className="required">*</p>
                        <p className="inputDescription">CEP</p>
                    </div>
                    <CEP onCollectCep={onCollectCep} ClientAdress={true} Attorney={false} />
                </div>
            </AdressUtils>

        </div>
    )
}
