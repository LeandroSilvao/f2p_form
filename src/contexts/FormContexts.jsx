import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import config from "../config";

import { Error, Success, Warn } from '../components/Toastify/Toastify'
import Modal from "../components/Modal";

const InitialState = {
  languagePT: true,
  Clicked: false,
  agency: '',
  account: '',
  digit: '',
  SaveClientWarn: '',
  _Json_ClientAddresses: (obj) => { },
  _Json_ClientInfo: (obj) => { },
  _Json_AttorneyInfo: (obj) => { },
  _Json_PhoneInfo: (obj) => { },
  _Json_EmailInfo: (obj) => { },
  _Json_ClientIdentification: (obj) => { },
  _Json_Spouse: (obj) => { },
  _Json_Work: (obj) => { },
  _Json_Wealths: (obj) => { },
  _Json_FormSuity: (obj) => { },
  _Json_BankAccounts: (obj) => { },
  _Json_LegalRepresentative: (obj) => { },
  _Json_PPERelateds: (obj) => { },
  saveClient: () => { },
  Redirect: () => { }
}

let reqJSON = {
  clientId: 0,
  name: '',
  shortName: '',
  taxPayerRegistry: '',
  birthDate: '',
  fatherName: '',
  genderId: 0,
  maritalStatusId: 0,
  maritalAgreementId: 0,
  motherName: '',
  nationality: '',
  countryBirthId: 0,
  stateBirthId: 0,
  stateBirthName: '',
  professionalOccupationId: 0,
  residenceInOtherCountryId: 0,
  otherTaxResidenceCountryId: 0,
  educationLevelId: 0,
  ppeOccupation: '',
  usPerson: false,
  isAssociatedPerson: false,
  urlCallback: '',
  isAcceptedOrderAttorney: false,
  isAdministratorInAnotherAccount: false,
  attorneys: [],
  spouse: {},
  document: {},
  work: {},
  phones: [],
  emails: [],
  bankAccounts: [],
  wealths: [],
  addresses: [],
  ppeRelateds: [],
  formSuity: [],
  legalRepresentatives: [],
  authentication: {
    login: 'APITEST',
    password: 'APITEST'
  }
}

export const FormContext = createContext(InitialState);

export const FormProvider = (props) => {
  const [languagePT, setLanguagePT] = useState(true)
  const [Clicked, setClicked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [SaveClientWarn, setSaveClientWarn] = useState(false);

  const [agency, setagency] = useState('')
  const [account, setaccount] = useState('')
  const [digit, setdigit] = useState('')

  useEffect(() => {
    // const url = window.location.pathname.split("/")
    // const enUS = url.filter(i => i === 'en')
    // if (enUS.length > 0) setLanguagePT(false)
    // else setLanguagePT(true)
    // setIsModalOpen(true)
  }, [])

  function closeLevelUpModal() {
    setIsModalOpen(false);
  }

  function _Json_ClientAddresses(obj) {
    reqJSON.addresses = [obj]
  }
  function _Json_ClientInfo(obj) {
    reqJSON = { ...reqJSON, ...obj }
  }
  function _Json_AttorneyInfo(obj) {
    reqJSON.attorneys = obj
  }
  function _Json_PhoneInfo(obj) {
    reqJSON.phones = [obj]
  }
  function _Json_EmailInfo(obj) {
    reqJSON.emails = [obj]
  }
  function _Json_ClientIdentification(obj) {
    reqJSON.document = obj
  }
  function _Json_Spouse(obj) {
    reqJSON.spouse = obj
  }
  function _Json_Work(obj) {
    reqJSON.work = obj
  }
  function _Json_Wealths(obj) {
    reqJSON.wealths = obj
  }
  function _Json_FormSuity(obj) {
    reqJSON.formSuity = obj
  }
  function _Json_PPERelateds(obj) {
    reqJSON.ppeRelateds = obj
  }
  function _Json_BankAccounts(obj) {
    reqJSON.bankAccounts = obj
  }
  function _Json_LegalRepresentative(obj) {
    reqJSON.legalRepresentatives = obj
  }
  function saveClient() {
    const required = reqJSON.professionalOccupationId === 8 || reqJSON.professionalOccupationId === 9 ? false : true
    if (reqJSON.bankAccounts.length === 0) {
      const ErrorMessage = languagePT ? 'Adicione uma conta bancaria' : 'Add a bank account'
      Warn(
        "Addbankaccount",
        ErrorMessage,
        10000,
        false
      );
    }
    else if (required && reqJSON.wealths.length === 0) {
      const ErrorMessage = languagePT ? 'Adicione um bem/finança' : 'Add a wealth / finance'
      Warn(
        "Addwealth/finance",
        ErrorMessage,
        10000,
        false
      );
    }
    else {
      setClicked(true)
      setSaveClientWarn('')
      console.log(JSON.stringify(reqJSON))
      axios.post(config._urlSaveClient, reqJSON)
        .then(res => {
          if (res.data) {
            CheckClient(res.data.code)
          }
        })
        .catch(err => {
          setClicked(false)
          if (err.response) {
            let err_message
            const { innerMessage, message } = err.response.data
            if (innerMessage) {
              if (innerMessage.includes("spouse has a same Taxpayer as client")) err_message = "Cônjuge tem o mesmo cpf que o cliente"
              else err_message = innerMessage
              setSaveClientWarn(err_message)
              // Error(
              //   "SaveClient",
              //   err_message,
              //   20000,
              //   false
              // );
            }
            else {
              console.log('Error', err.message);
              const ErrorMessage = languagePT ? 'Ocorreu um erro, verifique as informações e tente novamente. Caso persista tente novamente mais tarde.' : 'An error occurred, check the information and try again. If it persists, try again later.'
              setSaveClientWarn(ErrorMessage)
              // Error(
              //   "ErrorOnCreateClient",
              //   ErrorMessage,
              //   20000,
              //   false
              // );
            }
          }
          else if (err.request || err.response) {
            // The request was made but no response was received
            console.log('Error', err.message);
            const ErrorMessage = languagePT ? 'Ocorreu um erro, verifique as informações e tente novamente. Caso persista tente novamente mais tarde.' : 'An error occurred, check the information and try again. If it persists, try again later.'
            // Error(
            //   "ErrorOnCreateClient",
            //   ErrorMessage,
            //   20000,
            //   false
            // );
            setSaveClientWarn(ErrorMessage)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message);
            const ErrorMessage = languagePT ? 'Ocorreu um erro, verifique as informações e tente novamente. Caso persista tente novamente mais tarde.' : 'An error occurred, check the information and try again. If it persists, try again later.'
            // Error(
            //   "ErrorOnCreateClient",
            //   ErrorMessage,
            //   10000,
            //   false
            // );
            setSaveClientWarn(ErrorMessage)
          }
        })
    }
  }

  function CheckClient(clientCode) {
    setSaveClientWarn('')
    const interval = setInterval(() => {
      axios.get(`${config._urlGetPluralAccount}${clientCode}`)
        .then(res => {
          if (res.data.clientCode) {
            const bankAccount = res.data.bankAccount
            setagency(bankAccount.agency)
            setaccount(bankAccount.account)
            setdigit(bankAccount.digit)

            console.log(bankAccount)

            clearInterval(interval)
            setIsModalOpen(true)


            // const SuccessMessage = languagePT ? 'Cadastro Concluido com Sucesso' : 'Registration Completed Successfully'
            setClicked(false)
            // Success('ClientCreated', SuccessMessage, 5000, false)


          }
        })
        .catch(err => {
          if (err.response) {
            // Request made and server responded
            if (err.response.data.innerMessage) {
              setClicked(true)
              const WarnMessage = languagePT ? 'O cadastro está na fila de análise/aprovação interna' : 'The registration is in the internal review / approval queue'
              setSaveClientWarn(WarnMessage)
              // Warn(
              //   "RegistryInQueue",
              //   WarnMessage,
              //   10000,
              //   false
              // );
            }
          }
          else if (err.request) {
            setClicked(false)
            // The request was made but no response was received
            console.log(err.request);
            const ErrorMessage = languagePT ? 'Ocorreu um erro, verifique as informações e tente novamente. Caso persista tente novamente mais tarde.' : 'An error occurred, check the information and try again. If it persists, try again later.'
            setSaveClientWarn(ErrorMessage)
            // Error(
            //   "ErrorOnCreateClient",
            //   ErrorMessage,
            //   10000,
            //   false
            // );
          } else {
            setClicked(false)
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message);
            const ErrorMessage = languagePT ? 'Ocorreu um erro, verifique as informações e tente novamente. Caso persista tente novamente mais tarde.' : 'An error occurred, check the information and try again. If it persists, try again later.'
            setSaveClientWarn(ErrorMessage)
            // Error(
            //   "ErrorOnCreateClient",
            //   ErrorMessage,
            //   10000,
            //   false
            // );
          }
        })
    }, 10000);

  }

  function Redirect() {
    closeLevelUpModal()
    // setTimeout(() => {
    //   window.location.replace("https://flow2pay.com.br/");
    // }, 5000);
  }

  return (
    <FormContext.Provider
      value={{
        agency,
        account,
        digit,
        languagePT,
        SaveClientWarn,
        _Json_ClientAddresses,
        _Json_ClientInfo,
        _Json_AttorneyInfo,
        _Json_PhoneInfo,
        _Json_EmailInfo,
        _Json_ClientIdentification,
        _Json_Spouse,
        _Json_Work,
        _Json_Wealths,
        _Json_LegalRepresentative,
        _Json_BankAccounts,
        _Json_FormSuity,
        _Json_PPERelateds,
        Clicked,
        Redirect,
        saveClient
      }}
    >
      {props.children}
      {isModalOpen && <Modal />}
    </FormContext.Provider>
  );
};
