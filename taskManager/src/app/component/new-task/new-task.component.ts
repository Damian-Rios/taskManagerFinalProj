import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, Params } from '@angular/router';
import { TaskService } from '../../task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-task',
  imports: [RouterModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }
    
  listId: any;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  createTask(title: string) {
    this.taskService.createTask(title, this.listId).subscribe(
      (newTask: any) => {
      console.log(newTask);
      // Redirect to /lists/response._id
      this.router.navigate([ "../"], { relativeTo: this.route });
    });
  }

}


