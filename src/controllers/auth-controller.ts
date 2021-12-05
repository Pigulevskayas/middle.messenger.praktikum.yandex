import AuthAPI, { LoginData, RegData, UserData } from '../api/auth-api';
import { store } from '../store/index';
import { setUser, deleteUser, setError } from '../store/user';

class AuthController {
	private api: AuthAPI;

	constructor() {
		this.api = new AuthAPI();
	}

	async registration(data: RegData): Promise < { id: number } > {
		try {
			await this.api.registration(data);
			await this.getUserData();
		} catch (e) {
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async login(data: LoginData): Promise < void > {
		try {
			const res = await this.api.login(data);
			const res2 = await this.getUserData();
		} catch (e) {
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async logout(): Promise < void > {
		try {
			await this.api.logout();
			store.dispatch(deleteUser());
		} catch (e) {
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async getUserData(): Promise < UserData > {
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
