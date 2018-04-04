import { FSStyleSheet } from '../../';

export default FSStyleSheet.create(props => ({
  imagePlaceholder: {
    ...props.fullStyle,
    width: null,
    height: null,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0)'
  }
}));
