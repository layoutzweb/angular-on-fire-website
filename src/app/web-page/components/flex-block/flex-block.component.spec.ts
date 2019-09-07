import {ComponentFixture, TestBed} from '@angular/core/testing'
import {FlexLayoutModule} from '@angular/flex-layout'
import {FlexBlockComponent} from './flex-block.component'
import {InlineSVGModule} from 'ng-inline-svg'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {SimpleChange} from '@angular/core'
import {BreakpointObserver} from '@angular/cdk/layout'
import {BehaviorSubject} from 'rxjs'
import {
    faAngleUp,
    faBug,
    faCalendarCheck,
    faCode,
} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faGithubAlt, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import {HttpClientModule} from '@angular/common/http'

library.add(
    faLinkedinIn,
    faGithubAlt,
    faAngleUp,
    faCode,
    faBug,
    faCalendarCheck
)

class BreakpointObserverMock {
    private mediaObs = new BehaviorSubject<any>({matches: this.mobileLayout})

    constructor(public mobileLayout: boolean) {}

    observe() {
        return this.mediaObs.asObservable()
    }

    next(mobile?: boolean) {
        this.mediaObs.next({
            matches: mobile !== undefined ? mobile : this.mobileLayout,
        })
    }
}

describe('FlexBox', () => {
    let fixture: ComponentFixture<FlexBlockComponent>
    let instance: FlexBlockComponent
    let compiled: any
    let mediaObserver: BreakpointObserverMock

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule,
                InlineSVGModule.forRoot(),
                FontAwesomeModule,
                HttpClientModule,
            ],
            declarations: [FlexBlockComponent],
            providers: [
                {
                    provide: BreakpointObserver,
                    useValue: new BreakpointObserverMock(false),
                },
            ],
        })

        fixture = TestBed.createComponent(FlexBlockComponent)
        instance = fixture.debugElement.componentInstance
        compiled = fixture.debugElement.nativeElement
        mediaObserver = TestBed.get(BreakpointObserver)
    })

    it('should create', () => {
        expect(instance).toBeDefined()
    })

    it('should display greater than mobile layout as a row', () => {
        instance.ngOnChanges({
            reverse: new SimpleChange(null, instance.reverse, true),
        })

        mediaObserver.next()

        fixture.detectChanges()

        expect(
            compiled
                .querySelector('.aof-flex-box')
                .getAttribute('ng-reflect-fx-layout')
        ).toEqual('row')
    })

    it('should reverse the row display', () => {
        instance.reverse = true

        instance.ngOnChanges({
            reverse: new SimpleChange(null, instance.reverse, true),
        })

        mediaObserver.next()

        fixture.detectChanges()

        expect(
            compiled
                .querySelector('.aof-flex-box')
                .getAttribute('ng-reflect-fx-layout')
        ).toEqual('row-reverse')
    })

    it('should display as columns for mobile', () => {
        mediaObserver.next(true)

        fixture.detectChanges()

        expect(
            compiled
                .querySelector('.aof-flex-box')
                .getAttribute('ng-reflect-fx-layout')
        ).toEqual('column')
    })

    it('should display figure at 100% on mobile', () => {
        instance.image = 'my-image.png'

        mediaObserver.next(true)

        fixture.detectChanges()

        expect(
            compiled.querySelector('.aof-flex-box figure').getAttribute('style')
        ).toContain('width: 100%;')
    })

    it('should display figure at 40% greater than mobile', () => {
        instance.image = 'my-image.png'

        mediaObserver.next(false)

        fixture.detectChanges()

        expect(
            compiled.querySelector('.aof-flex-box figure').getAttribute('style')
        ).toContain('width: 40%;')
    })

    it('should set the icon size based on the icon input third array element', () => {
        instance.icon = ['fas', 'code', '2x']

        instance.ngOnChanges({
            icon: new SimpleChange(null, instance.icon, true),
        })

        fixture.detectChanges()

        expect(
            compiled
                .querySelector('.aof-flex-box > figure > fa-icon')
                .getAttribute('ng-reflect-size')
        ).toEqual('2x')

        expect(instance.icon).toHaveLength(2)
    })

    it('should detect image type svg', () => {
        instance.image = 'my-image.svg'

        instance.ngOnChanges({
            image: new SimpleChange(null, instance.image, true),
        })

        fixture.detectChanges()

        expect(
            compiled.querySelector(
                `.aof-flex-box figure > div[ng-reflect-inline-s-v-g="/assets/${instance.image}"]`
            )
        ).toBeTruthy()
    })

    it('should align content equally in all sizes', () => {
        fixture.detectChanges()
        const box = compiled.querySelector('.aof-flex-box')
        // check if there are any other layout attibutes
        const exists = box
            .getAttributeNames()
            .filter(
                name =>
                    name.search(new RegExp(/ng-reflect-fx-layout-align\..*/)) >
                    -1
            )

        // make sure the alignment is correct
        expect(box.getAttribute('fxlayoutalign')).toEqual('center flex-start')
        // make sure there is no other align rules set
        expect(exists.length).toEqual(0)
    })

    it('should display a gap of 40px for all sizes', () => {
        fixture.detectChanges()
        expect(
            compiled.querySelector('.aof-flex-box').getAttribute('fxlayoutgap')
        ).toEqual('40px')
    })

    // inputs
    it('should display a title', () => {
        instance.title = 'test'

        fixture.detectChanges()

        expect(compiled.querySelector('.aof-flex-box > div > h3')).toBeTruthy()
        expect(
            compiled.querySelector('.aof-flex-box > div > h3').textContent
        ).toEqual('test')
    })

    it('should display content', () => {
        instance.content = 'test'

        fixture.detectChanges()

        expect(compiled.querySelector('.aof-flex-box > div > p')).toBeTruthy()
        expect(
            compiled.querySelector('.aof-flex-box > div > p').textContent
        ).toEqual('test')
    })

    it('should set a input classes', () => {
        instance.name = 'test'
        instance.reverse = true
        instance.reverseText = true
        instance.dense = true

        instance.ngOnChanges({
            name: new SimpleChange(null, instance.name, true),
            reverse: new SimpleChange(null, instance.reverse, true),
            reverseText: new SimpleChange(null, instance.reverseText, true),
            dense: new SimpleChange(null, instance.dense, true),
        })

        fixture.detectChanges()

        const {classList} = compiled.querySelector('.aof-flex-box')

        expect(classList.contains('aof-flex-block-test')).toBeTruthy()
        expect(classList.contains('aof-flex-block-reversed')).toBeTruthy()
        expect(classList.contains('aof-flex-block-text-reversed')).toBeTruthy()
        expect(classList.contains('aof-flex-block-dense')).toBeTruthy()
    })
})
