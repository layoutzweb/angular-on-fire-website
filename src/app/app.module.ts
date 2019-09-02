import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FlexLayoutModule} from '@angular/flex-layout'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {WebPageModule} from './web-page/web-page.module'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {PageNotFoundComponent} from './not-found/not-found.component'

@NgModule({
    declarations: [AppComponent, PageNotFoundComponent],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        FlexLayoutModule,
        FontAwesomeModule,
        WebPageModule,
        AppRoutingModule,
    ],
    bootstrap: [AppComponent],
    exports: [FontAwesomeModule, WebPageModule],
})
export class AppModule {}
