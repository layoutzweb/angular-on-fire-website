import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {MarkdownService} from 'ngx-markdown'
import {ContextMenuAction} from '../context-menu/context-menu.component'

@Component({
    selector: 'app-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent implements OnInit {
    @Input() config: any

    @Output() context = new EventEmitter<ContextMenuAction[]>()

    docs: string
    readme = 'README.md'

    constructor(private markdownService: MarkdownService) {}

    ngOnInit(): void {
        this.markdownService
            .getSource([this.config.githubCdnUrl, this.readme].join('/'))
            .subscribe(response => {
                if (response) {
                    this.buildContextMenu(response)

                    const split = response.split(
                        '## [Getting Started](#getting-started)'
                    )

                    this.docs = split[1]
                }
            })
    }

    buildContextMenu(source: string): void {
        const doc = document
            .createRange()
            .createContextualFragment(
                this.markdownService.compile(source, true)
            )

        const context = []

        doc.querySelectorAll('h2').forEach(item => {
            context.push({
                name: item.id,
                label: item.textContent,
                target: item.id,
            })
        })

        this.context.emit(context)
    }
}
