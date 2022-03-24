export interface UserPreferences {
  darkMode: boolean;
}

interface BaseUserRequest {
  uid: string;
}

export interface RegisterUserRequest extends BaseUserRequest {
  displayName: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
}

export interface ModifyUserRequest extends BaseUserRequest {
  displayName: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
};

export interface UpdatePreferencesRequest extends BaseUserRequest {
  preferences: UserPreferences;
}

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  photoURL: string;
}

export class User {
  uid: string;
  userInfo: UserInfo;
  preferences: UserPreferences;

  constructor(userInfo: RegisterUserRequest) {
    this.uid = userInfo.uid;
    this.userInfo = {
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      displayName: userInfo.displayName,
      phoneNumber: userInfo.phoneNumber,
      photoURL: '',
    };
    this.preferences = {
      darkMode: false,
    };
  }
}