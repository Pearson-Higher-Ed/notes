import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { darkBlack, fullBlack } from 'material-ui/styles/colors';

import { NoteListComponent } from './NoteListComponent';

const muiTheme = getMuiTheme({
  palette: {
    textColor: darkBlack,
    shadowColor: fullBlack
  }
});

class ComponentOwner extends React.Component {
  static getChildContext() {
    return {
      muiTheme
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <NoteListComponent
          notes={this.props.notes}
          drawerCallbacks={this.props.drawerCallbacks}
          clickNoteHandler={this.props.clickNoteHandler}
          removeNoteHandler={this.props.removeNoteHandler}
          locale={this.props.intl.locale}
        />
      </MuiThemeProvider>
    );
  }
}

ComponentOwner.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

ComponentOwner.propTypes = {
  intl: intlShape.isRequired,
  notes: PropTypes.array.isRequired,
  clickNoteHandler: PropTypes.func.isRequired,
  drawerCallbacks: PropTypes.object.isRequired,
  removeNoteHandler: PropTypes.func.isRequired
};

export default injectIntl(ComponentOwner); // Inject this.props.intl into the component context
