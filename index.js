var faker = require('faker'),
    casual = require('casual'),
    _ = require('lodash');

var nbrAuthor = 10, nbrMessage = 30, nbrConversation = 10;

module.exports = function() {
  var authors = _.times(nbrAuthor, createAuthor);
  var messages = _.times(nbrMessage, createMessage);
  var conversations = _.times(nbrConversation, _.partialRight(createConversation, messages));

  var data = {
    authors: authors,
    messages: messages,
    conversations: conversations,
  };

  return data;
};

var AUTHOR_AVATAR_NAME = _.words('cassie elyse eve kristy lena lindsay mark matthew molly patrick rachel');
var AUTHOR_AVATAR_URL = '/images/avatar2/large/'; // Dont forget the ending is png
function createAuthor(id) {
  return {
    id: id+1,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    picture: AUTHOR_AVATAR_URL + AUTHOR_AVATAR_NAME[_.random(0, AUTHOR_AVATAR_NAME.length - 1)] + '.png',
  };
}

function createMessage(id) {
  return {
    id: id+1,
    created_at: casual.moment.format('YYYY-MM-DD HH:MM:SS.SSS'),
    message: casual.sentences(_.random(1, 3)),
    conversation: _.random(1, nbrConversation),
    author: _.random(1, nbrAuthor),
  };
}

function createConversation(id, messages) {
  var messageIds = _.pluck(_.select(messages, function(message) { return message.conversation === id+1; }), 'id');
  return {
    id: id+1,
    subject: _.random(1, nbrAuthor),
    updated_at: casual.moment.format('YYYY-MM-DD HH:MM:SS.SSS'),
    messages: messageIds,
  };
}
