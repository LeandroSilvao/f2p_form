import React, { useContext, useEffect, useState } from 'react'
import Fuse from 'fuse.js';

import SelectSearch from 'react-select-search'
import { FaTrash } from "react-icons/fa";

import { FormContext } from "../../contexts/FormContexts";
import { BankAccountsContext } from '../../contexts/BankContexts';

import './index.css'
import config from '../../config';
import axios from 'axios';


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
        selectItems: languagePT ? 'Selecione um item de cada lista e preencha os campos' : 'Select an item from the list and fill the fields',
        SelecttypeAccountId: languagePT ? 'Tipo de conta bancária' : 'Bank account type',
        SelectbankId: languagePT ? 'Selecione o seu banco' : 'Select your bank',
        account: languagePT ? 'Número da conta bancária' : 'Bank account number',
        digit: languagePT ? 'Digito' : 'Digit',
        agency: languagePT ? 'Agência' : 'Agency',
        description: languagePT ? 'Contas bancarias' : 'Bank accounts',
        addAccount: languagePT ? 'Adicionar conta bancária' : 'CLICK TO ADD BANK ACCOUNT'
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
                        <div className="account-spans">
                            <span>{banks.find(b => b.value === bat.bankId.toString()).name}</span>
                            <span>Agencia: {bat.agency}</span>
                            <span>Conta: {bat.account}-{bat.digit}</span>
                        </div>
                        <button type="button" onClick={() => removeBankAccount(index)}>
                            Apagar conta
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
                console.log(value)
                break;

            default:
                break;
        }
    }
    useEffect(() => {
        _Json_BankAccounts(clientBankAccounts)
    }, [clientBankAccounts])


    function fuzzySearch(options) {
        const fuse = new Fuse(options, {
            keys: ['name'],
            threshold: 0.3,
        });

        return (value) => {
            if (!value.length) {
                return options;
            }
            let array = fuse.search(value)
            array = array.map(i => i.item)
            return array;
        };
    }

    return (
        <div className="divBankAccounts">
            <div className="componentTitle">
                <span>{Labels.description}</span>
                <hr />
            </div>


            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.SelecttypeAccountId}</p>
                </div>
                <select required={clientBankAccounts.length === 0} name="typeAccountId" id="typeAccountId" onChange={e => OnChangeField(e)}>
                    <option defaultValue value=""></option>
                    {RenderBankAccountTypes()}
                </select>
            </div>


            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.SelectbankId}</p>
                </div>
                <SelectSearch options={banks} search={true} filterOptions={fuzzySearch} name="name"
                    emptyMessage="Não encontrado" id="bankId"
                    printOptions="auto" closeOnSelect={true} onChange={id => setbankId(id)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.account}</p>
                </div>
                <input required={clientBankAccounts.length === 0} value={account} type="text" name="account" id="account"
                    onChange={e => OnChangeField(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.digit}</p>
                </div>
                <input required={clientBankAccounts.length === 0} value={digit} type="text" name="digit" id="digit"
                    onChange={e => OnChangeField(e)} />
            </div>

            <div className="d-flex-input d-flexdc">
                <div className="d-flex">
                    <p className="required">*</p>
                    <p className="inputDescription">{Labels.agency}</p>
                </div>
                <input required={clientBankAccounts.length === 0} value={agency} type="text" name="agency" id="agency"
                    onChange={e => OnChangeField(e)} />
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

