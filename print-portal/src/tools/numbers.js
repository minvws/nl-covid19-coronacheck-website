const getLeadingZero = (n) => {
    if (Number(n) < 10) {
        return '0' + n;
    } else {
        return n;
    }
}

const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
}

export default {
    getLeadingZero, isNumeric
}
