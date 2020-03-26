import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
    color: #5960c1;
    font-size: 14px;
    font-weight: bold;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;

    color: #666;

    line-height: 1.4;
    text-align: center;

    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  list-style: none;
`;

export const PageControl = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  button {
    border-radius: 50%;
    border: none;
  }

  button[disabled] {
    opacity: 0.5;
  }
`;

export const Issue = styled.li`
  display: flex;
  padding: 15px 10px;
  border: 1px solid #eee;
  border-radius: 4px;

  & + li {
    margin-top: 10px;
  }
  img {
    width: 80px;

    border-radius: 50%;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #5960c1;
        }
      }
    }

    p {
      margin: 5px 0px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const LabelList = styled.ul`
  list-style: none;
`;

export const Label = styled.li`
  display: inline;

  background: #${(props) => props.color};
  padding: 5px;
  margin: 0;

  line-height: bold;
  mix-blend-mode: difference;

  span {
    color: inherit;
    line-height: bold;
  }

  & + li {
    margin-left: 10px;
  }
`;
