import React from 'react';
import PropTypes from 'prop-types';
import RBPopover from 'react-bootstrap/Popover';

import Overlay from '../../private/Overlay';

/**
 * Popover creates a toggleable overlay that can be used to provide additional
 * information or content to users without having to load a new page or open a
 * new window.
 *
 * Use the `PopoverHeader` and `PopoverBody` components to control the layout
 * of the children.
 */

const Popover = props => {
  const {
    children,
    is_open,
    loading_state,
    className,
    class_name,
    style,
    id,
    ...otherProps
  } = props;

  return (
    <Overlay
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
      defaultShow={is_open}
      {...otherProps}
    >
      <RBPopover
        // hideArrow={hide_arrow}
        // to ensure proper backwards compatibility, the toggle function is only
        // passed to the popover if `trigger` is not specified
        style={style}
        id={id}
        className={class_name || className}
      >
        {children}
      </RBPopover>
    </Overlay>
  );
};

Popover.defaultProps = {
  delay: {show: 0, hide: 50},
  placement: 'right',
  flip: true
};

Popover.propTypes = {
  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: PropTypes.string,

  /**
   * The children of this component
   */
  children: PropTypes.node,
  /**
   * Defines CSS styles which will override styles previously set.
   */
  style: PropTypes.object,

  /**
   * Often used with CSS to style elements with common properties.
   */
  class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `class_name` instead.
   *
   * Often used with CSS to style elements with common properties.
   */
  className: PropTypes.string,

  /**
   * A unique identifier for the component, used to improve
   * performance by React.js while rendering components
   * See https://reactjs.org/docs/lists-and-keys.html for more info
   */
  key: PropTypes.string,

  /**
   * Specify popover placement.
   */
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end'
  ]),

  /**
   * ID of the component to attach the popover to.
   */
  target: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Space separated list of triggers (e.g. "click hover focus legacy"). These
   * specify ways in which the target component can toggle the popover. If not
   * specified you must toggle the popover yourself using callbacks. Options
   * are:
   * - "click": toggles the popover when the target is clicked.
   * - "hover": toggles the popover when the target is hovered over with the
   * cursor.
   * - "focus": toggles the popover when the target receives focus
   * - "legacy": toggles the popover when the target is clicked, but will also
   * dismiss the popover when the user clicks outside of the popover.
   */
  trigger: PropTypes.string,

  /**
   * Whether the Popover is open or not.
   */
  is_open: PropTypes.bool,

  /**
   * Hide popover arrow.
   */
  hide_arrow: PropTypes.bool,

  /**
   * CSS class to apply to the popover.
   */
  inner_class_name: PropTypes.string,

  /**
   * **DEPRECATED** Use `inner_class_name` instead
   *
   * CSS class to apply to the popover.
   */
  innerClassName: PropTypes.string,

  /**
   * Optionally override show/hide delays
   */
  delay: PropTypes.oneOfType([
    PropTypes.shape({show: PropTypes.number, hide: PropTypes.number}),
    PropTypes.number
  ]),

  /**
   * Offset of the popover relative to its target
   */
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Whether to flip the direction of the popover if too close to the container
   * edge, default True.
   */
  flip: PropTypes.bool,

  /**
   * Object that holds the loading state object coming from dash-renderer
   */
  loading_state: PropTypes.shape({
    /**
     * Determines if the component is loading or not
     */
    is_loading: PropTypes.bool,
    /**
     * Holds which property is loading
     */
    prop_name: PropTypes.string,
    /**
     * Holds the name of the component that is loading
     */
    component_name: PropTypes.string
  })
};

export default Popover;
