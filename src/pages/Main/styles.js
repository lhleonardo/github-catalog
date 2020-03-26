import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${(props) => (props.error ? '#F00' : '#eee')};

    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    border-radius: 4px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs((properties) => ({
  type: 'submit',
  disabled: properties.loading,
}))`
  background: #5960c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    justify-content: space-between;

    margin: 10px 0;
    padding: 5px 0;

    & + li {
      border-top: 1px solid #eee;
      padding-top: 20px;
    }

    a {
      color: #5960c1;
      text-decoration: none;
    }
  }
`;
