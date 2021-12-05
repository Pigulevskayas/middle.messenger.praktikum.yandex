import { Profile } from './profile';
import { connect } from '../../store/index';
import { withRouter } from '../../modules/router';

export default withRouter(connect((state) => ({ user: state.user || {} }), Profile));
