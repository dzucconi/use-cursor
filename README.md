# use-cursor

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![npm](https://img.shields.io/npm/v/use-cursor)](https://www.npmjs.com/package/use-cursor) [![Build Status](https://travis-ci.org/dzucconi/use-cursor.svg?branch=master)](https://travis-ci.org/dzucconi/use-cursor)

## What is this?

A React hook to cycle an index within some max length

## Installation

```bash
yarn add use-cursor
```

## Usage

```javascript
import React from "react";
import { useCursor } from "use-cursor";

const App: React.FC = () => {
  const { index, cursor, handlePrev, handleNext } = useCursor({ max: 10 });

  return (
    <button onClick={handleNext}>Next</button>
    <button onClick={handlePrev}>Previous</button>
    <pre>
      <code>{JSON.stringify({ index, cursor })}</code>
    </pre>
  );
};
```

## Interface

```typescript
const useCursor: ({
  max
}: {
  max: number;
}) => {
  handlePrev: () => void;
  handleNext: () => void;
  cursor: number;
  index: number;
};
```
