import React from 'react';
import styles from './MessageItem.module.scss';
import { formatTime } from '../../utils/utils.js';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function MessageItem({ message, isOwnMessage }) {
    return (
        <div
            className={`${styles.messageItem} ${
                isOwnMessage ? styles.ownMessage : styles.otherMessage
            }`}
        >
            <strong>{message.sender}</strong>
            <p>{message.text}</p>
            <span className={styles.timestamp}>
                {formatTime(message.timestamp)}
                {isOwnMessage && (
                    message.readStatus ? (
                        <CheckCircleIcon style={{ color: 'blue', fontSize: '14px', marginLeft: '5px' }} />
                    ) : (
                        <CheckIcon style={{ color: 'white', fontSize: '14px', marginLeft: '5px' }} />
                    )
                )}
            </span>
        </div>
    );
}
