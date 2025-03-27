import React, { useState } from 'react';
import styles from './MessageForm.module.scss';
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export function MessageForm({ onSendMessage }) {
    const [messageText, setMessageText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageText.trim()) {
            onSendMessage(messageText.trim());
            setMessageText('');
        }
    };

    return (
        <form className={styles.messageForm} onSubmit={handleSubmit}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Введите сообщение"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
            />
            <IconButton type="submit" color="primary">
                <SendIcon />
            </IconButton>
        </form>
    );
}
