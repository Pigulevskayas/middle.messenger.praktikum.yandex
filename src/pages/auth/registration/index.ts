import Registration from './registration';
import { connect } from '../../../store/index';
import { withRouter } from '../../../modules/router';
export { Registration } from './registration';

export default withRouter(connect((state: any) => ({user: state.user || {}}), Registration));
