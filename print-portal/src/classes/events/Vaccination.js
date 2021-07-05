class Vaccination {
    constructor({
        date = '',
        hpkCode = '',
        type = '',
        manufacturer = '',
        brand = '',
        completedByMedicalStatement = false,
        country = '',
        doseNumber = 0,
        totalDoses = 0
    }) {
        this.date = date || '';
        this.hpkCode = hpkCode || '';
        this.type = type || '';
        this.manufacturer = manufacturer || '';
        this.brand = brand || '';
        this.completedByMedicalStatement = completedByMedicalStatement || '';
        this.country = country || '';
        this.doseNumber = doseNumber || '';
        this.totalDoses = totalDoses || '';
    }
}

export default Vaccination;
