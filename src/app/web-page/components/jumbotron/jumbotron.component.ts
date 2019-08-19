import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Input,
    ViewEncapsulation
} from '@angular/core';


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

    innerHeight: number = window.innerHeight;

    constructor(public element: ElementRef) {}

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerHeight > this.innerHeight) {
            this.innerHeight = window.innerHeight;
        }
    }
}

