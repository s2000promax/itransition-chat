import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateMessageDto } from './dto';
import { Message, Tag } from '@prisma/client';

@Injectable()
export class AppService {
    constructor(private readonly prisma: PrismaService) {}

    async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        const { content } = createMessageDto;

        const tagNames: string[] = this.extractTags(content);

        const tagsToAttach: Tag[] = await Promise.all(
            tagNames.map(async (name): Promise<Tag> => {
                const existingTag: Tag = await this.prisma.tag.findUnique({
                    where: { name },
                });
                if (existingTag) {
                    return existingTag;
                }

                return this.prisma.tag.create({ data: { name } });
            }),
        );

        const message: Message = await this.prisma.message.create({
            data: { content },
        });

        await Promise.all(
            tagsToAttach.map((tag: Tag) =>
                this.prisma.messageTag.create({
                    data: {
                        messageId: message.id,
                        tagId: tag.id,
                    },
                }),
            ),
        );

        return message;
    }

    async getMessages(tags?: string[]): Promise<Message[]> {
        if (tags) {
            if (!Array.isArray(tags)) {
                tags = [tags];
            }

            if (tags.length > 0) {
                return this.prisma.message.findMany({
                    where: {
                        tags: {
                            some: {
                                tag: {
                                    name: {
                                        in: tags,
                                    },
                                },
                            },
                        },
                    },
                    include: {
                        tags: true,
                    },
                });
            }
        }

        return this.prisma.message.findMany({
            include: {
                tags: true,
            },
        });
    }

    private extractTags(content: string): string[] {
        const regex: RegExp = /#\w+/g;
        const tags: RegExpMatchArray | [] = content.match(regex) || [];
        return tags.map((tag: string | undefined) => tag.slice(1));
    }
}
