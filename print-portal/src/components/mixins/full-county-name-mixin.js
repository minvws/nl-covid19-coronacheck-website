export default {
    methods: {
        getFullCountryName (name) {
            const id = `country.${name}`
            const value = this.$t(id)
            if (value === id) {
                // valuenis the same as id, so no translation is available
                // return the name
                return name
            }
            return value
        }
    }
}
