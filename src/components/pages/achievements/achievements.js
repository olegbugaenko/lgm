import React from 'react';
import classnames from 'classnames';
import './styles.css';


const AchievementsComponent = ({achievements}) => {
    return (<div className={'achievements'}>
            {achievements.map(one => (<div className={'research-box'}>
                <div className={'inline-container'}>
                    <div className={'left'}>
                        <div className={'title-item'}>
                            <span className={'buildingTitle'}>{one.name}</span>
                            {' '}
                            <span className={'buildingLevel'}>{one.level}</span>
                        </div>
                        <div className={'description'}>
                            {one.description}
                        </div>
                        <div className={'nextLevel'}>
                            Next level:
                            {one.requirementsMeta.map(a => (
                                <p className={classnames('requirement', {isMissing: !a.isEnought})}>
                                    {a.name}
                                    {' '}
                                    {`${Math.floor(a.present)}/${a.required}`}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>))}
    </div>)
}

export default AchievementsComponent;
