## 모달 사용 가이드

### 모달 컴포넌트 정보
- `ModalMain` : 메인 모달 컴포넌트
    - `ModalAdditional` : 아이콘, 별점 등 부가적인 요소 넣는 서브 컴포넌트
    - `ModalTitle` : 모달 내용을 넣는 서브 컴포넌트
    - `ModalButton` : 버튼을 넣는 서브 컴포넌트

### 각각 필요한 props 정보
> `ModalMain` 
  ```ts
  export type ModalMainProps = {
  children?: ReactNode;
  isOpen?: boolean;
  };
```
> `ModalAdditional`
```ts
export type ModalAdditionalProps = {
  children: ReactNode;
};
```
> `ModalTitle`
```ts
export type ModalTitleProps = {
  children?: ReactNode;
};
```
> `ModalButton`
```ts
export type ModalButtonProps = {
  color: string;
  backgroundColor: string;
  hoverBackgroundColor?: string;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
```

위의 서브 컴포넌트 중 필요한 부분만 `ModalMain`의 `children`에 배치 하시면 됩니다~
```tsx
const Modal = () => {
    const [isClick,setIsClick] = useState(false);

    const handleModalTest = () => {
        setIsClick(!isClick);
    }
    return (
        <>
        <button onClick={handleModalTest}>버튼</button>
        {isClick && (
            <ModalMain isOpen={isClick}>
            <ModalMain.Additional>
                <MdError />
            </ModalMain.Additional>
            <ModalMain.Title>다이슨 예약하시겠습니까?</ModalMain.Title>
            <div>
                <ModalMain.Button
                color="inherit"
                backgroundColor={colorPalette.modalCancelButtonColor}
                hoverBackgroundColor={colorPalette.modalCancelHoverColor}
                onClick={() => setIsClick(false)}
                >
                돌아가기
                </ModalMain.Button>
                <ModalMain.Button
                color={colorPalette.whiteColor}
                backgroundColor={colorPalette.heavyColor}
                hoverBackgroundColor={colorPalette.rightButtonHoverColor}
                onClick={() => setIsClick(false)}
                >
                예약하기
                </ModalMain.Button>
            </div>
            </ModalMain>
        )}
        </>
    );
};
```
