declare module '@emotion/native' {
  // 타이핑할 모듈의 이름을 명시합니다
  import ReactNative, {StyleProp} from 'react-native'; // ReactNative를 모듈을 가져옵니다
  interface StyledCustomElement {
    // style(Element) 문법을 위해 Callable하게 만들기 위한 인터페이스입니다
    <T>(CustomElement: React.ElementType<T>): (
      // Element를 받아올 수 있도록 정의해줍니다
      styles: TemplateStringsArray, // Style을 받아올 수 있도록 정의해줍니다
    ) => React.ElementType<T>; // 원본 Element와 같은 타입을 반환합니다.
  }
  const styled: {
    [k in keyof typeof ReactNative]: (
      // RN의 컴포넌트들로 loop합니다
      styles: TemplateStringsArray, // TemplateStringsArray을 인수로 받습니다
    ) => (typeof ReactNative)[k] // 루프 돌린 키들을 반환합니다
  } &
    StyledCustomElement; // 위에 선언한 Callable 문법을 적용해줍니다

  export function css(style: TemplateStringsArray): StyleProp<any>; // css 문법을 추가합니다
  export default styled;
}
