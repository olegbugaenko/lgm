import React from 'react';
import Buildings from "../../pages/buildings";
import Researches from "../../pages/researches";
import Achievements from "../../pages/achievements";
import War from '../../pages/war';

const ContentComponent = ({page}) => (<div className={'content'}>
    {page === 'overview' && (<h3>Overview</h3>)}
    {page === 'building' && (<Buildings />)}
    {page === 'research' && (<Researches />)}
    {page === 'achievements' && (<Achievements />)}
    {page === 'war' && (<War />)}
</div>)

export default ContentComponent;
