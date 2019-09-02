import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    ViewEncapsulation,
} from '@angular/core'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {Title} from '@angular/platform-browser'
import {environment} from '../../../../environments/environment'

@Component({
    selector: 'app-jumbotron',
    templateUrl: './jumbotron.component.html',
    styleUrls: ['./jumbotron.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class JumbotronComponent implements OnInit {
    @Input() name: string
    @Input() version: string
    @Input() heading: string
    @Input() description: string
    @Input() logoPath: string
    @Input() config: any

    pageName: string
    pageTitle: string
    innerHeight: number = window.innerHeight
    isHandset$: Observable<boolean>

    constructor(
        public element: ElementRef,
        public layout: BreakpointObserver,
        public title: Title
    ) {
        this.isHandset$ = this.layout
            .observe([Breakpoints.Handset])
            .pipe(map(result => result.matches))
    }

    ngOnInit(): void {
        this.pageName = environment.page.name
        this.pageTitle = this.title.getTitle()
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event && window.innerHeight > this.innerHeight) {
            this.innerHeight = window.innerHeight
        }
    }
}
