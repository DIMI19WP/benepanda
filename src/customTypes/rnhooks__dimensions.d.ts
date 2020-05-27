declare module '@rnhooks/dimensions' {
  type dimensionsHook = { width: number; height: number };
  function useDimensions(source: |'window'|'screen'): dimensionsHook;
  export default useDimensions;
}
