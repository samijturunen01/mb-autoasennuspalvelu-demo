import { CAR_D, LOGO_BOXES, LOGO_VIEWBOX } from './logoPaths'
import { asset } from '../../lib/asset'

/**
 * The authentic MB-Autoasennuspalvelu logo, vectorised from the company's own artwork
 * (scripts/trace-logo.mjs). Geometry, counters and colours are the original's.
 * Static uses load cached SVG files; only the animated hero inlines the car path.
 */

const PAD = 12
const W = LOGO_BOXES.word
const wordRatio = (W.w + PAD * 2) / (W.h + PAD * 2)

/** "MB-AUTOASENNUSPALVELU" lettering only – white letter bodies with the grey outline. */
export function Wordmark({ className = '', height = 28, alt = 'MB-Autoasennuspalvelu' }: { className?: string; height?: number; alt?: string }) {
  return (
    <img
      src={asset('brand/logo-wordmark.svg')}
      alt={alt}
      width={Math.round(height * wordRatio)}
      height={height}
      className={className}
      decoding="async"
    />
  )
}

/**
 * Full logo with the W124 drawing and tagline.
 * tone="original" – original colours for light backgrounds
 * tone="dark" – car lines, rule and tagline lifted to silver for graphite backgrounds
 */
export function FullLogo({ className = '', tone = 'original', width = 340 }: { className?: string; tone?: 'original' | 'dark'; width?: number }) {
  return (
    <img
      src={asset(tone === 'dark' ? 'brand/logo-dark.svg' : 'brand/logo.svg')}
      alt="MB-Autoasennuspalvelu – Mercedes-Benz ajoneuvojen erikoisliike"
      width={width}
      height={Math.round((width * LOGO_VIEWBOX.h) / LOGO_VIEWBOX.w)}
      className={className}
      loading="lazy"
      decoding="async"
    />
  )
}

/** The car line drawing path (used by the hero stage). */
export const CAR_PATH = CAR_D
export const CAR_BOX = LOGO_BOXES.car
