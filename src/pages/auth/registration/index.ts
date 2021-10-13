import Registration from './registration.ts';
import { connect } from '../../../store/index.ts';
import { withRouter } from '../../../modules/router.ts';
export { Registration } from './registration';

export default withRouter(connect((state: any) => ({user: state.user || {}}), Registration));
