import './index.css';
import { formatTime } from './components/utils.js';
import { goBackToChatList } from './components/chat.js';
import { switchUser } from './components/switch.js';

document.addEventListener('DOMContentLoaded', () => {
    const chatList = document.getElementById('chat-list');
    const messagesContainer = document.getElementById('messages-container');
    const chatListScreen = document.getElementById('chat-list-screen');
    const chatScreen = document.getElementById('chat-screen');
    const backButton = document.getElementById('back-button');
    const createChatButton = document.getElementById('create-chat-button');
    const newChatNameInput = document.getElementById('new-chat-name');
    const createChatModal = document.getElementById('create-chat-modal');
    const createChatConfirmButton = document.getElementById('create-chat-confirm-button');
    const createChatCancelButton = document.getElementById('create-chat-cancel-button');
    const searchInput = document.getElementById('search-input');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const switchUserButton = document.getElementById('switch-user-button');
    const userNameElement = document.getElementById('user-name');

    let chats = JSON.parse(localStorage.getItem('chats')) || [];
    let messageContainers = JSON.parse(localStorage.getItem('messageContainers')) || {};
    let currentChatId = null;
    let currentUser = 'Максим';
    let isSwitched = false;
    let currentChatName = '';

    function init() {
        initChatList();
        bindEventListeners();
    }

    function bindEventListeners() {
        createChatButton.addEventListener('click', () => createChatModal.style.display = 'flex');
        createChatCancelButton.addEventListener('click', () => createChatModal.style.display = 'none');
        createChatConfirmButton.addEventListener('click', handleCreateChat);
        backButton.addEventListener('click', () => goBackToChatList(chatListScreen, chatScreen, setCurrentChatId));
        searchInput.addEventListener('input', handleSearch);
        messageForm.addEventListener('submit', handleSubmitMessage);
        switchUserButton.addEventListener('click', () => {
            const result = switchUser(currentUser, currentChatName, isSwitched);
            currentUser = result.currentUser;
            isSwitched = result.isSwitched;
            renderMessages(currentChatId);
        });
    }

    function handleCreateChat() {
        const newChatName = newChatNameInput.value.trim();
        if (newChatName) {
            createNewChat(newChatName);
            createChatModal.style.display = 'none';
            newChatNameInput.value = '';
        }
    }

    function createNewChat(name) {
        const newChat = {
            id: `chat-${Date.now()}`,
            name,
            lastMessage: '',
            time: '',
            readStatus: true,
        };
        chats.push(newChat);
        localStorage.setItem('chats', JSON.stringify(chats));

        messageContainers[newChat.id] = [];
        localStorage.setItem('messageContainers', JSON.stringify(messageContainers));

        addChatToDOM(newChat);
        location.reload();
    }

    function initChatList() {
        chatList.innerHTML = '';
        chats.forEach(chat => addChatToDOM(chat));
    }

    function addChatToDOM(chat) {
        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-item');
        chatItem.innerHTML = `
            <div class="chat-info">
                <h3>${chat.name}</h3>
                <p>${chat.lastMessage || 'Нет сообщений'}</p>
            </div>
            <div class="chat-time">${chat.time}</div>
            <span class="indicator ${chat.readStatus ? 'read' : 'unread'}"></span>
        `;
        chatList.appendChild(chatItem);
        chatItem.addEventListener('click', () => openChat(chat.id, chat.name));
    }

    function openChat(chatId, chatName) {
        currentChatId = chatId;
        currentChatName = chatName;
        currentUser = 'Максим';
        userNameElement.textContent = chatName;

        chatListScreen.style.display = 'none';
        chatScreen.style.display = 'block';

        renderMessages(chatId);
    }

    function renderMessages(chatId) {
        messagesContainer.innerHTML = '';
        const messages = messageContainers[chatId] || [];
        messages.forEach(message => {
            const messageElement = createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });
        scrollToBottom();
    }

    function scrollToBottom() {
        const messages = messagesContainer.querySelectorAll('.message');
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            lastMessage.scrollIntoView();
        }
    }

    function createMessageElement({ sender, text, timestamp }) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
    
        if (sender === currentUser) {
            messageElement.classList.add('message-right');
        } else {
            messageElement.classList.add('message-left');
        }
    
        messageElement.classList.add('new-message');
    
        messageElement.innerHTML = `
            <strong>${sender}</strong><br>
            ${text}<br>
            <span class="message-time">${formatTime(timestamp)}</span>
        `;
    
        const messagesContainer = document.querySelector('.messages-container');
        const allMessages = messagesContainer.querySelectorAll('.message');
        allMessages.forEach(msg => {
            msg.classList.remove('new-message', 'show');
        });
    
        messagesContainer.appendChild(messageElement);
        setTimeout(() => {
            messageElement.classList.add('show');
            messageElement.classList.remove('new-message');
        }, 300);
    
        return messageElement;
    }
    
    function handleSubmitMessage(event) {
        event.preventDefault();
        const messageText = messageInput.value.trim();
        if (messageText && currentChatId) {
            const now = new Date();
            const timestamp = now.toISOString();
            const newMessage = {
                sender: currentUser,
                text: messageText,
                timestamp: timestamp,
            };

            messageContainers[currentChatId].push(newMessage);
            localStorage.setItem('messageContainers', JSON.stringify(messageContainers));

            renderMessages(currentChatId);
            messageInput.value = '';

            updateChatInfo(currentChatId, messageText, now);
            scrollToBottom();
        }
    }

    function updateChatInfo(chatId, lastMessage, time) {
        const chatIndex = chats.findIndex(chat => chat.id === chatId);
        if (chatIndex !== -1) {
            chats[chatIndex].lastMessage = lastMessage;
            chats[chatIndex].time = formatTime(time);
            localStorage.setItem('chats', JSON.stringify(chats));
            initChatList();
        }
    }

    function handleSearch() {
        const query = searchInput.value.toLowerCase();
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            const chatName = item.querySelector('h3').textContent.toLowerCase();
            item.style.display = chatName.includes(query) ? 'block' : 'none';
        });
    }

    function setCurrentChatId(id) {
        currentChatId = id;
    }

    init();
});
