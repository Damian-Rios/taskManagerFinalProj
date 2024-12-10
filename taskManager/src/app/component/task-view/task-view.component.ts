import { Response } from './../../../../node_modules/@types/express-serve-static-core/index.d';
import { Component } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-view',
  standalone: false,
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  createNewList() {
    this.taskService.createList('Testing').subscribe((response: any) => {
      console.log(response);
    });
  }

}
