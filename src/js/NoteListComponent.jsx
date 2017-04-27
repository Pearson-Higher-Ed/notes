import React from 'react';
import { IntlProvider } from 'react-intl';
import { InternationalSupport } from '@pearson-incubator/aquila-js-core';
import NoteList from './NoteList';
import msgObject from '../../translations';

export const NoteListComponent = function NoteListComponent(paramsObj) { // eslint-disable-line import/prefer-default-export
  const intlObj = new InternationalSupport(msgObject, paramsObj.locale);
  return (<IntlProvider locale={intlObj.getLocale()} messages={intlObj.getMessages()}>
        <NoteList
          notes={paramsObj.notes}
          clickNoteHandler={paramsObj.clickNoteHandler}
          removeNoteHandler={paramsObj.removeNoteHandler}
          drawerCallbacks={paramsObj.drawerCallbacks} />
      </IntlProvider>)
};

