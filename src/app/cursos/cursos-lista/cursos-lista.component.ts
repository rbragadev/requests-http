import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  constructor(private service: CursosService) {}
  cursos!: Curso[];

  ngOnInit(): void {
    this.service.list().subscribe((dados) => (this.cursos = dados));
  }
}
