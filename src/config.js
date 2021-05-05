// const proxy = "http://localhost:2525/"
const proxy = "https://proxy-cors.vercel.app/"

const config = {
    _urlCountries: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/Country`,
    _urlStates: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/State/GetByCountryId/`,
    _urlCities: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/City/GetByStateId/`,
    _urlAdressType: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/AddressType`,
    _urlPhoneType: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/PhoneType`,
    _urlGenders: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/Gender`,
    _urlMaritalStatus: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/MaritalStatus`,
    _urlMaritalAgreement: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/MaritalAgreement`,
    _urlProfessionalOccupation: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/ProfessionalOccupation`,
    _urlEducation: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/Education`,
    _urlEmailType: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/EmailType`,
    _urlIdentificationType: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/IdentificationType`,
    _urlWealthType: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/WealthType`,
    _urlRelationshipType: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/RelationshipType`,
    _urlBankAccountType: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/BankAccountType`,
    _urlBankGetByCode: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/Bank/GetByCode/`,
    _urlBankGetById: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/Bank/GetById/`,
    _urlBank: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/Bank`,
    _urlQuestions: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/Suity/Questions`,
    _urlAnswers: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/Suity/Answers`,
    _urlSaveClient: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/OnlineClient/Save`,
    _urlGetPluralAccount: `${proxy}bp-api-hml.brasilplural.com/onboarding/api/OnlineClient/GetPluralAccount/`
}

// const config = {
//     _urlCountries: `http://bp-api-hml.brasilplural.com/onboarding/api/Country`,
//     _urlStates: `http://bp-api-hml.brasilplural.com/onboarding/api/State/GetByCountryId/`,
//     _urlCities: `http://bp-api-hml.brasilplural.com/onboarding/api/City/GetByStateId/`,
//     _urlAdressType: `http://bp-api-hml.brasilplural.com/onboarding/api/AddressType`,
//     _urlPhoneType: `http://bp-api-hml.brasilplural.com/onboarding/api/PhoneType`,
//     _urlGenders: `http://bp-api-hml.brasilplural.com/onboarding/api/Gender`,
//     _urlMaritalStatus: `http://bp-api-hml.brasilplural.com/onboarding/api/MaritalStatus`,
//     _urlMaritalAgreement: `http://bp-api-hml.brasilplural.com/onboarding/api/MaritalAgreement`,
//     _urlProfessionalOccupation: `http://bp-api-hml.brasilplural.com/onboarding/api/ProfessionalOccupation`,
//     _urlEducation: `http://bp-api-hml.brasilplural.com/onboarding/api/Education`,
//     _urlEmailType: `http://bp-api-hml.brasilplural.com/onboarding/api/EmailType`,
//     _urlIdentificationType: `http://bp-api-hml.brasilplural.com/onboarding/api/IdentificationType`,
//     _urlWealthType: `http://bp-api-hml.brasilplural.com/onboarding/api/WealthType`,
//     _urlRelationshipType: `http://bp-api-hml.brasilplural.com/onboarding/api/RelationshipType`,
//     _urlBankAccountType: `http://bp-api-hml.brasilplural.com/onboarding/api/BankAccountType`,
//     _urlBankGetByCode: `http://bp-api-hml.brasilplural.com/onboarding/api/Bank/GetByCode/`,
//     _urlBankGetById: `http://bp-api-hml.brasilplural.com/onboarding/api/Bank/GetById/`,
//     _urlBank: `http://bp-api-hml.brasilplural.com/onboarding/api/Bank`,
//     _urlQuestions: `http://bp-api-hml.brasilplural.com/onboarding/api/Suity/Questions`,
//     _urlAnswers: `http://bp-api-hml.brasilplural.com/onboarding/api/Suity/Answers`,
//     _urlSaveClient: `http://bp-api-hml.brasilplural.com/onboarding/api/OnlineClient/Save`,
//     _urlGetPluralAccount: `http://bp-api-hml.brasilplural.com/onboarding/api/OnlineClient/GetPluralAccount/`
// }

export default config