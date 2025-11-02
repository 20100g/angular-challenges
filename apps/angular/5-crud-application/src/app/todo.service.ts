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
  #isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.#isLoading.asObservable();

  load() {
    this.#isLoading.next(true);
    return this.http.get<Todo[]>(`${baseUrl}`).subscribe((todos) => {
      this.#todos.next(todos);
      this.#isLoading.next(false);
    });
  }

  delete(todo: Todo) {
    this.#isLoading.next(true);
    return this.http.delete<Todo>(`${baseUrl}/${todo.id}`).subscribe((_) => {
      this.#todos.next(this.#todos.value.filter((t) => t.id !== todo.id));
      this.#isLoading.next(false);
    });
  }

  update(todo: Todo) {
    this.#isLoading.next(true);
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
        this.#todos.next(
          this.#todos.value.map((t) =>
            t.id === todoUpdated.id ? todoUpdated : t,
          ),
        );
        this.#isLoading.next(false);
      });
  }
}
