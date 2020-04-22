import * as bcrypt from 'bcrypt';

export class EncryptHelper {
  static async hash(str, saltRounds = 10){
    return await bcrypt.hash(str, saltRounds);
  }
  static async compare(str, hash) {
    return await bcrypt.compare(str, hash);
  }
}