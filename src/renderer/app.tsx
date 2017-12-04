import { default as React } from "react";
import { render } from "react-dom";
import { Unlock } from './components/unlock';

render((
  <div>
    <Unlock />
  </div>
), document.getElementById('app'))