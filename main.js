import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import NoteList from './src/js/reader-notes';

import {addLocaleData, IntlProvider} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import frJson from './translations/fr.json';
import nlLocaleData from 'react-intl/locale-data/nl';
import nlJson from './translations/nl.json';
import itLocaleData from 'react-intl/locale-data/it';
import itJson from './translations/it.json';

const translations = {
  'fr' : frJson,
  'nl' : nlJson,
  'it' : itJson
};

export default class Notes {
    
  constructor(config) {
    addLocaleData(frLocaleData);
    addLocaleData(nlLocaleData);
    addLocaleData(itLocaleData);
    this.init(config);
  }
  
  init(config) {
    const locale = config.locale ? config.locale : 'en';
    
    ReactDOM.render(
      <IntlProvider locale={locale} messages={translations[locale]}>
        <NoteList notes={config.notes} />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
  
}
