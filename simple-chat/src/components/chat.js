export function goBackToChatList(chatListScreen, chatScreen, setCurrentChatId) {
    chatScreen.style.display = 'none';
    chatListScreen.style.display = 'block';
    setCurrentChatId(null);
}
