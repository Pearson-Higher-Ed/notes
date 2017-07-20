import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { InternationalSupport } from '@pearson-incubator/aquila-js-core';
import ComponentOwner from '../src/js/component-owner';
import msgObject from '../translations';

const intlObj = new InternationalSupport(msgObject, 'en');

/* eslint-disable */

it('renders the component correctly', () => {
 const tree = renderer
   .create(<MuiThemeProvider><IntlProvider 
     locale={intlObj.getLocale()} 
     messages={intlObj.getMessages()}>
     <ComponentOwner clickNoteHandler={function(){}}
          removeNoteHandler={function(){}} ></ComponentOwner>
     </IntlProvider></MuiThemeProvider>)
   .toJSON();
 expect(tree).toMatchSnapshot();
});