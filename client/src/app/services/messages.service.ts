import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, interval, Observable, switchMap, tap } from 'rxjs';
import { Message } from '@config/message.interface';

@Injectable({
    providedIn: 'root',
})
export class MessagesService {
    private messagesSubject = new BehaviorSubject<Message[]>([]);
    private messages$: Observable<Message[]> =
        this.messagesSubject.asObservable();

    private tags = new BehaviorSubject<string[]>([]);

    private filters = new BehaviorSubject<string[]>([]);

    constructor(private http: HttpClient) {}

    get getMessages(): Observable<Message[]> {
        return this.messages$;
    }

    get getTags() {
        return this.tags;
    }

    fetchAllMessages(): Observable<Message[]> {
        return this.http
            .post<Message[]>(environment.apiUrl + '/messages', {
                tags: this.filters.value,
            })
            .pipe(
                tap((users) => {
                    this.messagesSubject.next(users.reverse());
                }),
            );
    }

    sendMessage(message: string) {
        return this.http
            .post<Message>(environment.apiUrl + '/message', {
                content: message,
            })
            .pipe(
                tap({
                    next: (response) => {},
                }),
            );
    }

    fetchAllTags(): Observable<string[]> {
        return this.http.get<string[]>(environment.apiUrl + '/tags').pipe(
            tap((tags) => {
                this.tags.next(tags);
            }),
        );
    }

    setFilter(item: string) {
        this.filters.next([...this.filters.value, item]);
    }

    removeFilter(item: string) {
        this.filters.next([...this.filters.value.filter((f) => f !== item)]);
    }

    pollMessages(tags?: string[]): Observable<Message[] | string[]> {
        return interval(1000)
            .pipe(switchMap(() => this.fetchAllMessages()))
            .pipe(switchMap(() => this.fetchAllTags()));
    }
}
