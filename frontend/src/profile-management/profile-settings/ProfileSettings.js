// ProfileSettings.jsx
import React, { useContext, useState } from 'react';
import { Box, Button } from '@mui/material';
import Setting from './Setting';
import editProfileSettings from '../../api/profile-management/services/editProfileSettings';
import AuthContext from '../../auth/context/AuthContext';
import { useNotificationError } from '../../shared/context/NotificationContext';
import { useNotificationSuccess } from '../../shared/context/NotificationContext';

export default function ProfileSettings() {
    const authData = useContext(AuthContext)
    const showSuccess = useNotificationSuccess();
    const showError = useNotificationError();
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
        try{
        // You can add logic here to submit settings to your backend or perform other actions
        const changes = await editProfileSettings(authData.user.accessToken,authData.user.userId,settings);
        showSuccess("Success, changes are saved")  
        }
        catch(error) {
            showError("Error saving changes")
        }
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
                settingTitle="Private birthday"
                settingKey="birthdayPrivacy"
                settingValue={settings.birthdayPrivacy}
                onSettingChange={handleSettingChange}
            />
            <Setting
                settingTitle="Private phone number"
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
