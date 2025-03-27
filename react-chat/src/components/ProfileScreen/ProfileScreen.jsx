import React, { useState } from 'react';
import styles from './ProfileScreen.module.scss';
import { TextField, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ProfileScreen({ profile, onUpdateProfile }) {
    const [name, setName] = useState(profile.name);
    const [nickname, setNickname] = useState(profile.nickname);
    const [bio, setBio] = useState(profile.bio);
    const [avatar, setAvatar] = useState(profile.avatar);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!nickname.startsWith('@') || nickname.length < 6) {
            newErrors.nickname = 'Никнейм должен начинаться с @ и содержать не менее 5 символов после @';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onUpdateProfile({ name, nickname, bio, avatar });
            navigate('/');
        }
    };

    return (
        <div className={styles.profileScreen}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.avatarSection}>
                    <Avatar src={avatar} className={styles.avatar}>
                        {!avatar && name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Button variant="contained" component="label" className={styles.uploadAvatar}>
                        Загрузить аватар
                        <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                    </Button>
                </div>
                <TextField
                    label="Имя"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />
                <TextField
                    label="Никнейм"
                    variant="outlined"
                    fullWidth
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    error={!!errors.nickname}
                    helperText={errors.nickname}
                    className={styles.input}
                />
                <TextField
                    label="Биография"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className={styles.input}
                />
                <div className={styles.buttons}>
                    <Button type="submit" variant="contained" className={styles.saveButton}>
                        Сохранить
                    </Button>
                    <Button variant="outlined" onClick={() => navigate('/')} className={styles.cancelButton}>
                        Отмена
                    </Button>
                </div>
            </form>
        </div>
    );
}
