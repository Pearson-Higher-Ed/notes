import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';


export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);

    this.state = {
      modalOpen: false
    };
  }

  handleModalOpen = () =>  {
    this.setState({modalOpen: true});
  };

  handleModalClose = () =>  {
    this.setState({modalOpen: false});
  };

  handleNoteClick(pageId, e) {
    this.props.noteClick(pageId);
    const listDom = Array.from(document.getElementsByClassName('note-row'));
    listDom.map((node) => node.className = 'note-row');
    e.target.parentNode.classList.add('focused');
  }

  handleDeleteClick(noteId) {
    this.props.removeNote(noteId);
    this.handleModalClose();
  }

  renderIcon(commentExists) {
    if (commentExists) {
      return(
        <i className={this.props.color.toLowerCase() + '-icon color-icon'}>
                <span className="reader-only">{this.props.color} Highlight</span>
        </i>
      )
    }
    else {
      return (
        <span className={this.props.color + ' color-dot'}>
            <span className="reader-only">
                {this.props.color} Highlight
            </span>
        </span>
      )
    }
  }
  onFocus(e) {
    e.target.parentNode.classList.add('focused');
    return true;
  }
  onBlur(e) {
    e.target.parentNode.className = 'note-row';
    return true;
  }

  formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }

  dialogKeySelect = (event) => {
    if ((event.which === 9 || event.keyCode === 9) && !event.shiftKey) {
      document.getElementsByClassName('handleCloseIcon')[0].focus();
      event.preventDefault();
    }
  }

  cancelIconKeySelect = (event) => {
    if ((event.which || event.keyCode) === 13) {
      this.handleModalClose();
    }
    if ((event.which === 9 || event.keyCode === 9) && event.shiftKey) {
      document.getElementsByClassName('deleteBtn')[0].focus();
      event.preventDefault();
    }
  }

  render() {
    const that = this;
    // const {formatDate} = this.props.translations;
    const commentExists = (this.props.comment) ? true : false;
    const formatDateFrom_ms = new Date(Number(this.props.time));
    const formattedAMPM = this.formatAMPM(formatDateFrom_ms);
    const dateWithTime = `${formatDateFrom_ms.getMonth() + 1}/${formatDateFrom_ms.getDate()}/${formatDateFrom_ms.getFullYear()} ${formattedAMPM}`;

    // const date = formatDateFrom_ms.toLocaleDateString();
    // const time = formatDateFrom_ms.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');

    const DialogStyle = {
      dialogContainerstyl : {
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
      cancelbtnstyl : {
        color: '#74797b'
      },
      deleteBtnstyl : {
        borderRadius: 2,
        backgroundColor: '#34b6b4'
      }
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        style={DialogStyle.cancelbtnstyl}
        className="cancelBtn"
        onClick={this.handleModalClose} />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDeleteClick.bind(this, this.props.id)}
        onKeyDown={this.dialogKeySelect}
        style={DialogStyle.deleteBtnstyl}
        className="deleteBtn" />
    ];
    const CancelIcon = (props) => (
      <SvgIcon {...props}>
        <path d="M712.993036,23.3253012 L720.736289,15.2808193 C721.026024,14.9878313 721.026024,14.5128916 720.735855,14.2199036 C720.445687,13.9266988 719.975518,13.9266988 719.685349,14.2199036 L711.976795,22.005012 L704.268458,14.2199036 C703.978072,13.9266988 703.50812,13.9266988 703.217735,14.2199036 C702.927566,14.5128916 702.927566,14.9878313 703.217518,15.2808193 L710.960554,23.3253012 L703.217735,31.3697831 C702.927566,31.6627711 702.927566,32.1377108 703.217735,32.4306988 C703.507687,32.7234699 703.978072,32.7239036 704.268458,32.4306988 L711.976795,24.6455904 L719.685349,32.4306988 C719.975518,32.7239036 720.44612,32.7234699 720.735855,32.4306988 C721.026024,32.1377108 721.026024,31.6627711 720.735855,31.3697831 L712.993036,23.3253012 Z" id="ic_cancel" fill="#8d8d8d"></path>
      </SvgIcon>
    );

    return (
      <div className="note-row">
          <a href="javascript:void(0);"
             className="note-link"
             onFocus= {that.onFocus.bind(that)}
             tabIndex="0"
             onClick={this.handleNoteClick.bind(that, this.props.pageId)}>
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
                    <time value={this.props.time} >{dateWithTime}</time>
                  </span>
              </div>
          </a>
          <a href="javascript:void(0);"
             className="remove"
             tabIndex="0"
             onBlur={that.onBlur.bind(that)}
             onClick={this.handleModalOpen}
             aria-label="Remove highlight">
          </a>
          <Dialog
            title="Confirm Delete?"
            actions={actions}
            modal={false}
            open={this.state.modalOpen}
            onRequestClose={this.handleModalClose}
            contentStyle={DialogStyle.dialogContainerstyl}>
              <CancelIcon tabIndex="0" onClick={this.handleModalClose} viewBox="703 14 18 18.7" style={DialogStyle.cancelIcon} className="handleCloseIcon" onKeyDown={this.cancelIconKeySelect}/>
              This action cannot be undone.
          </Dialog>
      </div>
    )
  }
}
