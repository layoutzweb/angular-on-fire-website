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
    templateUrl: './flex-block.component.html',
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
    @Input() reverse = false
    @Input() reverseText?: boolean
    @Input() dense = false
    @Input() figureSize: boolean | string = false

    classNames: {[name: string]: boolean}
    isSvg: boolean
    iconSize = '1x'

    ngOnChanges(changes: SimpleChanges): void {
        this.classNames = {}

        if ('name' in changes && this.name) {
            this.classNames[`aof-flex-block-${this.name}`] = true
        }

        if ('reverse' in changes) {
            this.classNames['aof-flex-block-reversed'] = this.reverse
        }

        if ('reverseText' in changes) {
            this.classNames['aof-flex-block-text-reversed'] = this.reverseText
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
