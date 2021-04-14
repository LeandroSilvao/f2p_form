import React, { useContext, useEffect, useState } from 'react'

import { FormContext } from "../../contexts/FormContexts";

import './index.css'
import { BankAccountsContext } from '../../contexts/BankContexts';
import { FaTrash, FaPlusSquare } from "react-icons/fa";


export default function BankAccounts(props) {
    const [error, setError] = useState(false)

    const { languagePT, _Json_BankAccounts } = useContext(FormContext)
    const { bankAccountTypes, banks,
        bankId, setbankId,
        agency, setagency,
        account, setaccount,
        digit, setdigit,
        typeAccountId, settypeAccountId } = useContext(BankAccountsContext)

    const [clientBankAccounts, setclientBankAccounts] = useState([])

    const Labels = {
        selectItems: languagePT ? 'Selecione um item da lista e Preencha os campos' : 'Select an item from the list and fill the fields',
        SelecttypeAccountId: languagePT ? 'Tipo de conta bancária' : 'Bank account type',
        SelectbankId: languagePT ? 'Selecione o seu banco' : 'Select your bank',
        account: languagePT ? 'Número da conta bancária' : 'Bank account number',
        digit: languagePT ? 'Digito' : 'Digit',
        agency: languagePT ? 'Agência' : 'Agency',
        description: languagePT ? 'Contas bancarias' : 'Bank accounts',
        addAccount: languagePT ? 'CLIQUE PARA ADICIONAR CONTA BANCARIA' : 'CLICK TO ADD BANK ACCOUNT'
    }


    function RenderBankAccountTypes() {
        return (
            bankAccountTypes.map(bat => {
                return (
                    <option key={bat.bankAccountTypeId} value={bat.bankAccountTypeId}>{bat.description}</option>
                )
            })
        )
    }
    function RenderBanks() {
        return (
            banks.map(bank => {
                return (
                    <option key={bank.bankId} value={bank.bankId} code={bank.code}>{bank.code} | {bank.name}</option>
                )
            })
        )
    }
    function RenderclientBankAccounts() {
        return (
            clientBankAccounts.map((bat, index) => {
                return (
                    <div className="account" key={index}>
                        <div className="d-flex d-flexdc">
                            <span className="inputDescription">{banks.find(b => b.bankId === bat.bankId).name}</span>
                            <span className="inputDescription">Agencia: {bat.agency}</span>
                            <span className="inputDescription">Conta: {bat.account}</span>
                        </div>
                        <button type="button" onClick={() => removeBankAccount(index)}>
                            <FaTrash />
                        </button>
                    </div>
                )
            })
        )
    }
    function addBankAccount() {
        if (!account || !agency || !bankId || !digit || !typeAccountId) {
            setError(true)
        }
        else {
            setError(false)
            let bank = {
                bankId: parseInt(bankId),
                agency: parseInt(agency),
                account: parseInt(account),
                digit: parseInt(digit),
                typeAccountId: parseInt(typeAccountId)
            }
            setclientBankAccounts([...clientBankAccounts, bank])
            setaccount('')
            setdigit('')
            setagency('')
        }
    }
    function removeBankAccount(i) {
        setclientBankAccounts(clientBankAccounts.filter((c, index) => index !== i))
    }
    function OnChangeField(e) {
        const { value, id } = e.target
        switch (id) {
            case 'typeAccountId':
                settypeAccountId(value)
                break;
            case 'account':
                setaccount(value)
                break;
            case 'digit':
                setdigit(value)
                break;
            case 'agency':
                setagency(value)
                break;
            case 'bankId':
                setbankId(value)
                break;

            default:
                break;
        }
    }
    useEffect(() => {
        _Json_BankAccounts(clientBankAccounts)
    }, [clientBankAccounts])

    return (
        <div className="divBankAccounts">
            <span className="inputDescriptionTitle">{Labels.description}</span>

            <div className="d-flex">
                <select required={clientBankAccounts.length === 0} name="typeAccountId" id="typeAccountId" onChange={e => OnChangeField(e)}>
                    <option defaultValue value="">{Labels.SelecttypeAccountId}</option>
                    {RenderBankAccountTypes()}
                </select>
                <p className="required">*</p>
            </div>
            <div className="d-flex">
                <select required={clientBankAccounts.length === 0} name="bankId" id="bankId" onChange={e => OnChangeField(e)}>
                    <option defaultValue value="">{Labels.SelectbankId}</option>
                    {RenderBanks()}
                </select>
                <p className="required">*</p>
            </div>

            <div className="d-flex">
                <input required={clientBankAccounts.length === 0} value={account} type="text" name="account" id="account"
                    placeholder={Labels.account} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>
            <div className="d-flex">
                <input required={clientBankAccounts.length === 0} value={digit} type="text" name="digit" id="digit"
                    placeholder={Labels.digit} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>
            <div className="d-flex">
                <input required={clientBankAccounts.length === 0} value={agency} type="text" name="agency" id="agency"
                    placeholder={Labels.agency} onChange={e => OnChangeField(e)} />
                <p className="required">*</p>
            </div>


            <div className="bankAccounts">
                {RenderclientBankAccounts()}
            </div>
            <div className="addAccount">
                <button onClick={() => addBankAccount()} type="button">
                    {Labels.addAccount}
                </button>
                <p className={error ? "msgError" : "d-none"}>{Labels.selectItems}</p>
            </div>
        </div>
    )
}

