import { getJSONLanguageForApplications, getAllAvailableLocales } from '../dist/index'

describe('Global testing for Web Application & Mobile', () => {
  it('Should return `fr` path if `fr` path provided', async () => {
    const result = await getJSONLanguageForApplications('fr', 'aeaeaeeaeaa', 'web')
    expect(result.path).toEqual('fr')
  })

  it('Should return `en` path if a random string is provided/nothing found', async () => {
    const result = await getJSONLanguageForApplications('zaeaeaeibvnsjome', 'EqzeqdsRez', 'mobile')
    expect(result.path).toEqual('en')
  })

  it('Should fallback to `locale` first, rather than the `localeSpecific`', async () => {
    const result = await getJSONLanguageForApplications('fr', 'ong-vert', 'web')
    expect(result.path).toEqual('fr')
    expect(result.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('fr')
  })

  it("Should return a properly formatted locale if it's more specific (eg: en-GB)", async () => {
    const result = await getJSONLanguageForApplications('en---____----__-___-__GB', null, 'web')
    expect(result.path).toEqual('en_GB')
    expect(result.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en_GB')
  })

  it('Mobile i18n is working properly', async () => {
    const sk = await getJSONLanguageForApplications('sk', null, 'mobile')
    expect(sk.path).toEqual('sk')
    expect(sk.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('sk')
  })

  it('Should return en path and en content if language is xx (like undefined)', async () => {
    const sk = getJSONLanguageForApplications('xx', null, 'web')
    expect(sk.path).toEqual('en')
    expect(sk.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en')
  })

  it('Should return en path and en content if language is en_RO', async () => {
    const ro = getJSONLanguageForApplications('en-RO', null, 'mobile')
    expect(ro.path).toEqual('en')
    expect(ro.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en')
  })

  it('Should return en path and en content if language is empty', async () => {
    const ro = getJSONLanguageForApplications('', null, 'mobile')
    expect(ro.path).toEqual('en')
    expect(ro.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en')
  })

  it('Should return en path and en content if language is null', async () => {
    const ro = getJSONLanguageForApplications(null, null, 'mobile')
    expect(ro.path).toEqual('en')
    expect(ro.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en')
  })

  it('Should return ro path and ro content if language is ro', async () => {
    const ro = getJSONLanguageForApplications('ro', null, 'mobile')
    expect(ro.path).toEqual('ro')
    expect(ro.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('ro')
  })

  /**
   * This test will cover the fact that we have an empty new json
   * for the mobile or the web and we don't want an empty file.
   * All the missing languages or partial jsons will be fallback by the english
   */
  it('Should return example path populated with english', async () => {
    const ex = getJSONLanguageForApplications('ex', null, 'mobile')
    expect(ex.path).toEqual('en')
    expect(ex.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en')
    expect(ex.content.navigator.goBack).toEqual('Back')
  })

  /**
   * This test will show if the languages availables are provided for the mobile
   */
  it('Mobile : Should return a list of availables languages', async () => {
    const allLanguages = getAllAvailableLocales('mobile')
    const foundFrenchOrEnglish = allLanguages.find(
      (aLanguage) => aLanguage.key === 'fr' || aLanguage.key === 'en',
    )
    expect(foundFrenchOrEnglish.key.length).toEqual(2)
  })

  /**
   * This test will show if the languages availables are provided for the web
   */
  it('Web : Should return a list of availables languages', async () => {
    const allLanguages = getAllAvailableLocales('web')
    const foundFrenchOrEnglish = allLanguages.find(
      (aLanguage) => aLanguage.key === 'fr' || aLanguage.key === 'en',
    )
    expect(foundFrenchOrEnglish.key.length).toEqual(2)
  })

  /**
   * This test will show if the languages availables are provided for the mobile
   */
  it('Mobile : Should return a list of availables languages with pack', async () => {
    const allLanguages = getAllAvailableLocales('mobile', 'elu')
    const foundFrenchOrEnglish = allLanguages.find((aLanguage) => aLanguage.key === 'fr-elu')
    expect(foundFrenchOrEnglish.key).toEqual('fr-elu')
  })

  /**
   * This test will show if the languages availables are provided for the mobile
   */
  it('Mobile : Should return a list of availables languages with pack mediation', async () => {
    const allLanguages = getAllAvailableLocales('mobile', 'mediation-promevil')
    const foundFrenchOrEnglish = allLanguages.find((aLanguage) => aLanguage.key === 'fr-mediation-promevil')
    expect(foundFrenchOrEnglish.key).toEqual('fr-mediation-promevil')
  })

  /**
   * This test will show if the languages availables are provided for the mobile
   */
  it('Web : Should return a list of availables languages with pack mediation', async () => {
    const allLanguages = getAllAvailableLocales('web', 'mediation-promevil')
    const foundFrenchOrEnglish = allLanguages.find((aLanguage) => aLanguage.key === 'fr-mediation-promevil')
    expect(foundFrenchOrEnglish.key).toEqual('fr-mediation-promevil')
  })
})
