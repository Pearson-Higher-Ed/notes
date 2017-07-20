import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { InternationalSupport } from '@pearson-incubator/aquila-js-core';
import './main.scss';
import ComponentOwner from './src/js/component-owner';
import msgObject from './translations';

export default class NoteListDemo {
  constructor(config) {
    this.init(config);
  }

  init(config) {
    this.intlObj = new InternationalSupport(msgObject, config.locale);

    ReactDOM.render(
      <IntlProvider locale={this.intlObj.getLocale()} messages={this.intlObj.getMessages()}>
        <ComponentOwner
          notes={config.notes}
          clickNoteHandler={config.clickNoteHandler}
          drawerCallbacks={config.drawerCallbacks}
          removeNoteHandler={config.removeNoteHandler}
        />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

export NoteListComponent from './src/js/NoteListComponent';

// Listen for client events to initialize a new Notes component
document.body.addEventListener('o.InitNotes', e => new NoteListDemo(e.detail));
