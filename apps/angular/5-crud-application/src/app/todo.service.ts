import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo.model';

const baseUrl = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  #todos = new BehaviorSubject<Todo[]>([]);
  public todos$ = this.#todos.asObservable();

  load() {
    return this.http.get<Todo[]>(`${baseUrl}`).subscribe((todos) => {
      this.#todos.next(todos);
    });
  }

  update(todo: Todo) {
    return this.http
      .put<Todo>(
        `${baseUrl}/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: Todo) => {
        const t = [...this.#todos.value];
        t[todoUpdated.id - 1] = todoUpdated;
        this.#todos.next(t);
      });
  }
}
