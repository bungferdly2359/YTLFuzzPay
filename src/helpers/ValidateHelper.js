import { AlertHelper } from './AlertHelper';

export const ValidateHelper = {
  isValidUser: ({ firstName, lastName, username, phoneNumber, bankName, bankAccount }) => {
    const nameRegex = /^.{1,20}$/;
    const userRegex = /^\w{1,20}$/;
    const phoneRegex = /^\+[0-9]{0,3}\s?[0-9]{7,10}$/;
    const emailRegex = /^\S{1,50}@\S{1,30}\.\S{2,10}$/;
    const bankRegex = /^[0-9]{5,20}$/;
    var error =
      (firstName != null && !nameRegex.test(firstName) && 'Invalid first name') ||
      (lastName != null && !nameRegex.test(lastName) && 'Invalid last name') ||
      (username != null && !userRegex.test(username) && 'Invalid username') ||
      (phoneNumber != null && !phoneRegex.test(phoneNumber) && 'Invalid phone number') ||
      (bankName != null && !nameRegex.test(bankName) && 'Invalid bank name') ||
      (bankAccount != null && !bankRegex.test(bankAccount) && 'Invalid bank account') ||
      null;
    if (error) {
      AlertHelper.showError(error);
    }
    return error == null;
  }
};
