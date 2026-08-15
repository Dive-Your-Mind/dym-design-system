import { forwardRef, useState, type HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarOwnProps {
  src?: string;
  /** Used for the image's alt text and as the fallback initials source. */
  name: string;
  size?: AvatarSize;
}

export type AvatarProps = AvatarOwnProps &
  Omit<HTMLAttributes<HTMLSpanElement>, keyof AvatarOwnProps>;

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

/** Renders a user's image, falling back to initials if the image fails to load or is omitted. */
export const Avatar = /* @__PURE__ */ forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, name, size = "md", className, ...rest },
  ref,
) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = src && !imageFailed;

  return (
    <span ref={ref} className={cx("dym-Avatar", `dym-Avatar--${size}`, className)} {...rest}>
      {showImage ? (
        <img
          src={src}
          alt={name}
          className="dym-Avatar-image"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="dym-Avatar-initials" aria-label={name} role="img">
          {initialsFrom(name)}
        </span>
      )}
    </span>
  );
});
