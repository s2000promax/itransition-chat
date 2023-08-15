import { Tag } from './tag.interface';

export interface Message {
    id: string;
    content: string;
    timestamp: Date;
    tags: Tag[];
}
