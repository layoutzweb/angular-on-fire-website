import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {WebPageComponent} from './web-page/web-page.component'
import {PageNotFoundComponent} from './not-found/not-found.component'

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        component: WebPageComponent,
    },
    {
        path: 'not-found',
        component: PageNotFoundComponent,
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
