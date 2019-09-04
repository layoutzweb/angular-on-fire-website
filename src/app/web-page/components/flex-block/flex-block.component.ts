import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core'

@Component({
    selector: 'app-flex-block',
    template: `
        <div
            class="aof-flex-box"
            [ngClass]="classNames"
            fxLayout="column"
            [fxLayout.gt-sm]="reverse ? 'row-reverse' : 'row'"
            fxLayoutAlign="center flex-start"
            fxLayoutGap="40px"
        >
            <figure [fxFlex]="figureSize" *ngIf="image || icon">
                <img
                    *ngIf="image && !isSvg"
                    src="/assets/{{ image }}"
                    [alt]="title || ''"
                />
                <div
                    *ngIf="image && isSvg"
                    inlineSVG="/assets/{{ image }}"
                    [forceEvalStyles]="true"
                ></div>
                <fa-icon *ngIf="icon" [icon]="icon" [size]="iconSize"></fa-icon>
            </figure>
            <div>
                <h3 *ngIf="title">{{ title }}</h3>
                <p *ngIf="content">{{ content }}</p>
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['./flex-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class FlexBlockComponent implements OnChanges {
    @Input() name: string
    @Input() image?: string
    @Input() icon?: string[]
    @Input() title?: string
    @Input() content?: string
    @Input() reverse?: boolean
    @Input() dense = false
    @Input() figureSize: boolean | string = false

    classNames: {[name: string]: boolean}
    isSvg: boolean
    iconSize = '1x'

    ngOnChanges(changes: SimpleChanges): void {
        this.classNames = {}

        if ('name' in changes) {
            this.classNames[`aof-flex-block-${this.name}`] = true
        }

        if ('reverse' in changes) {
            this.classNames['aof-flex-block-reversed'] = this.reverse
        }

        if ('dense' in changes) {
            this.classNames['aof-flex-block-dense'] = this.dense
        }

        this.isSvg = this.image && this.image.substr(-3) === 'svg'

        if (this.icon && this.icon.length === 3) {
            this.iconSize = this.icon.pop()
        }
    }
}
