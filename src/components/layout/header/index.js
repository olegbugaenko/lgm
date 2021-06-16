import {connect} from 'react-redux';
import HeaderComponent from './header';
import {getResources} from './../../../state/resources/selector';

const mapStateToProps = (state, props) => ({
    resources: getResources(state),
    healthFactor: state.app.buildings.healthFactor,
    happinessFactor: state.app.buildings.happinessFactor,
});

export default connect(mapStateToProps, null)(HeaderComponent);
