import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'

import { FormContext } from './FormContexts'
import config from '../config'

const InitialState = {
    bankId: '',
    agency: '',
    account: '',
    digit: '',
    typeAccountId: '',
    bankAccountTypes: [],
    banks: [],
    setbankId: () => {},
    setagency: () => {},
    setaccount: () => {},
    setdigit: () => {},
    settypeAccountId: () => {}
}

export const BankAccountsContext = createContext(InitialState);

export const BankAccountsProvider = (props) => {
    const [bankId, setbankId] = useState('')
    const [agency, setagency] = useState('')
    const [account, setaccount] = useState('')
    const [digit, setdigit] = useState('')
    const [typeAccountId, settypeAccountId] = useState('')


    const [bankAccountTypes, setBankAccountTypes] = useState([])
    const [banks, setBanks] = useState([])


    useEffect(() => {
        GetAccountTypes()
        GetBanks()
    }, [])

    function GetAccountTypes() {
        axios.get(config._urlBankAccountType)
            .then(res => { if (res.data) setBankAccountTypes(res.data) })
            .catch(err => console.log(err))
    }
    function GetBanks() {
        axios.get(config._urlBank)
            .then(res => { if (res.data) setBanks(res.data) })
            .catch(err => console.log(err))
    }


    return (
        <BankAccountsContext.Provider
            value={{
                bankAccountTypes, banks,
                bankId, setbankId,
                agency, setagency,
                account, setaccount,
                digit, setdigit,
                typeAccountId, settypeAccountId
            }}
        >
            {props.children}
        </BankAccountsContext.Provider>
    );
};
