import {
    Directive,
    EventEmitter,
    HostListener,
    OnDestroy,
    Output,
} from '@angular/core'
import {AofScrollEvent} from '../interfaces'
import {ScrollService} from '../services/scroll.service'
import {Subscription} from 'rxjs'

@Directive({
    selector: '[appScrollDirective]',
})
export class ScrollDirective implements OnDestroy {
    /**
     * Scroll event emitter
     */
    @Output() scrolled = new EventEmitter<AofScrollEvent>()

    private listener: Subscription

    constructor(private service: ScrollService) {
        this.listener = this.scrolled.subscribe((e: AofScrollEvent) =>
            this.service.update(e)
        )
    }

    /**
     * Scroll event listener
     */
    @HostListener('scroll', ['$event'])
    onListenerTriggered(event: any): void {
        const {
            scrollTop,
            scrollLeft,
            scrollHeight,
            clientHeight,
            clientWidth,
        } = event.target
        console.log('event', event)
        // Calculate the scroll percentage
        const percentage = Math.round(
            (scrollTop / (scrollHeight - clientHeight)) * 100
        )

        // Only update if has changed
        if (this.service.top() !== scrollTop) {
            // Emit the event
            this.scrolled.emit({
                percentage,
                client: {
                    height: clientHeight,
                    width: clientWidth,
                },
                height: scrollHeight,
                top: scrollTop,
                left: scrollLeft,
                target: event.target,
            })
        }
    }

    ngOnDestroy() {
        this.listener.unsubscribe()
    }
}
