import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class DateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.convertDates(data)));
  }

  private convertDates(data: any): any {
    if (data instanceof Date) {
      return dayjs(data).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.convertDates(item));
    }

    if (data !== null && typeof data === 'object') {
      const converted: Record<string, any> = {};

      for (const key in data) {
        converted[key] = this.convertDates(data[key]);
      }

      return converted;
    }

    return data;
  }
}
