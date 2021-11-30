import ProfileAPI from '../api/profile-api';
import { ProfileData, SearchData, PasswordData } from '../api/profile-api';
import UserData from '../api/auth-api';
import { store } from '../store/index';
import { setUser, deleteUser, setError } from '../store/user';

class ProfileController {
	private api: ProfileAPI;

	constructor() {
	    this.api = new ProfileAPI();
	}

	async profile(data: ProfileData): Promise<UserData | void> {
		try {
			const result = await this.api.profile(data);
			store.dispatch(setUser(result));
		} catch(e) {
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async password(data: PasswordData): Promise<UserData | void> {
		try {
			const result = await this.api.password(data);
			if(result){
				store.dispatch(setUser(result));
			}
		} catch(e) {
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async avatar(data: any) {
		try {
			const result = await this.api.avatar(data);
			store.dispatch(setUser(result));
		} catch(e) {
			store.dispatch(setError(e));
		}
	}

	async search(data: SearchData) {
	    try {
	      const result = await this.api.search(data);
	      store.dispatch(setUser(result));
	      return result;
	    } catch (e) {
	      	store.dispatch(setError(e as { reason: string }));
	    }
	}

	async searchUserId(data: SearchData) {
	    try {
	      const result = await this.api.search(data);
	      return result[0]['id'];
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

export default new ProfileController();
