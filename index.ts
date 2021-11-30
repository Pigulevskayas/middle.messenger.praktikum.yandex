import Router from './src/modules/router';
import AuthController from './src/controllers/auth-controller';
import Error404Page from './src/pages/error/error404/error404';
import Error500Page from './src/pages/error/error500/error500';
import LoginPage from './src/pages/auth/login/login';
import RegPage from './src/pages/auth/registration/registration';
import ProfilePage from './src/pages/profile/profile';
import ChatPage from './src/pages/chat/chat';
// import EventBus from './modules/event-bus.ts';

import './src/index.css';

AuthController.getUserData()
  .then(() => {
    const router = new Router();

    router
      .use("/", LoginPage)
      .use("/sign-up", RegPage)
      .use("/messenger", ChatPage)
      .use("/settings", ProfilePage)
      .use("/error-404", Error404Page)
      .use("/error", Error500Page)
      .start();
  });
