import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  swiperModules = [IonicSlides];
  
  tabList = [{
    id:'tab1',
    index:0,
    text:"Tab 1"
  },{
    id:'tab2',
    index:1,
    text:"Tab 2"
  },{
    id:'tab3',
    index:2,
    text:"Tab 3"
  },{
    id:'tab4',
    index:3,
    text:"Tab 4"
  }];

  public selectedTab: number = 0;
  private swiperInstance: any;
  constructor(
    private elementRef: ElementRef
  ) {}

  @ViewChild('swiper')
  set swiper(swiperRef: ElementRef) {
    /**
     * This setTimeout waits for Ionic's async initialization to complete.
     * Otherwise, an outdated swiper reference will be used.
     */
    setTimeout(() => {
      this.swiperInstance = swiperRef.nativeElement.swiper;
      this.swiperInstance.params.initialSlide = 0;
      this.swiperInstance.params.autoHeight = true;
      this.swiperInstance.params.updateOnWindowResize = true;
      this.swiperInstance.params.touchAngle = 30;
    }, 0);
  }

  segmentChange(event: any) {
    const selectedSegmentInfo = this.tabList.find(
      t => (t.id === event.detail.value || t.index === +event.detail.value)
    );
    if (selectedSegmentInfo) {
      this.swiperInstance?.slideTo(selectedSegmentInfo.index);
      this.updateSegmentChange(selectedSegmentInfo.id);
    }
  }

  updateSegmentChange(mailbox: string) {
    const selectedSegment = this.elementRef.nativeElement.querySelector('#' + mailbox);
    if (selectedSegment) {
      selectedSegment.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }

  slideChange() {
    const index = this.swiperInstance?.activeIndex;
    this.selectedTab = index;
  }

}
