class VaccinationAssessment {
    constructor({
        assessmentDate = '',
        digitallyVerified = false,
        country = ''

    }) {
        this.date = assessmentDate;
        this.digitallyVerified = digitallyVerified;
        this.country = country;
    }
}

export default VaccinationAssessment;
