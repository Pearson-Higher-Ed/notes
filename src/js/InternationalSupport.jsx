// language jsons
import enJson from '../../translations/en.json';
import frJson from '../../translations/fr.json';

const translations = {
  en: enJson,
  fr: frJson
};

const localeProps = new WeakMap();

export default class InternationalSupport {
  constructor(localeStr) {
    const locale = localeStr || 'en';
    localeProps.set(this, {
      locale,
      messages: translations[locale]
    });
  }

  getLocale = () => localeProps.get(this).locale;

  getMessages = () => localeProps.get(this).messages;
}
