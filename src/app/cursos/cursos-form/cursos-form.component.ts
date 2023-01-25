import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private service: CursosService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');
      this.service
        .create(this.form.value)
        .subscribe((sucess) => console.log(sucess));
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
