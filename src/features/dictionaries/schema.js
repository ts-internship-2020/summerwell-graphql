const { gql } = require('apollo-server');

const myConferenceTypeDefs = gql`

extend type Query {
    categoryList: [Category!]!
    typeList: [Type!]!
    countryList: [Country!]!
    countyList: [County!]!
    cityList: [City!]!
  }
`;

module.exports = myConferenceTypeDefs;