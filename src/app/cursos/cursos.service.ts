import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { tap } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(private http: HttpClient) {}

  private readonly API = `${environment.API}cursos`;

  list() {
    return this.http.get<Curso[]>(this.API).pipe(tap(console.log));
  }
}
