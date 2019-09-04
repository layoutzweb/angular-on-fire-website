import {Component, OnInit} from '@angular/core'
import {Meta, Title} from '@angular/platform-browser'
import {MarkdownService} from 'ngx-markdown'
import {environment} from '../../environments/environment'
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators'
import {BehaviorSubject, Observable} from 'rxjs'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {ContextMenuAction} from './components/context-menu/context-menu.component'

@Component({
    selector: 'app-web-page',
    templateUrl: './web-page.component.html',
    styleUrls: ['./web-page.component.scss'],
    preserveWhitespaces: true,
})
export class WebPageComponent implements OnInit {
    config: any
    defaults = {
        title: '',
        description: '',
        social: {
            facebook: false,
            twitter: false,
        },
    }
    docsSource = 'README.md'
    manifest = 'package.json'
    docsMarkdown: string
    version$: Observable<string>
    isHandset$: Observable<boolean>
    active: string

    contextMenu = new BehaviorSubject<ContextMenuAction[]>([])
    contextMenu$ = this.contextMenu.asObservable()

    constructor(
        private title: Title,
        private meta: Meta,
        private http: HttpClient,
        public layout: BreakpointObserver,
        private markdownService: MarkdownService
    ) {
        this.config = {...this.defaults, ...(environment.page || {})}
        this.isHandset$ = this.layout
            .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
            .pipe(map(result => result.matches))
    }

    ngOnInit(): void {
        const {social} = this.config
        this.seo()
        this.docs()

        console.log('env', environment)

        if (social) {
            if (social.twitter) {
                this.addTwitterTags()
            }
            if (social.facebook) {
                this.addFacebookTags()
            }
        }

        this.version$ = this.version()
    }

    toString(object: any): string {
        return JSON.stringify(object, null, 4)
    }

    version(): Observable<string> {
        return this.http
            .get([this.config.githubCdnUrl, this.manifest].join('/'))
            .pipe(
                map((response: any) => response.version),
                catchError(() => null)
            )
    }

    docs(): void {
        this.markdownService
            .getSource([this.config.githubCdnUrl, this.docsSource].join('/'))
            .subscribe(response => {
                if (response) {
                    const split = response.split(
                        '## [Getting Started](#getting-started)'
                    )

                    this.docsMarkdown = split[1]
                }
            })
    }

    seo(): void {
        const {title, description} = this.config

        // Site metadata
        this.title.setTitle(title)
        this.meta.addTag({name: 'description', content: description})
    }

    addTwitterTags() {
        const {description} = this.config

        this.meta.addTag({name: 'twitter:card', content: 'summary'})
        this.meta.addTag({
            name: 'twitter:site',
            content: '@AngularUniv',
        })
        this.meta.addTag({
            name: 'twitter:title',
            content: this.title.getTitle(),
        })
        this.meta.addTag({
            name: 'twitter:description',
            content: description,
        })
        this.meta.addTag({
            name: 'twitter:text:description',
            content: description,
        })
        // this.meta.addTag({name: 'twitter:image',
        // content: 'https://avatars3.githubusercontent.com/u/
        // 16628445?v=3&s=200'
        // });
    }

    addFacebookTags() {
        const {baseUrl} = environment
        const {title, description} = this.config

        this.meta.addTag({name: 'og:url', content: baseUrl})
        this.meta.addTag({name: 'og:type', content: 'website'})
        this.meta.addTag({
            name: 'og:title',
            content: title,
        })
        this.meta.addTag({
            name: 'og:description',
            content: description,
        })
        // this.meta.addTag({name: 'og:image', content: description});
    }

    setActiveDocsMenu(name: string): void {
        this.active = name
    }

    isActive(name: string) {
        return this.active === name
    }
}
