class Vaccination {
    constructor({
        date = '',
        hpkCode = '',
        type = '',
        manufacturer = '',
        brand = '',
        completedByPersonalStatement = false,
        completedByMedicalStatement = false,
        completionReason = '',
        country = '',
        doseNumber = 0,
        totalDoses = 0
    }) {
        this.date = date || '';
        this.hpkCode = hpkCode || '';
        this.type = type || '';
        this.manufacturer = manufacturer || '';
        this.brand = brand || '';
        this.completedByPersonalStatement = completedByPersonalStatement;
        this.completedByMedicalStatement = completedByMedicalStatement;
        this.completionReason = completionReason || '';
        this.country = country || '';
        this.doseNumber = doseNumber || '';
        this.totalDoses = totalDoses || '';
    }
}

export default Vaccination;
