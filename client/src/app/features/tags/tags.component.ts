import { Component, OnInit } from '@angular/core';
import { MessagesService } from '@services/messages.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListboxChangeEvent } from 'primeng/listbox';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'mc-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
    // tags: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    tagsObservable!: Observable<string[]>;
    tags: string[] = [];

    selectedTag!: string;
    filteredTags!: string[];

    usersTags$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    selectedUserTags: string[] = [];

    constructor(private messagesService: MessagesService) {}

    ngOnInit() {
        this.messagesService.getTags.subscribe((tags) => {
            if (Array.isArray(tags)) {
                this.tags = tags;
            }
        });
    }

    filterTag($event: AutoCompleteCompleteEvent) {
        const filtered: string[] = [];
        const query = $event.query;

        for (let i = 0; i < this.tags.length; i++) {
            let tag = this.tags[i];
            if (tag.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(tag);
            }
        }

        this.filteredTags = filtered;
    }

    onSubmitSelect($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            if (
                this.selectedTag &&
                !this.usersTags$.value.includes(this.selectedTag)
            ) {
                this.usersTags$.next([
                    ...this.usersTags$.value,
                    this.selectedTag,
                ]);

                this.messagesService.setFilter(this.selectedTag);
                this.selectedTag = '';
            }
        }
    }

    onFilterChange($event: ListboxChangeEvent) {
        this.usersTags$.next([
            ...this.usersTags$.value.filter((item) => item !== $event.value),
        ]);
        this.messagesService.removeFilter($event.value);
    }
}
