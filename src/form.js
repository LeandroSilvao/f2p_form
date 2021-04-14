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

function App() {
    const { saveClient } = useContext(FormContext)

    function onSubmit(e) {
        e.preventDefault()
        saveClient()
    }
    return (
        <form onSubmit={e => onSubmit(e)} action="" method="" autoComplete="off">

            <div className="div-infos">

                <div className="div-client">
                    <ClientInfo />
                    <div className="div-client-1">
                        <PhonesProvider>
                            <Phones />
                        </PhonesProvider>

                        <IdentificationTypeProvider>
                            <IdentificationType />
                        </IdentificationTypeProvider>

                        <EmailProvider>
                            <EmailType />
                        </EmailProvider>

                        <AdressesProvider>
                            <ClientAdress />
                        </AdressesProvider>

                        <PPERelatedsProvider>
                            <PPERelateds />
                        </PPERelatedsProvider>

                        <WorkProvider>
                            <Work />
                        </WorkProvider>
                    </div>
                </div>

                <div className="div-wealthsType">
                    <BankAccountsProvider>
                        <BankAccounts />
                    </BankAccountsProvider>

                    <WealthsTypeProvider>
                        <Wealths />
                    </WealthsTypeProvider>
                </div>


                <div className="div-attorney">
                    <AttorneyProvider>
                        <Attorney />
                    </AttorneyProvider>
                </div>

                <div className="div-formsuity">
                    <FormSuityProvider>
                        <FormSuity />
                    </FormSuityProvider>
                </div>

            </div>

            <div className="div-footer">
                <button type="submit">CADASTRAR</button>
            </div>
        </form>
    );
}

export default App;
