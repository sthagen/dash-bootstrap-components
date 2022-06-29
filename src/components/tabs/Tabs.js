import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import classnames from 'classnames';
import RBNav from 'react-bootstrap/Nav';
import RBTab from 'react-bootstrap/Tab';

import {parseChildrenToArray, resolveChildProps} from '../../private/util';

/**
 * Create Bootstrap styled tabs. Use the `active_tab` property to set, or get
 * get the currently active tab in a callback.
 */
const Tabs = props => {
  let {
    children,
    id,
    className,
    class_name,
    style,
    active_tab,
    key,
    loading_state,
    setProps
  } = props;
  children = parseChildrenToArray(children);

  // if active_tab not set initially, choose first tab
  useEffect(() => {
    if (setProps && active_tab === undefined) {
      setProps({
        active_tab:
          children && (resolveChildProps(children[0]).tab_id || 'tab-0')
      });
    }
  }, []);

  const toggle = tab => {
    if (setProps) {
      if (active_tab !== tab) {
        setProps({active_tab: tab});
      }
    }
  };

  // create tab links by extracting labels from children
  const links =
    children &&
    children.map((child, idx) => {
      const childProps = resolveChildProps(child);
      const tabId = childProps.key || childProps.tab_id || 'tab-' + idx;
      const active = active_tab === tabId;
      return (
        <RBNav.Item
          id={childProps.id}
          key={tabId}
          style={
            active
              ? {...childProps.tab_style, ...childProps.active_tab_style}
              : childProps.tab_style
          }
          className={classnames(
            childProps.tab_class_name || childProps.tabClassName,
            active &&
              (childProps.active_tab_class_name ||
                childProps.activeTabClassName)
          )}
        >
          <RBNav.Link
            className={classnames(
              childProps.label_class_name || childProps.labelClassName,
              active &&
                (childProps.active_label_class_name ||
                  childProps.activeLabelClassName),
              {active}
            )}
            style={{
              ...(active && childProps.active_label_style),
              ...(!childProps.disabled && {cursor: 'pointer'}),
              ...childProps.label_style
            }}
            disabled={childProps.disabled}
            onClick={() => {
              if (!childProps.disabled) {
                toggle(tabId);
              }
            }}
          >
            {childProps.label}
          </RBNav.Link>
        </RBNav.Item>
      );
    });

  // create tab content by extracting children from children
  const tabs =
    children &&
    children.map((child, idx) => {
      const childProps = resolveChildProps(child);
      const {
        children,
        tab_id,
        id,
        label,
        tab_style,
        active_tab_style,
        label_style,
        active_label_style,
        tabClassName,
        tab_class_name,
        activeTabClassName,
        active_tab_class_name,
        labelClassName,
        label_class_name,
        activeLabelClassName,
        active_label_class_name,
        loading_state,
        ...otherProps
      } = childProps;
      const tabId = tab_id || 'tab-' + idx;

      return (
        <RBTab.Pane
          eventKey={tabId}
          key={tabId}
          {...omit(
            ['setProps', 'persistence', 'persistence_type', 'persisted_props'],
            otherProps
          )}
          data-dash-is-loading={
            (loading_state && loading_state.is_loading) || undefined
          }
        >
          {child}
        </RBTab.Pane>
      );
    });
  return (
    <RBTab.Container
      key={key}
      activeKey={active_tab}
      onSelect={id => setProps({active_tab: id})}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      <RBNav
        id={id}
        variant="tabs"
        as="ul"
        className={class_name || className}
        style={style}
      >
        {links}
      </RBNav>
      <RBTab.Content>{tabs}</RBTab.Content>
    </RBTab.Container>
  );
};

Tabs.defaultProps = {
  persisted_props: ['active_tab'],
  persistence_type: 'local'
};

Tabs.propTypes = {
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
   * The tab_id of the currently active tab. If tab_id has not been specified
   * for the active tab, this will default to tab-i, where i is the index
   * (starting from 0) of the tab.
   */
  active_tab: PropTypes.string,

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
   * Used to allow user interactions in this component to be persisted when
   * the component - or the page - is refreshed. If `persisted` is truthy and
   * hasn't changed from its previous value, a `value` that the user has
   * changed while using the app will keep that change, as long as
   * the new `value` also matches what was given originally.
   * Used in conjunction with `persistence_type`.
   */
  persistence: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * Properties whose user interactions will persist after refreshing the
   * component or the page. Since only `active_tab` is allowed this prop can
   * normally be ignored.
   */
  persisted_props: PropTypes.arrayOf(PropTypes.oneOf(['active_tab'])),

  /**
   * Where persisted user changes will be stored:
   * memory: only kept in memory, reset on page refresh.
   * local: window.localStorage, data is kept after the browser quit.
   * session: window.sessionStorage, data is cleared once the browser quit.
   */
  persistence_type: PropTypes.oneOf(['local', 'session', 'memory'])
};

export default Tabs;
