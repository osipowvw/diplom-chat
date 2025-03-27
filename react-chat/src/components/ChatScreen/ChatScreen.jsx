import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatScreen.module.scss';
import { Header } from '../Header/Header';
import { MessageItem } from '../MessageItem/MessageItem';
import { MessageForm } from '../MessageForm/MessageForm';
import { useParams, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export function ChatScreen({
    chats,
    messageContainers,
    profile,
    onSendMessage,
}) {
    const { id } = useParams();
    const navigate = useNavigate();

    const chat = chats.find(chat => chat.id === id);
    const messages = messageContainers[id] || [];

    const [isMainUser, setIsMainUser] = useState(true);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    if (!chat) {
        return <div>Чат не найден</div>;
    }

    const handleBack = () => {
        navigate('/');
    };

    const toggleSender = () => {
        setIsMainUser(prev => !prev);
    };

    return (
        <div className={styles.chatScreen}>
            <Header
                chatName={chat.name}
                onBack={handleBack}
                className={styles.chatHeader}
            />
            <div className={styles.messagesContainer}>
                {messages.map((message) => (
                    <MessageItem
                        key={message.id}
                        message={message}
                        isOwnMessage={message.sender === profile.name}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={styles.senderToggle}>
                <IconButton onClick={toggleSender} color="primary" aria-label="Сменить пользователя">
                    <SwapHorizIcon />
                </IconButton>
                <span>
                    Отправлять как: {isMainUser ? profile.name : chat.name}
                </span>
            </div>
            <MessageForm onSendMessage={(text) => onSendMessage(id, text, isMainUser ? profile.name : chat.name)} />
        </div>
    );
}
