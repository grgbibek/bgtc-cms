import dotenv from 'dotenv';
dotenv.config();

import { sendRegistrationConfirmationToUser } from './utils/notifier.js';

const testRegistration = {
  name: 'Test User',
  email: 'grgbibek22@gmail.com',
  phone: '9800000000',
  gender: 'Male',
  qualification: 'SLC',
  subject: 'British Gurkha Army',
  message: 'This is a test submission.'
};

console.log('Sending test email to:', testRegistration.email);
try {
  await sendRegistrationConfirmationToUser(testRegistration);
  console.log('Finished trigger attempt.');
} catch (e) {
  console.error('Caught error:', e);
}
