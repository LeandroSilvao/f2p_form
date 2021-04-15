import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import config from "../config";

import { Error, Success, Warn } from '../components/Toastify/Toastify'

const InitialState = {
  languagePT: Boolean,
  errorOnApi: Boolean,
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
  saveClient: () => { }
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

  useEffect(() => {
    const url = window.location.pathname.split("/")
    const enUS = url.filter(i => i === 'en')
    if (enUS.length > 0) setLanguagePT(false)
    else setLanguagePT(true)
  }, [])



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
    reqJSON.ppeRelateds = [obj]
  }
  function _Json_BankAccounts(obj) {
    reqJSON.bankAccounts = obj
  }
  function _Json_LegalRepresentative(obj) {
    reqJSON.legalRepresentatives = [obj]
  }
  function saveClient() {
    console.log(reqJSON.professionalOccupationId)
    const required = reqJSON.professionalOccupationId === 8 || reqJSON.professionalOccupationId === 9  ? false : true

    if (reqJSON.bankAccounts.length === 0) {
      const ErrorMessage = languagePT ? 'Adicione uma conta bancaria' : 'Add a bank account'
      Warn(
        "Addbankaccount",
        ErrorMessage,
        5000,
        false
      );
    }
    else if (required && reqJSON.wealths.length === 0) {
      const ErrorMessage = languagePT ? 'Adicione um bem/finança' : 'Add a wealth / finance'
      Warn(
        "Addwealth/finance",
        ErrorMessage,
        5000,
        false
      );
    }
    else {
      console.log(JSON.stringify(reqJSON))
      // axios.post(config._urlSaveClient, reqJSON)
      //   .then(res => {
      //     if (res.data) {
      //       // console.log(res.data)
      //       CheckClient(res.data.code)
      //     }
      //   })
      //   .catch(err => {
      //     if (err.request || err.response) {
      //       // The request was made but no response was received
      //       console.log('Error', err.message);
      //       const ErrorMessage = languagePT ? 'Ocorreu um erro, verifique as informações e tente novamente. Caso persista tente novamente mais tarde.' : 'An error occurred, check the information and try again. If it persists, try again later.'
      //       Error(
      //         "ErrorOnCreateClient",
      //         ErrorMessage,
      //         5000,
      //         false
      //       );
      //     } else {
      //       // Something happened in setting up the request that triggered an Error
      //       console.log('Error', err.message);
      //       const ErrorMessage = languagePT ? 'Ocorreu um erro, verifique as informações e tente novamente. Caso persista tente novamente mais tarde.' : 'An error occurred, check the information and try again. If it persists, try again later.'
      //       Error(
      //         "ErrorOnCreateClient",
      //         ErrorMessage,
      //         5000,
      //         false
      //       );
      //     }
      //   })
    }
  }


  function CheckClient(clientCode) {
    const interval = setInterval(() => {
      axios.get(`${config._urlGetPluralAccount}${clientCode}`)
        .then(res => {
          if (res.data.clientCode) {
            // Cliente cadastrado com sucesso
            const SuccessMessage = languagePT ? 'Cadastro Concluido com Sucesso' : 'Registration Completed Successfully'
            Success('ClientCreated', SuccessMessage, 5000, false)
            clearInterval(interval)
          }
        })
        .catch(err => {
          if (err.response) {
            // Request made and server responded
            if (err.response.data.innerMessage) {
              const WarnMessage = languagePT ? 'O cadastro está na fila de análise/aprovação interna' : 'The registration is in the internal review / approval queue'
              Warn(
                "RegistryInQueue",
                WarnMessage,
                5000,
                false
              );
            }
          }
          else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
            const ErrorMessage = languagePT ? 'Ocorreu um erro, verifique as informações e tente novamente. Caso persista tente novamente mais tarde.' : 'An error occurred, check the information and try again. If it persists, try again later.'
            Error(
              "ErrorOnCreateClient",
              ErrorMessage,
              5000,
              false
            );
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message);
            const ErrorMessage = languagePT ? 'Ocorreu um erro, verifique as informações e tente novamente. Caso persista tente novamente mais tarde.' : 'An error occurred, check the information and try again. If it persists, try again later.'
            Error(
              "ErrorOnCreateClient",
              ErrorMessage,
              5000,
              false
            );
          }
        })
    }, 5000);

  }

  return (
    <FormContext.Provider
      value={{
        languagePT,
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
        saveClient
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
