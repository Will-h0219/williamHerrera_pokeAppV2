import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private pokemonService: PokemonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(() => this.pokemonService.setShowMessage(false)),
      catchError((err) => {
        this.pokemonService.setShowMessage(true);
        return throwError(() => new Error(err));
      })
    );
  }
}
