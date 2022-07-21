import * as dotenv from 'dotenv';

export class EnvironmentUtils {
  public static init(): void {
    const dotenvResult = dotenv.config();
    if (dotenvResult.error) {
      // console.log(dotenvResult.error);
      throw new Error('You need a .env file');
    }
  }
}
