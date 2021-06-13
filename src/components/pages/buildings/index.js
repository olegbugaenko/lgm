import {connect} from 'react-redux';
import BuildingsComponent from './buildings';
import {getBuildings} from './../../../state/buildings/selector';
import {purchaseBuilding, setWorkers, autoFillSet, setQty} from "../../../state/buildings/actions";

const mapStateToProps = (state, props) => ({
    buildings: getBuildings(state)?.filter(one => one.isAvailable),
    territoryMax: 120 + state.app.expedition?.territoryGain || 0,
    territoryUsed: state.app.buildings.territoryUsed || 0,
    expedition: state.app.expedition,
});

const mapDispatchToProps = dispatch => ({
    build: ({buildingId, qty}) => dispatch(purchaseBuilding({buildingId, qty})),
    onHire: (payload) => dispatch(setWorkers(payload)),
    onAutofillSet: payload => dispatch(autoFillSet(payload)),
    onQtySet: payload => dispatch(setQty(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuildingsComponent);
