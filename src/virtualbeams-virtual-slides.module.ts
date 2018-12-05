import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VirtualBeamsVirtualSlides } from './components/virtualbeams-virtual-slides.component';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    // declare all components that your module uses
    VirtualBeamsVirtualSlides
  ],
  imports: [
    IonicModule
  ],
  exports: [
    // export the component(s) that you want others to be able to use
    VirtualBeamsVirtualSlides
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VirtualBeamsVirtualSlidesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: VirtualBeamsVirtualSlidesModule,
      providers: [ ]
    };
  }
}

