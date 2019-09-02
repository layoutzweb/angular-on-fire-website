import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
} from '@angular/core'

@Directive({
    selector: '[appContextMenuActive]',
})
export class ContextMenuActiveDirective implements OnChanges {
    @Input('appContextMenuActive') current: string

    constructor(private element: ElementRef, private renderer: Renderer2) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.getTarget() === this.current) {
            this.renderer.addClass(
                this.element.nativeElement,
                'aof-selected-context'
            )
        } else {
            this.renderer.removeClass(
                this.element.nativeElement,
                'aof-selected-context'
            )
        }
    }

    getTarget(): string {
        return this.element.nativeElement.hash.substr(1)
    }
}
