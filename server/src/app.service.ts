import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

 async getNepseData(){
    try {
      const response = await axios.get('https://api.nepsetrading.com/stocks-listed');
      return response.data; // Forward data to the frontend
    } catch (error) {
      throw error
    }
  }
}
