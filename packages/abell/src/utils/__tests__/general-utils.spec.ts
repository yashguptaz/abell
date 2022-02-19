import path from 'path';
import { test, describe, expect } from 'vitest';
import {
  getFilePathFromURL,
  recursiveFindFiles,
  getURLFromFilePath,
  findAbellFileFromURL
} from '../general-utils';

const BASE_PATH = path.join(__dirname, 'test-files');
const prefix = (fileName: string, baseOverride?: string): string =>
  path.join(baseOverride ?? BASE_PATH, fileName);

describe('getFilePathFromURL()', () => {
  test('should return index.abell on `/` route', () => {
    expect(getFilePathFromURL('/', BASE_PATH)).toBe(prefix('index.abell'));
  });

  test('should return index.abell on `/` route', () => {
    const base = '.';
    expect(getFilePathFromURL('/', base)).toBe('./index.abell');
  });

  test('should return index.abell on `/` route', () => {
    const base = '.';
    expect(getFilePathFromURL('/', base)).toBe('./index.abell');
  });

  test('should return about.abell on `/about` route', () => {
    expect(getFilePathFromURL('/about', BASE_PATH)).toBe(prefix('about.abell'));
  });

  test('should handle nested routes', () => {
    expect(getFilePathFromURL('/nested', BASE_PATH)).toBe(
      prefix('nested/index.abell')
    );
  });

  test('should handle nested routes', () => {
    expect(getFilePathFromURL('/_components/navbar', BASE_PATH)).toBe(
      prefix('_components/navbar.abell')
    );
  });
});

describe('getURLFromFilePath()', () => {
  test('should return `/` route on index.abell file', () => {
    expect(getURLFromFilePath(prefix('index.abell'), BASE_PATH)).toBe('/');
  });

  test('should return `/about` route on about.abell file', () => {
    expect(getURLFromFilePath(prefix('about.abell'), BASE_PATH)).toBe('/about');
    expect(getURLFromFilePath(prefix('/about.abell'), BASE_PATH)).toBe(
      '/about'
    );
  });

  test('should return `/nested` route on nested/index.abell file', () => {
    expect(getURLFromFilePath(prefix('nested/index.abell'), BASE_PATH)).toBe(
      '/nested'
    );

    expect(getURLFromFilePath(prefix('nested/index.abell/'), BASE_PATH)).toBe(
      '/nested'
    );
  });
});

describe('recursiveFindFiles()', () => {
  test('should return array of abell files paths', () => {
    expect(recursiveFindFiles(BASE_PATH, '.abell')).toEqual([
      prefix('_components/navbar.abell'),
      prefix('about.abell'),
      prefix('nested/index.abell')
    ]);
  });
});

describe('findAbellFileFromURL()', () => {
  test('should return relative abell files', () => {
    const abellPages = {
      './src/index.abell': {
        default: () => 'hehe'
      },
      './src/about.abell': {
        default: () => 'hehe'
      },
      './src/nested/index.abell': {
        default: () => 'hehe'
      }
    };
    expect(findAbellFileFromURL('/', abellPages)).toBe('./src/index.abell');
    expect(findAbellFileFromURL('/about', abellPages)).toBe(
      './src/about.abell'
    );
    expect(findAbellFileFromURL('/nested', abellPages)).toBe(
      './src/nested/index.abell'
    );
  });

  test('should return absolute abell files', () => {
    const abellPages = {
      [prefix('./src/index.abell')]: {
        default: () => 'hehe'
      },
      [prefix('./src/about.abell')]: {
        default: () => 'hehe'
      },
      [prefix('./src/nested/index.abell')]: {
        default: () => 'hehe'
      }
    };
    expect(findAbellFileFromURL('/', abellPages)).toBe(
      prefix('./src/index.abell')
    );
    expect(findAbellFileFromURL('/about', abellPages)).toBe(
      prefix('./src/about.abell')
    );
    expect(findAbellFileFromURL('/nested', abellPages)).toBe(
      prefix('./src/nested/index.abell')
    );
  });
});
