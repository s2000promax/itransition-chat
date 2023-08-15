import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './messenger.component';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';

@NgModule({
    declarations: [MessengerComponent],
    imports: [
        CommonModule,
        TableModule,
        SkeletonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextareaModule,
        TagModule,
    ],
    exports: [MessengerComponent],
})
export class MessengerModule {}
