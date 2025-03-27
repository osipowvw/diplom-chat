import React, { useState } from 'react';
import styles from './ChatListScreen.module.scss';
import { IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { ChatItem } from '../ChatItem/ChatItem.jsx';
import { CreateChatModal } from '../CreateChatModal/CreateChatModal.jsx';

export function ChatListScreen({ chats, onChatSelect, onCreateChat, onOpenProfile }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredChats = chats.filter((chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.chatListScreen}>
            <header className={styles.header}>
                <h2>Чаты</h2>
                <div className={styles.headerRight}>
                    <TextField
                        variant="outlined"
                        placeholder="Поиск чата"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <IconButton
                        onClick={onOpenProfile}
                        color="inherit"
                        className={styles.profileButton}
                        aria-label="Профиль"
                    >
                        <PersonIcon />
                    </IconButton>
                </div>
            </header>
            <div className={styles.chatList}>
                {filteredChats.map((chat) => (
                    <ChatItem
                        key={chat.id}
                        chat={chat}
                        onClick={() => onChatSelect(chat.id, chat.name)}
                    />
                ))}
            </div>
            <IconButton
                className={styles.floatingButton}
                onClick={() => setIsModalOpen(true)}
                aria-label="Добавить чат"
            >
                <AddIcon fontSize="large" />
            </IconButton>
            <CreateChatModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={onCreateChat}
            />
        </div>
    );
}
