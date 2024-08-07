import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLeftComponent } from './page-left.component';

describe('PageLeftComponent', () => {
  let component: PageLeftComponent;
  let fixture: ComponentFixture<PageLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
