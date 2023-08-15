import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from '@shared/types/form.interface';
import { Observable, Subscription } from 'rxjs';
import { MessagesService } from '@services/messages.service';

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
export class MessengerComponent implements OnInit, OnDestroy {
    messages$!: Observable<Message[]>;
    messageForm!: FormGroup<Form<MessageForm>>;

    isSending: boolean = false;

    receiverSubscription!: Subscription;
    senderSubscription!: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private messagesService: MessagesService,
    ) {}

    ngOnInit() {
        this.messages$ = this.messagesService.getMessages;
        this.receiverSubscription = this.messagesService
            .pollMessages()
            .subscribe();
        this.messageForm = this.formBuilder.nonNullable.group({
            content: ['', [Validators.required]],
        });
    }

    onMessageSend() {
        if (!this.messageForm.invalid) {
            this.isSending = true;

            const { content } = this.messageForm.getRawValue();

            this.senderSubscription = this.messagesService
                .sendMessage(content)
                .subscribe({
                    next: () => {
                        this.messageForm.reset();
                        this.isSending = false;
                    },
                    error: () => {
                        this.isSending = false;
                    },
                });
        }
    }

    parseContent(content: string): string[] {
        return content.match(/#\w+/g) || [];
    }

    removeTags(content: string): string {
        return content.replace(/#\w+/g, '');
    }

    ngOnDestroy() {
        this.senderSubscription.unsubscribe();
        this.receiverSubscription.unsubscribe();
    }
}
