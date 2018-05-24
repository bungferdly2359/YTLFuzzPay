import { AlertHelper } from './AlertHelper';

const nameRegex = /^.{1,50}$/;
const descriptionRegex = /^.{0,100}$/;
const priceRegex = /^\d{1,3}(\.\d{2})?$/;
const userRegex = /^\w{1,20}$/;
const phoneRegex = /^\+[0-9]{0,3}\s?[0-9]{7,10}$/;
const emailRegex = /^\S{1,50}@\S{1,30}\.\S{2,10}$/;
const bankRegex = /^[0-9]{5,20}$/;

export const ValidateHelper = {
  isValidParams: ({ name, description, price, fullName, firstName, lastName, userName, phoneNumber, bankName, bankAccount, email }) => {
    var error =
      (name != null && !nameRegex.test(name) && 'Invalid name') ||
      (description != null && !descriptionRegex.test(description) && 'Invalid description') ||
      (price != null && !priceRegex.test(price) && 'Invalid price') ||
      (fullName != null && !nameRegex.test(fullName) && 'Invalid full name') ||
      (firstName != null && !nameRegex.test(firstName) && 'Invalid first name') ||
      (lastName != null && !nameRegex.test(lastName) && 'Invalid last name') ||
      (userName != null && !userRegex.test(userName) && 'Invalid username') ||
      (phoneNumber != null && !phoneRegex.test(phoneNumber) && 'Invalid phone number') ||
      (bankName != null && !nameRegex.test(bankName) && 'Invalid bank name') ||
      (bankAccount != null && !bankRegex.test(bankAccount) && 'Invalid bank account') ||
      (email != null && !emailRegex.test(email) && 'Invalid email') ||
      null;
    if (error) {
      AlertHelper.showError(error);
    }
    return error == null;
  }
};