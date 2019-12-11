import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';

@NgModule({
  declarations: [ ImagePickerComponent ],
  imports: [
    CommonModule
  ],
  exports: [ ImagePickerComponent ]
})
export class SharedModule { }
