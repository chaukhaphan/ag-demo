import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { A11yModule } from '@angular/cdk/a11y';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    A11yModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatBadgeModule,
  ],
  exports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    A11yModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatBadgeModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class MaterialModule {}
