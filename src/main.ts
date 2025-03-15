// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard'; // Import JwtAuthGuard
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Apply JwtAuthGuard globally
  // app.useGlobalGuards(new JwtAuthGuard(new Reflector()));


  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTOs
      whitelist: true, // Automatically strip properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      exceptionFactory: (errors) => {
        // Customize the error response
        const response = {};
        errors.forEach((error) => {
          response[error.property] = Object.values(error.constraints || "");
        });
        return new BadRequestException(response);
      },
    }),
  );


  await app.listen(3000);
}
bootstrap();
