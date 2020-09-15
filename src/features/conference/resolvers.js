const conferenceResolvers = {
    Query: {
        conferenceList: async (_parent, { pager, filters }, { dataSources }, _info) => {
            const data = await dataSources.conferenceDb.getConferenceList(pager, filters);
            return data
        },

        conference: async (_parent, { id }, { dataLoaders }, _info) => {
            const result = await dataLoaders.conferenceById.load(id);
            return result;
        },

        categoryList: async (_parent, _arguments, { dataSources }, _info) => {
            const data = await dataSources.conferenceDb.getCategoryList();
            return data;
        },

        typeList: async (_parent, _arguments, { dataSources }, _info) => {
            const data = await dataSources.conferenceDb.getTypeList();
            return data;
        },

        countryList: async (_parent, _arguments, { dataSources }, _info) => {
            const data = await dataSources.conferenceDb.getCountryList();
            return data;
        },

        countyList: async (_parent, _arguments, { dataSources }, _info) => {
            const data = await dataSources.conferenceDb.getCountyList();
            return data;
        },

        cityList: async (_parent, _arguments, { dataSources }, _info) => {
            const data = await dataSources.conferenceDb.getCityList();
            return data;
        }
    },

    ConferenceList: {
        pagination: async (_parent, { pager, filters }, { dataSources }, _info) => {
            const { totalCount } = await dataSources.conferenceDb.getConferenceListTotalCount(filters);
            return { currentPage: pager, totalCount };
        }
    },

    Conference: {
        type: async ({ conferenceTypeId }, _params, { dataLoaders }, _info) => {
            const conferenceType = await dataLoaders.conferenceTypeById.load(conferenceTypeId);
            return conferenceType;
        },
        category: async ({ categoryId }, _params, { dataLoaders }, _info) => {
            const category = await dataLoaders.categoryById.load(categoryId);
            return category;
        },
        location: async ({ locationId }, _params, { dataLoaders }, _info) => {
            const location = await dataLoaders.locationById.load(locationId);
            return location;
        },
        speakers: async ({ id }, _arguments, { dataLoaders }, _info) => {
            const speakers = await dataLoaders.speakersByConferenceId.load(id);
            return speakers;
        },
        status: async ({ id }, { userEmail }, { dataLoaders }, _info) => {
            const status = await dataLoaders.statusByConferenceId.load({ id, userEmail })
            return status
        }        
    },

    Location: {
        city: async ({ cityId }, _params, { dataLoaders }, _info) => {
            const city = await dataLoaders.cityById.load(cityId);
            return city;
        },
        county: async ({ countyId }, _params, { dataLoaders }, _info) => {
            const county = await dataLoaders.countyById.load(countyId);
            return county;
        },
        country: async ({ countryId }, _params, { dataLoaders }) => {
            const country = await dataLoaders.countryById.load(countryId);
            return country;
        }
    }
};

module.exports = conferenceResolvers;