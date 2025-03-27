import React from 'react';
import styles from './Header.module.scss';
import { IconButton, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function Header({ chatName, onBack }) {
    return (
        <header className={styles.chatHeader}>
            <IconButton onClick={onBack} className={styles.backButton}>
                <ArrowBackIcon />
            </IconButton>
            <Avatar className={styles.avatar}>{chatName.charAt(0).toUpperCase()}</Avatar>
            <div className={styles.headerInfo}>
                <h2>{chatName}</h2>
                <p>онлайн</p>
            </div>
        </header>
    );
}
