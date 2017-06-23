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

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import { AnalyticsManager } from '@pearson-incubator/aquila-js-core';
import { messages } from './defaultMessages';


export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);

    this.state = {
      modalOpen: false
    };
  }

  handleModalOpen = (e) => {
    this.setState({ modalOpen: true });
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  };

  handleModalClose = (e) => {
    this.setState({ modalOpen: false });
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  };

  handleNoteClick(pageId, e) {
    this.props.noteClick(pageId);
    const listDom = Array.from(document.getElementsByClassName('note-row'));
    listDom.map(node => node.setAttribute('class', 'note-row'));
    e.target.parentNode.classList.add('focused');
    AnalyticsManager.dispatch({
      category: 'Notes',
      action: 'Click',
      label: JSON.stringify({ PageId: pageId })
    });
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  }
  static arrowKeyPress(e) {
    if (
      e.which === 37 ||
      e.keyCode === 37 ||
      e.which === 38 ||
      e.keyCode === 38 ||
      e.which === 39 ||
      e.keyCode === 39 ||
      e.which === 40 ||
      e.keyCode === 40
    ) {
      // down Arrow key
      e.preventDefault();
      e.target.parentNode.classList.remove('focused');
    }
  }

  handleDeleteClick(noteId) {
    this.props.removeNote(noteId);
    this.handleModalClose();
    AnalyticsManager.dispatch({
      category: 'Notes',
      action: 'Remove',
      label: JSON.stringify({ NoteId: noteId })
    });
  }

  renderIcon(commentExists) {
    if (commentExists) {
      return (
        <i className={`${this.props.color.toLowerCase()}-icon color-icon`}>
          <span className="reader-only">{this.props.color} Highlight</span>
        </i>
      );
    }

    return (
      <span className={`${this.props.color} color-dot`}>
        <span className="reader-only">
          {this.props.color} Highlight
        </span>
      </span>
    );
  }
  static onFocus(e) {
    e.target.parentNode.classList.add('focused');
    return true;
  }
  
  dialogKeySelect = (event) => {
    if ((event.which === 9 || event.keyCode === 9) && !event.shiftKey) {
      document.getElementsByClassName('handleCloseIcon')[0].focus();
      event.preventDefault();
    }
  };

  cancelIconKeySelect = (event) => {
    if ((event.which || event.keyCode) === 13) {
      this.handleModalClose();
    }
    if ((event.which === 9 || event.keyCode === 9) && event.shiftKey) {
      document.getElementsByClassName('deleteBtn')[0].focus();
      event.preventDefault();
    }
  };

  render() {
    const that = this;
    const { formatMessage, formatDate, formatTime } = that.props.intl;
    const commentExists = !!(this.props.comment);

    const DialogStyle = {
      dialogContainerstyl: {
        width: '362px',
        backgroundColor: '#fff',
        borderRadius: '4px'
      },
      cancelIcon: {
        color: '#8d8d8d',
        position: 'absolute',
        top: '19px',
        right: '19px',
        height: '18.7px',
        width: '18px',
        cursor: 'pointer'
      },
      cancelbtnstyl: {
        color: '#74797b'
      },
      deleteBtnstyl: {
        borderRadius: 2,
        backgroundColor: '#34b6b4'
      }
    };
    const actions = [
      <FlatButton
        label={formatMessage(messages.cancel)}
        primary
        style={DialogStyle.cancelbtnstyl}
        className="cancelBtn"
        onClick={this.handleModalClose}
      />,
      <FlatButton
        label={formatMessage(messages.delete)}
        primary
        autoFocus
        onClick={e => this.handleDeleteClick(this.props.id, e)}
        onKeyDown={this.dialogKeySelect}
        style={DialogStyle.deleteBtnstyl}
        className="deleteBtn"
      />
    ];
    const CancelIcon = props => (
      <SvgIcon {...props}>
        <path
          d="M712.993036,23.3253012 L720.736289,15.2808193 C721.026024,14.9878313 721.026024,14.5128916 720.735855,
          14.2199036 C720.445687,13.9266988 719.975518,13.9266988 719.685349,14.2199036 L711.976795,
          22.005012 L704.268458,14.2199036 C703.978072,13.9266988 703.50812,13.9266988 703.217735,
          14.2199036 C702.927566,14.5128916 702.927566,14.9878313 703.217518,15.2808193 L710.960554,
          23.3253012 L703.217735,31.3697831 C702.927566,31.6627711 702.927566,32.1377108 703.217735,
          32.4306988 C703.507687,32.7234699 703.978072,32.7239036 704.268458,32.4306988 L711.976795,
          24.6455904 L719.685349,32.4306988 C719.975518,32.7239036 720.44612,32.7234699 720.735855,
          32.4306988 C721.026024,32.1377108 721.026024,31.6627711 720.735855,31.3697831 L712.993036,23.3253012 Z"
          id="ic_cancel"
          fill="#8d8d8d"
        />
      </SvgIcon>
    );

    return (
      <div className="note-row">
        <a
          className="note-link"
          onFocus={Note.onFocus}
          tabIndex="0"
          role="link"
          onClick={e => this.handleNoteClick(this.props.pageId, this.props.id, e)}
          onKeyUp={e => this.arrowKeyPress(e)}
        >
          {this.renderIcon(commentExists)}
          <div className="note-content">
            <div>
              <p className="dotdotdot">
                <strong>{this.props.text}</strong>
              </p>
            </div>
            <div className={commentExists ? '' : 'hide'}>
              <p className="user-note">
                {this.props.comment}
              </p>
            </div>
            <span className="note-date">
              <time value={this.props.time}>{formatDate(new Date(Number(this.props.time)), {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              })}</time>
              {' '}
              <time value={this.props.time}>{formatTime(new Date(Number(this.props.time)), {
                timeZone: that.props.locale,
                hour12: true,
                hour: 'numeric',
                minute: 'numeric'
              })}</time>
            </span>
          </div>
        </a>
        <a
          className="remove"
          tabIndex="0"
          role="link"
          onClick={this.handleModalOpen}
          aria-label={formatMessage(messages.removeNoteText)}
        >{''}</a>
        <Dialog
          title={formatMessage(messages.confirmDelete)}
          actions={actions}
          modal={false}
          open={this.state.modalOpen}
          onRequestClose={this.handleModalClose}
          contentStyle={DialogStyle.dialogContainerstyl}
        >
          <CancelIcon
            tabIndex="0"
            onClick={this.handleModalClose}
            viewBox="703 14 18 18.7"
            style={DialogStyle.cancelIcon}
            aria-label={formatMessage(messages.close)}
            className="handleCloseIcon"
            onKeyDown={this.cancelIconKeySelect}
          />
          {formatMessage(messages.actionCannotBeUnDone)}
        </Dialog>
      </div>
    );
  }
}
Note.propTypes = {
  drawerCallbacks: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  noteClick: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};
