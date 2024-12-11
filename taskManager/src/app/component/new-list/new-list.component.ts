import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  imports: [RouterModule],
  styleUrl: './new-list.component.css'
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      // Redirect to /lists/response._id
      this.router.navigate([ "/lists", response._id ]);
    });
  }

}
