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

export default config