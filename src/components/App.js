import React from 'react'
import './styles.css';
import Header from './layout/header';
import Menu from "./layout/menu";
import Content from "./layout/content";
import SnackBars from './shared/snack-bar';
import img from "./../assets/img/background-01.jpg";

const App = (props) => (<main>
    <div className={"bg-img"}>
        <img src={img} />
    </div>
    <div className={"app"}>
        <Header/>
        <content>
            <Menu />
            <Content/>
        </content>
    </div>
    <SnackBars/>
</main>)


export default App;
