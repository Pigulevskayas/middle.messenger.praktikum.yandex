import { Chat } from './chat';
import { connect } from '../../store/index';
import { withRouter } from '../../modules/router';

export default withRouter(connect((state: any) => ({
  user: state.user.profile,
  chats: state.chats,
  messages: state.messages,
}), Chat));
