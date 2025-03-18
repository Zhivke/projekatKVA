import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { DetailsComponent } from './details/details.component';
import { OrderComponent } from './order/order.component';
import { MovieSearchComponent } from './search/search.component';
import { LoadingComponent } from './loading/loading.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'about', component: AboutComponent},
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    {path: 'signup', component:SignupComponent},
    {path: 'details/:id/order', component:OrderComponent},
    {path: 'details/:id', component:DetailsComponent},
    {path:'search', component:MovieSearchComponent},
    {path:'loading', component:LoadingComponent},
    { path: '**', redirectTo: ''},
];
