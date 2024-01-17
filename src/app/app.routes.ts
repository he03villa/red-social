import { Routes } from '@angular/router';
import { ContectComponent } from './pages/contect/contect.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostComponent } from './pages/post/post.component';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/no-auth.guard';
import { EditarUserComponent } from './pages/editar-user/editar-user.component';

export const routes: Routes = [
    {
        path: 'post',  
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: PostComponent },
            { path: 'editar-perfil', component: EditarUserComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { 
        path: '',  
        component: ContectComponent,
        canActivate: [noAuthGuard],
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'resgistro', component: RegistroComponent },
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '' }
];
