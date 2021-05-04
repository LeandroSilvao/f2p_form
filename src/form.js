import { useContext, useEffect } from 'react';

import { IdentificationTypeProvider } from './contexts/IdentificationTypeContexts';
import { FormContext } from './contexts/FormContexts';
import { AttorneyProvider } from './contexts/AttorneyContexts';
import { AdressesProvider } from './contexts/AdressesContexts'
import { BankAccountsProvider } from './contexts/BankContexts'
import { PhonesProvider } from './contexts/PhonesContexts';
import { EmailProvider } from './contexts/EmailContexts';
import { WealthsTypeProvider } from './contexts/Wealths';
import { WorkProvider } from './contexts/Work';



import IdentificationType from './components/IdentificationType';
import ClientAdress from './components/ClientAdress'
import BankAccounts from './components/BankAccounts';
import PPERelateds from './components/PPE Related';
import ClientInfo from './components/ClientInfo';
import FormSuity from './components/FormSuity';
import Attorney from './components/Attorney';
import EmailType from './components/Email';
import Wealths from './components/Wealths';
import Phones from './components/Phones';
import Work from './components/Work';

import './Global.css';
import { FormSuityProvider } from './contexts/FormSuity';
import { PPERelatedsProvider } from './contexts/PPERelatedsContext';


import Header from './template/header'
import Footer from './template/footer'
import Body from './template/body'
import AdditionalInformations from './components/AdditionalInformations';

function App() {
    const { saveClient, languagePT, Clicked } = useContext(FormContext)
    const Labels = {
        HeaderTitle: languagePT ? "Cadastro de Cliente" : "Customer registration",
        BackToSite: languagePT ? "Voltar ao Site" : "Back to site",
        ButtonSave: languagePT ? "Solicitar Cadastro" : "Save"
    }

    function onSubmit(e) {
        e.preventDefault()
        saveClient()
    }

    return (
        <>
            <Header />
            <Body />

            <form onSubmit={e => onSubmit(e)} action="" method="" autoComplete="off" id="form">
                <div className="div-infos">

                    <div className="div-client-info">
                        <ClientInfo />
                    </div>

                    <div className="div-identification-type">
                        <IdentificationTypeProvider>
                            <IdentificationType />
                        </IdentificationTypeProvider>
                    </div>

                    <div className="div-contact-adress">
                        <AdressesProvider>
                            <ClientAdress />
                        </AdressesProvider>

                        <PhonesProvider>
                            <Phones />
                        </PhonesProvider>
                    </div>

                    <div className="div-bank-accounts">
                        <BankAccountsProvider>
                            <BankAccounts />
                        </BankAccountsProvider>
                    </div>

                    <div className="div-wealths-types">
                        <WealthsTypeProvider>
                            <Wealths />
                        </WealthsTypeProvider>
                    </div>


                    <div className="div-formsuity">
                        <FormSuityProvider>
                            <FormSuity />
                        </FormSuityProvider>
                    </div>

                    <div className="div-additional-information">
                        <AdditionalInformations/>

                        <PPERelatedsProvider>
                            <PPERelateds />
                        </PPERelatedsProvider>

                        <AttorneyProvider>
                            <Attorney />
                        </AttorneyProvider>
                    </div>

                </div>

                <div className="div-footer">
                    <button type="submit" disabled={Clicked}>
                        <i className={Clicked ? "fa fa-spinner fa-spin" : "d-none"} /> {Clicked ? "Aguarde" : Labels.ButtonSave}
                    </button>
                </div>
            </form>
            <Footer />
        </>
    );
}

export default App;
