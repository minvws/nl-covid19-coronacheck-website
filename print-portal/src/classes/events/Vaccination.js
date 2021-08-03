class Vaccination {
    constructor({
        date = '',
        hpkCode = '',
        type = '',
        manufacturer = '',
        brand = '',
        completedByPersonalStatement = null,
        completedByMedicalStatement = null,
        completionReason = '',
        country = '',
        doseNumber = '',
        totalDoses = ''
    }) {
        this.date = date || '';
        this.hpkCode = hpkCode || '';
        this.type = type || '';
        this.manufacturer = manufacturer || '';
        this.brand = brand || '';
        this.completedByPersonalStatement = completedByPersonalStatement ?? null;
        this.completedByMedicalStatement = completedByMedicalStatement ?? null;
        this.completionReason = completionReason || '';
        this.country = country || '';
        this.doseNumber = String(doseNumber) || '';
        this.totalDoses = String(totalDoses) || '';
    }
}

export default Vaccination;
