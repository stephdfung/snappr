declare module 'react-sketchpad/lib' {
  import * as React from 'react';

  export const TOOL_PENCIL: string;
  export class SketchPad extends React.Component<Record<string, unknown>> {}
}
