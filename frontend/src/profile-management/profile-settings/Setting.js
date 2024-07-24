// Setting.jsx
import React from 'react';
import { Box, Typography, Switch } from '@mui/material';

export default function Setting({ settingTitle, settingKey, settingValue, onSettingChange }) {
    const handleSwitchChange = (event) => {
        const { checked } = event.target;
        console.log(checked)
        onSettingChange(settingKey, checked);
    };
 

    return (
        <Box display="flex" justifyContent="space-between">
            <Typography>{settingTitle}</Typography>
            <Switch checked={settingValue} onChange={handleSwitchChange} />
        </Box>
    );
}
