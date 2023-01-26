import { NgModule } from '@angular/core';

import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { RendererComponentsModuleLocal } from './renderer/renderer-components.module';
import { BasedAgGridAngularModule } from 'src/app/shared';

@NgModule({
  declarations: [TrackingComponent],
  imports: [
    SharedModule,
    TrackingRoutingModule,
    RendererComponentsModuleLocal,
    BasedAgGridAngularModule,
  ],
  exports: [],
})
export class TrackingModule {}
