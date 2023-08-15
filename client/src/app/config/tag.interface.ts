import { MessageTag } from './messageTag.interface';

export interface Tag {
    id: string;
    name: string;
    messages: MessageTag[];
}
