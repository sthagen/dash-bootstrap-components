import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import RBListGroup from 'react-bootstrap/ListGroup';

/**
 * Bootstrap list groups are a flexible way to display a series of content. Use
 * in conjunction with `ListGroupItem`, `ListGroupItemHeading` and
 * `ListGroupItemText`.
 */
const ListGroup = props => {
  const {
    children,
    loading_state,
    className,
    class_name,
    flush,
    tag,
    ...otherProps
  } = props;
  return (
    <RBListGroup
      className={class_name || className}
      variant={flush ? 'flush' : null}
      as={tag}
      {...omit(['setProps'], otherProps)}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {children}
    </RBListGroup>
  );
};

ListGroup.defaultProps = {
  tag: 'ul'
};

ListGroup.propTypes = {
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
   * HTML tag to use for the list, default: ul
   */
  tag: PropTypes.string,

  /**
   * When True the `list-group-flush` class is applied which removes some borders
   * and rounded corners from the list group in order that they can be rendered
   * edge-to-edge in the parent container (e.g. a Card).
   */
  flush: PropTypes.bool,

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
  }),

  /**
   * Set to True for a horizontal ListGroup, or supply one of the breakpoints
   * as a string for a ListGroup that is horizontal at that breakpoint and up.
   *
   * Note that horizontal ListGroups cannot be combined with flush ListGroups,
   * so if flush is True then horizontal has no effect.
   */
  horizontal: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default ListGroup;
