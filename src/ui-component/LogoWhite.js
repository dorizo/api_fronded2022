// material-ui
import logo from '../assets/images/logo-white.png';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

export default function LogoWhite() {
    return <img src={logo} alt="logo-app" width="40" />;
}
