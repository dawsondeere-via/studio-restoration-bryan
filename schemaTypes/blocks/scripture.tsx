import {defineField, defineType, ObjectInputProps, set, unset} from 'sanity'
import {Flex, Select, Stack, Text, TextInput} from '@sanity/ui'
import {useCallback, useState} from 'react'

type Scripture = {
  book: string
  chapter: string
  verses: string
}

const isValidChapter = ({book, chapter}: Scripture) => {
  return parseInt(chapter) <= CHAPTERS[book]
}

const isValidVerse = ({book, chapter, verses}: Scripture) => {
  return parseInt(verses) <= ALL_VERSES[book][parseInt(chapter)]
}

export function ScriptureInput(props: ObjectInputProps) {
  const {onChange, value} = props
  const [selectedBook, setSelectedBook] = useState(value ? value.book : 'Genesis')
  const [selectedChapter, setSelectedChapter] = useState(value ? value.chapter : '1')
  const [selectedVerses, setSelectedVerses] = useState(value ? value.verses : '')

  const handleChange = useCallback(
    ({book, chapter, verses}: Scripture) => {
      let value
      if (book !== '' && chapter !== '' && verses !== '') value = {book, chapter, verses}
      onChange(value ? set(value) : unset())
    },
    [onChange],
  )

  const handleBookChange = (event: any) => {
    setSelectedBook(event.target.value)
    let chapterToUse = selectedChapter
    if (
      !isValidChapter({book: event.target.value, chapter: selectedChapter, verses: selectedVerses})
    ) {
      setSelectedChapter('1')
      chapterToUse = '1'
    }
    handleChange({book: event.target.value, chapter: chapterToUse, verses: selectedVerses})
  }
  const handleChapterChange = (event: any) => {
    setSelectedChapter(event.target.value)
    handleChange({book: selectedBook, chapter: event.target.value, verses: selectedVerses})
  }
  const handleVersesChange = (event: any) => {
    // remove all characters that are not numeric or dash (or colon?)
    const value = event.target.value.replace(/[^0-9:-]/g, '')
    setSelectedVerses(value)
    handleChange({book: selectedBook, chapter: selectedChapter, verses: value})
  }

  return (
    <Flex direction="row">
      <Stack space={2} paddingRight={2}>
        <Text>Book</Text>
        <Select value={selectedBook} onChange={handleBookChange}>
          {BOOKS.map((book, index) => (
            <option key={index} value={book}>
              {book}
            </option>
          ))}
        </Select>
      </Stack>
      <Stack space={2} paddingRight={2}>
        <Text>Chapter</Text>
        <Select value={selectedChapter} onChange={handleChapterChange}>
          {ALL_CHAPTERS.filter((value) => value <= CHAPTERS[selectedBook]).map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </Stack>
      <Stack space={2}>
        <Text>Verse(s)</Text>
        <TextInput value={selectedVerses} onChange={handleVersesChange} />
      </Stack>
    </Flex>
  )
}

const scripture = defineType({
  name: 'scripture',
  type: 'object',
  fields: [
    defineField({
      name: 'book',
      type: 'string',
    }),
    defineField({
      name: 'chapter',
      type: 'string',
    }),
    defineField({
      name: 'verses',
      type: 'string',
    }),
  ],
  components: {input: ScriptureInput},
  validation: (rule) => [
    // rule.required(),
    rule.custom((value) => {
      if (typeof value === 'undefined') return 'All parts of scripture reference required'
      const {book, chapter, verses}: Record<string, any> = value
      const verseParts = verses.split('-')
      if (verseParts.length > 2) return 'Malformed verses - too many dashes'
      if (verses.match(/^[0-9]+-[0-9]+:[0-9]+$/)) {
        // check if verses is of format #-#:#
        const verseChapter = verseParts[1].split(':')[0]
        const secondVerse = verseParts[1].split(':')[1]
        if (parseInt(verseChapter) < parseInt(chapter))
          return 'Malformed verses - starting chapter must be less than ending chapter'
        else if (parseInt(verseChapter) == parseInt(chapter))
          return 'Malformed verses - ending chapter and starting chapter are the same (simplify the verses)'
        else if (parseInt(verseChapter) > CHAPTERS[book])
          return `Malformed verses - ending chapter is not a valid chapter for ${book}`
        else if (!isValidVerse({book, chapter, verses: verseParts[0]}))
          return `Malformed verse - ${verseParts[0]} is not a valid verse for ${book} ${chapter}`
        else if (!isValidVerse({book, chapter: verseChapter, verses: secondVerse}))
          return `Malformed verse - ${secondVerse} is not a valid verse for ${book} ${verseChapter}`

        return true
      } else if (verses.match(/^[0-9]+-[0-9]+$/)) {
        // check if verses is of format #-#
        if (parseInt(verseParts[1]) <= parseInt(verseParts[0]))
          return 'Malformed verses - starting verse must be less than ending verse'
        else if (!isValidVerse({book, chapter, verses: verseParts[0]}))
          return `Malformed verse - ${verseParts[0]} is not a valid verse for ${book} ${chapter}`
        else if (!isValidVerse({book, chapter, verses: verseParts[1]}))
          return `Malformed verse - ${verseParts[1]} is not a valid verse for ${book} ${chapter}`
        return true
      } else if (verses.match(/^[0-9]+$/)) {
        // check if verses is of format #
        if (!isValidVerse({book, chapter, verses}))
          return `Malformed verse - ${verses} is not a valid verse for ${book} ${chapter}`
        return true
      }
      return 'Malformed verses - does not match any of the following formats: # or #-# or #-#:#'
    }),
  ],
})

export default scripture

// ---------------------------CONSTANTS-----------------------------------------

const BOOKS: string[] = [
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  'Deuteronomy',
  'Joshua',
  'Judges',
  'Ruth',
  '1 Samuel',
  '2 Samuel',
  '1 Kings',
  '2 Kings',
  '1 Chronicles',
  '2 Chronicles',
  'Ezra',
  'Nehemiah',
  'Esther',
  'Job',
  'Psalms',
  'Proverbs',
  'Ecclesiastes',
  'Song of Solomon',
  'Isaiah',
  'Jeremiah',
  'Lamentations',
  'Ezekiel',
  'Daniel',
  'Hosea',
  'Joel',
  'Amos',
  'Obadiah',
  'Jonah',
  'Micah',
  'Nahum',
  'Habakkuk',
  'Zephaniah',
  'Haggai',
  'Zechariah',
  'Malachi',
  'Matthew',
  'Mark',
  'Luke',
  'John',
  'Acts',
  'Romans',
  '1 Corinthians',
  '2 Corinthians',
  'Galatians',
  'Ephesians',
  'Philippians',
  'Colossians',
  '1 Thessalonians',
  '2 Thessalonians',
  '1 Timothy',
  '2 Timothy',
  'Titus',
  'Philemon',
  'Hebrews',
  'James',
  '1 Peter',
  '2 Peter',
  '1 John',
  '2 John',
  '3 John',
  'Jude',
  'Revelation',
]
const CHAPTERS: {[key: string]: number} = {
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27,
  Numbers: 36,
  Deuteronomy: 34,
  Joshua: 24,
  Judges: 21,
  Ruth: 4,
  '1 Samuel': 31,
  '2 Samuel': 24,
  '1 Kings': 22,
  '2 Kings': 25,
  '1 Chronicles': 29,
  '2 Chronicles': 36,
  Ezra: 10,
  Nehemiah: 13,
  Esther: 10,
  Job: 42,
  Psalms: 150,
  Proverbs: 31,
  Ecclesiastes: 12,
  'Song of Solomon': 8,
  Isaiah: 66,
  Jeremiah: 52,
  Lamentations: 5,
  Ezekiel: 48,
  Daniel: 12,
  Hosea: 14,
  Joel: 3,
  Amos: 9,
  Obadiah: 1,
  Jonah: 4,
  Micah: 7,
  Nahum: 3,
  Habakkuk: 3,
  Zephaniah: 3,
  Haggai: 2,
  Zechariah: 14,
  Malachi: 4,
  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,
  Acts: 28,
  Romans: 16,
  '1 Corinthians': 16,
  '2 Corinthians': 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  '1 Thessalonians': 5,
  '2 Thessalonians': 3,
  '1 Timothy': 6,
  '2 Timothy': 4,
  Titus: 3,
  Philemon: 1,
  Hebrews: 13,
  James: 5,
  '1 Peter': 5,
  '2 Peter': 3,
  '1 John': 5,
  '2 John': 1,
  '3 John': 1,
  Jude: 1,
  Revelation: 22,
}
const ALL_CHAPTERS: number[] = Array.from({length: 150}, (_, i) => i + 1)

// generated by ChatGPT, TODO: double check this
const ALL_VERSES: {[key: string]: number[]} = {
  Genesis: [
    0, 31, 25, 24, 26, 32, 22, 46, 22, 29, 32, 23, 20, 18, 24, 21, 16, 27, 33, 28, 18, 34, 30, 26,
    67, 34, 35, 46, 22, 45, 43, 46, 23, 20, 30, 29, 26, 29, 21, 24, 43,
  ],
  Exodus: [
    0, 22, 25, 22, 31, 23, 30, 29, 36, 35, 23, 10, 51, 22, 31, 27, 34, 29, 27, 25, 26, 22, 23, 33,
    20, 40, 37, 25, 38, 46, 43, 27, 38, 31, 35, 35, 24,
  ],
  Leviticus: [
    0, 17, 16, 17, 35, 19, 30, 38, 23, 18, 20, 47, 8, 59, 34, 31, 32, 16, 30, 28, 37, 29, 44, 29,
    34, 27, 46, 34, 23,
  ],
  Numbers: [
    0, 54, 34, 21, 49, 31, 28, 89, 26, 23, 36, 35, 16, 33, 37, 41, 49, 34, 30, 28, 35, 23, 41, 25,
    18, 32, 41, 50, 46, 55, 38, 33, 30, 48, 35, 54, 43, 37, 35,
  ],
  Deuteronomy: [
    0, 46, 37, 29, 44, 33, 25, 26, 20, 29, 22, 32, 32, 19, 25, 23, 22, 17, 22, 15, 20, 23, 29, 25,
    22, 19, 21, 20, 28, 29, 12, 30, 30, 22, 12,
  ],
  Joshua: [
    0, 18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 45, 22, 18, 51, 9, 45, 34, 23,
    32, 27, 33, 26,
  ],
  Judges: [
    0, 36, 23, 31, 24, 18, 40, 25, 29, 57, 18, 47, 15, 25, 20, 20, 31, 18, 31, 21, 25, 25, 22, 30,
    16, 13,
  ],
  Ruth: [0, 22, 23, 18, 22],
  '1 Samuel': [
    0, 28, 36, 21, 22, 13, 21, 17, 22, 27, 19, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 18, 16, 20,
    23, 39, 22,
  ],
  '2 Samuel': [
    0, 27, 32, 39, 12, 25, 23, 29, 18, 31, 19, 22, 31, 39, 33, 37, 23, 29, 23, 43, 26, 19, 34, 39,
    20, 27, 17,
  ],
  '1 Kings': [
    0, 53, 46, 28, 34, 18, 27, 51, 66, 28, 29, 43, 20, 33, 31, 24, 34, 24, 46, 29, 43, 29, 56, 22,
    29, 34, 21,
  ],
  '2 Kings': [
    0, 18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 16, 30, 20, 41, 37, 24, 37, 17, 22, 17,
    24, 30, 21,
  ],
  '1 Chronicles': [
    0, 54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 13, 33, 15, 29, 43, 43, 46, 30, 29, 27, 19, 24,
    31, 29, 32, 34, 29, 33, 30, 16,
  ],
  '2 Chronicles': [
    0, 17, 18, 17, 22, 14, 42, 22, 10, 17, 16, 23, 16, 22, 27, 28, 34, 24, 17, 34, 30, 30, 21, 24,
    21, 20, 21, 15, 13, 10, 33,
  ],
  Ezra: [0, 11, 70, 13, 24, 17, 22, 28, 36, 15, 44, 23, 28],
  Nehemiah: [0, 11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31, 30, 43, 33, 30, 27],
  Esther: [0, 22, 23, 15, 17, 14, 14, 10, 17, 32, 3],
  Job: [
    0, 22, 13, 26, 21, 27, 30, 21, 22, 35, 28, 20, 25, 28, 22, 25, 22, 22, 30, 29, 29, 23, 24, 20,
    25, 30, 23, 21, 31, 40, 42,
  ],
  Psalms: [
    0, 6, 12, 8, 10, 12, 10, 7, 9, 20, 18, 7, 10, 18, 7, 12, 5, 11, 16, 13, 10, 13, 11, 11, 10, 10,
    11, 11, 11, 9, 10, 10, 10, 11, 11, 10, 10, 11, 7, 12, 14, 11, 8, 15, 9, 14, 6, 10, 8, 8, 9, 15,
    10, 6, 9, 7, 6, 7, 6, 7, 11, 7, 10, 7, 7, 11, 7, 6, 5, 11, 13, 11, 12, 8, 8, 14, 9, 15, 11, 9,
    6, 11, 6, 7, 6, 9, 12, 13, 9, 9, 10, 6, 9, 11, 15, 14, 7, 12, 14, 7, 9, 9, 9, 9, 10, 9, 10, 9,
    9, 6, 10, 6, 12, 8, 14, 13, 9, 14, 14, 13, 13, 8, 13, 7, 14, 6, 8, 14, 6, 5, 6, 6, 6, 7, 12, 8,
    11, 7,
  ],
  Proverbs: [
    0, 33, 22, 35, 27, 23, 35, 30, 36, 18, 32, 31, 28, 25, 20, 33, 33, 29, 28, 25, 25, 31, 31, 29,
    34, 29, 31, 31, 23, 30,
  ],
  Ecclesiastes: [0, 18, 26, 22, 16, 20, 12, 29, 17, 18, 14, 10, 14],
  'Song of Solomon': [0, 17, 17, 11, 16, 16, 13, 13, 14, 10, 14, 13, 14, 12],
  Isaiah: [
    0, 31, 22, 26, 6, 30, 13, 28, 22, 16, 34, 14, 6, 11, 32, 22, 28, 30, 33, 25, 14, 17, 19, 24, 23,
    12, 28, 13, 16, 12, 16, 21, 24, 17, 12, 19, 10, 22, 21, 15, 17, 24, 17, 19, 24, 8, 24, 28, 18,
    12, 16, 22, 12, 14, 16, 23, 23, 14, 15, 14, 16, 24, 21, 16, 22, 20, 24, 12, 19, 23, 18, 18, 21,
    14, 19, 14, 9, 14, 22, 23, 10, 13, 22, 22, 11, 15, 10, 14, 19, 18,
  ],
  Jeremiah: [
    0, 19, 37, 25, 31, 31, 30, 34, 27, 26, 25, 23, 23, 24, 22, 21, 21, 27, 18, 14, 18, 14, 30, 40,
    30, 24, 28, 13, 16, 25, 11,
  ],
  Lamentations: [0, 22, 22, 66, 22, 22],
  Ezekiel: [
    0, 28, 10, 27, 17, 17, 14, 27, 17, 11, 22, 25, 28, 23, 13, 25, 42, 26, 15, 16, 22, 44, 23, 12,
    14, 26, 22, 21, 20, 21, 26, 32, 17, 24, 16, 23, 14, 22, 20, 25, 26, 26, 22, 13, 23, 24, 22, 16,
    22, 21, 21,
  ],
  Daniel: [0, 21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13],
  Hosea: [0, 11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9],
  Joel: [0, 20, 32, 21],
  Amos: [0, 15, 16, 15, 13, 27, 14, 17, 14, 15, 13],
  Obadiah: [0, 21],
  Jonah: [0, 17, 10, 10, 11],
  Micah: [0, 16, 13, 12, 13, 15, 16, 20],
  Nahum: [0, 15, 13, 19],
  Habakkuk: [0, 17, 20, 19],
  Zephaniah: [0, 18, 15, 20],
  Haggai: [0, 15, 23],
  Zechariah: [0, 21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9],
  Malachi: [0, 14, 17, 18, 6],
  Matthew: [
    0, 25, 28, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 55, 30, 39, 28, 27, 35, 30, 34, 46, 46, 39,
    51, 46, 75, 66,
  ],
  Mark: [0, 45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 39, 44, 16],
  Luke: [
    0, 80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 34, 35, 52, 37, 31, 43, 48, 42, 56, 71, 56,
    53, 53, 49, 71, 44, 56,
  ],
  John: [
    0, 51, 25, 36, 54, 47, 71, 53, 59, 42, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25, 25, 71,
  ],
  Acts: [
    0, 26, 47, 22, 37, 42, 47, 60, 40, 43, 48, 26, 25, 52, 28, 41, 40, 36, 22, 41, 38, 40, 39, 40,
    30,
  ],
  Romans: [0, 32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27],
  '1 Corinthians': [0, 31, 16, 23, 21, 33, 20, 40, 13, 27, 33, 34, 31, 34, 39, 58, 24],
  '2 Corinthians': [0, 24, 17, 18, 18, 21, 18, 24, 15, 16, 33, 33, 23, 14],
  Galatians: [0, 24, 21, 29, 31, 26, 18],
  Ephesians: [0, 23, 22, 21, 32, 33, 24],
  Philippians: [0, 30, 30, 21, 23],
  Colossians: [0, 29, 23, 25, 18],
  '1 Thessalonians': [0, 10, 20, 13, 18, 28],
  '2 Thessalonians': [0, 12, 17, 18],
  '1 Timothy': [0, 20, 15, 16, 16, 25, 21],
  '2 Timothy': [0, 18, 26, 17, 22],
  Titus: [0, 16, 15, 15],
  Philemon: [0, 25],
  Hebrews: [0, 14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25],
  James: [0, 27, 26, 18, 17, 20],
  '1 Peter': [0, 25, 25, 22, 19, 14],
  '2 Peter': [0, 21, 22, 18],
  '1 John': [0, 10, 29, 24, 21, 21],
  '2 John': [0, 13],
  '3 John': [0, 15],
  Jude: [0, 25],
  Revelation: [
    0, 20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 18, 18, 20, 23, 21, 18, 24, 21, 15, 27, 17, 18,
    20,
  ],
}
