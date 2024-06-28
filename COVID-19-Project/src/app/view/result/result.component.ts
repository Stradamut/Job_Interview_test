import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzOptionComponent, NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFlexModule } from 'ng-zorro-antd/flex';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { DataService } from '../../services/data.services';
import { ThaiDateModule } from '../../services/thaiDate.module';
import { UserData } from '../../model/user.model';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    ReactiveFormsModule,
    NzOptionComponent,
    NzSelectModule,
    ThaiDateModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NzFlexModule,
    NzLayoutModule
  ],
  providers: [
    provideNgxMask(),
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  resultForm!: FormGroup;
  result!: UserData;

  status?: string;
  color?: string;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {

    this.result = this.dataService.getUserData();
    this.resultForm = new FormGroup({
      resultName: new FormControl<UserData["name"]>({ value: ' ', disabled: true }, [Validators.required]),
      resultIdCard: new FormControl<UserData["idCard"]>({ value: ' ', disabled: true }, [Validators.required]),
      resultGender: new FormControl<UserData["gender"]>({ value: ' ', disabled: true }, [Validators.required]),
      resultBirthDate: new FormControl<UserData["birthDate"]>({ value: null, disabled: true }, [Validators.required]),
    });
    this.setResultData();
    this.calculateAge();
  }

  setResultData(): void {
    this.resultForm.get('resultName')?.setValue(this.result.name)
    this.resultForm.get('resultIdCard')?.setValue(this.result.idCard)
    this.resultForm.get('resultGender')?.setValue(this.result.gender)
    this.resultForm.get('resultBirthDate')?.setValue(this.result.birthDate)
  }

  calculateAge(): void {
    const birthDate = this.result.birthDate!
    const age = this.getAge(new Date(birthDate));
    if (age >= 65 || (age >= 0.5 && age < 2)) {
      this.status = 'สามารถเข้ารับบริการได้';
      this.color = 'green';
    } else {
      this.status = 'ไม่สามารถเข้ารับบริการได้';
      this.color = 'red';
    }
  }

  getAge(birthDate: Date): number {
    const maxYear = 2023;
    const maxMonth = 7; //0=jan - 11=dec//
    const maxDate = 31;


    let age = maxYear - birthDate.getFullYear();
    const m = maxMonth - birthDate.getMonth();
    console.log(birthDate.getMonth());

    if (age === 0 && m >= 5) {
      age++;
    }
    else if (m < 0 || (m === 0 && maxDate < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

}
