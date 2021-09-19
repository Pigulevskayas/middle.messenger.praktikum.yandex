import TemporaryPage from './public/src/pages/error/temporary/temporary.ts';
import Error404Page from './public/src/pages/error/error404/error404.ts';
import Error500Page from './public/src/pages/error/error500/error500.ts';
import LoginPage from './public/src/pages/auth/login/login.ts';
import RegPage from './public/src/pages/auth/registration/registration.ts';
import ProfilePage from './public/src/pages/profile/profile.ts';
import ChatPage from './public/src/pages/chat/chat.ts';

//# sourceMappingURL=index.js.map

let path = window.location.pathname;
console.log(path)
let page;

function render(query: string, block: string) {
  const root = document.querySelector(query);
  // root.innerHTML = '';
  root.appendChild(block.getContent());
	return root;
}

switch(path) {
  case '/login':
  page = LoginPage;
  render(".app", page);
  break;

  case '/registration':
  page = RegPage;
  render(".app", page);
  break;

  case '/profile':
  page = ProfilePage;
  render(".app", page);
  break;

  case '/chats':
  page = ChatPage;
  render(".app", page);
  break;

  case '/error500':
  page = Error500Page;
  render(".app", page);
  break;

  case '/error404':
  page = Error404Page;
  render(".app", page);
  break;

  case '/':
  page = TemporaryPage;
  render(".app", page);
  break;
}

//app — root div


// render(".app", ProfilePage);
// render(".app", Error500Page);
// render(".app", Error404Page);
// render(".app", LoginPage);
// render(".app", RegPage);
// render(".app", ChatPage);
//render(".app", TemporaryPage);


