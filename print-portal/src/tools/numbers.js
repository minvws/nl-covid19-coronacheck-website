const getLeadingZero = (n) => {
    if (Number(n) < 10) {
        return '0' + n;
    } else {
        return n;
    }
}

export default {
    getLeadingZero
}
