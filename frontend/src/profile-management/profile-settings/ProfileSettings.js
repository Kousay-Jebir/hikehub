// ProfileSettings.jsx
import React, { useContext, useState } from 'react';
import { Box, Button } from '@mui/material';
import Setting from './Setting';
import editProfileSettings from '../../api/profile-management/services/editProfileSettings';
import AuthContext from '../../auth/context/AuthContext';

export default function ProfileSettings() {
    const authData = useContext(AuthContext)
    const [settings, setSettings] = useState({
        isAcceptingFriendRequests: true,
        isEmailExposed: true,
        birthdayPrivacy: false,
        phoneNumberPrivacy: false
    });

    const handleSettingChange = (settingKey, value) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [settingKey]: value,
        }));
    };

    const handleSubmit = async () => {
        // You can add logic here to submit settings to your backend or perform other actions
        const changes = await editProfileSettings(authData.user.accessToken,authData.user.userId,settings);
        console.log(changes);
    };

    return (
        <Box>
            <Setting
                settingTitle="Receive friend requests"
                settingKey="isAcceptingFriendRequests"
                settingValue={settings.isAcceptingFriendRequests}
                onSettingChange={handleSettingChange}
            />
            <Setting
                settingTitle="Public email address"
                settingKey="isEmailExposed"
                settingValue={settings.isEmailExposed}
                onSettingChange={handleSettingChange}
            />
            <Setting
                settingTitle="Public birthday"
                settingKey="birthdayPrivacy"
                settingValue={settings.birthdayPrivacy}
                onSettingChange={handleSettingChange}
            />
            <Setting
                settingTitle="Public phone number"
                settingKey="phoneNumberPrivacy"
                settingValue={settings.phoneNumberPrivacy}
                onSettingChange={handleSettingChange}
            />

            <Box>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save Settings
                </Button>
            </Box>
        </Box>
    );
}
