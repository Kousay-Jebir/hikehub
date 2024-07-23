import React, { useContext, useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import ProfileSetupAboutYou from './ProfileSetupAboutYou';
import ProfileSetupAdditionalInfo from './ProfileSetupAdditionalInfo';
import AuthContext from '../../auth/context/AuthContext';
import editProfile from '../../api/profile-management/services/editProfile';

const steps = ['About You', 'Additional Information'];

const ProfileSetupStepper = () => {
  const authData = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    nationality: 'Tunisia',
    phoneNumber: '',
    genderCode: '',
    birthday: null
  });

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleSubmit = async () => {
    // Ensure genderCode is set to 'M' or 'F'
    const normalizedFormData = {
      ...formData,
      genderCode: formData.genderCode.toUpperCase() === 'MALE' ? 'M' : 'F'
    };
  
    try {
      console.log('Form Data:', normalizedFormData);
      console.log(authData);
      await editProfile(authData.user.accessToken, authData.user.userId, normalizedFormData);
      // Optionally handle success (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error editing profile:', error);
      // Handle error (e.g., show error message)
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <ProfileSetupAboutYou formData={formData} handleChange={handleChange} />
          )}
          {activeStep === 1 && (
            <ProfileSetupAdditionalInfo formData={formData} handleChange={handleChange} />
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default ProfileSetupStepper;
