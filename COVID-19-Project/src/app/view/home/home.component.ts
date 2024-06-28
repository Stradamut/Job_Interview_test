import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzOptionComponent, NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { UserData } from '../../model/user.model';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzOptionComponent,
    NzSelectModule,
    NzFormModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    NzFlexModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule
  ],
  providers: [
    provideNgxMask(),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  inputForm!: FormGroup;
  modalForm!: FormGroup;
  showModal = false;
  maxDate = new Date();
  user!: UserData



  constructor(private router: Router, private dataService: DataService) { }


  ngOnInit(): void {

    this.inputForm = new FormGroup({
      name: new FormControl<UserData["name"]>('', [Validators.required, Validators.pattern(/^[ก-๙a-zA-Z\s]+$/)]),
      idCard: new FormControl<UserData["idCard"]>('', [Validators.required, Validators.pattern('[0-9]{13}')]),
      gender: new FormControl<UserData["gender"]>('', Validators.required),
      birthDate: new FormControl<UserData["birthDate"]>(null, Validators.required)
    });

    this.modalForm = new FormGroup({
      modalName: new FormControl<UserData["name"]>({ value: '', disabled: true }, [Validators.required]),
      modalIdCard: new FormControl<UserData["idCard"]>({ value: '', disabled: true }, [Validators.required]),
      modalGender: new FormControl<UserData["gender"]>({ value: '', disabled: true }, [Validators.required]),
      modalBirthDate: new FormControl<UserData["birthDate"]>({ value: null, disabled: true }, [Validators.required]),
    })

  }

  submit(): void {
    if (this.inputForm.valid) {
      this.setModalData()
      this.showModal = true;
    } else {
      this.markAllFieldsAsTouched()
    }
  }

  setModalData(): void {
    this.modalForm.get('modalName')?.setValue(this.inputForm.get('name')?.value)
    this.modalForm.get('modalIdCard')?.setValue(this.inputForm.get('idCard')?.value)
    this.modalForm.get('modalGender')?.setValue(this.inputForm.get('gender')?.value)
    this.modalForm.get('modalBirthDate')?.setValue(this.inputForm.get('birthDate')?.value)
  }

  clear(): void {
    this.inputForm.reset();
  }

  check(): void {
    const resultData: UserData = this.inputForm.value;
    this.dataService.setUserData(resultData);
    this.router.navigate(['/result']);
  }

  handleCancel(): void {
    this.showModal = false;
  }



  markAllFieldsAsTouched() {
    Object.keys(this.inputForm.controls).forEach(e => {
      const form = this.inputForm.get(e);
      form?.markAsTouched({ onlySelf: true });
    });
  }

}



