import React from 'react';
import Button ,{ButtonSize,ButtonType}from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>disabled hello</Button>
       <Button autoFocus className='custom'>默认 hello</Button>
       <Button  btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>hello</Button>
        <Button btnType={ButtonType.Link} href='http://baidu.com'>baidu link</Button>
        <Button btnType={ButtonType.Link} href='http://baidu.com' disabled>disabled link</Button>
      </header>
    </div>
  );
}

export default App;
