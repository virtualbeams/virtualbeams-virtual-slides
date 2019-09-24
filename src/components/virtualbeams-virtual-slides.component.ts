import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'vb-virtual-slides',
  template: `
  <div class="swiper-container swiper-container-horizontal" [style.maxHeight]="'50px'" *ngIf="pager">
    <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" >
      <button class="swiper-pagination-bullet" [ngClass]="{ 'swiper-pagination-bullet-active': j === indexDisplayed, 'activated': j === indexDisplayed }" *ngFor="let b of items; let j = index"></button>
    </div>
  </div>
  <ion-slides
    (ionSlideAutoplay)="onSlideAutoplay($event)"
    (ionSlideAutoplayStart)="onSlideAutoplayStart($event)"
    (ionSlideAutoplayStop)="onSlideAutoplayStop($event)"
    (ionSlideDidChange)="onSlideDidChange($event)"
    (ionSlideDoubleTap)="onSlideDoubleTap($event)"
    (ionSlideDrag)="onSlideDrag($event)"
    (ionSlideNextEnd)="onSlideNextEnd($event)"
    (ionSlideNextStart)="onSlideNextStart($event)"
    (ionSlidePrevEnd)="onSlidePrevEnd($event)"
    (ionSlidePrevStart)="onSlidePrevStart($event)"
    (ionSlideReachEnd)="onSlideReachEnd($event)"
    (ionSlideReachStart)="onSlidePrevStart($event)"
    (ionSlideTap)="onSlideTap($event)"
    (ionSlideWillChange)="onSlideWillChange($event)">

    <ion-slide *ngFor="let item of renderItems; let i = index">
      <ng-container *ngTemplateOutlet="content, context: { $implicit: {item: item, index: getRealIndex(i)} }">
      </ng-container>
    </ion-slide>

  </ion-slides>
`
})
export class VirtualBeamsVirtualSlides {

  @Input()
  public items: any[];

  @Input()
  public pager: boolean;

  @Input()
  public set lockSwipeToNext(value: boolean) {
    if (typeof value === 'boolean' && this.slides) {
      this.slides.lockSwipeToNext(value);
    }
  }

  @Input()
  public set lockSwipeToPrev(value: boolean) {
    if (typeof value === 'boolean' && this.slides) {
      this.slides.lockSwipeToNext(value);
    }
  }

  @Output()
  public currentIndex: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public onLoadSlides: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideAutoplay: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideAutoplayStart: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideAutoplayStop: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideDidChange: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideDoubleTap: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideDrag: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideNextEnd: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideNextStart: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlidePrevEnd: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlidePrevStart: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideReachEnd: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideReachStart: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideTap: EventEmitter<Slides> = new EventEmitter<Slides>();

  @Output()
  public ionSlideWillChange: EventEmitter<Slides> = new EventEmitter<Slides>();

  @ContentChild('content') content: TemplateRef<any>;
  @ViewChild(Slides)
  public slides: Slides;

  indexDisplayed: number;
  start: number;
  end: number;
  renderItems: any[] = new Array(3);

  constructor() {
  }

  public initSlides() {
    const end = this.items.length > 2 ? 3 : this.items.length;
    this.indexDisplayed = 0;
    this.start = 0;
    this.end = end;
    this.renderItems = this.items.slice(0, end);
    this.emitCurrentIndex();
  }

  ngOnInit() {
    this.onLoadSlides.emit(this.slides);
    this.initSlides();
  }

  onSlideAutoplay(event: Slides) {
    this.ionSlideAutoplay.emit(event);
  }

  onSlideAutoplayStart(event: Slides) {
    this.ionSlideAutoplayStart.emit(event);
  }

  onSlideAutoplayStop(event: Slides) {
    this.ionSlideAutoplayStop.emit(event);
  }

  onSlideDidChange(event: Slides) {
    this.emitCurrentIndex();
    this.ionSlideDidChange.emit(event);
  }

  onSlideDoubleTap(event: Slides) {
    this.ionSlideDoubleTap.emit(event);
  }

  onSlideDrag(event: Slides) {
    this.ionSlideDrag.emit(event);
  }

  onSlideNextEnd(event: Slides) {
    if (this.end < this.items.length) {
      if (event._activeIndex === 2) this.sliceOriginalArray(++this.start, ++this.end);
      this.indexDisplayed++;
      this.slides.slideTo(1, 0, false);
    } else if (this.indexDisplayed < (this.items.length - 1)) {
      this.indexDisplayed++;
    }
    this.slides.onlyExternal = false;
    this.ionSlideNextEnd.emit(event);
  }

  onSlideNextStart(event: Slides) {
    this.ionSlideNextStart.emit(event);
  }

  onSlidePrevEnd(event: Slides) {
    const next = event._activeIndex == 0 && this.start == 0 ? 0 : 1;
    if (this.start > 0 && event._activeIndex == 0) {
      this.sliceOriginalArray(--this.start, --this.end);
    }
    if (this.start < this.indexDisplayed) {
      this.indexDisplayed--;
    }
    this.lockSwipeToNext = false;
    this.slides.slideTo(next, 0, false);
    this.slides.onlyExternal = false;
    this.ionSlidePrevEnd.emit(event);
  }

  onSlidePrevStart(event: Slides) {
    this.ionSlidePrevStart.emit(event);
  }

  onSlideReachEnd(event: Slides) {
    this.ionSlideReachEnd.emit(event);
  }

  onSlideReachStart(event: Slides) {
    this.ionSlideReachStart.emit(event);
  }

  onSlideTap(event: Slides) {
    this.ionSlideTap.emit(event);
  }

  onSlideWillChange(event: Slides) {
    this.slides.onlyExternal = true;
    this.ionSlideWillChange.emit(event);
  }

  public getRealIndex(currentIndex: number): number {
    let realIndex = this.start;
    switch (currentIndex) {
      case 1:
        realIndex += 1;
        break;
      case 2:
        realIndex += 2;
        break;
      case 3:
        realIndex = this.end - 1;
        break;
      default:
        break;
    }
    return realIndex;
  }

  private sliceOriginalArray(start, end) {
    this.renderItems = this.items.slice(start, end);
  }

  private emitCurrentIndex(): void {
    const activeIndex = this.slides.getActiveIndex();
    const realIndex = this.getRealIndex(activeIndex);
    this.currentIndex.emit(realIndex);
  }

}
