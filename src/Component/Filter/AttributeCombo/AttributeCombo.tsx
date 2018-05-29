import * as React from 'react';

import { Select, Form, Input } from 'antd';
const Option = Select.Option;

// default props
interface DefaultAttributeComboProps {
  label: string;
  placeholder: string;
  value: string | undefined;
}
// non default props
interface AttributeComboProps extends Partial<DefaultAttributeComboProps> {
  internalDataDef: any;
  onAttributeChange: ((newAttrName: string) => void);
}

interface AttributeComboState {
  value: string | undefined;
}

/**
 * Combobox offering the attributes to be filtered on.
 */
class AttributeCombo extends React.Component<AttributeComboProps, AttributeComboState> {

  public static defaultProps: DefaultAttributeComboProps = {
    label: 'Attribute',
    placeholder: 'Select Attribute',
    value: undefined
  };

  constructor(props: AttributeComboProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  static getDerivedStateFromProps(
     nextProps: AttributeComboProps,
     prevState: AttributeComboState): Partial<AttributeComboState> {
    return {
      value: nextProps.value
    };
  }

  render() {
    const {
      internalDataDef,
      onAttributeChange,
      label,
      placeholder
    } = this.props;

    let options: Object[] = [];

    if (internalDataDef) {
      const attrDefs = internalDataDef.schema.properties;

      // create sth like ['foo', 'bar', 'kalle'];
      const attrNames = [];
      for (var key in attrDefs) {
        if (attrDefs.hasOwnProperty(key)) {
          attrNames.push(key);
        }
      }

      // create an option per attribute
      options = attrNames.map(attrName => {
        return (
          <Option
            key={attrName}
            value={attrName}
          >
          {attrName} ({attrDefs[attrName].type})
          </Option>
        );
      });
    }

    return (
      <div className="gs-attr-combo">
        <Form.Item label={label} colon={false} >
          {
            internalDataDef ?
              <Select
                value={this.state.value}
                style={{ width: '100%' }}
                onChange={onAttributeChange}
                placeholder={placeholder}
              >
                  {options}
              </Select>
              :
              <Input
                value={this.state.value}
                placeholder={placeholder}
                style={{ width: '100%' }}
                onChange={(event) => {
                  onAttributeChange(event.target.value);
                }}
              />
          }
        </Form.Item>
      </div>
    );
  }
}

export default AttributeCombo;
