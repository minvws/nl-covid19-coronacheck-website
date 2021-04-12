class Language {
    constructor({
        id = null,
        name = '',
        locale = ''
    }) {
        this.id = id;
        this.name = name;
        this.locale = locale;
    }
}

export default Language;
