import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

@NgModule({
    declarations: [TagsComponent],
    imports: [CommonModule, AutoCompleteModule, FormsModule, ListboxModule],
    exports: [TagsComponent],
})
export class TagsModule {}
