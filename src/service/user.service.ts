import UserModel from '../databases/mongodb/model/user.model';

export function createUser(input: any) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id)
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email })
}
