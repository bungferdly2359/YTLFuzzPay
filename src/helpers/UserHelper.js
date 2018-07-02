import { FSApp } from '../modules/fs-foundation';

export const UserHelper = {
  isCustomer: () => FSApp.getNativeProps('customer')
};
