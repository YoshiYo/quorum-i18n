const fs = require('fs-extra') // beter file creation
const deepExtend = require('deep-extend') // merge various JSONs
const cloneDeep = require('lodash/cloneDeep')

const platformLocales = [
  {
    path: 'web',
    variants: [
      ['en'],
      ['en', 'ong'],
      ['en', 'ong', 'vert'],

      ['en_GB'],
      ['en_GB', 'ong'],
      ['en_GB', 'ong', 'vert'],

      ['fr'],
      ['fr', 'mediation'],
      ['fr', 'mediation', 'promevil'],
      ['fr', 'politique'],
      ['fr', 'politique', 'larem'],
    ],
  },
  {
    path: 'mobile',
    variants: [['en'], ['ar'], ['fr'], ['sk']],
  },
]

;(async () => {
  for (const platformLocale of platformLocales) {
    const jsonFileName = (languageFallbackList) =>
      `./merged-locales/${platformLocale.path}/${languageFallbackList
        .map((lang) => lang.match(/\w+/gi)[0])
        .join('-')}.json`

    const importFile = async (localeVariant) => {
      try {
        return await require(`./initial-locales/${platformLocale.path}/${localeVariant}.json`)
      } catch (err) {
        console.log(err)
      }
    }

    ;(async () => {
      for (const arrayOfLocales of platformLocale.variants) {
        const importedLanguageLocaleToMerge = []
        for (const locale of arrayOfLocales) {
          const module = await importFile(locale)
          importedLanguageLocaleToMerge.push(module)
        }
        const mergedJson = deepExtend(...cloneDeep(importedLanguageLocaleToMerge))
        fs.outputJsonSync(jsonFileName(arrayOfLocales), mergedJson)
      }
    })()
  }
})()
