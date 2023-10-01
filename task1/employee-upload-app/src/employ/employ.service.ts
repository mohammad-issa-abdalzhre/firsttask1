import { Injectable } from '@nestjs/common';
import { Prisma, Employee } from '@prisma/client';
import * as csvParser from 'csv-parser';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
@Injectable()
export class EmployService {
    constructor(private prisma: PrismaService) {}

    getHello() {
        return 'Hello World!';
      }
   

    async createUsers(data: any[]): Promise<Employee[]> {
    // Use Prisma client to create multiple employees at once
    return this.prisma.$transaction(data.map(employeeData => (
      this.prisma.employee.create({
        data: employeeData,
      })
    )));
    };


    async j(s) {
        return new Promise((resolve, reject) => {
          const data = [];
          const employeeIds = new Set(); // To track duplicate employee IDs
          let totalSalariesBeforeCleaning = 0;
          const path = s;
      
          const stream = fs.createReadStream(path)
            .pipe(csvParser())
            .on('data', (row) => {
              const id = parseInt(row.employeeId);
              const salary = parseInt(row.employeeSalary);
      
              // Check for duplicate employee IDs and salaries > 0
              if (!employeeIds.has(id) && salary > 0) {
                // Only add data if it's not a duplicate and salary > 0
                data.push({
                  employeeId: id,
                  position: row.position,
                  employeeSalary: salary, // Use the parsed salary variable
                });
      
                employeeIds.add(id);
                totalSalariesBeforeCleaning += salary;
              }
            })
            .on('end', async () => {
              try {
                // Now create users with the collected data after the loop is complete
                console.log(data);
                // Assuming 'createUsers' is an asynchronous function that returns a Promise
                await this.createUsers(data);
      
                // Calculate total salaries after cleaning
                let totalSalariesAfterCleaning = 0;
                for (const entry of data) {
                  totalSalariesAfterCleaning += entry.employeeSalary;
                }
      
                // Data has been successfully processed
                console.log('Cleaned CSV data has been processed.');
      
                // Generate and log the report
                const totalRows = data.length;
                console.log(`Total Rows: ${totalRows}`);
                console.log(`Total Salaries Before Cleaning: ${totalSalariesBeforeCleaning}`);
                console.log(`Total Salaries After Cleaning: ${totalSalariesAfterCleaning}`);
      
                // Resolve the Promise with the desired data
                resolve({ totalRows, totalSalariesBeforeCleaning,totalSalariesAfterCleaning });
              } catch (error) {
                console.error('Error processing CSV data:', error);
                reject(error); // Reject the Promise in case of an error
              } finally {
                // Clean up: Delete the uploaded file
                fs.unlinkSync(path);
              }
            });
        });
      }



    async deleteAllEmployees(): Promise<void> {
        try {
          await this.prisma.employee.deleteMany();
        } catch (error) {
          throw new Error(`Error deleting all employees: ${error.message}`);
        }
      }

    async findUsersBySalary(idy: number): Promise<Employee[]> {
        try {
          const users = await this.prisma.employee.findMany({
            where: {
                employeeId: idy,
            },
          });
          return users;
        } catch (error) {
          throw new Error(`Error searching for users by salary: ${error.message}`);
        }
      }
}