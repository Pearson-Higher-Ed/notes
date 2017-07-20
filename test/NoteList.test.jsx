/**
PEARSON PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
 *  Copyright © 2017 Pearson Education, Inc.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Pearson Education, Inc.  The intellectual and technical concepts contained
 * herein are proprietary to Pearson Education, Inc. and may be covered by U.S. and Foreign Patents,
 * patent applications, and are protected by trade secret or copyright law.
 * Dissemination of this information, reproduction of this material, and copying or distribution of this software
 * is strictly forbidden unless prior written permission is obtained
 * from Pearson Education, Inc.
**/

/* eslint-disable */

import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { InternationalSupport } from '@pearson-incubator/aquila-js-core';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NoteList from '../src/js/NoteList';
import msgObject from '../translations';

const intlObj = new InternationalSupport(msgObject, 'en');

const clickNoteHandler = () => {
   console.log('clickBookmarkHandler');
 };

 const length = 5;

	it('renders correctly', () => {
	  const tree = renderer
	    .create(<MuiThemeProvider><IntlProvider locale={intlObj.getLocale()} messages={intlObj.getMessages()}><NoteList
	    	notes={[{test:'test'},{test:'test'},{test:'test'}]}
        clickNoteHandler={function(){}}
        removeNoteHandler={function(){}}
       ></NoteList></IntlProvider></MuiThemeProvider>)
	    .toJSON();
	  expect(tree).toMatchSnapshot();
	});

	it('renders the Note List', () => {
  	const component = renderer
	    .create(<MuiThemeProvider><IntlProvider locale={intlObj.getLocale()} messages={intlObj.getMessages()}><NoteList
	    	notes={[{test:'test'},{test:'test'},{test:'test'}]}
        clickNoteHandler={clickNoteHandler}
        removeNoteHandler={function(){}}
        length={length}
       ></NoteList></IntlProvider></MuiThemeProvider>);
	    let tree = component.toJSON();
	    console.log(tree);
	    tree.children[0].children[0].children[0].props.onFocus({preventDefault(){}, target:{parentNode:{classList:{add(){}}}}});
	    tree.children[0].children[0].children[1].props.onClick({preventDefault(){}, target:{parentNode:{classList:{add(){}}}}});
	    //tree.children[0].children[0].children[2].props.onKeyUp({preventDefault(){}, which:37, keyCode:37, target:{parentNode:{classList:{remove(){}}}}});
	    // console.log(tree.children[0].children[1].children[0])
	    // console.log(tree.children[0].children[2].children[0])
  		expect(tree).toMatchSnapshot();


 // tree.children[0].props.onFocus();
  //tree.children[0].props.onClick();
  // tree.children[0].props.onKeyUp();
  // tree.children[1].props.onClick();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});




