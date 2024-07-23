import React, { useContext, useState } from 'react';
import { Box, Grid, TextField, Typography, Button, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../../auth/context/AuthContext';
import editProfile from '../../api/profile-management/services/editProfile';

const OrganizationProfileSetup = () => {
    const authData = useContext(AuthContext)
    const [formData, setFormData] = useState({
        description: '',
        contact: {
            phone: '',
            email: ''
        },
        social: []
    });

    const handleDescriptionChange = (event) => {
        setFormData({
            ...formData,
            description: event.target.value
        });
    };

    const handleContactChange = (event, type) => {
        setFormData({
            ...formData,
            contact: {
                ...formData.contact,
                [type]: event.target.value
            }
        });
    };

    const addSocial = (type) => {
        // Check if social media of this type already exists
        const existingSocial = formData.social.find(social => social.type === type);
        if (existingSocial) {
            alert(`You can only add one ${type} link.`);
            return;
        }

        const newSocial = { type: type, url: '' };
        setFormData({
            ...formData,
            social: [...formData.social, newSocial]
        });
    };

    const handleSocialChange = (event, index) => {
        const updatedSocial = [...formData.social];
        updatedSocial[index].url = event.target.value;
        setFormData({
            ...formData,
            social: updatedSocial
        });
    };

    const removeSocial = (index) => {
        const updatedSocial = [...formData.social];
        updatedSocial.splice(index, 1);
        setFormData({
            ...formData,
            social: updatedSocial
        });
    };

    const handleSubmit = async () => {
        // Initialize an empty object to store the transformed result
        
        console.log(formData);




        let socialObject = {};

        // Iterate through the socialArray
        formData.social.forEach(item => {
        // Ensure each item in socialArray is an object and has type and url properties
            if (typeof item === 'object' && item !== null && 'type' in item && 'url' in item) {
            // Assign the type as key and url as value in the socialObject
                socialObject[item.type.toLowerCase()] = item.url;
            }
        });
        const normalizedFormData = {...formData,social:socialObject}



        try {
            console.log('Form Data:', normalizedFormData);
            console.log(authData);
            await editProfile(authData.user.accessToken, authData.user.userId, normalizedFormData,true);
            // Optionally handle success (e.g., show success message, redirect)
          } catch (error) {
            console.error('Error editing profile:', error);
            // Handle error (e.g., show error message)
          }


    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h3" gutterBottom fontWeight={'bold'}>
                Get other hikers to know you!
            </Typography>
            <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={formData.description}
                onChange={handleDescriptionChange}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
                Contact Information
            </Typography>
            <TextField
                fullWidth
                label="Phone Number"
                value={formData.contact.phone}
                onChange={(e) => handleContactChange(e, 'phone')}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Email"
                value={formData.contact.email}
                onChange={(e) => handleContactChange(e, 'email')}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
                Social Media Links
            </Typography>
            {formData.social.map((social, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                label="Social Media Type"
                                value={social.type}
                                disabled
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                label="URL"
                                value={social.url}
                                onChange={(e) => handleSocialChange(e, index)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => removeSocial(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            ))}
            <Grid container justifyContent="flex-end">
                {/* Buttons to add social media */}
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => addSocial('Facebook')}
                    sx={{ mt: 2 }}
                    disabled={formData.social.some(social => social.type === 'Facebook')}
                >
                    Add Facebook
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => addSocial('Instagram')}
                    sx={{ mt: 2, ml: 2 }}
                    disabled={formData.social.some(social => social.type === 'Instagram')}
                >
                    Add Instagram
                </Button>
                {/* Add more buttons for other social media types as needed */}
            </Grid>
            <Divider sx={{ my: 3 }} />
            {/* Submit button */}
            <Grid container justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Grid>
        </Box>
    );
};

export default OrganizationProfileSetup;
