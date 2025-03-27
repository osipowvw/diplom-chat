import React, { useState } from 'react';
import styles from './CreateChatModal.module.scss';
import { Modal, Box, TextField, Button } from '@mui/material';

export function CreateChatModal({ open, onClose, onCreate }) {
    const [otherUserName, setOtherUserName] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!otherUserName.trim()) {
            newErrors.otherUserName = 'Имя пользователя обязательно';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreate = () => {
        if (validate()) {
            onCreate(otherUserName.trim());
            setOtherUserName('');
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className={styles.modalContent}>
                <h3>Создать новый чат</h3>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Имя пользователя"
                    value={otherUserName}
                    onChange={(e) => setOtherUserName(e.target.value)}
                    error={!!errors.otherUserName}
                    helperText={errors.otherUserName}
                    className={styles.input}
                />
                <div className={styles.buttons}>
                    <Button 
                        variant="contained" 
                        onClick={handleCreate}
                        style={{ backgroundColor: '#pink', color: '#fff' }}
                        className={styles.createButton}
                    >
                        Создать
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={onClose}
                        style={{ borderColor: 'pink', color: 'pink' }}
                        className={styles.cancelButton}
                    >
                        Отмена
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}
