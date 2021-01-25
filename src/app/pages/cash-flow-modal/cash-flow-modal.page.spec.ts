import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashFlowModalPage } from './cash-flow-modal.page';

describe('CashFlowModalPage', () => {
  let component: CashFlowModalPage;
  let fixture: ComponentFixture<CashFlowModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashFlowModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashFlowModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
