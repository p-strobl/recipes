import React from "react";
import PropTypes from "prop-types";
import Class from "classnames";

export function Image({ alt, classs, imageSrc, src, title }) {
  return (
    <img
      alt={alt}
      className={Class(`${classs} AsyncImage`)}
      data-image-src={imageSrc}
      src={src}
      title={`Visit ${title}`}
    />
  );
}

Image.defaultProps = {
  alt: PropTypes.string,
  classs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  imageSrc: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
};

Image.propTypes = {
  alt: PropTypes.string,
  classs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  imageSrc: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
};
