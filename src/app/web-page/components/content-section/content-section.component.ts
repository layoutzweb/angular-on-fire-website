import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core'

@Component({
    selector: 'app-content-section',
    template: `
        <section
            [id]="name"
            class="aof-section aof-{{ name }}-section"
            fxLayout="row"
            fxLayoutAlign="center center"
        >
            <ng-content select="[aof-before-section-content]"></ng-content>
            <div class="aof-section-container" fxFlex fxFlex.gt-sm="960px">
                <h2 *ngIf="title">{{ title }}</h2>
                <p *ngIf="description">{{ description }}</p>
                <div class="aof-section-content" fxLayout="column">
                    <ng-content></ng-content>
                </div>
            </div>
            <ng-content select="[aof-after-section-content]"></ng-content>
        </section>
    `,
    styleUrls: ['./content-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ContentSectionComponent {
    @Input() name: string
    @Input() title?: string
    @Input() description?: string
}
