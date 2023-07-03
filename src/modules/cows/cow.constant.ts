import {
  ICowBreed,
  ICowCategory,
  ICowLabel,
  ICowLocation,
} from './cow.interface';

export const cowLocations: ICowLocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const cowBreeds: ICowBreed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

export const cowLabels: ICowLabel[] = ['for sale', 'sold out'];

export const cowCategories: ICowCategory[] = ['Dairy', 'Beef', 'Dual Purpose'];

export const cowSearchableFields = [
  'name',
  'price',
  'location',
  'breed',
  'category',
];

export const cowFilterableFields = [
  'searchTerm',
  'name',
  'price',
  'location',
  'breed',
  'category',
  'minPrice',
  'maxPrice',
];
