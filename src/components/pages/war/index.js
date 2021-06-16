import {connect} from 'react-redux';
import BattleComponent from './war';
import {START_BATTLE, STOP_BATTLE} from "../../../state/war/actions";

const mapStateToProps = (state, props) => ({
    war: state.app.war,
});

const mapDispatchToProps = dispatch => ({
    startBattle: () => dispatch({ type: START_BATTLE}),
    stopBattle: () => dispatch({ type: STOP_BATTLE}),
})

export default connect(mapStateToProps, mapDispatchToProps)(BattleComponent);
