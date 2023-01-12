export default {
    methods: {
        getFullCountryName (shortCode) {
            const id = `country.${shortCode}`
            const value = this.$t(id)
            if (value === id) {
                // short-code is the same as id, so no translation is available
                // return the shortCode
                return shortCode
            }
            return value
        }
    }
}
