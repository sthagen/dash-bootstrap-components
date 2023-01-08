import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import RBFormSelect from 'react-bootstrap/FormSelect';

import {sanitizeOptions} from '../../private/util';

/**
 * Create a HTML select element with Bootstrap styles. Specify options as a
 * list of dictionaries with keys label, value and disabled.
 */
const Select = props => {
  const {
    className,
    class_name,
    html_size,
    valid,
    invalid,
    value,
    ...otherProps
  } = props;

  const handleChange = e => {
    if (props.setProps) {
      props.setProps({value: e.target.value});
    }
  };

  return (
    <RBFormSelect
      {...omit(
        [
          'setProps',
          'options',
          'persistence',
          'persistence_type',
          'persisted_props',
          'loading_state'
        ],
        otherProps
      )}
      isInvalid={invalid}
      isValid={valid}
      onChange={handleChange}
      className={class_name || className}
      htmlSize={html_size}
      value={value || ''}
    >
      <option value="" disabled hidden>
        {props.placeholder}
      </option>
      {props.options &&
        sanitizeOptions(props.options).map(option => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            title={option.title}
          >
            {option.label}
          </option>
        ))}
    </RBFormSelect>
  );
};

Select.defaultProps = {
  value: '',
  persisted_props: ['value'],
  persistence_type: 'local',
  placeholder: ''
};

Select.propTypes = {
  /**
   * The options to display as items in the component. This can be an array
   * or a dictionary as follows:
   *
   * \n1. Array of options where the label and the value are the same thing -
   * [string|number]
   *
   * \n2. An array of options
   * ```
   * {
   *   "label": [string|number],
   *   "value": [string|number],
   *   "disabled": [bool] (Optional),
   *   "title": [string] (Optional)
   * }
   * ```
   *
   * \n3. Simpler `options` representation in dictionary format. The order is not
   * guaranteed. All values and labels will be treated as strings.
   * ```
   * {"value1": "label1", "value2": "label2", ... }
   * ```
   * which is equal to
   * ```
   * [
   *   {"label": "label1", "value": "value1"},
   *   {"label": "label2", "value": "value2"}, ...
   * ]
   * ```
   */
  options: PropTypes.oneOfType([
    /**
     * Array of options where the label and the value are the same thing -
     * [string|number]
     */
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    /**
     * Simpler `options` representation in dictionary format. The order is not
     * guaranteed. All values and labels will be treated as strings.
     * {`value1`: `label1`, `value2`: `label2`, ... }
     * which is equal to
     * [
     *   {label: `label1`, value: `value1`},
     *   {label: `label2`, value: `value2`}, ...
     * ]
     */
    PropTypes.object,
    /**
     * An array of options {label: [string|number], value: [string|number]},
     * an optional disabled field can be used for each option
     */
    PropTypes.arrayOf(
      PropTypes.exact({
        /**
         * The options's label
         */
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,

        /**
         * The value of the option. This value corresponds to the items
         * specified in the `value` property.
         */
        value: PropTypes.string.isRequired,

        /**
         * If true, this checkbox is disabled and can't be clicked on.
         */
        disabled: PropTypes.bool,

        /**
         * The HTML 'title' attribute for the option. Allows for information on
         * hover. For more information on this attribute, see
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title
         */
        title: PropTypes.string
      })
    )
  ]),

  /**
   * The value of the currently selected option.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: PropTypes.string,

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
   * Placeholder text to display before a selection is made.
   */
  placeholder: PropTypes.string,

  /**
   * Set to True to disable the Select.
   */
  disabled: PropTypes.bool,

  /**
   * This attribute specifies that the user must fill in a value before
   * submitting a form. It cannot be used when the type attribute is hidden,
   * image, or a button type (submit, reset, or button). The :optional and
   * :required CSS pseudo-classes will be applied to the field as appropriate.
   * required is an HTML boolean attribute - it is enabled by a boolean or
   * 'required'. Alternative capitalizations `REQUIRED`
   * are also acccepted.
   */
  required: PropTypes.oneOfType([
    PropTypes.oneOf(['required', 'REQUIRED']),
    PropTypes.bool
  ]),

  /**
   * Apply valid style to the Input for feedback purposes. This will cause
   * any FormFeedback in the enclosing div with valid=True to display.
   */
  valid: PropTypes.bool,

  /**
   * Apply invalid style to the Input for feedback purposes. This will cause
   * any FormFeedback in the enclosing div with valid=False to display.
   */
  invalid: PropTypes.bool,

  /**
   * Set the size of the Input. Options: 'sm' (small), 'md' (medium)
   * or 'lg' (large). Default is 'md'.
   */
  size: PropTypes.string,

  /**
   * This represents the number of rows in the select that should be visible at
   * one time. It will result in the Select being rendered as a scrolling list
   * box rather than a dropdown.
   */
  html_size: PropTypes.string,

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
   * component or the page. Since only `value` is allowed this prop can
   * normally be ignored.
   */
  persisted_props: PropTypes.arrayOf(PropTypes.oneOf(['value'])),

  /**
   * Where persisted user changes will be stored:
   * memory: only kept in memory, reset on page refresh.
   * local: window.localStorage, data is kept after the browser quit.
   * session: window.sessionStorage, data is cleared once the browser quit.
   */
  persistence_type: PropTypes.oneOf(['local', 'session', 'memory']),

  /**
   * The name of the control, which is submitted with the form data.
   */
  name: PropTypes.string
};

export default Select;
