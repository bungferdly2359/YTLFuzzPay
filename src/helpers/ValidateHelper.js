import { AlertHelper } from './AlertHelper';
import { FSApp } from '../modules/fs-foundation';

const nameRegex = /^.{1,50}$/;
const descriptionRegex = /^.{0,100}$/;
const priceRegex = /^\d{1,3}(\.\d{2})?$/;
const userRegex = /^\w{1,20}$/;
const emailRegex = /^\S{1,50}@\S{1,30}\.\S{2,10}$/;
const passwordRegex = /^.{1,20}$/;
const bankRegex = /^[0-9]{5,20}$/;

export const ValidateHelper = {
  isValidParams: ({ name, hawkerName, description, price, fullName, firstName, lastName, userName, bankName, bankAccount, email, password, repeatPassword }) => {
    if (FSApp.getNativeProps('testUI')) {
      return true;
    }
    var error =
      (name != null && !nameRegex.test(name) && 'Invalid name') ||
      (hawkerName != null && !nameRegex.test(hawkerName) && 'Invalid hawker name') ||
      (description != null && !descriptionRegex.test(description) && 'Invalid description') ||
      (price != null && !priceRegex.test(price) && 'Invalid price') ||
      (fullName != null && !nameRegex.test(fullName) && 'Invalid full name') ||
      (firstName != null && !nameRegex.test(firstName) && 'Invalid first name') ||
      (lastName != null && !nameRegex.test(lastName) && 'Invalid last name') ||
      (userName != null && !userRegex.test(userName) && 'Invalid username') ||
      (bankName != null && !nameRegex.test(bankName) && 'Invalid bank name') ||
      (bankAccount != null && !bankRegex.test(bankAccount) && 'Invalid bank account') ||
      (email != null && !emailRegex.test(email) && 'Invalid email') ||
      (password != null && !passwordRegex.test(password) && 'Invalid password') ||
      (repeatPassword != null && repeatPassword !== password && 'Invalid repeat password') ||
      null;
    if (error) {
      AlertHelper.showError(error);
    }
    return error == null;
  }
};
