import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FlexLayoutModule} from '@angular/flex-layout'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faGithubAlt, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import {faAngleUp, faCode} from '@fortawesome/free-solid-svg-icons'
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {MarkdownModule} from 'ngx-markdown'
import {InlineSVGModule} from 'ng-inline-svg'
import {ContentSectionComponent} from './components/content-section/content-section.component'
import {FlamesComponent} from './components/flames/flames.component'
import {FlexBlockComponent} from './components/flex-block/flex-block.component'
import {FooterComponent} from './components/footer/footer.component'
import {JumbotronComponent} from './components/jumbotron/jumbotron.component'
import {CodeBlockComponent} from './components/code-block.component'
import {ContextMenuComponent} from './components/context-menu/context-menu.component'
import {WebPageComponent} from './web-page.component'
import {DocumentationComponent} from './components/documentation/documentation.component'
import {ScrollDirective} from './directives/scroll.directive'
import {ContextMenuActiveDirective} from './components/context-menu/context-menu-active.directive'
import {ScrollTopComponent} from './components/scroll-top/scroll-top.component'
import {ScrollService} from './services/scroll.service'

@NgModule({
    declarations: [
        WebPageComponent,
        ContentSectionComponent,
        FlamesComponent,
        FlexBlockComponent,
        FooterComponent,
        JumbotronComponent,
        CodeBlockComponent,
        ContextMenuComponent,
        DocumentationComponent,
        ScrollTopComponent,
        ScrollDirective,
        ContextMenuActiveDirective,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        HttpClientModule,
        MarkdownModule.forRoot({loader: HttpClient}),
        InlineSVGModule.forRoot(),
    ],
    providers: [ScrollService],
    exports: [WebPageComponent],
})
export class WebPageModule {
    constructor() {
        library.add(faLinkedinIn, faGithubAlt, faAngleUp, faCode)
    }
}
