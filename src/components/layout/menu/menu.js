import React from 'react';
import classnames from 'classnames';
import './styles.css';

const Menu = ({page, navigate}) => {
    console.log(page, navigate);
    return (<div className={'leftSideBar'}>
        {[
            {
                name: 'Overview',
                id: 'overview'
            },
            {
                name: 'Building',
                id: 'building'
            },
            {
                name: 'Research',
                id: 'research'
            },
            {
                name: 'Achievements',
                id: 'achievements'
            }
        ].map(item => (<div
            className={classnames(
                'menuItem',
                {'selected': page === item.id}
                )
            }
            onClick={()=>navigate(item.id)}
        ><span>{item.name}</span></div> ))}
    </div> )
}

export default Menu;
