import { Body, Controller,Delete, Get,Post, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EmployService } from './employ.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {storage} from './multer.config';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import { Employee } from '@prisma/client';
@Controller('employ')
export class EmployController {
    constructor(private readonly appService: EmployService) {}
    @Get()
    getHello(): string {
      return this.appService.getHello();
    }
    @Post('2')
    async searchUsersBySalary(@Body() body: { salary: number }): Promise<Employee[]> {
      const { salary } = body;
      return this.appService.findUsersBySalary(salary);
    }
    @Get("add")
    @Render('index')
    p() {
      // Render your view here if needed
    }
    @Get("search")
    @Render('search')
    p2() {
      // Render your view here if needed
    }
    @Delete('deleteAll')
  async deleteAllEmployees(): Promise<void> {
    await this.appService.deleteAllEmployees();
  }
    
    @Post('csv')
    @UseInterceptors(FileInterceptor('file', { storage }))
    async uploadCsv(@UploadedFile() file: Express.Multer.File) {
      const csvFilePath = `/task1/employee-upload-app/src/uploads/${file.originalname}`;
      
      try {
        // Call the async function and wait for the result
        const xx = await this.appService.j(csvFilePath);
        // Return the result in the response
        return { xx };
      } catch (error) {
        // Handle errors here, e.g., log the error and return an error response
        console.error('Error processing CSV:', error);
        return { error: 'An error occurred while processing the CSV.' };
      }
    }


 
}
  

