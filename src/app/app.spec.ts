import { TestBed, fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';
import { App } from './app';
import { AppObject } from './app.po';

function changeInputValue(input: HTMLInputElement, value: string) {
  input.value = value;
  input.dispatchEvent(new KeyboardEvent('input'));
  input.dispatchEvent(new KeyboardEvent('blur'));
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('init state', async () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(App);
    const app = new AppObject(fixture.nativeElement);
    await vi.runAllTimersAsync();
    expect(app.building.nicknameEditor.rows.length).toBe(1);
    expect(app.building.saveButton.disabled).toBe(false);
    vi.useRealTimers();
  });

  it('add nickname', async () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(App);
    const app = new AppObject(fixture.nativeElement);
    await vi.runAllTimersAsync();
    expect(app.building.nicknameEditor.rows.length).toBe(1);
    app.building.nicknameEditor.addButton.click();
    await vi.runAllTimersAsync();
    expect(app.building.nicknameEditor.rows.length).toBe(2);
    vi.useRealTimers();
  });

  it('delete nickname', async () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(App);
    const app = new AppObject(fixture.nativeElement);
    await vi.runAllTimersAsync();
    expect(app.building.nicknameEditor.rows.length).toBe(1);
    app.building.nicknameEditor.rows[0].deleteButton.click();
    await vi.runAllTimersAsync();
    expect(app.building.nicknameEditor.rows.length).toBe(0);
    vi.useRealTimers();
  });

  it('save button state', async () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(App);
    const app = new AppObject(fixture.nativeElement);
    await vi.runAllTimersAsync();
    expect(app.building.saveButton.disabled).toBe(false);
    changeInputValue(app.building.nicknameEditor.rows[0].input, 'test');
    await vi.runAllTimersAsync();
    expect(app.building.saveButton.disabled).toBe(true);
    changeInputValue(app.building.nicknameEditor.rows[0].input, 'asax');
    await vi.runAllTimersAsync();
    expect(app.building.saveButton.disabled).toBe(false);
    vi.useRealTimers();
  });

});
