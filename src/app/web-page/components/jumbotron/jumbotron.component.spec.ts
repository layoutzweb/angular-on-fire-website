import {TestBed, ComponentFixture} from '@angular/core/testing'
import {FlexLayoutModule} from '@angular/flex-layout'
import {BrowserModule} from '@angular/platform-browser'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {FlamesComponent} from '../flames/flames.component'
import {JumbotronComponent} from './jumbotron.component'
import {InlineSVGModule} from 'ng-inline-svg'
import {HttpClientModule} from '@angular/common/http'

describe('Jumbotron', () => {
    let fixture: ComponentFixture<JumbotronComponent>
    let instance: JumbotronComponent
    let compiled: any

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                FlexLayoutModule,
                FontAwesomeModule,
                InlineSVGModule.forRoot(),
            ],
            declarations: [FlamesComponent, JumbotronComponent],
        })

        fixture = TestBed.createComponent(JumbotronComponent)
        instance = fixture.debugElement.componentInstance
        compiled = fixture.debugElement.nativeElement
    })

    it('should create a Jumbotron', () => {
        expect(instance).toBeTruthy()
    })

    it('should contain the Angular Logo', () => {
        const logoPath = 'assets/angular-logo-large.png'
        instance.logoPath = logoPath
        fixture.detectChanges()
        expect(compiled.querySelector('.aof-angular-logo img').src).toContain(
            logoPath
        )
    })

    it('should have a title', () => {
        const title = 'My Title'
        instance.heading = title
        fixture.detectChanges()
        expect(
            compiled.querySelector('.aof-jumbotron > div h1').textContent
        ).toEqual(title)
    })

    it('should have a description', () => {
        const description = 'My Description'
        instance.description = description
        fixture.detectChanges()
        expect(
            compiled.querySelector('.aof-jumbotron > div p').textContent
        ).toEqual(description)
    })

    it('should have a main action wth correct url', () => {
        expect(compiled.querySelectorAll('.aof-main-action').length).toEqual(2)
        expect(
            compiled.querySelector(
                ".aof-main-action[href='https://github.com/layoutzweb/angular-on-fire']"
            )
        ).toBeTruthy()
    })
})
