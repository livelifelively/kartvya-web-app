import { Expression } from './expression';

export const mockExpressions: Expression[] = [
  {
    id: '1',
    parentId: null,
    text: 'I just deployed my first app on Heroku! 🎉',
    images: ['https://example.com/image1.jpg'],
    videos: [],
    createdAt: '2024-09-23T12:00:00Z',
    author: {
      id: 'user1',
      name: 'Alice Johnson',
      avatarUrl: 'https://example.com/avatar1.png',
    },
    supportCount: 120,
    opposeCount: 5,
    commentCount: 30,
    shareCount: 15,
    bookmarkCount: 10,
    childExpressions: [],
  },
  {
    id: '2',
    parentId: null,
    text: "What's the best way to learn React? Any tips?",
    images: [],
    videos: [],
    createdAt: '2024-09-25T13:15:00Z',
    author: {
      id: 'user2',
      name: 'Bob Smith',
      avatarUrl: 'https://example.com/avatar2.png',
    },
    supportCount: 75,
    opposeCount: 2,
    commentCount: 12,
    shareCount: 5,
    bookmarkCount: 8,
    childExpressions: [],
  },
  {
    id: '3',
    parentId: null,
    text: 'Just finished reading a great book on JavaScript! 📚',
    images: [],
    videos: [],
    createdAt: '2024-09-26T14:30:00Z',
    author: {
      id: 'user3',
      name: 'Charlie Brown',
      avatarUrl: 'https://example.com/avatar3.png',
    },
    supportCount: 200,
    opposeCount: 1,
    commentCount: 50,
    shareCount: 20,
    bookmarkCount: 25,
    childExpressions: [],
  },
  {
    id: '4',
    parentId: null,
    text: 'Can someone explain closures in JavaScript?',
    images: [],
    videos: [],
    createdAt: '2024-09-26T15:45:00Z',
    author: {
      id: 'user4',
      name: 'Diana Prince',
      avatarUrl: 'https://example.com/avatar4.png',
    },
    supportCount: 50,
    opposeCount: 0,
    commentCount: 8,
    shareCount: 3,
    bookmarkCount: 4,
    childExpressions: [],
  },
  {
    id: '5',
    parentId: null,
    text: 'Excited for the upcoming React conference! 🎤',
    images: [],
    videos: [],
    createdAt: '2024-09-26T16:00:00Z',
    author: {
      id: 'user5',
      name: 'Eve Adams',
      avatarUrl: 'https://example.com/avatar5.png',
    },
    supportCount: 95,
    opposeCount: 1,
    commentCount: 15,
    shareCount: 10,
    bookmarkCount: 6,
    childExpressions: [],
  },
  {
    id: '6',
    parentId: null,
    text: "I'm having trouble with my CSS layout. Help!",
    images: [],
    videos: [],
    createdAt: '2024-09-26T17:15:00Z',
    author: {
      id: 'user6',
      name: 'Frank Castle',
      avatarUrl: 'https://example.com/avatar6.png',
    },
    supportCount: 30,
    opposeCount: 3,
    commentCount: 25,
    shareCount: 2,
    bookmarkCount: 3,
    childExpressions: [],
  },
  {
    id: '7',
    parentId: null,
    text: 'Just completed a coding bootcamp! Ready for the job hunt! 💪',
    images: ['https://example.com/image2.jpg'],
    videos: [],
    createdAt: '2024-09-26T18:30:00Z',
    author: {
      id: 'user7',
      name: 'Grace Lee',
      avatarUrl: 'https://example.com/avatar7.png',
    },
    supportCount: 150,
    opposeCount: 0,
    commentCount: 40,
    shareCount: 12,
    bookmarkCount: 11,
    childExpressions: [],
  },
  {
    id: '8',
    parentId: null,
    text: 'Who else is excited for the new JavaScript features?',
    images: [],
    videos: [],
    createdAt: '2024-09-26T19:45:00Z',
    author: {
      id: 'user8',
      name: 'Henry Ford',
      avatarUrl: 'https://example.com/avatar8.png',
    },
    supportCount: 80,
    opposeCount: 4,
    commentCount: 10,
    shareCount: 5,
    bookmarkCount: 9,
    childExpressions: [],
  },
  {
    id: '9',
    parentId: null,
    text: 'I love using Tailwind CSS for styling!',
    images: [],
    videos: [],
    createdAt: '2024-09-26T20:00:00Z',
    author: {
      id: 'user9',
      name: 'Ivy Green',
      avatarUrl: 'https://example.com/avatar9.png',
    },
    supportCount: 120,
    opposeCount: 2,
    commentCount: 20,
    shareCount: 8,
    bookmarkCount: 7,
    childExpressions: [],
  },
  {
    id: '10',
    parentId: null,
    text: 'What are your thoughts on the latest React updates?',
    images: [],
    videos: [],
    createdAt: '2024-09-26T21:15:00Z',
    author: {
      id: 'user10',
      name: 'Jack Sparrow',
      avatarUrl: 'https://example.com/avatar10.png',
    },
    supportCount: 60,
    opposeCount: 1,
    commentCount: 5,
    shareCount: 3,
    bookmarkCount: 2,
    childExpressions: [],
  },
];
