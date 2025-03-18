/* eslint-disable no-nested-ternary */
import { CSSProperties } from 'react';
import { IconType } from 'react-icons';

import NoDataImg from '../img/noData.jpg';

type EmptyStateProps = {
  text: string;
  ICON?: IconType;
  style?: CSSProperties;
  image?: string;
  imageStyle?: CSSProperties;
};

const EmptyState = (props: EmptyStateProps): JSX.Element => {
  const { ICON, style, text, image, imageStyle } = props;
  return (
    <div>
      <div className="flex flex-col justify-center items-center" style={style}>
        <div>
          {ICON ? (
            <ICON className="empty-state" size={100} />
          ) : image ? (
            <img src={image || NoDataImg} className="w-[6rem] md:w-[22rem]" style={imageStyle} />
          ) : (
            <img src={NoDataImg} className="w-[6rem] md:w-[22rem]" style={imageStyle} />
          )}
        </div>

        <p className="text-center my-[1rem] font-semibold md:text-[1.6rem] md:w-[50%]">{text}</p>
      </div>
    </div>
  );
};

export default EmptyState;
