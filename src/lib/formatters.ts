import { UI_STRINGS } from '@/constants/translations';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Converts any number or string containing Latin digits into Persian digits.
 */
export function toPersianDigits(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  return str.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[parseInt(digit, 10)] ?? digit);
}

/**
 * Formats a number with Persian thousand separators (۳٬۲۰۰٬۰۰۰٬۰۰۰).
 */
export function formatNumberWithCommas(num: number | string | null | undefined): string {
  if (num === null || num === undefined || num === '') return '۰';
  const cleanNumber = typeof num === 'string' ? parseFloat(num.replace(/[,٬]/g, '')) : num;
  if (isNaN(cleanNumber)) return '۰';

  const parts = cleanNumber.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  const persianInteger = toPersianDigits(parts[0]);
  if (parts.length > 1) {
    return `${persianInteger}٫${toPersianDigits(parts[1])}`;
  }
  return persianInteger;
}

/**
 * Formats property price in Tomans with Persian digits and separator.
 * Examples:
 * - standard: «۳٬۲۰۰٬۰۰۰٬۰۰۰ تومان»
 * - readableUnit: «۳٫۲ میلیارد تومان» or «۸۵۰ میلیون تومان»
 */
export function formatPrice(
  priceInTomans: number | null | undefined,
  options?: {
    showCurrency?: boolean;
    readableUnit?: boolean;
  }
): string {
  if (priceInTomans === null || priceInTomans === undefined || priceInTomans === 0) {
    return 'توافقی';
  }

  const { showCurrency = true, readableUnit = false } = options || {};

  if (readableUnit) {
    if (priceInTomans >= 1_000_000_000) {
      const billions = priceInTomans / 1_000_000_000;
      const formatted = Number.isInteger(billions) ? billions.toString() : billions.toFixed(1).replace('.', '٫');
      return `${toPersianDigits(formatted)} ${UI_STRINGS.units.billion} ${showCurrency ? UI_STRINGS.units.toman : ''}`.trim();
    }
    if (priceInTomans >= 1_000_000) {
      const millions = priceInTomans / 1_000_000;
      const formatted = Number.isInteger(millions) ? millions.toString() : millions.toFixed(0);
      return `${toPersianDigits(formatted)} ${UI_STRINGS.units.million} ${showCurrency ? UI_STRINGS.units.toman : ''}`.trim();
    }
  }

  const formattedNum = formatNumberWithCommas(priceInTomans);
  return showCurrency ? `${formattedNum} ${UI_STRINGS.units.toman}` : formattedNum;
}

/**
 * Formats area with Persian digits and m2 unit (e.g. «۴۵۰ متر مربع»).
 */
export function formatArea(areaInMeters: number | string | null | undefined): string {
  if (!areaInMeters) return '۰ ' + UI_STRINGS.units.meterSquare;
  return `${toPersianDigits(areaInMeters)} ${UI_STRINGS.units.meterSquare}`;
}
