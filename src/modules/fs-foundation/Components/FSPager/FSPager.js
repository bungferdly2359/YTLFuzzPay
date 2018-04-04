import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, PanResponder, Animated, Easing } from 'react-native';
import stylesheet, { getWidth } from './stylesheet';

class FSPager extends Component {

  static propTypes = {
    renderItem: PropTypes.func,
    scrollEnabled: PropTypes.any,
    continuous: PropTypes.bool,
    onScroll: PropTypes.func,
    currentIndex: PropTypes.number,
    animationType: PropTypes.oneOf(['default', 'opacity']),
    onChangePage: PropTypes.func
  };
  
  static defaultProps = {
    scrollEnabled: true
  };

  constructor(props) {
    super(props);
    
    const width = getWidth();

    this.state = {
      prevIndex: null,
      currentIndex: props.currentIndex || 0,
      nextIndex: null,
      continuous: props.continuous === undefined ? (props.renderItem != null || props.children.length >= 3) : props.continuous,
      width,
      loadRemaining: false
    };

    this.panStyle = {
      prevPage: new Animated.Value(-width),
      currentPage: new Animated.Value(0),
      nextPage: new Animated.Value(width),
    };

    this.panStyle.currentPage.addListener(this.onMoveCenter);
    setTimeout(() => this.setState({ loadRemaining: true }), 100);
  }

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    // const width = getWidth();
    // if (this.state.width !== width) {
    //   this.state.width = width;
    //   this.reset();
    // }
  }

  onShouldPan = (e, gestureState) => {
    if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && gestureState.moveX > 30 && Math.abs(gestureState.dx) > 10) {
      if (this.props.scrollEnabled === true && this.state.nextIndex == null && this.state.prevIndex == null) {
        if (this.isHitWall(gestureState)) {
          return false;
        }
        return true;
      }
    }
    return false;
  }

  onMoveFinger = (e, gestureState) => {
    let { dx } = gestureState;
    const { nextIndex, prevIndex, currentIndex } = this.state;

    if (this.isHitWall(gestureState)) {
      dx = 0;
    }

    this.panStyle.currentPage.setValue(dx);
    
    if (dx < 0) {
      if (nextIndex == null) {
        this.setState({ nextIndex: this.normalizeIndex(currentIndex + 1) });
      }
    } else if (dx > 0) {
      if (prevIndex == null) {
        this.setState({ prevIndex: this.normalizeIndex(currentIndex - 1) });
      }
    }
  }

  onMoveCenter = ({ value }) => {
    const { onScroll } = this.props;
    const { nextIndex, prevIndex, currentIndex, width } = this.state;
    let scrollValue = -value / width;
    if (value < 0) {
      if (nextIndex != null) {
        scrollValue *= (nextIndex - currentIndex); 
      }
    } else if (value > 0) {
      if (prevIndex != null) {
        scrollValue *= (currentIndex - this.state.prevIndex); 
      }
    }

    this.panStyle.prevPage.setValue(value - width);
    this.panStyle.nextPage.setValue(value + width);

    if (onScroll != null) {
      const props = { 
        scrollValue,
        currentIndex 
      };
      onScroll(props);
    }
  }

  onRelease = (e, gestureState) => {
    if (this.isHitWall(gestureState)) {
      this.movePage(0, gestureState);
      return;
    }

    const { width } = this.state;
    const relativeGestureDistance = gestureState.dx / width;
    const vx = gestureState.vx;
    let step = 0;
    if (relativeGestureDistance < -0.5 || (relativeGestureDistance < 0 && vx <= -1e-6)) {
      step = 1;
    } else if (relativeGestureDistance > 0.5 || (relativeGestureDistance > 0 && vx >= 1e-6)) {
      step = -1;
    }
    this.movePage(step, gestureState);
  }

  isHitWall(gestureState) {
    return !this.state.continuous && !this.props.renderItem && ((this.state.currentIndex === 0 && gestureState.dx > 0) || (this.state.currentIndex === this.props.children.length - 1 && gestureState.dx < 0));
  }

  movePage = (step, animated = true) => {
    const { width } = this.state;
    Animated.timing(this.panStyle.currentPage, { easing: Easing.in, toValue: -step * width, duration: animated ? 300 : 0 }).start(() => {
      setTimeout(() => {
        let index = this.state.currentIndex;
        if (step < 0) index = this.state.prevIndex; 
        else if (step > 0) index = this.state.nextIndex;
        this.setState({ currentIndex: index, prevIndex: null, nextIndex: null });
        this.reset();
        if (this.props.onChangePage && step !== 0) {
          this.props.onChangePage({ step, index });
        }
      }, 10);
    });
  }

  reset = () => {
    this.panStyle.currentPage.setValue(0);
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: this.onShouldPan,
    onPanResponderMove: this.onMoveFinger,
    onPanResponderRelease: this.onRelease,
    onPanResponderTerminate: this.onRelease,
  });

  normalizeIndex = (index) => {
    const { children, renderItem } = this.props;
    if (renderItem) {
      return index;
    }
    const length = Math.max(children.length, 3);
    return index >= length ? 0 : index < 0 ? length - 1 : index;
  }
  
  onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    if (this.state.width !== width) {
      this.state.width = width;
      this.reset();
    }
    this.setState({
      ready: true
    });
  }

  goToPage = (index, animated = true) => {
    const { nextIndex, prevIndex, currentIndex } = this.state;
    if (nextIndex != null || prevIndex != null) {
      return;
    }
    if (index > currentIndex) {
      this.setState({ nextIndex: index });
      this.movePage(1, animated);
    } else if (index < currentIndex) {
      this.setState({ prevIndex: index });
      this.movePage(-1, animated);
    }
  }

  renderPage = (index, styleName) => {
    const styles = stylesheet.styles();
    if (index == null) {
      return null;
    }
    const { pageContainerStyle, children, animationType, renderItem } = this.props;
    const { nextIndex, prevIndex, width, currentIndex } = this.state;
    const i = this.normalizeIndex(index);
    const animating = nextIndex != null || prevIndex != null;
    let animateStyle = { left: this.panStyle[styleName] };
    if (animating) {
      if (animationType === 'opacity') {
        animateStyle = { 
          opacity: this.panStyle[styleName].interpolate({
            inputRange: [-width, 0, width], 
            outputRange: [0, 1, 0]
          }) 
        };
      }
    }
    return (
      <Animated.View key={i} style={[styles.page, { width }, animateStyle]} pointerEvents={animating ? 'none' : 'auto'}>
        <View style={[styles.container, pageContainerStyle]}>
          {renderItem ? renderItem({ step: index - currentIndex, index }) : (children[i] || null)}
        </View>
      </Animated.View>   
    );
  }

  render() {
    const { style, children } = this.props;
    const { currentIndex, loadRemaining, nextIndex, prevIndex, ready, continuous } = this.state;
    const styles = stylesheet.styles();
    return (
      <View onLayout={this.onLayout} style={[styles.container, style]} {...this.panResponder.panHandlers}>
        {ready && loadRemaining && (continuous || currentIndex > 0) && this.renderPage(this.normalizeIndex((prevIndex || this.normalizeIndex(currentIndex - 1) === nextIndex) ? prevIndex : currentIndex - 1), 'prevPage')}
        {ready && this.renderPage(currentIndex, 'currentPage')}
        {ready && loadRemaining && (continuous || currentIndex < children.length - 1) && this.renderPage(this.normalizeIndex((nextIndex || this.normalizeIndex(currentIndex + 1) === prevIndex) ? nextIndex : currentIndex + 1), 'nextPage')}
      </View>
    );
  }
}

export { FSPager };
