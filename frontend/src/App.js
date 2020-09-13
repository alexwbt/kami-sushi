import Admin from 'admin';
import Footer from 'components/Footer';
import NavigationBar from 'components/NavigationBar';
import Contact from 'pages/Contact';
import Home from 'pages/Home';
import Imprint from 'pages/Imprint';
import Menu from 'pages/Menu';
import OrderNow from 'pages/OrderNow';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const styledTheme = {
    dark: '#111115',
    red: '#c12b2b',
    grey: '#ddddde',
    darkGrey: '#222222',
    secondaryGrey: '#333333',
    secondaryText: 'grey',
    currency: 'silver',
    currencyDark: '#707070',
    green: '#55bb55',
    darkBlue: '#0e1324',
};

const App = () => {
    return (
        <ThemeProvider theme={styledTheme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/run-teemo-run' component={Admin} />
                    <Route>
                        <NavigationBar />
                        <Switch>
                            <Route exact path='/speisekarte' component={Menu} />
                            <Route exact path='/kontakt' component={Contact} />
                            <Route exact path='/impressum' component={Imprint} />
                            <Route exact path='/jetzt-bestellen' component={OrderNow} />
                            <Route component={Home} />
                        </Switch>
                        <Footer />
                    </Route>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
