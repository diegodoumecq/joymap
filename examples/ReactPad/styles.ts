import styled from 'styled-components';

const button = styled.div`
  position: absolute;
  background-color: gray;
  border-radius: 30px;
  top: 100px;
  right: 45px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const stick = styled.div`
  position: absolute;
  bottom: 53px;
  z-index: 15;
  width: 50px;
  height: 50px;
  background-color: gray;
  border: solid 3px black;
  border-radius: 40px;
  cursor: pointer;
`;

const dpad = styled.div`
  position: absolute;
  background-color: gray;
  border-radius: 10px;
  top: 100px;
  left: 45px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const leftShoulder = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -10px;
`;

const rightShoulder = styled(leftShoulder)`
  transform: scaleX(-1);
`;

export const PadContainer = styled.div<{ disconnected: boolean; waiting: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  max-width: 50%;
  border: dashed 1rem rgba(0, 0, 0, 0.5);
  min-width: 500px;
  filter: ${(p) => (p.disconnected ? 'brightness(40%)' : 'none')};
  background-color: ${(p) => (p.waiting ? 'red' : 'transparent')};
`;

export const ReactInputs = styled.div`
  position: relative;
  width: 484px;
  height: 300px;
  overflow: hidden;
`;

export const ModuleName = styled.span`
  position: absolute;
  top: 70px;
  width: 100%;
  text-align: center;
  z-index: 15;
  font-size: 3rem;
`;

export const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-image: url(/gamepad.png);
  pointer-events: none;
`;

export const WaitingMessage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: 100%;
  z-index: 30;
  color: white;
  font-size: 3rem;
  background: rgba(0, 0, 0, 0.5);
`;

export const ReactExample = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const inputs = {
  L: styled(stick)`
    left: 150px;
  `,

  R: styled(stick)`
    right: 150px;
  `,

  L1: styled(leftShoulder)`
    background-image: url(/L1.png);
  `,

  L2: styled(leftShoulder)`
    background-image: url(/L2.png);
  `,

  R1: styled(rightShoulder)`
    background-image: url(/L1.png);
  `,

  R2: styled(rightShoulder)`
    background-image: url(/L2.png);
  `,

  A: styled(button)`
    transform: translate(-25px, 49px);
  `,

  B: styled(button)`
    transform: translateY(25px);
  `,

  X: styled(button)`
    transform: translate(-50px, 25px);
  `,

  Y: styled(button)`
    transform: translateX(-25px);
  `,

  DpadLeft: styled(dpad)`
    transform: translateY(30px);
    width: 40px;
  `,

  DpadRight: styled(dpad)`
    transform: translate(55px, 30px);
    width: 40px;
  `,

  DpadDown: styled(dpad)`
    transform: translate(32px, 50px);
    height: 40px;
  `,

  DpadUp: styled(dpad)`
    transform: translateX(30px);
    height: 40px;
  `,

  Start: styled.div`
    position: absolute;
    background-color: gray;
    border-radius: 10px;
    top: 106px;
    width: 30px;
    height: 30px;
    right: 170px;
    cursor: pointer;
  `,

  Select: styled.div`
    position: absolute;
    background-color: gray;
    border-radius: 10px;
    top: 106px;
    width: 30px;
    height: 30px;
    left: 170px;
    cursor: pointer;
  `,

  Home: styled.div`
    position: absolute;
    background-color: gray;
    border-radius: 10px;
    top: 144px;
    width: 40px;
    height: 40px;
    left: 223px;
    cursor: pointer;
  `,
};
