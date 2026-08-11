import type { User } from "@shared/models";

export type ChatMessages = {
  author: Pick<User, "name" | "surname">;
  message: string;
  messageTime: string;
  isRead: boolean;
  isSended: boolean;
  isMine: boolean;
};

export const chatsMessages: {
  chatId: number;
  messages: ChatMessages[];
}[] = [
  {
    chatId: 1,
    messages: [
      {
        author: {
          name: "Roman",
          surname: "Abramenko",
        },
        message: "Lorem ipsum",
        messageTime: "10:22",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Anatoly",
          surname: "Shushkodmov",
        },
        message: "Lorem ipsum",
        messageTime: "10:23",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "12:02",
        isRead: true,
        isSended: true,
        isMine: true,
      },
      {
        author: {
          name: "Roman",
          surname: "Abramenko",
        },
        message: "Lorem ipsum",
        messageTime: "12:25",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "12:27",
        isRead: true,
        isSended: true,
        isMine: true,
      },
      {
        author: {
          name: "Anatoly",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "15:02",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: false,
        isMine: true,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: true,
        isMine: true,
      },
    ],
  },
  {
    chatId: 2,
    messages: [
      {
        author: {
          name: "Anatoliy",
          surname: "Shushkodmov",
        },
        message: "Lorem ipsum",
        messageTime: "10:22",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Roman",
          surname: "Abramenko",
        },
        message: "Lorem ipsum",
        messageTime: "10:23",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "12:02",
        isRead: true,
        isSended: true,
        isMine: true,
      },
      {
        author: {
          name: "Roman",
          surname: "Abramenko",
        },
        message: "Lorem ipsum",
        messageTime: "12:25",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Anatoliy",
          surname: "Shushkodmov",
        },
        message: "Lorem ipsum",
        messageTime: "12:27",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Anatoliy",
          surname: "Shushkodmov",
        },
        message: "Lorem ipsum",
        messageTime: "15:02",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: false,
        isMine: true,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: true,
        isMine: true,
      },
    ],
  },
  {
    chatId: 3,
    messages: [
      {
        author: {
          name: "Svetlana",
          surname: "Shushkodomova",
        },
        message: "Lorem ipsum",
        messageTime: "10:22",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Anatoly",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "10:23",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "12:02",
        isRead: true,
        isSended: true,
        isMine: true,
      },
      {
        author: {
          name: "Svetlana",
          surname: "Shushkodomova",
        },
        message: "Lorem ipsum",
        messageTime: "12:25",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "12:27",
        isRead: true,
        isSended: true,
        isMine: true,
      },
      {
        author: {
          name: "Anatoly",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "15:02",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: false,
        isMine: true,
      },
      {
        author: {
          name: "Svetlana",
          surname: "Shushkodomova",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: true,
        isMine: true,
      },
    ],
  },
  {
    chatId: 4,
    messages: [
      {
        author: {
          name: "Roman",
          surname: "Abramenko",
        },
        message: "Lorem ipsum",
        messageTime: "10:22",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Roman",
          surname: "Abramenko",
        },
        message: "Lorem ipsum",
        messageTime: "10:23",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "12:02",
        isRead: true,
        isSended: true,
        isMine: true,
      },
      {
        author: {
          name: "Roman",
          surname: "Abramenko",
        },
        message: "Lorem ipsum",
        messageTime: "12:25",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "12:27",
        isRead: true,
        isSended: true,
        isMine: true,
      },
      {
        author: {
          name: "Roman",
          surname: "Abramenko",
        },
        message: "Lorem ipsum",
        messageTime: "15:02",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: false,
        isMine: true,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: true,
        isMine: true,
      },
    ],
  },
  {
    chatId: 5,
    messages: [
      {
        author: {
          name: "Anatoliy",
          surname: "Shushkodmov",
        },
        message: "Lorem ipsum",
        messageTime: "10:22",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Anatoliy",
          surname: "Shushkodmov",
        },
        message: "Lorem ipsum",
        messageTime: "10:23",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "12:02",
        isRead: true,
        isSended: true,
        isMine: true,
      },
      {
        author: {
          name: "Anatoliy",
          surname: "Shushkodmov",
        },
        message: "Lorem ipsum",
        messageTime: "12:25",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Anatoliy",
          surname: "Shushkodmov",
        },
        message: "Lorem ipsum",
        messageTime: "12:27",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Anatoliy",
          surname: "Shushkodmov",
        },
        message: "Lorem ipsum",
        messageTime: "15:02",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: false,
        isMine: true,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: true,
        isMine: true,
      },
    ],
  },
  {
    chatId: 6,
    messages: [
      {
        author: {
          name: "Svetlana",
          surname: "Shushkodomova",
        },
        message: "Lorem ipsum",
        messageTime: "10:22",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Svetlana",
          surname: "Shushkodomova",
        },
        message: "Lorem ipsum",
        messageTime: "10:23",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "12:02",
        isRead: true,
        isSended: true,
        isMine: true,
      },
      {
        author: {
          name: "Svetlana",
          surname: "Shushkodomova",
        },
        message: "Lorem ipsum",
        messageTime: "12:25",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "12:27",
        isRead: true,
        isSended: true,
        isMine: true,
      },
      {
        author: {
          name: "Svetlana",
          surname: "Shushkodomova",
        },
        message: "Lorem ipsum",
        messageTime: "15:02",
        isRead: true,
        isSended: true,
        isMine: false,
      },
      {
        author: {
          name: "Konstantin",
          surname: "Shushkodomov",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: false,
        isMine: true,
      },
      {
        author: {
          name: "Svetlana",
          surname: "Shushkodomova",
        },
        message: "Lorem ipsum",
        messageTime: "17:32",
        isRead: false,
        isSended: true,
        isMine: true,
      },
    ],
  },
];
