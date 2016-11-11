import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleNoteClick(pageId) {
    window.pubsub.publish('GO_TO_PAGE', pageId);
  }

  handleDeleteClick(noteId) {
    this.props.removeNote(noteId);
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

  render() {
    const that = this;
    // const {formatDate} = this.props.translations;
    const commentExists = (this.props.comment) ? true : false;

    return (
      <div className="note-row">
          <a href="javascript:void(0);"
             className="note-link"
             onFocus= {that.onFocus.bind(that)}
             tabIndex="0"
             ui-keypress="{'enter': 'noteCtrl.goToNote(note)'}"
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
                    <time value={this.props.time} >{this.props.time}</time>
                  </span>
              </div>
          </a>
          <a href="javascript:void(0);"
             className="remove"
             tabIndex="0"
             onBlur={that.onBlur.bind(that)}
             onClick={this.handleDeleteClick.bind(that, this.props.id)}
             ui-keypress="{'enter': 'noteCtrl.removeNote(note, note.annotationId); $event.stopPropagation()'}"
             aria-label="Remove highlight">

          </a>
      </div>
    )
  }
}