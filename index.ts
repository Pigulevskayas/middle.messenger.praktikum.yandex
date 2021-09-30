import Router from './src/modules/router.ts';
import TemporaryPage from './src/pages/error/temporary/temporary.ts';
import Error404Page from './src/pages/error/error404/error404.ts';
import Error500Page from './src/pages/error/error500/error500.ts';
import LoginPage from './src/pages/auth/login/login.ts';
import RegPage from './src/pages/auth/registration/registration.ts';
import ProfilePage from './src/pages/profile/profile.ts';
import ChatPage from './src/pages/chat/chat.ts';

const router = new Router(".app");

router
  .use("/", ChatPage)
  .use("/registration", RegPage)
  .use("/chats", ChatPage)
  .use("/profile", ProfilePage)
  .start();
