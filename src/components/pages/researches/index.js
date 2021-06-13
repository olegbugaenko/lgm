import {connect} from 'react-redux';
import ResearchesComponent from './researches';
import {getResearches} from './../../../state/researches/selector';
import {purchaseResearch} from "../../../state/researches/actions";

const mapStateToProps = (state, props) => ({
    researches: getResearches(state)?.filter(one => one.isAvailable && one.level < one.maxQuantity),
});

const mapDispatchToProps = dispatch => ({
    research: ({researchId, qty}) => dispatch(purchaseResearch({researchId, qty}))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResearchesComponent);
