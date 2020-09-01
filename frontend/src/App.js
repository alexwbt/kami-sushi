import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Imprint from './pages/Imprint';
import MainPage from './pages/MainPage';
import Menu from './pages/Menu';

const styledTheme = {
    dark: '#111115',
    red: '#ffaaaa',
    grey: '#ddddde',
    darkGrey: '#222222',
};

const App = () => {
    return (
        <ThemeProvider theme={styledTheme}>
            <BrowserRouter>
                <NavigationBar />
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/speisekarte" component={Menu} />
                    <Route exact path="/kontakt" component={Contact} />
                    <Route exact path="/impressum" component={Imprint} />
                    <Route component={MainPage} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
