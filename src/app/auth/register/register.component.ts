import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticService } from '../../services/authentic.service';
import { CoursesService } from '../../services/courses.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup
  myCourses: any;

  constructor(private router:Router, private fb: FormBuilder, private auth: AuthenticService, private courseApi: CoursesService) {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$'), Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      courses: this.fb.array([])
    })
  }
  ngOnInit(): void {
    this.getCourses()
  }
  getCourses() {
    this.courseApi.getCourses().subscribe((res: any) => {
      console.log('courses', res);
      this.myCourses=res;
    })
  }
  get courses(): FormArray {
    return this.registerForm.controls["courses"] as FormArray
  }
  addCourses() {
    const coursesForm = this.fb.group({
      courseName: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required)
    });
    this.courses.push(coursesForm);
  }
  deleteCourse(Cindex: number) {
    this.courses.removeAt(Cindex)
  }
 
  // validation dynamically
  getControl(controlName: string) {
    return this.registerForm.controls[controlName];
  }

  isControlInvalid(controlName: string) {
    const control = this.getControl(controlName);
    return control.invalid && (control.touched || control.dirty);
  }

  getControlErrors(controlName: string) {
    return this.getControl(controlName)?.errors;
  }
  // validation dynamically for formArray
  getCourseControl(index: number, controlName: string) {
    return (this.courses.at(index) as FormGroup).get(controlName);
  }

  // Check if the control inside FormArray is invalid
  isCourseControlInvalid(index: number, controlName: string) {
    const control: any = this.getCourseControl(index, controlName);
    return control.invalid && (control.touched || control.dirty);
  }

  // Get errors for the control inside FormArray
  getCourseControlErrors(index: number, controlName: string) {
    return this.getCourseControl(index, controlName)?.errors;
  }
  // form submit
  onSubmit() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe((res: any) => {
        this.router.navigate(['/auth/sign-in'])
      },
        (error: any) => {
          console.log(error);
        })
    }
    else {
      console.log("form is invalid!");
    }
  }
}
