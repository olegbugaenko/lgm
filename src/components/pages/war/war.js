import React from 'react';
import classnames from 'classnames';
import './styles.css';


const BattleComponent = ({war, startBattle, stopBattle}) => {
    return (<div className={'war-box'}>
        <div className={classnames('upper-panel','inline-container')}>
        {!war.isBattleInProgress && (<button className={'main-action'} onClick={(e)=>startBattle()}>Start battle</button>)}
        {war.isBattleInProgress && (<button className={'main-action'} onClick={(e)=>stopBattle()}>Stop battle</button>)}
        <p>Level {war.level}; Zone {war.stack}</p>
        </div>
        {war.isBattleInProgress && (<div className={'war-container'}>
            <div className={'inline-container'}>
                <div className={'left'}>
                    <p>Amount:  {war.warriors.amount} / {war.warriors.initialAmount}</p>
                    <p>HP:  {war.warriors.hpRemaining} / {war.warriors.initialHP}</p>
                    <p>Damage:  {war.warriors.attack}</p>
                </div>
                <div className={'right'}>
                    <p>Amount:  {war.enemy.amount} / {war.enemy.initialAmount}</p>
                    <p>HP:  {war.enemy.hpRemaining} / {war.enemy.initialHP}</p>
                    <p>Damage:  {war.enemy.attack}</p>
                </div>
            </div>
        </div>)}
    </div>)
}

export default BattleComponent;
