import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from './app/Core/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        //canActivate: [authGuard],
        children: [
            { path: '', component: Dashboard },
            { path: 'funcionarios', loadComponent: () => import('./app/pages/funcionarios/funcionarios.component').then((m) => m.FuncionariosComponent) },
            { path: 'clientes', loadComponent: () => import('./app/pages/clientes/clientes.component').then((m) => m.ClientesComponent) },
            { path: 'pecas', loadComponent: () => import('./app/pages/pecas/pecas.component').then((m) => m.PecasComponent) },
            { path: 'solicitacoes', loadComponent: () => import('./app/pages/solicitacaos/solicitacaos.component').then((m) => m.SolicitacaosComponent) },
            { path: 'solicitacoes/:id', loadComponent: () => import('./app/pages/solicitacao/solicitacao.component').then((m) => m.SolicitacaoComponent) },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
