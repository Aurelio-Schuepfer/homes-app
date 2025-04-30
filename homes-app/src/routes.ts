import { Routes } from "@angular/router";
import { HomeComponent } from "./app/home/home.component";
import { DetailsComponent } from "./app/details/details.component";
const routeConifg: Routes = 
[
    {
        path: "", 
        component: HomeComponent,
        title: "Home Page"
    },
    {
    path: "details/:id",
    component: DetailsComponent,
    title: "Details Page",
    }
];

export default routeConifg;
