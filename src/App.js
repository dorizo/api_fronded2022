import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import { QueryClient, QueryClientProvider } from 'react-query';
import MeProvider from 'contexts/MeContext';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import { ReactQueryDevtools } from 'react-query/devtools';
// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MeProvider>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={themes(customization)}>
                            <CssBaseline />
                            <NavigationScroll>
                                <Routes />
                            </NavigationScroll>
                        </ThemeProvider>
                    </StyledEngineProvider>
                </MeProvider>
            </LocalizationProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default App;
