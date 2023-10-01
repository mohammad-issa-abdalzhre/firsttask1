import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EmployController } from './employ/employ.controller';

@Controller()
export class AppController {
  controllers=[EmployController]
  
}
