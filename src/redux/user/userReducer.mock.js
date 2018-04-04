
import { userReducer as realUserReducer } from './';

const initialState = () => ({
  version: 4,
  isRegistered: true,
  psid: '1562413',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVJZCI6ImJjNmUzNjYwLTIxMDYtMTFlOC1hOTIxLWM3MWQzNGI1NDExYyIsImlhdCI6MTUyMDMxNzM0NH0.zRtLPyHwjun7W_Odb9a7624M_XmxKg8lNESzBowPDDo',
  unifiedMeetings: null,
  businessUnits: null,
  businessUnit: 'Corporate Finance',
  baseOfficeLocation: 'Singapore',
  currentLocation: null,
  meetingOrganizerAlert: true,
  meetingAlert: true,
  isTester: true,
  manualAccessNumber: '123456789'
});

export function userReducer(state = initialState(), action) {
  return realUserReducer(state, action);
}
