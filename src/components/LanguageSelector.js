import React from 'react';
import { connect } from 'dva';
import { Select } from 'antd';
const { Option } = Select;

const LanguageSelector = ({ language, dispatch }) => {
  function onChange(value) {
    dispatch({
      type: 'language/set',
      payload: value,
    });
    window.location.reload();
  }

  function onSearch(val) {
    // console.log('search:', val);
  }

  return (
    <Select
      showSearch
      defaultValue={language}
      style={{ width: 75 }}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="en">EN</Option>
      <Option value="th">TH</Option>
      <Option value="zh-CN">CN</Option>
      <Option value="es">ES</Option>
      <Option value="hi">HI</Option>
      <Option value="ja">JA</Option>
      <Option value="ru">RU</Option>
    </Select>
  );
};
export default connect(({ language }) => ({
  language,
}))(LanguageSelector);
