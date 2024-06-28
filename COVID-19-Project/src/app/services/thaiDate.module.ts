import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiDatePipe } from './thaiDate.pipe';


@NgModule({
  declarations: [ThaiDatePipe],
  imports: [CommonModule],
  exports: [ThaiDatePipe]
})
export class ThaiDateModule { }
