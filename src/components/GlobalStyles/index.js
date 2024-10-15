import PropTypes from 'prop-types';
import './GlobalStyle.scss';
function GlobalStyles({ children }) {
  return children;
}
GlobalStyles.prototype = {
  children: PropTypes.node,
};
export default GlobalStyles;
