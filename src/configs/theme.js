//@flow

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#AD0000",
        primary2Color: "#8A0000",
        primary3Color: "#720000",
        accent1Color: "#575757",
        accent2Color: "#424242",
        accent3Color: "#282828",
    }
});

injectTapEventPlugin();

export default muiTheme;