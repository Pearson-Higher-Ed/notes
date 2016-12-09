import React from 'react';
import ReactDOM from 'react-dom';

import { addLocaleData, IntlProvider } from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import nlLocaleData from 'react-intl/locale-data/nl';
import itLocaleData from 'react-intl/locale-data/it';
import frJson from './translations/fr.json';
import nlJson from './translations/nl.json';
import itJson from './translations/it.json';
import './main.scss';
import ComponentOwner from './src/js/component-owner';
// import NoteList from './src/js/NoteList';

const translations = {
  'fr' : frJson,
  'nl' : nlJson,
  'it' : itJson
};

export default class NoteListComponent {    
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
        <ComponentOwner notes={config.notes} clickNoteHandler={config.clickNoteHandler}/>
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

export NotesList from './src/js/NoteList';

// Listen for client events to initialize a new Notes component
document.body.addEventListener('o.InitNotes', e => new NoteListComponent(e.detail));
