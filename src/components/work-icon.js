import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const WorkIcon = ({ iconPath, alt }) => {
  // Map icon paths to static images
  const iconMap = {
    '/images/work/icon-1.png': (
      <StaticImage
        src="../images/work/icon-1.png"
        alt={alt}
        width={100}
        height={100}
        quality={95}
      />
    ),
    '/images/work/icon-2.png': (
      <StaticImage
        src="../images/work/icon-2.png"
        alt={alt}
        width={100}
        height={100}
        quality={95}
      />
    ),
    '/images/work/icon-3.png': (
      <StaticImage
        src="../images/work/icon-3.png"
        alt={alt}
        width={100}
        height={100}
        quality={95}
      />
    ),
    '/images/work/icon-4.png': (
      <StaticImage
        src="../images/work/icon-4.jpg"
        alt={alt}
        width={100}
        height={100}
        quality={95}
      />
    ),
  };

  return iconMap[iconPath] || null;
};

export default WorkIcon;
