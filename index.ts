import TemporaryPage from './src/pages/error/temporary/temporary.ts';
import Error404Page from './src/pages/error/error404/error404.ts';
import Error500Page from './src/pages/error/error500/error500.ts';
import LoginPage from './src/pages/auth/login/login.ts';
import RegPage from './src/pages/auth/registration/registration.ts';
import ProfilePage from './src/pages/profile/profile.ts';
import ChatPage from './src/pages/chat/chat.ts';

let path = window.location.pathname;
let page;

console.log('path', path)

function render(query: string, block: string) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
	return root;
}

switch(path) {
  case '/login':
    page = LoginPage;
    break;

  case '/registration':
    page = RegPage;
    break;

  case '/profile':
    page = ProfilePage;
    break;

  case '/chats':
    page = ChatPage;
    break;

  case '/error500':
    page = Error500Page;
    break;

  case '/error404':
    page = Error404Page;
    break;

  case '/':
    page = TemporaryPage;
    break;
}

render(".app", page);


