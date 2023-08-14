import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form } from '@shared/types/form.interface';

export interface Tag {
    id: string;
    name: string;
}

export interface Message {
    id: string;
    content: string;
    tags: Tag[];
    timestamp: Date;
}

type MessageForm = Pick<Message, 'content'>;

@Component({
    selector: 'mc-messenger',
    templateUrl: './messenger.component.html',
    styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
    virtualMessages!: Message[];
    messageForm!: FormGroup<Form<MessageForm>>;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.messageForm = this.formBuilder.nonNullable.group({
            content: [''],
        });

        this.virtualMessages = [
            {
                id: '0',
                content: 'First message',
                tags: [{ id: '0', name: '#first' }],
                timestamp: new Date(Date.now()),
            },
            {
                id: '1',
                content: 'Second message',
                tags: [{ id: '0', name: '#first' }],
                timestamp: new Date(Date.now()),
            },
            {
                id: '2',
                content: 'Third message',
                tags: [{ id: '0', name: '#first' }],
                timestamp: new Date(Date.now()),
            },
            {
                id: '3',
                content: 'Fourth message',
                tags: [{ id: '0', name: '#first' }],
                timestamp: new Date(Date.now()),
            },
            {
                id: '4',
                content: 'Fifth message',
                tags: [{ id: '0', name: '#first' }],
                timestamp: new Date(Date.now()),
            },
            {
                id: '5',
                content: 'Sixth message',
                tags: [{ id: '0', name: '#first' }],
                timestamp: new Date(Date.now()),
            },
            {
                id: '6',
                content: 'Seventh message',
                tags: [{ id: '0', name: '#first' }],
                timestamp: new Date(Date.now()),
            },
            {
                id: '7',
                content: 'Eighth message',
                tags: [{ id: '0', name: '#first' }],
                timestamp: new Date(Date.now()),
            },
        ];
    }

    loadUsersLazy($event: TableLazyLoadEvent) {}
}
