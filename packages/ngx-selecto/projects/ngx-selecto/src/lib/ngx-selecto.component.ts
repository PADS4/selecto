import {
  Component, ElementRef,
  AfterViewInit, OnDestroy, OnChanges, SimpleChanges, ViewChild, Input, Output, OnInit, EventEmitter,
} from '@angular/core';
import VanillaSelecto, {
  CLASS_NAME, OPTIONS, SelectoOptions, PROPERTIES, EVENTS,
} from 'selecto';
import { NgxSelectoInterface } from './ngx-selecto.interface';
import { NgxSelectoEvents } from './types';

@Component({
  selector: 'ngx-selecto',
  template: `
    <div [class]="selectionClassName" #el></div>
  `,
  styles: []
})
export class NgxSelectoComponent
  extends NgxSelectoInterface
  implements OnDestroy, AfterViewInit, OnChanges, SelectoOptions, NgxSelectoEvents {
  @ViewChild('el', { static: false }) elRef: ElementRef;
  @Input() target: SelectoOptions['target'];
  @Input() container: SelectoOptions['container'];
  @Input() dragContainer: SelectoOptions['dragContainer'];
  @Input() selectableTargets: SelectoOptions['selectableTargets'];
  @Input() selectByClick: SelectoOptions['selectByClick'];
  @Input() selectFromInside: SelectoOptions['selectFromInside'];
  @Input() continueSelect: SelectoOptions['continueSelect'];
  @Input() toggleContinueSelect: SelectoOptions['toggleContinueSelect'];
  @Input() keyContainer: SelectoOptions['keyContainer'];
  @Input() hitRate: SelectoOptions['hitRate'];
  @Input() scrollOptions: SelectoOptions['scrollOptions'];
  @Output() dragStart: NgxSelectoEvents['dragStart'];
  @Output() selectStart: NgxSelectoEvents['selectStart'];
  @Output() select: NgxSelectoEvents['select'];
  @Output() selectEnd: NgxSelectoEvents['selectEnd'];
  @Output() keydown: NgxSelectoEvents['keydown'];
  @Output() keyup: NgxSelectoEvents['keyup'];
  @Output() scroll: NgxSelectoEvents['scroll'];
  public selectionClassName = CLASS_NAME;

  constructor() {
    super();
    EVENTS.forEach(name => {
      (this as any)[name] = new EventEmitter();
    });
  }
  ngAfterViewInit(): void {
    const options: Partial<SelectoOptions> = {};

    OPTIONS.forEach(name => {
      if (name in this) {
        (options as any)[name] = this[name];
      }
    });
    this.selecto = new VanillaSelecto({
      ...options,
      target: this.elRef.nativeElement,
    });

    const selecto = this.selecto;

    EVENTS.forEach(name => {
      selecto.on(name, e => {
        this[name].emit(e as any);
      });
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const selecto = this.selecto;

    if (!selecto) {
      return;
    }
    for (const name in changes) {
      if (PROPERTIES.indexOf(name as any) < -1) {
        continue;
      }
      const { previousValue, currentValue } = changes[name];

      if (previousValue === currentValue) {
        continue;
      }
      selecto[name] = currentValue;
    }
  }
  ngOnDestroy() {
    this.selecto.destroy();
  }
}
