import Login from './login';
import { connect } from '../../../store/index';
import { withRouter } from '../../../modules/router';
export { Login } from './login';

export default withRouter(connect(state => ({user: state.user || {}}), Login));