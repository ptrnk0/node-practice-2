import { filterParams, validCathegory } from '../constants/index.js';

function parseCategoryKeys(category) {
  const isExistCategory = validCathegory.includes(category);

  if (!isExistCategory) return;

  return category;
}

function parseNumber(number) {
  const isString = typeof number === 'string';

  if (!isString) return;

  const parsedNumber = Number(number);

  if (Number.isNaN(parsedNumber)) return;

  return parsedNumber;
}

export function parseFilterParams(query) {
  const { category, minPrice, maxPrice } = query;

  const parsedCategory = parseCategoryKeys(category);
  const parsedMinPrice = parseNumber(minPrice);
  const parsedMaxPrice = parseNumber(maxPrice);

  return {
    category: parsedCategory,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  };
}
