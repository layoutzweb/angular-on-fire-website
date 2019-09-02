import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core'

export interface ContextMenuAction {
    label: string
    name: string
    target: string
    action: (action: ContextMenuAction) => void
}

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent {
    @Input() name: string
    @Input() items: ContextMenuAction[]

    active: string

    handleClick(e: MouseEvent, name: string): void {
        this.active = name

        if (
            name in this.items &&
            typeof this.items[name].action === 'function'
        ) {
            e.stopPropagation()
            e.preventDefault()

            this.items[name].action(this.items[name], e)
        }
    }
}
