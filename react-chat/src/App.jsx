import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ChatListScreen } from './components/ChatListScreen/ChatListScreen.jsx';
import { ChatScreen } from './components/ChatScreen/ChatScreen.jsx';
import { ProfileScreen } from './components/ProfileScreen/ProfileScreen.jsx';
import './App.scss';
import { formatTime } from './utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

export function App() {
    const navigate = useNavigate();

    const [chats, setChats] = useState(JSON.parse(localStorage.getItem('chats')) || []);
    const [messageContainers, setMessageContainers] = useState(JSON.parse(localStorage.getItem('messageContainers')) || {});
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')) || {
        name: 'Максим',
        nickname: '@maxim',
        bio: '',
        avatar: '',
    });

    useEffect(() => {
        localStorage.setItem('chats', JSON.stringify(chats));
    }, [chats]);

    useEffect(() => {
        localStorage.setItem('messageContainers', JSON.stringify(messageContainers));
    }, [messageContainers]);

    useEffect(() => {
        localStorage.setItem('profile', JSON.stringify(profile));
    }, [profile]);

    const handleCreateChat = (chatName) => {
        const newChat = {
            id: `chat-${Date.now()}`,
            name: chatName,
            lastMessage: '',
            time: '',
            readStatus: true,
        };
        setChats([newChat, ...chats]);
        setMessageContainers({ ...messageContainers, [newChat.id]: [] });
    };

    const updateChatInfo = (chatId, lastMessage, time) => {
        setChats((prevChats) => {
            const updatedChats = prevChats.map((chat) =>
                chat.id === chatId ? { ...chat, lastMessage, time: formatTime(time) } : chat
            );

            const chatToMove = updatedChats.find(chat => chat.id === chatId);
            const otherChats = updatedChats.filter(chat => chat.id !== chatId);
            return [chatToMove, ...otherChats];
        });
    };

    const handleSendMessage = (chatId, messageText, sender) => {
        const now = new Date();
        const newMessage = {
            id: uuidv4(),
            sender: sender,
            text: messageText,
            timestamp: now.toISOString(),
            readStatus: false,
        };
        setMessageContainers((prev) => ({
            ...prev,
            [chatId]: [...(prev[chatId] || []), newMessage],
        }));
        updateChatInfo(chatId, messageText, now);
    };

    const handleUpdateProfile = (updatedProfile) => {
        const previousName = profile.name;
        const newName = updatedProfile.name;

        const updatedMessageContainers = { ...messageContainers };
        let hasUpdates = false;

        Object.keys(updatedMessageContainers).forEach(chatId => {
            updatedMessageContainers[chatId] = updatedMessageContainers[chatId].map(message => {
                if (message.sender === previousName) {
                    hasUpdates = true;
                    return { ...message, sender: newName };
                }
                return message;
            });
        });

        if (hasUpdates) {
            setMessageContainers(updatedMessageContainers);
        }

        // Обновляем профиль
        setProfile(updatedProfile);
    };

    return (
        <div className="app-container">
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <ChatListScreen
                            chats={chats}
                            onChatSelect={(chatId, chatName) => navigate(`/chat/${chatId}`)}
                            onCreateChat={handleCreateChat}
                            onOpenProfile={() => navigate('/profile')}
                        />
                    } 
                />
                <Route 
                    path="/chat/:id" 
                    element={
                        <ChatScreen
                            chats={chats}
                            messageContainers={messageContainers}
                            profile={profile}
                            onSendMessage={handleSendMessage}
                        />
                    } 
                />
                <Route 
                    path="/profile" 
                    element={
                        <ProfileScreen
                            profile={profile}
                            onUpdateProfile={handleUpdateProfile}
                        />
                    } 
                />
            </Routes>
        </div>
    );
}
