import React from 'react';
import ReactTooltip from 'react-tooltip';
import './styles.css';

const HeaderComponent = ({resources}) => {
    return (<div className={'header'}>
        <div className={'inline-container'}>
            {resources.map(res => (<React.Fragment>
                    <div className={'resource-box'} data-tip data-for={"resourse-"+res.name.replace(/[\s]/,'')} data-place="bottom">
                        <span className={'resourceTitle'}>{res.name}</span>
                        {' '}
                        <span className={'resourceValue'}>{Math.floor(res.value)}</span>
                    </div>
                <ReactTooltip id={"resourse-"+res.name.replace(/[\s]/,'')} className={'tooltip'}>
                    <p>{res.name}</p>
                    <p>Income: {res.income.toFixed(2)}</p>
                    <p>Max: {Math.floor(res.max)}</p>
                    {('freeLabour' in res) && typeof res.freeLabour !== 'undefined' && res.freeLabour != null
                        ? (<p>Free workers: {res.freeLabour}</p>) : null}
                </ReactTooltip>
            </React.Fragment>))}
        </div>
    </div>)
}

export default HeaderComponent;
