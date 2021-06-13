import React from 'react';
import classnames from 'classnames';

const Bar = ({ progress, max, className }) => (<div className={classnames('bar-box',className)}>
    <div className={'bar-progress'} style={{width: `${100*Math.min(1,progress/max)}%`}}></div>
</div> )

export default Bar;
