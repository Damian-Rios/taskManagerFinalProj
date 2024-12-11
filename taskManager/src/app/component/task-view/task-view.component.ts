import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from '../../models/task.model';
@Component({
  selector: 'app-task-view',
  standalone: false,
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent {
  lists: any[] = [];
  tasks: any[] = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
          this.tasks = tasks;
        });
      });

    this.taskService.getLists().subscribe(
      (lists: any) => {
        this.lists = lists;
      });
    }

    onTaskClick(task: Task) {
      this.taskService.complete(task).subscribe(() => {
        console.log("Completed successfully");
        task.completed = !task.completed;
      })
    }
}
