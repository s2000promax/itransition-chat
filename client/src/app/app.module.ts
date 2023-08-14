import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FooterModule } from '@shared/components/footer/footer.module';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { TagsModule } from '@features/tags/tags.module';
import { MessengerModule } from '@features/messenger/messenger.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FooterModule,
        PanelModule,
        SplitterModule,
        TagsModule,
        MessengerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
