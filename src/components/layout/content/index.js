import {connect} from 'react-redux';
import ContentComponent from './content';

const mapStateToProps = (state, props) => ({
    page: state.app.navigation.page,
});


export default connect(mapStateToProps, null)(ContentComponent);
