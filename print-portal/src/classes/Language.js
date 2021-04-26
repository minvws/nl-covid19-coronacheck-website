class Language {
    constructor({
        id = null,
        name = '',
        locale = '',
        direction = 'ltr'
    }) {
        this.id = id;
        this.name = name;
        this.locale = locale;
        this.direction = direction;
    }
}

export default Language;
