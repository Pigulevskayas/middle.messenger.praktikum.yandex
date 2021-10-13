import Profile from './profile.ts';
import { connect } from '../../store/index.ts';
import { withRouter } from '../../modules/router.ts';

export default withRouter(connect((state: any) => ({
  user: state.user.profile
}), Profile));