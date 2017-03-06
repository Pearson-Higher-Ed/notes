import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import './main.scss';
import ComponentOwner from './src/js/component-owner';
import InternationalSupport from './src/js/InternationalSupport';

export default class NoteListDemo {    
  constructor(config) {
    this.init(config);
  }
  
  init(config) {
    this.intlObj = new InternationalSupport(config.locale);
    
    ReactDOM.render(
      <IntlProvider locale={this.intlObj.getLocale()} messages={this.intlObj.getMessages()}>
        <ComponentOwner notes={config.notes} clickNoteHandler={config.clickNoteHandler}/>
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

export NoteListComponent from './src/js/NoteListComponent';

// Listen for client events to initialize a new Notes component
document.body.addEventListener('o.InitNotes', e => new NoteListDemo(e.detail));
