let totalMessages, messagesLimit, excludedChatters;

window.addEventListener('onEventReceived', function (obj) {
  // If obj.detail.event is empty, do nothing  
  if (!obj.detail.event) { return; }
  
  // If listener is not a message, do nothing
  const listener = obj.detail.listener.split("-")[0];
  if (listener !== 'message') { return; }
  
  // Get event and add it to the html
  const event = obj.detail.event;
  
  // If chatter is excluded, get rekt nerd, else, add message
  if (excludedChatters.includes(event.data.channel)) { return; }
  addMessage(event.data.nick, event.data.text, event.data.badges);
});

// On Widget Load
window.addEventListener('onWidgetLoad', function (obj) {
  // Load data from GUI fields
  const fieldData = obj.detail.fieldData;
  totalMessages = 0;
  messagesLimit = fieldData.messagesLimit;
  excludedChatters = fieldData.excludedChatters;
});

function addMessage(username, text, badges) {
  totalMessages += 1;
  if (badges === "undefined") { console.log('badges is undefined'); return; }
  let badgesMessage = ``;
  for (let i = 0; i < badges.length; i++) {
	badgesMessage += `<img src='${badges[i].url}'> </img>`;
  }
  let message;
  message = `
  <div class="message-container" id="message-${totalMessages}">
    <div class="username-container">
		<div class="username-text">${username}</div>
		<div class="badge-container">${badgesMessage}</div>
	</div>
    <div class="text-container">${text}</div>
  </div>`;
  $('.main-container').append(message);
  if (totalMessages > messagesLimit) { removeMessage(totalMessages - messagesLimit); }
}

function removeMessage(messageId) {
  $(`#message-${messageId}`).remove();
}
