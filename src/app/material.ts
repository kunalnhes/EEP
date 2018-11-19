import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';
import { NgModule } from '../../node_modules/@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class MaterialModule {}
