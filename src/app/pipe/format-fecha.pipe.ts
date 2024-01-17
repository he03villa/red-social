import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFecha',
  standalone: true
})
export class FormatFechaPipe extends DatePipe implements PipeTransform {

  override transform(value: any, args: string): any {
    return super.transform(value, args);
  }

}
