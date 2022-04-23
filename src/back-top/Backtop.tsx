import React, { useCallback, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useScroll, useMount, useBoolean } from 'ahooks';
import smoothscroll from 'smoothscroll-polyfill';
import isString from 'lodash/isString';
import { Icon } from 'tdesign-icons-react';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import useConfig from '../_util/useConfig';
import { TdBackTopProps } from './type';

export type ThemeList = 'round' | 'half-round' | 'round-dark' | 'half-round-dark';

export type BackTopProps = TdBackTopProps & NativeProps;

export const defaultProps = {
  fixed: true,
  icon: 'backtop',
  target: (() => window) as any,
  text: '',
  theme: 'round' as ThemeList,
};

const BackTop: React.FC<BackTopProps> = (props) => {
  const { fixed, icon, target, text, theme } = props;

  const [show, { setTrue, setFalse }] = useBoolean(false);

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-back-top`;

  const scroll = useScroll(document);

  useMount(() => {
    smoothscroll.polyfill();
  });

  const isWindow = (obj) => obj !== null && obj.window === window;

  const targetHeight = useMemo(
    () => (isWindow(target) ? 0 : (target() as unknown as HTMLElement).offsetTop || 0),
    [target],
  );

  useEffect(() => {
    // 当滚动条滚动到超过锚点一个屏幕后，显示回到顶部按钮
    const screenHeight = window.innerHeight;
    if (scroll?.top > screenHeight + targetHeight) {
      setTrue();
    } else {
      setFalse();
    }
  }, [scroll, targetHeight, setTrue, setFalse]);

  const onClick = useCallback(() => {
    document.documentElement.scrollTo({ top: targetHeight, behavior: 'smooth' });
  }, [targetHeight]);

  return withNativeProps(
    props,
    <div
      className={classNames(`${name}`, `${name}--${theme}`, {
        [`${classPrefix}-is-fixed`]: fixed,
        'back-top-hidden': !show,
        'back-top-show': show,
      })}
      onClick={onClick}
    >
      {isString(icon) ? <Icon className={`${name}__icon`} name={icon} /> : icon}
      {text && <div className={classNames(`${name}__text`, `${classPrefix}-class-text`)}>{text}</div>}
    </div>,
  );
};

BackTop.defaultProps = defaultProps;
BackTop.displayName = 'BackTop';

export default BackTop;
