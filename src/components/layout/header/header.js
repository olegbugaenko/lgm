import React from 'react';
import ReactTooltip from 'react-tooltip';
import BigNumber from './../../shared/BigNumber';
import Bar from './../../shared/bar';
import './styles.css';

const HeaderComponent = ({resources, healthFactor, happinessFactor}) => {
    return (<div className={'header'}>
        <div className={'inline-container'}>
            {resources.map(res => (<React.Fragment>
                    <div className={'resource-box'} data-tip data-for={"resourse-"+res.name.replace(/[\s]/,'')} data-place="bottom">
                        <span className={'resourceTitle'}>{res.name}</span>
                        {' '}
                        <span className={'resourceValue'}><BigNumber value={Math.floor(res.value)}/></span>
                        <Bar progress={Math.floor(res.value)} max={Math.floor(res.max)}/>
                    </div>
                <ReactTooltip id={"resourse-"+res.name.replace(/[\s]/,'')} className={'tooltip'}>
                    <p>{res.name}</p>
                    <p>Income: <BigNumber value={res.income}/></p>
                    <p>Max: <BigNumber value={Math.floor(res.max)}/></p>
                    {('freeLabour' in res) && typeof res.freeLabour !== 'undefined' && res.freeLabour != null
                        ? (<p>Free workers: {res.freeLabour}</p>) : null}
                </ReactTooltip>
            </React.Fragment>))}
            <div className={'resource-box'}>
                <span className={'resourceTitle'}>Health: </span>
                {' '}
                <span className={'resourceValue'}>{Math.round(100*healthFactor)} %</span>
            </div>
            <div className={'resource-box'}>
                <span className={'resourceTitle'}>Happiness: </span>
                {' '}
                <span className={'resourceValue'}>{Math.round(100*happinessFactor)} %</span>
            </div>
        </div>
    </div>)
}

export default HeaderComponent;
