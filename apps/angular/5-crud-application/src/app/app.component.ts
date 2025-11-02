import { Component, inject, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    <ul>
      @for (todo of todos; track todo.id) {
        <li>
          {{ todo.title }}
          <button (click)="update(todo)">Update</button>
        </li>
      }
    </ul>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);

  todos!: Todo[];

  ngOnInit(): void {
    this.todoService.get().subscribe((todos) => {
      this.todos = todos;
    });
  }

  update(todo: Todo) {
    this.todoService.update(todo).subscribe((todoUpdated: Todo) => {
      this.todos = [...this.todos];
      this.todos[todoUpdated.id - 1] = todoUpdated;
    });
  }
}
