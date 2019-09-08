import {Component, ElementRef, HostListener, Input} from '@angular/core'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {ScrollService} from '../../services/scroll.service'
import {FooterComponent} from '../footer/footer.component'

@Component({
    selector: 'app-scroll-top',
    template: `
        <div
            class="aof-scroll-top"
            [ngClass]="{'aof-at-bottom': bottom$ | async}"
            [ngStyle]="{bottom: (offset$ | async) + 'px'}"
            *ngIf="on$ | async"
        >
            <a href="#top" (click)="scrollTo($event)">
                <fa-icon [icon]="['fas', 'angle-up']" size="2x"></fa-icon>
            </a>
        </div>
    `,
    styleUrls: ['./scroll-top.component.scss'],
})
export class ScrollTopComponent {
    /**
     * The element in the top of the page
     */
    @Input() target: ElementRef

    /**
     * The footer reference so we can figure the bottom offset
     */
    @Input() footerRef: FooterComponent

    on$: Observable<boolean>
    bottom$: Observable<boolean>
    offset$: Observable<number>
    bottomOffset = 180

    constructor(private scroll: ScrollService) {
        this.on$ = this.scroll.position$.pipe(
            map(e => {
                return e.top > 300
            })
        )

        this.offset$ = this.scroll.position$.pipe(
            map(e => {
                const diff = e.height - (e.top + e.client.height)
                if (diff < this.bottomOffset) {
                    return this.bottomOffset
                }
                return 0
            })
        )

        this.bottom$ = this.offset$.pipe(
            map(offset => {
                return offset > 0
            })
        )
    }

    scrollTo(event: MouseEvent): void {
        event.preventDefault()
        event.stopPropagation()
        const {offsetTop, offsetLeft} = this.target.nativeElement
        this.scroll.scrollTo({left: offsetLeft, top: offsetTop})
    }

    @HostListener('window:resize', ['$event'])
    setBottomOffset(e) {
        if (e) {
            const {nativeElement} = this.footerRef.element
            const footerContainer = nativeElement.firstChild
            this.bottomOffset = footerContainer.offsetHeight
        }
    }
}
