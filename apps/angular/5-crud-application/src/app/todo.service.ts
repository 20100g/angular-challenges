import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './todo.model';

const baseUrl = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  get() {
    return this.http.get<Todo[]>(`${baseUrl}`);
  }

  update(todo: Todo) {
    return this.http.put<Todo>(
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
    );
  }
}
