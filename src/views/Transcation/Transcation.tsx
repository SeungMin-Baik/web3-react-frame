import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import TranscationPage from './TranscationPage'

const Transcation: React.FC = () => {
    
    const { path } = useRouteMatch()
    
    return (
        <Switch>
            <Route exact path={path}>
                <TranscationPage/>
            </Route>
        </Switch>
    )
}

export default Transcation