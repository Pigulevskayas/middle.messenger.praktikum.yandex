import AuthAPI from '../api/auth-api.ts';
import { LoginData, RegData, UserData } from '../api/auth-api.ts';
import { store } from '../store/index.ts';
import { setUser, deleteUser, setError } from '../store/user.ts';

class AuthController {
	private api: AuthAPI;

	constructor() {
	    this.api = new AuthAPI();
	}

	async registration(data: RegData) {
		try {
			await this.api.registration(data);
			await this.getUserData();
		} catch(e) {
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async login(data: LoginData) {
	    try {
	      await this.api.login(data);
	      await this.getUserData();
	    } catch (e) {
	      	store.dispatch(setError(e as { reason: string }));
	    }
	}

	async logout() {
	    try {
	      await this.api.logout();
	      store.dispatch(deleteUser());
	    } catch (e) {
	      store.dispatch(setError(e as { reason: string }));
	    }
	}

	async getUserData(): Promise<UserData | void> {
	    try {
	      const user = await this.api.read();
	      store.dispatch(setUser(user));
	      return user;
	    } catch (e) {
	      store.dispatch(deleteUser());
	    }
	}
}

export default new AuthController();
