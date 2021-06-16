import React, {useState} from 'react';
import classnames from 'classnames';
import Bar from './../../shared/bar';
import BigNumber from './../../shared/BigNumber';
import './styles.css';

const resourcesRequiredArea = (resources) => {
    return resources && Object.values(resources).map(one => (<div
        className={classnames(
            'resourceContainer',
            {isUnavailable: !one.isEnough}
            )
        }><span className={'resourceTitle'}>{one.title}</span><span className={'need'}>{<BigNumber value={Math.round(one.required)}/>}</span></div>))
}

const workersController = (building, onChange, onAutofillSet) => {
    return (<div className={'workers-control'}>
        <div className={'inline-container'}>
            <button className={classnames("main-action",{
                "is-disabled": building.workers < 1,
            })}
            onClick={(e) => onChange({buildingId: building.id, workers: building.workers - 1})}
            >-</button>
            <input
                type={"text"}
                onChange={(e) => onChange({buildingId: building.id, workers: e.target.value})}
                value={building.workers}
                />
            <button className={classnames("main-action",{
                "is-disabled": building.workers >= building.maxWorkers,
            })}
                    onClick={(e) => onChange({buildingId: building.id, workers: building.workers + 1})}
            >+</button>
        </div>
        <div className={'inline-container'}>
            <label>
            <input
            type={"checkbox"}
            checked={building.autofill?.isTurnedOn}
            onChange={(e) => onAutofillSet({
                buildingId: building.id,
                isAutofill: !building.autofill?.isTurnedOn,
                autofillPercentage: building.autofill?.percentage || 0
            })}
            />
            Auto-hire
            </label>
            <input
                type="number"
                min={0}
                max={100}
                onChange={(e) => onAutofillSet({
                    buildingId: building.id,
                    autofillPercentage: Math.min(100, e.target.value),
                    isAutofill: building.autofill?.isTurnedOn
                })}
                value={building.autofill?.percentage || 0}
            />
            <span>% of max {building.maxWorkers}</span>
        </div>
    </div> )
}

const BuildingsComponent = ({buildings, build, onHire, onAutofillSet, onQtySet, territoryUsed, territoryMax, expedition}) => {
    const [tab, selectTab] = useState('')
    return (<React.Fragment>
        <div className={'filter-buildings'}>
            <div className={classnames('inline-container','filters')}>
                <div className={classnames('tab',{selected: !tab})} onClick={()=>selectTab('')}>
                    All
                </div>
                <div className={classnames('tab',{selected: tab === 'resources'})} onClick={()=>selectTab('resources')}>
                    Resources
                </div>
                <div className={classnames('tab',{selected: tab === 'residental'})} onClick={()=>selectTab('residental')}>
                    Residental
                </div>
                <div className={classnames('tab',{selected: tab === 'social'})} onClick={()=>selectTab('social')}>
                    Social
                </div>
                <div className={classnames('tab',{selected: tab === 'research'})} onClick={()=>selectTab('research')}>
                    Research
                </div>
                <div className={classnames('tab',{selected: tab === 'war'})} onClick={()=>selectTab('war')}>
                    War
                </div>
            </div>
            <div className={'territory'}>
                <div>
                    <span>Territory used:</span>
                    <span>{territoryUsed || 0} of {territoryMax || 0}</span>
                </div>
                <div className={'inline-container'}>
                    <span>Exploring zone {expedition.level}, {expedition.subLevelsProgress}</span>
                    <Bar progress={expedition.progress} max={expedition.maxProgress} />
                </div>
            </div>
        </div>
        <div className={'buildings'}>
            {buildings.filter(one => {
                if(!tab) return true;
                return one.category === tab;
            }).map(one => (<div className={'building-box'}>
                <div className={'inline-container'}>
                    <div className={'left'}>
                        <div className={'title-item'}>
                            <span className={'buildingTitle'}>{one.name}</span>
                            {' '}
                            <span className={'buildingLevel'}>{one.level}</span>
                        </div>
                    </div>
                    <div className={'workersArea'}>
                        {workersController(one, onHire, onAutofillSet)}
                    </div>
                    <div className={'buildArea'}>
                        {resourcesRequiredArea(one.buildable?.resources)}
                        <div className={'build-cta'}>
                            <input type="number" value={one.qty || 1} onChange={(e) => onQtySet({ buildingId: one.id, qty: e.target.value})} />
                            <button
                                className={classnames("main-action",{"is-disabled": !one.buildable?.isAvailable || one.isMaxLevelReach || !one.isCalculated || !one.isEnoughtTerritory})}
                                onClick={()=>build({buildingId: one.id, qty: one.qty})}
                            >Build</button>
                        </div>
                    </div>
                </div>
            </div>))}
        </div>
    </React.Fragment>)
}

export default BuildingsComponent;
