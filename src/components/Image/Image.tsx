import { forwardRef, type ImgHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import type { BoxShadow } from "../Box/Box";

export type ImageFit = "contain" | "cover" | "fill" | "none";
export type ImageShape = "square" | "rounded" | "circular";

export interface ImageOwnProps {
  fit?: ImageFit;
  shape?: ImageShape;
  /** Applies a 1px border using the default border token. */
  bordered?: boolean;
  shadow?: BoxShadow;
  /** Fills the width of its container (100% width, height auto). */
  block?: boolean;
  /**
   * Required — unlike native `<img>`, this is not optional. Pass `alt=""`
   * for a genuinely decorative image; every other use should describe the
   * image's content.
   */
  alt: string;
}

export type ImageProps = ImageOwnProps &
  Omit<ImgHTMLAttributes<HTMLImageElement>, keyof ImageOwnProps>;

/** Styled wrapper around the native `<img>` element for content images (photos, thumbnails, hero images). */
export const Image = /* @__PURE__ */ forwardRef<HTMLImageElement, ImageProps>(function Image(
  { fit, shape, bordered, shadow, block, alt, className, style, ...rest },
  ref,
) {
  return (
    <img
      ref={ref}
      alt={alt}
      className={cx(
        "dym-Image",
        fit && `dym-Image--fit-${fit}`,
        shape && `dym-Image--shape-${shape}`,
        bordered && "dym-Image--bordered",
        shadow && `dym-Image--shadow-${shadow}`,
        block && "dym-Image--block",
        className,
      )}
      style={style}
      {...rest}
    />
  );
});
