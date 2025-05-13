export enum UserType {
  local = 'local',
  ldap = 'ldap'
}

export interface IUser {
  id: number,
  login: string,
  password: string | number,
  type: UserType,
  tags: string[]
}