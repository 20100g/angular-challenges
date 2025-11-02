import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  imports: [AsyncPipe, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (isLoading$ | async) {
      <mat-spinner></mat-spinner>
    }
    <ul>
      @for (todo of todos$ | async; track todo.id) {
        <li>
          {{ todo.title }}
          <button (click)="update(todo)">Update</button>
          <button (click)="remove(todo)">Delete</button>
        </li>
      }
    </ul>
  `,
  styles: [],
  standalone: true,
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);

  todos$ = this.todoService.todos$;
  isLoading$ = this.todoService.isLoading$;

  ngOnInit(): void {
    this.todoService.load();
  }

  update(todo: Todo) {
    this.todoService.update(todo);
  }

  remove(todo: Todo) {
    this.todoService.delete(todo);
  }
}
