import {connect} from 'react-redux';
import MenuComponent from './menu';
import {navigate} from './../../../state/navigation/actions';

const mapStateToProps = (state, props) => ({
    page: state.app.navigation.page,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: page => dispatch(navigate(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
