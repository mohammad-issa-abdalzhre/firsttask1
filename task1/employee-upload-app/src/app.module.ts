import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployService } from './employ/employ.service';
import { EmployModule } from './employ/employ.module';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [AppController],
  providers: [AppService, EmployService,PrismaService],
  imports: [EmployModule],
})
export class AppModule {}