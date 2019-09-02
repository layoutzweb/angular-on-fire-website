import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {Router} from '@angular/router'

@Component({
    selector: 'app-page-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PageNotFoundComponent implements OnInit {
    path: string

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.path = this.router.routerState.snapshot.url
    }
}
