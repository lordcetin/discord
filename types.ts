/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server as NetServer,Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

import { Server,User,Member } from '@prisma/client';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & {profile: User})[];
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};