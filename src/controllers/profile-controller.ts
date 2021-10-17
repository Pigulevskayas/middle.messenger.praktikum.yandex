import ProfileAPI from '../api/profile-api.ts';
import { ProfileData, SearchData, PasswordData } from '../api/profile-api.ts';
import { store } from '../store/index.ts';
import { setUser, deleteUser, setError } from '../store/user.ts';

class ProfileController {
	private api: ProfileAPI;

	constructor() {
	    this.api = new ProfileAPI();
	}

	async profile(data: ProfileData): Promise<UserData | void> {
		try {
			const result = await this.api.profile(JSON.stringify(data));
			try {
				if(result){
					// console.log('result', result);
					store.dispatch(setUser(result));
				}
			} catch(e) {
				store.dispatch(setError(e as { reason: string }));
			}
		} catch(e) {
			// console.log(e);
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async password(data: PasswordData): Promise<UserData | void> {
		try {
			const result = await this.api.password(JSON.stringify(data));
			
			try {
				if(result){
					// console.log('result', result);
					store.dispatch(setUser(result));
				}
			} catch(e) {
				store.dispatch(setError(e as { reason: string }));
			}
			
		} catch(e) {
			console.log(e);
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async avatar(data: any) {
		try {
			const result = await this.api.avatar(data);
			try {
				if(result){
					// console.log('result', result);
					store.dispatch(setUser(result));
				}
			} catch(e) {
				store.dispatch(setError(e as { reason: string }));
			}
			
		} catch(e) {
			console.log(e);
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async search(data: SearchData) {
	    try {
	      const result = await this.api.search(JSON.stringify(data));
	      store.dispatch(setUser(result));
	      return result;
	    } catch (e) {
	    	console.log(e)
	      	store.dispatch(setError(e as { reason: string }));
	      	console.log(store.getState())
	    }
	}

	async searchUserId(data: SearchData) {
	    try {
	      const result = await this.api.search(JSON.stringify(data));
	      console.log('searchUserId result', result)
	      return result[0]['id'];
	    } catch (e) {
	    	console.log(e)
	      	store.dispatch(setError(e as { reason: string }));
	      	console.log(store.getState())
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
