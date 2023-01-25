import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /* this.route.params.subscribe((params: any) => {
      const id = params['id'];
      console.log(id);
      const curso$ = this.service.loadByID(id);
      curso$.subscribe((curso) => {
        this.updateForm(curso);
      });
    });*/

    //outra forma de fazer
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.service.loadByID(id))
      )
      .subscribe((curso) => this.updateForm(curso));

    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required]],
    });
  }

  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
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
