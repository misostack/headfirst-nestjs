import * as bcrypt from 'bcrypt';

export class EncryptHelper {
  static hash(str, saltRounds = 10) {
    return bcrypt.hash(str, saltRounds);
  }
  static async compare(str, hash) {
    return await bcrypt.compare(str, hash);
  }
}