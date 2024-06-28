import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thaiDate'
})
export class ThaiDatePipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) return '';

    const date = new Date(value);
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543; // Convert to Buddhist year

    return `${day} ${month} ${year}`;
  }
}
