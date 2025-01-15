import React from 'react';
import { Typography } from '@material-ui/core';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';

const QuickStart = () => {
  return (
    <div className="page">
      <Typography paragraph variant={'h2'}>
        快速开始
      </Typography>
      <Typography paragraph variant={'h4'}>
        环境准备
      </Typography>
      <Typography paragraph>请确保使用 v16.8及更高版本的react</Typography>

      <Typography paragraph variant={'h4'}>
        安装
      </Typography>

      <SyntaxHighlighter language="javascript" style={atomOneLight}>
        yarn add rxjs @rx-form/core @rx-form/react
      </SyntaxHighlighter>
    </div>
  );
};

export default QuickStart;
