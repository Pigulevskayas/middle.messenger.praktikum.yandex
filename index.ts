import Router from './src/modules/router.ts';
import AuthController from './src/controllers/auth-controller.ts';
import Error404Page from './src/pages/error/error404/error404.ts';
import Error500Page from './src/pages/error/error500/error500.ts';
import LoginPage from './src/pages/auth/login';
import RegPage from './src/pages/auth/registration';
import ProfilePage from './src/pages/profile';
import ChatPage from './src/pages/chat';


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
