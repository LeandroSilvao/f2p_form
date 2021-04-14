const proxy = "https://8147975a629e.ngrok.io"
// const proxy = "http://localhost:2525/"
// const proxy = "https://cors-anywhere.herokuapp.com/"

const config = {
    _urlCountries: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/Country",
    _urlStates: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/State/GetByCountryId/",
    _urlCities: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/City/GetByStateId/",
    _urlAdressType: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/AddressType",
    _urlPhoneType: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/PhoneType",
    _urlGenders: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/Gender",
    _urlMaritalStatus: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/MaritalStatus",
    _urlMaritalAgreement: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/MaritalAgreement",
    _urlProfessionalOccupation: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/ProfessionalOccupation",
    _urlEducation: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/Education",
    _urlEmailType: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/EmailType",
    _urlIdentificationType: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/IdentificationType",
    _urlWealthType: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/WealthType",
    _urlRelationshipType: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/RelationshipType",
    _urlBankAccountType: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/BankAccountType",
    _urlBankGetByCode: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/Bank/GetByCode/",
    _urlBankGetById: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/Bank/GetById/",
    _urlBank: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/Bank",
    _urlQuestions: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/Suity/Questions",
    _urlAnswers: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/Suity/Answers",
    _urlSaveClient: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/OnlineClient/Save",
    _urlGetPluralAccount: proxy + "http://bp-api-hml.brasilplural.com/onboarding/api/OnlineClient/GetPluralAccount/"
}

export default config