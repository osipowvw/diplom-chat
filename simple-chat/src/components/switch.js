export function switchUser(currentUser, currentChatName, isSwitched) {
    if (!isSwitched) {
        currentUser = currentChatName;
    } else {
        currentUser = 'Максим';
    }
    isSwitched = !isSwitched;
    return { currentUser, isSwitched };
}
