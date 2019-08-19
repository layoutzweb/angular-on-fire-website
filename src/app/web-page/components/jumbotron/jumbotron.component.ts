import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Input,
    ViewEncapsulation
} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';


@Component({
    selector: 'app-jumbotron',
    templateUrl: './jumbotron.component.html',
    styleUrls: ['./jumbotron.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class JumbotronComponent {

    @Input() name: string;
    @Input() version: string;
    @Input() heading: string;
    @Input() description: string;
    @Input() logoPath: string;

    pageTitle: string;
    innerHeight: number = window.innerHeight;
    isHandset$: Observable<boolean>;

    constructor(public element: ElementRef,
                public layout: BreakpointObserver,
                public title: Title) {
        this.isHandset$ = this.layout.observe([
            Breakpoints.Handset
        ]).pipe(map(result => result.matches));

        this.pageTitle = this.title.getTitle();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerHeight > this.innerHeight) {
            this.innerHeight = window.innerHeight;
        }
    }
}

