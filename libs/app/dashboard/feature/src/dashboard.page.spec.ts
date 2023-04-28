import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPage} from './dashboard.page';
import { NgxsModule } from '@ngxs/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardPageComponent', () =>{
    let component: DashboardPage;
    let fixture: ComponentFixture<DashboardPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardPage],
            imports: [NgxsModule.forRoot([])],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        }).compileComponents()
        fixture = TestBed.createComponent(DashboardPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    })  
})