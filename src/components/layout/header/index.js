import {connect} from 'react-redux';
import HeaderComponent from './header';
import {getResources} from './../../../state/resources/selector';

const mapStateToProps = (state, props) => ({
    resources: getResources(state),
});

export default connect(mapStateToProps, null)(HeaderComponent);
