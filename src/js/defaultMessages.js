import {defineMessages} from 'react-intl';

//
// Default messages are 'en-US'
//
export const messages = defineMessages({
  buttonText: {
    id: 'buttonText',
    description : 'this is demo button text',
    defaultMessage: 'say hello'
  },
  placeholder: {
    id: 'placeholder',
    description : 'this is a demo placeholder',
    defaultMessage: 'placeholder'
  },
  title: {
    id: 'title',
    defaultMessage: 'Highlights & Notes'
  },
  emptyMessage: {
    id: 'emptyMessage',
    defaultMessage: 'When you highlight text or add notes, they will appear here.'
  },
  showMore: {
    id: 'showMore',
    defaultMessage: 'show more'
  },
  showLess: {
    id: 'showLess',
    defaultMessage: 'show less'
  },
  highlighted: {
    id: 'highlighted',
    defaultMessage: 'Highlighted: '
  },
  yourNote: {
    id: 'yourNote',
    defaultMessage: 'Your Note: '
  }
});
