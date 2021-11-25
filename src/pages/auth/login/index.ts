import Login from './login.ts';
import { connect } from '../../../store/index.ts';
import { withRouter } from '../../../modules/router.ts';
export { Login } from './login';

export default withRouter(connect(state => ({user: state.user || {}}), Login));