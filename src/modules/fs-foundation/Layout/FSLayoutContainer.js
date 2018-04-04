import { connect } from 'react-redux';

const mapStateToProps = (state) => ({ layout: state.layout });
const Container = (props) => props.renderContent();
export default connect(mapStateToProps)(Container);
