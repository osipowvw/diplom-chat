import React from 'react';
import styles from './ChatItem.module.scss';
import { Avatar } from '@mui/material';

export function ChatItem({ chat, onClick }) {
    return (
        <div className={styles.chatItem} onClick={onClick}>
            <Avatar className={styles.avatar}>
                {chat.name.charAt(0).toUpperCase()}
            </Avatar>
            <div className={styles.chatInfo}>
                <h3>{chat.name}</h3>
                <p>{chat.lastMessage || 'Нет сообщений'}</p>
            </div>
            <div className={styles.chatTime}>{chat.time}</div>
        </div>
    );
}
