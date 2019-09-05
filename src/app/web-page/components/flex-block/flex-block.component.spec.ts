import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {FlexLayoutModule} from '@angular/flex-layout'
import {FlexBlockComponent} from './flex-block.component'
import {InlineSVGModule} from 'ng-inline-svg'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {SimpleChange} from '@angular/core'

describe('FlexBox', () => {
    let fixture: ComponentFixture<FlexBlockComponent>
    let instance: FlexBlockComponent
    let compiled: any

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule,
                InlineSVGModule.forRoot(),
                FontAwesomeModule,
            ],
            declarations: [FlexBlockComponent],
        })

        fixture = TestBed.createComponent(FlexBlockComponent)
        instance = fixture.debugElement.componentInstance
        compiled = fixture.debugElement.nativeElement
    }))

    it('should create', () => {
        expect(instance).toBeDefined()
    })

    // Responsive Checks
    it('should display mobile layout as a column', () => {
        expect(
            compiled.querySelector('.aof-flex-box').getAttribute('fxlayout')
        ).toEqual('column')
    })

    it('should display greater than mobile layout as a row', () => {
        fixture.detectChanges()
        expect(
            compiled
                .querySelector('.aof-flex-box')
                .getAttribute('ng-reflect-fx-layout.gt-sm')
        ).toEqual('row')
    })

    it('should align content equally in all sizes', () => {
        fixture.detectChanges()
        const box = compiled.querySelector('.aof-flex-box')
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
            dense: new SimpleChange(null, instance.dense, true)
        })

        fixture.detectChanges()

        const {classList} = compiled.querySelector('.aof-flex-box')

        expect(classList.contains('aof-flex-block-test')).toBeTruthy()
        expect(classList.contains('aof-flex-block-reversed')).toBeTruthy()
        expect(classList.contains('aof-flex-block-text-reversed')).toBeTruthy()
        expect(classList.contains('aof-flex-block-dense')).toBeTruthy()
    })

    it('should set a reverse the row display', () => {
        instance.reverse = true

        fixture.detectChanges()

        expect(
            compiled
                .querySelector('.aof-flex-box')
                .getAttribute('ng-reflect-fx-layout.gt-sm')
        ).toEqual('row-reverse')
    })
})
