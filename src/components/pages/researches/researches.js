import React from 'react';
import classnames from 'classnames';
import './styles.css';

const resourcesRequiredArea = (resources) => {
    return resources && Object.values(resources).map(one => (<div
        className={classnames(
            'resourceContainer',
            {isUnavailable: !one.isEnough}
            )
        }><span className={'resourceTitle'}>{one.title}</span><span className={'need'}>{Math.round(one.required)}</span></div>))
}

const ResearchesComponent = ({researches, research}) => {
    return (<div className={'researches'}>
            {researches.map(one => (<div className={'research-box'}>
                <div className={'title-item'}>
                    <span className={'buildingTitle'}>{one.name}</span>
                    {' '}
                    <span className={'buildingLevel'}>{one.level}</span>
                    {one.maxQuantity && one.maxQuantity < 1.e+3 && (<span> of {one.maxQuantity}</span>)}
                </div>
                <div className={'inline-container'}>
                    <div className={'left'}>

                        <div className={'description'}>
                            {one.description}
                        </div>
                    </div>
                    <div className={'buildArea'}>
                        {resourcesRequiredArea(one.buildable?.resources)}
                        <div className={'build-cta'}>
                            <button
                                className={classnames("main-action",{"is-disabled": !one.buildable?.isAvailable || one.isMaxLevelReach || !one.isCalculated})}
                                onClick={()=>research({researchId: one.id, qty: 1})}
                            >Research</button>
                        </div>
                    </div>
                </div>
            </div>))}
    </div>)
}

export default ResearchesComponent;
