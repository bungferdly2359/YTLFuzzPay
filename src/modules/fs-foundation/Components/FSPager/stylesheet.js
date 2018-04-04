import { FSStyleSheet } from '../../';

export const getWidth = () => FSStyleSheet.getAppDimension().width;

const stylesheet = FSStyleSheet.create(props => {
  return {
    container: {
      flex: 1,
      overflow: 'hidden'
    },
    page: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: props.width
    }
  };
});

export default stylesheet;
