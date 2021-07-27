import languages from '@/data/languages'
import dictionary from '@/data/language/dictionary'


describe('Language', () => {
    it('Each language should have a dictionary', () => {
        for (const language of languages) {
            expect(dictionary[language.locale]).not.toBeUndefined()
        }
    })

    const getTargetPoint = (reference, levels) => {
        let targetPoint = reference;
        for (const level of levels) {
            targetPoint = targetPoint[level];
        }
        return targetPoint
    }

    const checkForTargetEntry= (targetPoint, key, levels) => {
        if (!targetPoint[key]) {
            // logging empty strings as well
            // This is allowed, but interesting to double check
            console.log('Missing key at: ' + levels.join('/') + '/' + key);
            expect(targetPoint[key]).not.toBeUndefined()
        }
    }

    const loopKeys = (obj, target, levels) => {
        for (const key in obj) {
            const entry = obj[key];
            if (typeof entry === 'string') {
                const targetPoint = getTargetPoint(target, levels)
                checkForTargetEntry(targetPoint, key, levels);

            } else if (Object.prototype.toString.call(entry) === '[object Array]') {
                const targetPoint = getTargetPoint(target, levels)
                checkForTargetEntry(targetPoint, key, levels);
                // just checking the length
                if (entry.length !== targetPoint[key].length) {
                    console.log('Wrong array length at: ' + levels.join('/') + '/' + key);
                    expect(entry.length).toBe(targetPoint[key].length)
                }
            } else {
                const newLevels = [...levels]
                newLevels.push(key)
                loopKeys(entry, target, newLevels);
            }
        }
    }

    const checkDictionaryForKeys = (reference, target) => {
        loopKeys(reference, target, []);
    }

    it('Each language should have the dutch keys', () => {
        const dutchDict = dictionary.nl;
        for (const language of languages) {
            if (language.locale !== 'nl') {
                const thisDict = dictionary[language.locale];
                checkDictionaryForKeys(dutchDict, thisDict)
            }
        }
    })

    it('Each language should not have extra keys', () => {
        const dutchDict = dictionary.nl;
        for (const language of languages) {
            if (language.locale !== 'nl') {
                const thisDict = dictionary[language.locale];
                // now the other way around. Jest will trigger if the dutch
                // dictionary is missing a key 'thisDict' has
                checkDictionaryForKeys(thisDict, dutchDict)
            }
        }
    })
})
