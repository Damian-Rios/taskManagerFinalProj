import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskViewComponent } from "./component/task-view/task-view.component";
import { NewListComponent } from "./component/new-list/new-list.component";
import { NewTaskComponent } from "./component/new-task/new-task.component";
import { LoginPageComponent } from "./component/login-page/login-page.component";

const routes: Routes = [
    { path: "", redirectTo: 'lists', pathMatch: "full" },
    { path: "new-list", component: NewListComponent },
    { path: "login", component: LoginPageComponent },
    { path: "lists", component: TaskViewComponent },
    { path: "lists/:listId", component: TaskViewComponent },
    { path: "lists/:listId/new-task", component: NewTaskComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
}) export class AppRoutingModule {}