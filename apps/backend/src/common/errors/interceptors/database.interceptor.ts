import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { DataBaseError } from '../types/DatabaseError';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof DataBaseError) {
          if (error.code === 11000) {
            throw new ConflictException(error.message);
          } else throw error;
        } else throw error;
      }),
    );
  }
}
