import { Injectable } from '@nestjs/common';
import * as webPush from 'web-push';

const vapidKeys = {
  publicKey:
    'BGzVkVEnpeQWOqPlwkq2zeO0tlqmbHDjw3pwalFYc9hxU7q-v8EbM1rQvuhn-ZbgJxGZNhDbxzQnTJwaBTW35io',
  privateKey: 'A5JIFN3ggsIhWyzwxJ16_2nS9A_hMLE2RkIjT4lOdP8',
};

const options = {
  vapidDetails: {
    subject: 'mailto: <rachel4w2@naver.com>',
    publicKey: vapidKeys.publicKey,
    privateKey: vapidKeys.privateKey,
  },
  TTL: 60,
};

@Injectable()
export class NotificationService {
  sendNotification(subscription) {
    webPush
      .sendNotification(
        subscription,
        JSON.stringify({
          notification: {
            title: 'Hello World!',
            body: 'Here you can add some text',
          },
        }),
        options,
      )
      .then((log) => {
        console.log('Push notification sent.');
        console.log(log);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
