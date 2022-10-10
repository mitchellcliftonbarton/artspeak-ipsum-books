import words from './words'

export default class Generate {
  constructor () {
    this.sentenceLengths  = [4, 14] // arbitrary numbers
    this.paragraphLengths = [5, 7] // arbitrary numbers
    this.titleLengths = [1, 9] // arbitrary
    // this.finalText        = null
  }

  createSentence (maxWords, minWords, noPeriod = false) {
    // pick an amount of words to make as the length of the sentence
    const sentenceLength = Math.floor(Math.random() * (maxWords - minWords + 1) + minWords)
    let sentence = '' // start with empty sentence string

    for (var i = 0; i < sentenceLength; i++) {
      // get a random word and add to sentence
      let word = words[Math.floor(Math.random() * words.length)]

      while (sentence.includes(word)) { // make sure that phrase or word isnt already in the sentence
        word = words[Math.floor(Math.random() * words.length)]
      }

      if (i + 1 === sentenceLength) {
        noPeriod ? sentence += ` ${word}` : sentence += ` ${word}.`
      } else if (i === 0) {
        let w = word.charAt(0).toUpperCase() + word.slice(1)
        sentence += w
      } else {
        sentence += ` ${word}`
      }
    }

    return sentence
  }

  createParagraph () {
    const paragraphLength = Math.floor(Math.random() * (this.paragraphLengths[1] - this.paragraphLengths[0] + 1) + this.paragraphLengths[0])
    let paragraph = ''

    for (var i = 0; i < paragraphLength; i++) {
      let sentence = this.createSentence(this.sentenceLengths[1], this.sentenceLengths[0])

      if (i !== 0) {
        paragraph += ` ${sentence}`
      } else {
        paragraph += sentence
      }
    }

    return paragraph
  }

  createParagraphs (paragraphsNumber) {
    let text = ''
    const paragraphs = parseInt(paragraphsNumber)

    for (var i = 0; i < paragraphs; i++) {
      let paragraph = this.createParagraph()

      if (i + 1 === paragraphs) {
        text += `${paragraph}`
      } else {
        text += `${paragraph}\n\n`
      }
    }

    text.trim()

    return text
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  titleize(string) {
    const array = string.split(' ')
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i][0].toUpperCase() + array[i].substr(1)
    }
    return array.join(' ')
  }
}
