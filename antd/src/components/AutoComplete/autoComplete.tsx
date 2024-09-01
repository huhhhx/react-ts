import { type } from "os";
import React, {
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  // 下拉框的数据可以同步或者异步 异步返回promise 数组
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 点击选中建议项时触发的回调*/
  onSelect: (item: DataSourceType) => void;
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement;
}

// 下拉列表可能是对象类型的，很多属性,但是又不确定到底有哪些属性，使用泛型
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, value, renderOption, onSelect, ...restProps } =
    props;

  const [inputVal, setInputVal] = useState(value);
  const [suggestions, setSuggestion] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useClickOutside(componentRef, () => {
    setSuggestion([]);
  });

  // 设置选中的项目高亮
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setInputVal(val);
    triggerSearch.current = true;
  };
  // 设置input框的内容
  const handleSelect = (item: DataSourceType) => {
    setInputVal(item.value);
    setSuggestion([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const classes = classNames("suggestion-item", {
            "item-highlighted": index === highlightIndex,
          });
          return (
            <li
              key={index}
              onClick={() => {
                handleSelect(item);
              }}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // enter
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      // 上
      case 38:
        highlight(highlightIndex - 1);
        break;
      // 下
      case 40:
        highlight(highlightIndex + 1);
        break;
      default:
        break;
    }
  };
  // 对input事件进行防抖
  const debounceValue = useDebounce(inputVal, 500);

  // 对输入框变化设置防抖
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const result = fetchSuggestions(debounceValue as string);
      setLoading(true);
      // 这里判断返回的数据是同步还是异步的
      if (result instanceof Promise) {
        result.then((data) => {
          setSuggestion(data);
          setLoading(false);
        });
      } else if (result.length) {
        setSuggestion(result);
      }
    } else setSuggestion([]);
  }, [debounceValue]);

  return (
    <div className="hhx-auto-complete" ref={componentRef}>
      <Input
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      ></Input>
      {loading && (
        <ul>
          <Icon icon="spinner" spin></Icon>
        </ul>
      )}
      {setSuggestion.length > 0 && generateDropdown()}
    </div>
  );
};
