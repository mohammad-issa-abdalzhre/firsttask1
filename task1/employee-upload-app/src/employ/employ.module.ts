import { Module } from '@nestjs/common';
import { EmployController } from './employ.controller';
import { EmployService } from './employ.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmployController],
  providers: [EmployService,PrismaService], 
})
export class EmployModule {}
