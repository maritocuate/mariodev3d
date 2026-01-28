/*
A string is considered beautiful if it satisfies the following conditions:
Consisting of English vowels only, and each of the 5 English vowels ('a', 'e', 'i', 'o', 'u') must appear at least once in it.
The letters must be sorted in alphabetical order (i.e. all 'a's before 'e's, all 'e's before 'i's, etc.).
For example, strings \"aeiou\" and \"aaaaaaeiiiioou\" are considered beautiful, but \"uaeio\", \"aeoiu\", \"aaaeeeooo\" and “aeixyzou” are not beautiful.
Given a string consisting of English Characters and numbers , return the length of the longest beautiful substring in the given string. If no such substring exists, return 0.
A substring is a contiguous sequence of characters in a string.

for example:
Input: \"abcdeaeiaaioaaaaeiiiiouuuooaauuaeiu\"
Output: 13

Input: \"aaaaa\"
Output: 0
*/

function CodingChallenge(str) {
    let maxLen = 0
    let currentLen = 0
    let lastVowel = ''

    // Mapeamos las vocales a números para verificar el orden fácilmente
    const order = { 'a': 0, 'e': 1, 'i': 2, 'o': 3, 'u': 4 }

    for (let i = 0; i < str.length; i++) {
        const char = str[i]

        // Si no es una vocal, reiniciamos todo
        if (order[char] === undefined) {
            currentLen = 0
            lastVowel = ''
            continue
        }

        // Caso especial: 'a' siempre puede iniciar una secuencia o continuarla
        if (char === 'a') {
            if (lastVowel === 'a') currentLen++
            else currentLen = 1 // Reinicio: empieza nueva secuencia
            lastVowel = 'a'
        }
        // Otras vocales: solo válidas si siguen a sí mismas o a la anterior inmediata
        else if (lastVowel !== '' && (order[char] === order[lastVowel] || order[char] === order[lastVowel] + 1)) {
            currentLen++
            lastVowel = char
        }
        // Secuencia rota por orden incorrecto
        else {
            currentLen = 0
            lastVowel = ''
        }

        // Solo actualizamos el máximo si la secuencia actual termina en 'u' (es completa)
        if (lastVowel === 'u') {
            maxLen = Math.max(maxLen, currentLen)
        }
    }

    return maxLen
}

console.log(CodingChallenge("abcdeaeiaaioaaaaeiiiiouuuooaauuaeiu"))