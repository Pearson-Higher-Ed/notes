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

import NotesList from './src/js/NotesList';

const translations = {
  'fr' : frJson,
  'nl' : nlJson,
  'it' : itJson
};

export default class NotesListComponent {    
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
        <NotesList store={config.store} actions={config.actions} notes={config.notes} />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

export NotesList from './src/js/NotesList';

// Listen for client events to initialize a new Notes component
document.body.addEventListener('o.InitNotes', e => new NotesListComponent(e.detail));
