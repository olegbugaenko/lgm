import {connect} from 'react-redux';
import AchievementsComponent from './achievements';
import {getWithMeta} from "../../../state/achievements/selector";

const mapStateToProps = (state, props) => ({
    achievements: getWithMeta(state),
});

const mapDispatchToProps = dispatch => ({
    // research: ({researchId, qty}) => dispatch(purchaseResearch({researchId, qty}))
})

export default connect(mapStateToProps, null)(AchievementsComponent);
