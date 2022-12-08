// material-ui
import logo from '../assets/images/logo-text.png';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

export default function LogoText() {
    return <img src={logo} alt="-" width="110" />;
}
