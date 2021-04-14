const codePoints = 'BCFGJLQRSTUVXYZ23456789';

const numberOfValidInputCharacters = function() {
    return codePoints.length;
}

const codePointFromCharacter = function(character) {
    return codePoints.indexOf(character);
}

const characterFromCodePoint = function(codePoint) {
    return codePoints.charAt(codePoint);
}
const generateCheckCharacter = function(input) {
    let factor = 2;
    let sum = 0;
    const n = numberOfValidInputCharacters();

    // Starting from the right and working leftwards is easier since
    // the initial "factor" will always be "2".
    for (let i = input.length - 1; i >= 0; i--) {
        const codePoint = codePointFromCharacter(input.charAt(i));
        let addend = factor * codePoint;

        // Alternate the "factor" that each "codePoint" is multiplied by
        factor = (factor === 2) ? 1 : 2;

        // Sum the digits of the "addend" as expressed in base "n"
        addend = (Math.floor(addend / n)) + (addend % n);
        sum += addend;
    }
    // Calculate the number that must be added to the "sum"
    // to make it divisible by "n".
    const remainder = sum % n;
    const checkCodePoint = (n - remainder) % n;
    return characterFromCodePoint(checkCodePoint);
};

export default {
    generateCheckCharacter
}
