import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });


  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'sportsEmotionApp' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('sportsEmotionApp');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull()
  });

  it('should render router-outler with css classes', () => {
    const divElement = compiled.querySelector('#routerOutletDiv');
    expect(divElement).toBeTruthy();
    expect(divElement?.classList.contains('w-full')).toBeTrue();
    expect(divElement?.classList.contains('h-full')).toBeTrue();

  })
});
