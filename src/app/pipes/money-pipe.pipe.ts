import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyPipe'
})
export class MoneyPipePipe implements PipeTransform {

  transform(value: number): string {
    if(!value) return '';

    const formattedValue = Intl.NumberFormat('en-IN').format(value);
    return `₹${formattedValue}`;
  }

}
