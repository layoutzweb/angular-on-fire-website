import {Component, OnInit, ViewChild} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {MarkdownService} from 'ngx-markdown';
import {environment} from '../../environments/environment';
import {JumbotronComponent} from './components/jumbotron/jumbotron.component';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Component({
    selector: 'app-web-page',
    templateUrl: './web-page.component.html',
    styleUrls: ['./web-page.component.scss'],
    preserveWhitespaces: true
})
export class WebPageComponent implements OnInit {

    @ViewChild('jumbotronRef', {static: true}) jumbotronRef: JumbotronComponent;
    @ViewChild('documentation', {static: true}) documentationRef: JumbotronComponent;

    config: any;
    defaults = {
        title: '',
        description: '',
        social: {
            facebook: false,
            twitter: false
        }
    };
    docsSource = 'https://raw.githubusercontent.com/layoutzweb/angular-on-fire/next/README.md';
    manifestUrl = 'https://cdn.jsdelivr.net/gh/layoutzweb/angular-on-fire@master/package.json';
    docsMarkdown: string;
    version$: Observable<string>;
    isHandset$: Observable<boolean>;

    constructor(private title: Title,
                private meta: Meta,
                private http: HttpClient,
                public layout: BreakpointObserver,
                private markdownService: MarkdownService) {
        this.config = {...this.defaults, ...(environment.page || {})};
        this.isHandset$ = this.layout.observe([
            Breakpoints.Handset,
            Breakpoints.TabletPortrait
        ]).pipe(map(result => result.matches));
    }

    ngOnInit(): void {
        this.seo();
        this.docs();
        this.version();
        this.version$ = this.version();
    }

    toString(object: any): string {
        return JSON.stringify(object, null, 4);
    }

    version(): Observable<string> {
        return this.http.get(this.manifestUrl).pipe(
            map((response: any) => response.version),
            catchError(() => null)
        );
    }

    docs(): void {
        this.markdownService.getSource(this.docsSource)
            .subscribe(response => {
                if (response) {
                    const split = response.split('## [Getting Started](#getting-started)');
                    this.docsMarkdown = split[1];
                }
            });
    }

    seo(): void {
        const {title, description, url, social} = this.config;

        // Site metadata
        this.title.setTitle(title);
        this.meta.addTag({name: 'description', content: description});

        if (social) {
            if (social.twitter) {
                // Twitter metadata
                this.meta.addTag({name: 'twitter:card', content: 'summary'});
                this.meta.addTag({name: 'twitter:site', content: '@AngularUniv'});
                this.meta.addTag({name: 'twitter:title', content: this.title.getTitle()});
                this.meta.addTag({name: 'twitter:description', content: description});
                this.meta.addTag({name: 'twitter:text:description', content: description});
                // this.meta.addTag({name: 'twitter:image', content: 'https://avatars3.githubusercontent.com/u/16628445?v=3&s=200'});
            }

            if (social.facebook) {
                // Facebook metadata
                this.meta.addTag({name: 'og:url', content: url});
                this.meta.addTag({name: 'og:type', content: 'website'});
                this.meta.addTag({name: 'og:title', content: this.title.getTitle()});
                this.meta.addTag({name: 'og:description', content: this.config.description});
                // this.meta.addTag({name: 'og:image', content: description});
            }
        }
    }
}
